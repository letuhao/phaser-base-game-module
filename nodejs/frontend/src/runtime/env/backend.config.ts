/**
 * Backend Configuration for Frontend
 * Defines connection settings and endpoints for the Node.js backend
 */

export interface BackendConfig {
  /** Backend server base URL */
  baseUrl: string;

  /** API version */
  apiVersion: string;

  /** Connection timeout in milliseconds */
  timeout: number;

  /** Retry attempts for failed requests */
  retryAttempts: number;

  /** Retry delay between attempts in milliseconds */
  retryDelay: number;

  /** Logging endpoint configuration */
  logging: {
    /** Single log endpoint */
    single: string;

    /** Batch logs endpoint */
    batch: string;

    /** Log statistics endpoint */
    stats: string;

    /** Game event endpoint */
    gameEvent: string;
  };

  /** Game endpoints */
  games: {
    /** Game state endpoint */
    state: string;

    /** Game action endpoint */
    action: string;

    /** Game result endpoint */
    result: string;
  };

  /** Health check endpoint */
  health: string;

  /** Authentication settings */
  auth: {
    /** API key header name */
    apiKeyHeader: string;

    /** Session token header name */
    sessionHeader: string;

    /** Whether authentication is required */
    required: boolean;
  };

  /** Rate limiting settings */
  rateLimit: {
    /** Maximum requests per minute */
    maxRequestsPerMinute: number;

    /** Rate limit window in milliseconds */
    windowMs: number;
  };
}

/**
 * Development environment backend configuration
 */
export const DEV_BACKEND_CONFIG: BackendConfig = {
  baseUrl: 'http://localhost:3001', // Backend is running on port 3001
  apiVersion: 'v1',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
  logging: {
    single: '/api/logs/log',
    batch: '/api/logs/batch',
    stats: '/api/logs/stats',
    gameEvent: '/api/logs/game-event',
  },
  games: {
    state: '/api/games/state',
    action: '/api/games/action',
    result: '/api/games/result',
  },
  health: '/api/health',
  auth: {
    apiKeyHeader: 'X-API-Key',
    sessionHeader: 'X-Session-Token',
    required: false,
  },
  rateLimit: {
    maxRequestsPerMinute: 1000,
    windowMs: 60000,
  },
};

/**
 * Production environment backend configuration
 */
export const PROD_BACKEND_CONFIG: BackendConfig = {
  baseUrl: 'https://your-production-domain.com',
  apiVersion: 'v1',
  timeout: 15000,
  retryAttempts: 5,
  retryDelay: 2000,
  logging: {
    single: '/api/logs/log',
    batch: '/api/logs/batch',
    stats: '/api/logs/stats',
    gameEvent: '/api/logs/game-event',
  },
  games: {
    state: '/api/games/state',
    action: '/api/games/action',
    result: '/api/games/result',
  },
  health: '/api/health',
  auth: {
    apiKeyHeader: 'X-API-Key',
    sessionHeader: 'X-Session-Token',
    required: true,
  },
  rateLimit: {
    maxRequestsPerMinute: 500,
    windowMs: 60000,
  },
};

/**
 * Get backend configuration based on current environment
 */
export function getBackendConfig(): BackendConfig {
  // For now, always use development config in Node.js environment
  // In browser environment, this would use import.meta.env.DEV
  const isDevelopment =
    typeof process !== 'undefined' ? process.env.NODE_ENV === 'development' : true;
  return isDevelopment ? DEV_BACKEND_CONFIG : PROD_BACKEND_CONFIG;
}

/**
 * Get full URL for a specific endpoint
 */
export function getBackendUrl(endpoint: string): string {
  const config = getBackendConfig();
  return `${config.baseUrl}${endpoint}`;
}

/**
 * Get logging endpoint URL
 */
export function getLoggingUrl(type: 'single' | 'batch' | 'stats' | 'gameEvent'): string {
  const config = getBackendConfig();
  return `${config.baseUrl}${config.logging[type]}`;
}

/**
 * Get game endpoint URL
 */
export function getGameUrl(type: 'state' | 'action' | 'result'): string {
  const config = getBackendConfig();
  return `${config.baseUrl}${config.games[type]}`;
}

/**
 * Get health check URL
 */
export function getHealthUrl(): string {
  const config = getBackendConfig();
  return `${config.baseUrl}${config.health}`;
}

// Export default configuration
export default getBackendConfig();
