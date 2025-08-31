/**
 * HTTP client interface for making HTTP requests
 * Follows Interface Segregation Principle (ISP) and Dependency Inversion Principle (DIP)
 */
export interface IHttpClient {
  /**
   * Make an HTTP request
   */
  request<T = any>(options: HttpRequestOptions): Promise<HttpResponse<T>>;

  /**
   * Make a GET request
   */
  get<T = any>(url: string, options?: Partial<HttpRequestOptions>): Promise<HttpResponse<T>>;

  /**
   * Make a POST request
   */
  post<T = any>(
    url: string,
    data?: any,
    options?: Partial<HttpRequestOptions>
  ): Promise<HttpResponse<T>>;

  /**
   * Make a PUT request
   */
  put<T = any>(
    url: string,
    data?: any,
    options?: Partial<HttpRequestOptions>
  ): Promise<HttpResponse<T>>;

  /**
   * Make a DELETE request
   */
  delete<T = any>(url: string, options?: Partial<HttpRequestOptions>): Promise<HttpResponse<T>>;

  /**
   * Set default headers for all requests
   */
  setDefaultHeaders(headers: Record<string, string>): void;

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void;

  /**
   * Clear authentication token
   */
  clearAuthToken(): void;

  /**
   * Set request timeout
   */
  setTimeout(timeout: number): void;

  /**
   * Test connectivity to a URL
   */
  testConnection(url: string): Promise<boolean>;
}

/**
 * HTTP request options
 */
export interface HttpRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  signal?: AbortSignal;
  credentials?: 'omit' | 'same-origin' | 'include';
}

/**
 * HTTP response structure
 */
export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  ok: boolean;
  url: string;
}

/**
 * HTTP error structure
 */
export interface HttpError extends Error {
  status?: number;
  statusText?: string;
  response?: HttpResponse;
  request?: HttpRequestOptions;
}
