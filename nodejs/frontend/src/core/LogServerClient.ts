import { LogServerConfig, LogEntry, LogServerResponse, BatchLogRequest, GameEventData } from '../types/logging/LoggerTypes'
import { IHttpClient } from '../abstract/interfaces/IHttpClient'
import { HttpClient } from './HttpClient'
import { getLoggingUrl, getHealthUrl } from '../runtime/env/backend.config'

/**
 * Client for sending logs to the server
 * Handles batching, retries, and error handling
 * Uses composition with HttpClient following SOLID principles
 */
export class LogServerClient {
  private config: LogServerConfig
  private isOnline: boolean = true
  private retryQueue: Array<{ data: any; attempts: number; type: 'log' | 'batch' | 'gameEvent' }> = []
  private isProcessingQueue: boolean = false
  private httpClient: IHttpClient
  private lastRequestTime: number = 0
  private minRequestInterval: number = 100 // Minimum 100ms between requests
  
  constructor(config: LogServerConfig) {
    this.config = config
    this.httpClient = new HttpClient({ 
      defaultTimeout: config.timeout,
      defaultHeaders: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
      }
    })
    this.setupOnlineStatusMonitoring()
  }
  
  /**
   * Update server configuration
   */
  public updateConfig(newConfig: Partial<LogServerConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }
  

  
  /**
   * Setup online/offline status monitoring
   */
  private setupOnlineStatusMonitoring(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true
        this.processRetryQueue()
      })
      
      window.addEventListener('offline', () => {
        this.isOnline = false
      })
    }
  }
  
  /**
   * Send a single log entry to the server
   */
  public async sendLog(logEntry: LogEntry): Promise<LogServerResponse> {
    if (!this.config.enabled || !this.isOnline) {
      this.addToRetryQueue({ data: logEntry, attempts: 0, type: 'log' })
      return { success: false, message: 'Server logging disabled or offline' }
    }
    
    try {
      const response = await this.makeRequest('/log', {
        method: 'POST',
        body: logEntry
      })
      
      return response
    } catch (error) {
      // Only retry if it's a network/connection error, not validation errors
      if (this.shouldRetryError(error)) {
        this.addToRetryQueue({ data: logEntry, attempts: 0, type: 'log' })
      }
      if (error instanceof Error) {
        throw error
      }
      throw new Error(String(error))
    }
  }
  
  /**
   * Send multiple logs in batch
   */
  public async sendLogs(logs: LogEntry[]): Promise<LogServerResponse> {
    if (!this.config.enabled || !this.isOnline) {
      this.addToRetryQueue({ data: logs, attempts: 0, type: 'batch' })
      return { success: false, message: 'Server logging disabled or offline' }
    }
    
    // Split logs into batches if they exceed batch size
    const batches = this.splitIntoBatches(logs, this.config.batchSize)
    const results: LogServerResponse[] = []
    
    for (const batch of batches) {
      try {
        const batchRequest: BatchLogRequest = {
          logs: batch,
          sessionId: this.getSessionId(),
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        }
        
        const response = await this.makeRequest('/batch', {
          method: 'POST',
          body: batchRequest
        })
        
        results.push(response)
                     } catch (error) {
          // Only retry if it's a network/connection error, not validation errors
          if (this.shouldRetryError(error)) {
            this.addToRetryQueue({ data: batch, attempts: 0, type: 'batch' })
          }
          const errorMessage = error instanceof Error ? error.message : String(error)
          results.push({ success: false, message: 'Failed to send batch', error: errorMessage })
        }
    }
    
    // Return combined results
    const allSuccessful = results.every(r => r.success)
    const totalLogs = results.reduce((sum, r) => sum + (r.logIds?.length || 0), 0)
    
    return {
      success: allSuccessful,
      message: `Processed ${totalLogs} logs in ${batches.length} batches`,
      logIds: results.flatMap(r => r.logIds || [])
    }
  }
  
  /**
   * Send a game event to the server
   */
  public async sendGameEvent(gameEvent: GameEventData): Promise<LogServerResponse> {
    if (!this.config.enabled || !this.isOnline) {
      this.addToRetryQueue({ data: gameEvent, attempts: 0, type: 'gameEvent' })
      return { success: false, message: 'Server logging disabled or offline' }
    }
    
    try {
      const response = await this.makeRequest('/game-event', {
        method: 'POST',
        body: gameEvent
      })
      
      return response
    } catch (error) {
      // Only retry if it's a network/connection error, not validation errors
      if (this.shouldRetryError(error)) {
        this.addToRetryQueue({ data: gameEvent, attempts: 0, type: 'gameEvent' })
      }
      throw error
    }
  }
  
  /**
   * Make HTTP request to the server
   */
  private async makeRequest(endpoint: string, options: { method: string; body: any }): Promise<LogServerResponse> {
    let url: string
    
    // Map endpoints to backend URLs
    switch (endpoint) {
      case '/log':
        url = getLoggingUrl('single')
        break
      case '/batch':
        url = getLoggingUrl('batch')
        break
      case '/game-event':
        url = getLoggingUrl('gameEvent')
        break
      case '/health':
        url = getHealthUrl()
        break
      default:
        url = `${this.config.endpoint}${endpoint}`
    }
    
    // Rate limiting: ensure minimum interval between requests
    await this.enforceRateLimit()
    
    try {
      const response = await this.httpClient.post(url, options.body)
      
      // Convert HttpResponse to LogServerResponse
      const logResponse: LogServerResponse = {
        success: response.ok,
        message: response.statusText,
        logIds: response.data.logIds,
        error: response.ok ? undefined : response.data.error,
        retryAfter: response.data.retryAfter
      }
      
      return logResponse
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    }
  }
  
  /**
   * Enforce rate limiting to prevent request spam
   */
  private async enforceRateLimit(): Promise<void> {
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      const delay = this.minRequestInterval - timeSinceLastRequest
      await this.delay(delay)
    }
    
    this.lastRequestTime = Date.now()
  }
  
  /**
   * Split logs into batches
   */
  private splitIntoBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = []
    
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize))
    }
    
    return batches
  }
  
  /**
   * Add item to retry queue
   */
  private addToRetryQueue(item: { data: any; attempts: number; type: 'log' | 'batch' | 'gameEvent' }): void {
    // Check if item already exists in queue to prevent duplicates
    const existingItem = this.retryQueue.find(existing => 
      existing.type === item.type && 
      JSON.stringify(existing.data) === JSON.stringify(item.data)
    )
    
    if (!existingItem) {
      this.retryQueue.push(item)
      
      // Auto-clean queue if it gets too large
      this.autoCleanRetryQueue()
      
      // Process queue if not already processing
      if (!this.isProcessingQueue) {
        this.processRetryQueue()
      }
    }
  }
  
  /**
   * Process retry queue
   */
  private async processRetryQueue(): Promise<void> {
    if (this.isProcessingQueue || this.retryQueue.length === 0 || !this.isOnline) {
      return
    }
    
    this.isProcessingQueue = true
    
    try {
      while (this.retryQueue.length > 0) {
        const item = this.retryQueue.shift()
        if (!item) continue
        
        // Only retry once (attempts start at 0, so max is 1)
        if (item.attempts >= 1) {
          // Using console.warn directly to avoid circular logging (LogServerClient sends logs to server)
          console.warn(`[LogServerClient] Max retry attempts (1) reached for ${item.type}, dropping item`)
          continue
        }
        
        try {
          let response: LogServerResponse
          
          switch (item.type) {
            case 'log':
              response = await this.sendLog(item.data)
              break
            case 'batch':
              response = await this.sendLogs(item.data)
              break
            case 'gameEvent':
              response = await this.sendGameEvent(item.data)
              break
            default:
              continue
          }
          
          if (response.success) {
            // Successfully sent, don't retry
            continue
          }
          
          // If not successful, increment attempts and add back to queue
          item.attempts++
          this.retryQueue.push(item)
          
          // Wait 3000ms before next retry attempt
          await this.delay(3000)
          
        } catch (error) {
          // Increment attempt count and add back to queue
          item.attempts++
          this.retryQueue.push(item)
          
          // Wait 3000ms before next retry attempt
          await this.delay(3000)
        }
      }
    } finally {
      this.isProcessingQueue = false
    }
  }
  
  /**
   * Delay utility function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  /**
   * Get session ID from storage
   */
  private getSessionId(): string {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('logger_session_id') || 'unknown'
    }
    return 'unknown'
  }
  
  /**
   * Get retry queue status
   */
  public getRetryQueueStatus(): { size: number; isProcessing: boolean; isOnline: boolean } {
    return {
      size: this.retryQueue.length,
      isProcessing: this.isProcessingQueue,
      isOnline: this.isOnline
    }
  }
  
  /**
   * Clear retry queue
   */
  public clearRetryQueue(): void {
    this.retryQueue = []
  }
  
  /**
   * Get retry queue size
   */
  public getRetryQueueSize(): number {
    return this.retryQueue.length
  }
  
  /**
   * Auto-clean retry queue if it gets too large
   */
  private autoCleanRetryQueue(): void {
    const maxQueueSize = 100 // Maximum items in retry queue
    
    if (this.retryQueue.length > maxQueueSize) {
      // Keep only the most recent items
      this.retryQueue = this.retryQueue.slice(-maxQueueSize / 2)
      // Using console.warn directly to avoid circular logging (LogServerClient sends logs to server)
      console.warn(`[LogServerClient] Retry queue exceeded ${maxQueueSize} items, cleaned to ${this.retryQueue.length} items`)
    }
  }
  
  /**
   * Force process retry queue
   */
  public async forceProcessQueue(): Promise<void> {
    await this.processRetryQueue()
  }
  
  /**
   * Test server connectivity
   */
  public async testConnection(): Promise<boolean> {
    if (!this.config.enabled) {
      return false
    }
    
    try {
      const response = await this.makeRequest('/health', { method: 'GET', body: undefined })
      return response.success
    } catch (error) {
      return false
    }
  }
  
  /**
   * Get server status
   */
  public async getServerStatus(): Promise<{ online: boolean; endpoint: string; lastCheck: Date }> {
    const online = await this.testConnection()
    
    return {
      online,
      endpoint: this.config.endpoint,
      lastCheck: new Date()
    }
  }
  
  /**
   * Determine if an error should trigger a retry
   * Only retry network/connection errors, not validation or server errors
   */
  private shouldRetryError(error: any): boolean {
    // Don't retry if it's a validation error (4xx status codes)
    if (error.status && error.status >= 400 && error.status < 500) {
      return false
    }
    
    // Don't retry if it's a server error that's not temporary
    if (error.status && error.status >= 500 && error.status !== 503) {
      return false
    }
    
    // Retry network errors, timeouts, and temporary server errors
    return true
  }
}
