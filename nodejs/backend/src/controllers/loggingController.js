import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define logs directory path
const logsDir = path.join(__dirname, '../../../logs/frontend')

class LoggingController {
  constructor() {
    this.logBuffer = []
    this.maxBufferSize = 100
    this.flushInterval = 5000 // 5 seconds
    this.isProcessing = false
    this.isInitialized = false
    
    // Initialize logs directory and start periodic flush
    this.initialize()
  }
  
  /**
   * Initialize the controller
   */
  async initialize() {
    try {
      await this.initLogsDirectory()
      this.isInitialized = true
      this.startPeriodicFlush()
      logger.info('LoggingController initialized successfully', { service: 'LoggingController' })
    } catch (error) {
      logger.error('Failed to initialize LoggingController', { service: 'LoggingController', error: error.message, stack: error.stack })
    }
  }
  
  /**
   * Initialize logs directory
   */
  async initLogsDirectory() {
    try {
      logger.info(`Initializing logs directory: ${logsDir}`, { service: 'LoggingController' })
      await fs.mkdir(logsDir, { recursive: true })
      logger.info('Logs directory initialized successfully', { service: 'LoggingController' })
    } catch (error) {
      logger.error('Failed to create logs directory', { service: 'LoggingController', error: error.message, stack: error.stack })
    }
  }

  /**
   * Start periodic flush of log buffer
   */
  startPeriodicFlush() {
    logger.info(`Starting periodic flush every ${this.flushInterval}ms`, { service: 'LoggingController' })
    setInterval(() => {
      logger.debug('Periodic flush triggered', { service: 'LoggingController' })
      this.flushBuffer()
    }, this.flushInterval)
  }

