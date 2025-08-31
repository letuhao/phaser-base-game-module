import type { IUnitObserver } from './IUnitObserver'
import { Logger } from '../../core/Logger'

/**
 * Logging Observer
 * Integrates directly with the project's existing Logger system
 * Logs unit events for debugging and monitoring purposes
 */
export class LoggingObserver implements IUnitObserver {
  private logLevel: 'debug' | 'info' | 'warn' | 'error'
  private readonly logger: Logger

  constructor(logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info') {
    this.logLevel = logLevel
    this.logger = Logger.getInstance()
  }

  /**
   * Called when a unit value changes
   */
  onUnitValueChanged(unitId: string, oldValue: number, newValue: number): void {
    const event = 'unit_value_changed'
    const data = { unitId, oldValue, newValue, change: newValue - oldValue }
    
    this.log('info', event, data)
  }

  /**
   * Called when a unit is created
   */
  onUnitCreated(unitId: string, unitType: string): void {
    const event = 'unit_created'
    const data = { unitId, unitType }
    
    this.log('info', event, data)
  }

  /**
   * Called when a unit is destroyed
   */
  onUnitDestroyed(unitId: string): void {
    const event = 'unit_destroyed'
    const data = { unitId }
    
    this.log('info', event, data)
  }

  /**
   * Called when unit calculation starts
   */
  onUnitCalculationStarted(unitId: string): void {
    const event = 'unit_calculation_started'
    const data = { unitId, startTime: performance.now() }
    
    this.log('debug', event, data)
  }

  /**
   * Called when unit calculation completes
   */
  onUnitCalculationCompleted(unitId: string, result: number, duration: number): void {
    const event = 'unit_calculation_completed'
    const data = { unitId, result, duration: `${duration.toFixed(2)}ms` }
    
    this.log('info', event, data)
  }

  /**
   * Called when unit calculation fails
   */
  onUnitCalculationFailed(unitId: string, error: Error): void {
    const event = 'unit_calculation_failed'
    const data = { 
      unitId, 
      error: error.message, 
      stack: error.stack,
      timestamp: new Date().toISOString()
    }
    
    this.log('error', event, data)
  }

  /**
   * Log an event using the project's Logger system
   */
  private log(level: string, event: string, data: any): void {
    // Check if we should log this level
    if (!this.shouldLog(level)) {
      return
    }

    const objectName = 'UnitSystem'
    const message = `[${event}] Unit event occurred`
    
    try {
      switch (level) {
        case 'debug':
          this.logger.debug(objectName, message, data, 'LoggingObserver')
          break
        case 'info':
          this.logger.info(objectName, message, data, 'LoggingObserver')
          break
        case 'warn':
          this.logger.warn(objectName, message, data, 'LoggingObserver')
          break
        case 'error':
          this.logger.error(objectName, message, data, 'LoggingObserver')
          break
        default:
          this.logger.info(objectName, message, data, 'LoggingObserver')
      }
    } catch (error) {
      // Fallback to console if Logger fails
      console.error('[LoggingObserver] Failed to log via project logger:', error)
      console.log(`[LoggingObserver] [${level.toUpperCase()}] ${event}`, data)
    }
  }

  /**
   * Check if we should log the specified level
   */
  private shouldLog(level: string): boolean {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 }
    const currentLevel = levels[this.logLevel] || 0
    const messageLevel = levels[level as keyof typeof levels] || 0
    
    return messageLevel >= currentLevel
  }

  /**
   * Set log level
   */
  setLogLevel(level: 'debug' | 'info' | 'warn' | 'error'): void {
    this.logLevel = level
  }
}
