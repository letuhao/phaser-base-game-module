/**
 * Log Level Enum
 *
 * Defines the available log levels for the unit system.
 * Used to replace string literal types with type-safe enums.
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * Log level priority mapping
 * Lower numbers = higher priority
 */
export const LOG_LEVEL_PRIORITIES = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3,
} as const;

/**
 * Type guard to check if a string is a valid log level
 */
export function isValidLogLevel(level: string): level is LogLevel {
  return Object.values(LogLevel).includes(level as LogLevel);
}

/**
 * Get log level priority
 */
export function getLogLevelPriority(level: LogLevel): number {
  return LOG_LEVEL_PRIORITIES[level];
}

/**
 * Check if a log level should be logged based on current level
 */
export function shouldLogLevel(currentLevel: LogLevel, messageLevel: LogLevel): boolean {
  return getLogLevelPriority(messageLevel) >= getLogLevelPriority(currentLevel);
}
