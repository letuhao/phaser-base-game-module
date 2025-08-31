import { IHttpClient, HttpRequestOptions, HttpResponse, HttpError } from '../abstract/interfaces/IHttpClient'

/**
 * Concrete HTTP client implementation using fetch API
 * Follows SOLID principles and implements IHttpClient interface
 */
export class HttpClient implements IHttpClient {
  private defaultHeaders: Record<string, string> = {}
  private authToken?: string
  private requestTimeout: number = 5000
  
  constructor(config?: { defaultTimeout?: number; defaultHeaders?: Record<string, string> }) {
    if (config?.defaultTimeout) {
      this.requestTimeout = config.defaultTimeout
    }
    if (config?.defaultHeaders) {
      this.defaultHeaders = { ...this.defaultHeaders, ...config.defaultHeaders }
    }
  }
  
  public async request<T = any>(options: HttpRequestOptions): Promise<HttpResponse<T>> {
    const { url, method, headers = {}, body, timeout = this.requestTimeout, signal, credentials } = options
    
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...this.defaultHeaders,
        ...(this.authToken && { 'Authorization': `Bearer ${this.authToken}` }),
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: signal || AbortSignal.timeout(timeout),
      credentials: credentials || 'same-origin'
    }
    
    try {
      const response = await fetch(url, requestOptions)
      
      let responseData: T
      try {
        responseData = await response.json()
      } catch {
        responseData = {} as T
      }
      
      const httpResponse: HttpResponse<T> = {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: this.extractHeaders(response.headers),
        ok: response.ok,
        url: response.url
      }
      
      if (!response.ok) {
        const error: HttpError = new Error(`HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        error.statusText = response.statusText
        error.response = httpResponse
        error.request = options
        throw error
      }
      
      return httpResponse
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError: HttpError = new Error('Request timeout')
        timeoutError.request = options
        throw timeoutError
      }
      throw error
    }
  }
  
  public async get<T = any>(url: string, options?: Partial<HttpRequestOptions>): Promise<HttpResponse<T>> {
    return this.request<T>({ url, method: 'GET', ...options })
  }
  
  public async post<T = any>(url: string, data?: any, options?: Partial<HttpRequestOptions>): Promise<HttpResponse<T>> {
    return this.request<T>({ url, method: 'POST', body: data, ...options })
  }
  
  public async put<T = any>(url: string, data?: any, options?: Partial<HttpRequestOptions>): Promise<HttpResponse<T>> {
    return this.request<T>({ url, method: 'PUT', body: data, ...options })
  }
  
  public async delete<T = any>(url: string, options?: Partial<HttpRequestOptions>): Promise<HttpResponse<T>> {
    return this.request<T>({ url, method: 'DELETE', ...options })
  }
  
  public setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers }
  }
  
  public setAuthToken(token: string): void {
    this.authToken = token
  }
  
  public clearAuthToken(): void {
    this.authToken = undefined
  }
  
  public setTimeout(timeout: number): void {
    this.requestTimeout = timeout
  }
  
  public async testConnection(url: string): Promise<boolean> {
    try {
      const response = await this.get(url)
      return response.ok
    } catch {
      return false
    }
  }

  private extractHeaders(headers: Headers): Record<string, string> {
    const extractedHeaders: Record<string, string> = {}
    headers.forEach((value, key) => {
      extractedHeaders[key] = value
    })
    return extractedHeaders
  }
}
