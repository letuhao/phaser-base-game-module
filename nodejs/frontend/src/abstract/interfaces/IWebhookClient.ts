/**
 * Webhook client interface for sending webhook notifications
 * Follows Interface Segregation Principle (ISP) and Dependency Inversion Principle (DIP)
 */
export interface IWebhookClient {
  /**
   * Send a webhook notification
   */
  sendWebhook<T = any>(webhook: WebhookRequest<T>): Promise<WebhookResponse>;

  /**
   * Send multiple webhooks in batch
   */
  sendWebhooks<T = any>(webhooks: WebhookRequest<T>[]): Promise<WebhookResponse[]>;

  /**
   * Verify webhook signature
   */
  verifySignature(payload: string, signature: string, secret: string): boolean;

  /**
   * Generate webhook signature
   */
  generateSignature(payload: string, secret: string): string;

  /**
   * Set webhook secret for signature verification
   */
  setWebhookSecret(secret: string): void;

  /**
   * Get webhook delivery status
   */
  getDeliveryStatus(webhookId: string): Promise<WebhookDeliveryStatus>;

  /**
   * Retry failed webhook delivery
   */
  retryDelivery(webhookId: string): Promise<WebhookResponse>;

  /**
   * Get webhook delivery history
   */
  getDeliveryHistory(limit?: number, offset?: number): Promise<WebhookDeliveryStatus[]>;

  /**
   * Test webhook endpoint
   */
  testEndpoint(url: string, secret?: string): Promise<boolean>;
}

/**
 * Webhook request structure
 */
export interface WebhookRequest<T = any> {
  id: string;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
  payload: T;
  secret?: string;
  retryCount?: number;
  maxRetries?: number;
  timeout?: number;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
}

/**
 * Webhook response structure
 */
export interface WebhookResponse {
  success: boolean;
  webhookId: string;
  statusCode?: number;
  statusText?: string;
  responseTime?: number;
  error?: string;
  retryAfter?: number;
  deliveredAt?: string;
}

/**
 * Webhook delivery status
 */
export interface WebhookDeliveryStatus {
  webhookId: string;
  status: 'pending' | 'delivered' | 'failed' | 'retrying';
  attempts: number;
  lastAttempt: string;
  nextRetry?: string;
  responseTime?: number;
  error?: string;
  deliveredAt?: string;
}

/**
 * Webhook configuration
 */
export interface WebhookConfig {
  defaultTimeout: number;
  maxRetries: number;
  retryDelay: number;
  batchSize: number;
  enableSignatures: boolean;
  defaultSecret?: string;
  rateLimit?: {
    maxRequests: number;
    timeWindow: number;
  };
}