  /**
   * Receive a single log entry from frontend
   */
  async receiveLog(request, reply) {
    if (!this.isInitialized) {
      return reply.code(503).send({
        success: false,
        message: 'LoggingController not yet initialized'
      })
    }
    
    try {
      const logEntry = request.body
      const logId = uuidv4()
      
      // Add metadata
      const enrichedLog = {
        id: logId,
        receivedAt: new Date().toISOString(),
        timestamp: logEntry.timestamp || new Date().toISOString(), // Ensure timestamp exists
        source: 'frontend',
        ip: request.ip,
        userAgent: request.headers['user-agent'],
        ...logEntry
      }

      // Add to buffer
      this.logBuffer.push(enrichedLog)
      logger.debug(`Added log to buffer. Buffer size: ${this.logBuffer.length}`, { service: 'LoggingController' })
      
      // Flush if buffer is full
      if (this.logBuffer.length >= this.maxBufferSize) {
        logger.info('Buffer full, triggering flush', { service: 'LoggingController' })
        await this.flushBuffer()
      }

      // Log to backend logger for monitoring
      logger.info('FrontendLog', `Received log: ${logEntry.message}`, {
        logId,
        objectName: logEntry.objectName,
        level: logEntry.level,
        source: 'frontend'
      })

      return {
        success: true,
        message: 'Log received successfully',
        logId,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      logger.error('Failed to receive log', { service: 'LoggingController', error: error.message, stack: error.stack })
      return reply.code(500).send({
        success: false,
        message: 'Failed to process log',
        error: error.message
      })
    }
  }

  /**
   * Receive batch logs from frontend
   */
  async receiveBatchLogs(request, reply) {
    if (!this.isInitialized) {
      return reply.code(503).send({
        success: false,
        message: 'LoggingController not yet initialized'
      })
    }
    
    try {
      const { logs, sessionId, timestamp, version } = request.body
      
      if (!Array.isArray(logs)) {
        return reply.code(400).send({
          success: false,
          message: 'Logs must be an array'
        })
      }

      const batchId = uuidv4()
      const processedLogs = []

      for (const logEntry of logs) {
        const logId = uuidv4()
        const enrichedLog = {
          id: logId,
          batchId,
          receivedAt: new Date().toISOString(),
          timestamp: logEntry.timestamp || new Date().toISOString(), // Ensure timestamp exists
          source: 'frontend',
          sessionId,
          batchVersion: version,
          ip: request.ip,
          userAgent: request.headers['user-agent'],
          ...logEntry
        }

        this.logBuffer.push(enrichedLog)
        processedLogs.push(logId)
      }

      logger.debug(`Added ${logs.length} logs to buffer. Buffer size: ${this.logBuffer.length}`, { service: 'LoggingController' })

      // Flush if buffer is getting large
      if (this.logBuffer.length >= this.maxBufferSize) {
        logger.info('Buffer full, triggering flush', { service: 'LoggingController' })
        await this.flushBuffer()
      }

      logger.info('FrontendLog', `Received batch of ${logs.length} logs`, {
        batchId,
        sessionId,
        count: logs.length,
        source: 'frontend'
      })

      return {
        success: true,
        message: `Processed ${logs.length} logs successfully`,
        batchId,
        logIds: processedLogs,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      logger.error('Failed to receive batch logs', { service: 'LoggingController', error: error.message, stack: error.stack })
      return reply.code(500).send({
        success: false,
        message: 'Failed to process batch logs',
        error: error.message
      })
    }
  }

  /**
   * Receive game event from frontend
   */
  async receiveGameEvent(request, reply) {
    try {
      const gameEvent = request.body
      const eventId = uuidv4()
      
      const enrichedEvent = {
        id: eventId,
        receivedAt: new Date().toISOString(),
        source: 'frontend',
        ip: request.ip,
        userAgent: request.headers['user-agent'],
        ...gameEvent
      }

      // Write game event to separate file for analysis
      await this.writeGameEvent(enrichedEvent)

      // Log to backend logger
      logger.info('GameEvent', `Received game event: ${gameEvent.eventName}`, {
        eventId,
        playerId: gameEvent.playerId,
        eventName: gameEvent.eventName,
        source: 'frontend'
      })

      return {
        success: true,
        message: 'Game event received successfully',
        eventId,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      logger.error('Failed to receive game event', { service: 'LoggingController', error: error.message, stack: error.stack })
      return reply.code(500).send({
        success: false,
        message: 'Failed to process game event',
        error: error.message
      })
    }
  }

  /**
   * Flush log buffer to files
   */
  async flushBuffer() {
    if (!this.isInitialized) {
      logger.debug('Skipping flush - LoggingController not yet initialized', { service: 'LoggingController' })
      return
    }
    
    if (this.isProcessing || this.logBuffer.length === 0) {
      logger.debug(`Skipping flush - isProcessing: ${this.isProcessing}, bufferSize: ${this.logBuffer.length}`, { service: 'LoggingController' })
      return
    }

    this.isProcessing = true
    let logsToWrite = []

    try {
      logsToWrite = [...this.logBuffer]
      this.logBuffer = []
      
      logger.info(`Starting flush of ${logsToWrite.length} logs`, { service: 'LoggingController' })

      // Group logs by date for file organization
      const logsByDate = this.groupLogsByDate(logsToWrite)
      logger.debug(`Grouped logs by date: ${Object.keys(logsByDate).join(', ')}`, { service: 'LoggingController' })
      
      // Write logs to date-specific files
      for (const [date, logs] of Object.entries(logsByDate)) {
        logger.debug(`Writing ${logs.length} logs for date: ${date}`, { service: 'LoggingController' })
        await this.writeLogsToFile(date, logs)
      }

      logger.info(`Successfully flushed ${logsToWrite.length} logs to files`, { service: 'LoggingController' })
    } catch (error) {
      logger.error('Failed to flush log buffer', { service: 'LoggingController', error: error.message, stack: error.stack })
      
      // Re-add logs to buffer if flush failed
      if (logsToWrite.length > 0) {
        this.logBuffer.unshift(...logsToWrite)
        logger.warn(`Re-added ${logsToWrite.length} logs to buffer after flush failure`, { service: 'LoggingController' })
      }
    } finally {
      this.isProcessing = false
    }
  }

  /**
   * Group logs by date
   */
  groupLogsByDate(logs) {
    const grouped = {}
    
    for (const log of logs) {
      let date
      try {
        // Try to use the log's timestamp, fallback to current date if invalid
        if (log.timestamp && !isNaN(new Date(log.timestamp).getTime())) {
          date = new Date(log.timestamp).toISOString().split('T')[0]
        } else {
          // Use current date as fallback
          date = new Date().toISOString().split('T')[0]
          logger.warn(`Invalid timestamp in log, using current date: ${log.timestamp}`, { 
            service: 'LoggingController', 
            logId: log.id,
            originalTimestamp: log.timestamp 
          })
        }
      } catch (error) {
        // If date parsing completely fails, use current date
        date = new Date().toISOString().split('T')[0]
        logger.warn(`Failed to parse timestamp, using current date`, { 
          service: 'LoggingController', 
          logId: log.id,
          originalTimestamp: log.timestamp,
          error: error.message 
        })
      }
      
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(log)
    }
    
    return grouped
  }

  /**
   * Write logs to date-specific file
   */
  async writeLogsToFile(date, logs) {
    const filename = `frontend-logs-${date}.jsonl`
    const filepath = path.join(logsDir, filename)
    
    logger.debug(`Writing to file: ${filepath}`, { service: 'LoggingController' })
    
    // Create file content in JSONL format (one JSON object per line)
    const content = logs.map(log => JSON.stringify(log)).join('\n') + '\n'
    
    // Append to file
    await fs.appendFile(filepath, content, 'utf8')
    logger.debug(`Successfully wrote ${logs.length} logs to ${filename}`, { service: 'LoggingController' })
  }

  /**
   * Write game event to separate file
   */
  async writeGameEvent(event) {
    const date = new Date().toISOString().split('T')[0]
    const filename = `game-events-${date}.jsonl`
    const filepath = path.join(logsDir, filename)
    
    const content = JSON.stringify(event) + '\n'
    await fs.appendFile(filepath, content, 'utf8')
  }

  /**
   * Get log statistics
   */
  async getLogStats(request, reply) {
    try {
      const stats = {
        bufferSize: this.logBuffer.length,
        isProcessing: this.isProcessing,
        lastFlush: new Date().toISOString(),
        totalLogsProcessed: 0, // This would need to be tracked separately
        fileStats: await this.getFileStats()
      }

      return {
        success: true,
        data: stats
      }
    } catch (error) {
      logger.error('Failed to get log stats', { service: 'LoggingController', error: error.message, stack: error.stack })
      return reply.code(500).send({
        success: false,
        message: 'Failed to get log statistics',
        error: error.message
      })
    }
  }

  /**
   * Get file statistics
   */
  async getFileStats() {
    try {
      const files = await fs.readdir(logsDir)
      const stats = {
        totalFiles: files.length,
        logFiles: files.filter(f => f.startsWith('frontend-logs-')).length,
        gameEventFiles: files.filter(f => f.startsWith('game-events-')).length,
        totalSize: 0
      }

      // Calculate total size
      for (const file of files) {
        const filepath = path.join(logsDir, file)
        const stat = await fs.stat(filepath)
        stats.totalSize += stat.size
      }

      return stats
    } catch (error) {
      logger.error('Failed to get file stats', { service: 'LoggingController', error: error.message, stack: error.stack })
      return { error: 'Failed to get file statistics' }
    }
  }

  /**
   * Manually flush buffer
   */
  async manualFlush(request, reply) {
    if (!this.isInitialized) {
      return reply.code(503).send({
        success: false,
        message: 'LoggingController not yet initialized'
      })
    }
    
    try {
      await this.flushBuffer()
      
      return {
        success: true,
        message: 'Buffer flushed successfully',
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      logger.error('Manual flush failed', { service: 'LoggingController', error: error.message, stack: error.stack })
      return reply.code(500).send({
        success: false,
        message: 'Manual flush failed',
        error: error.message
      })
    }
  }

  /**
   * Clear log buffer
   */
  async clearBuffer(request, reply) {
    if (!this.isInitialized) {
      return reply.code(503).send({
        success: false,
        message: 'LoggingController not yet initialized'
      })
    }
    
    try {
      const clearedCount = this.logBuffer.length
      this.logBuffer = []
      
      logger.info(`Cleared ${clearedCount} logs from buffer`, { service: 'LoggingController' })
      
      return {
        success: true,
        message: `Cleared ${clearedCount} logs from buffer`,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      logger.error('Failed to clear buffer', { service: 'LoggingController', error: error.message, stack: error.stack })
      return reply.code(500).send({
        success: false,
        message: 'Failed to clear buffer',
        error: error.message
      })
    }
  }
  
  /**
   * Get initialization status
   */
  async getStatus(request, reply) {
    try {
      const status = {
        isInitialized: this.isInitialized,
        bufferSize: this.logBuffer.length,
        isProcessing: this.isProcessing,
        logsDirectory: logsDir,
        lastFlush: new Date().toISOString()
      }
      
      return {
        success: true,
        data: status
      }
    } catch (error) {
      logger.error('Failed to get status', { service: 'LoggingController', error: error.message, stack: error.stack })
      return reply.code(500).send({
        success: false,
        message: 'Failed to get status',
        error: error.message
      })
      }
    }
  }

export default new LoggingController()
