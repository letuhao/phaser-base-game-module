// Core Logger System
export { Logger, logger } from './Logger';
export { ErrorTracker } from './ErrorTracker';
export { LogServerClient } from './LogServerClient';
export { HttpClient } from './HttpClient';

// Interfaces
export * from '../abstract/interfaces/IConfiguration';
export * from '../abstract/interfaces/IHttpClient';
export * from '../abstract/interfaces/IWebhookClient';

// Types and Interfaces
export * from '../types';

// Configuration
export * from '../config/LoggerConfig';

// Convenience Functions
export {
  logError,
  logWarn,
  logInfo,
  logDebug,
  logTrace,
  log,
  logPerformance,
  logGameEvent,
} from './Logger';

// Re-export all core functionality as a namespace for convenience
export * as Core from './';
