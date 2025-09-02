import type { IUnitObserver } from './IUnitObserver';
import { Logger } from '../../core/Logger';
import { LogLevel, shouldLogLevel } from '../enums/LogLevel';

/**
 * Logging Observer
 * Integrates directly with the project's existing Logger system
 * Logs unit events for debugging and monitoring purposes
 */
export class LoggingObserver implements IUnitObserver {
  private logLevel: LogLevel;
  private readonly logger: Logger;

  constructor(logLevel: LogLevel = LogLevel.INFO) {
    this.logLevel = logLevel;
    this.logger = Logger.getInstance();
  }

  /**
   * Called when a unit value changes
   */
  onUnitValueChanged(unitId: string, oldValue: number, newValue: number): void {
    const event = 'unit_value_changed';
    const data = { unitId, oldValue, newValue, change: newValue - oldValue };

    this.log(LogLevel.INFO, event, data);
  }

  /**
   * Called when a unit is created
   */
  onUnitCreated(unitId: string, unitType: string): void {
    const event = 'unit_created';
    const data = { unitId, unitType };

    this.log(LogLevel.INFO, event, data);
  }

  /**
   * Called when a unit is destroyed
   */
  onUnitDestroyed(unitId: string): void {
    const event = 'unit_destroyed';
    const data = { unitId };

    this.log(LogLevel.INFO, event, data);
  }

  /**
   * Called when unit calculation starts
   */
  onUnitCalculationStarted(unitId: string): void {
    const event = 'unit_calculation_started';
    const data = { unitId, startTime: performance.now() };

    this.log(LogLevel.DEBUG, event, data);
  }

  /**
   * Called when unit calculation completes
   */
  onUnitCalculationCompleted(unitId: string, result: number, duration: number): void {
    const event = 'unit_calculation_completed';
    const data = { unitId, result, duration: `${duration.toFixed(2)}ms` };

    this.log(LogLevel.INFO, event, data);
  }

  /**
   * Called when unit calculation fails
   */
  onUnitCalculationFailed(unitId: string, error: Error): void {
    const event = 'unit_calculation_failed';
    const data = {
      unitId,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    };

    this.log(LogLevel.ERROR, event, data);
  }

  /**
   * Log an event using the project's Logger system
   */
  private log(level: LogLevel, event: string, data: Record<string, unknown>): void {
    // Check if we should log this level
    if (!shouldLogLevel(this.logLevel, level)) {
      return;
    }

    const objectName = 'UnitSystem';
    const message = `[${event}] Unit event occurred`;

    try {
      switch (level) {
        case LogLevel.DEBUG:
          this.logger.debug(objectName, 'LoggingObserver', message, data);
          break;
        case LogLevel.INFO:
          this.logger.info(objectName, 'LoggingObserver', message, data);
          break;
        case LogLevel.WARN:
          this.logger.warn(objectName, 'LoggingObserver', message, data);
          break;
        case LogLevel.ERROR:
          this.logger.error(objectName, 'LoggingObserver', message, data);
          break;
        default:
          this.logger.info(objectName, 'LoggingObserver', message, data);
      }
    } catch (error) {
      // Fallback to logger if project logger fails
      try {
        this.logger.error('LoggingObserver', 'log', 'Failed to log via project logger', {
          error: error instanceof Error ? error.message : String(error),
        });
        this.logger.log('LoggingObserver', 'log', `[${level.toUpperCase()}] ${event}`, data);
      } catch (fallbackError) {
        // Silent failure - no console fallback to maintain compliance
        // Logging failure is not critical enough to break the application
      }
    }
  }

  /**
   * Set log level
   */
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }
}
