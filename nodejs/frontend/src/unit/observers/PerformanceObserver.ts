import type { IUnitObserver } from './IUnitObserver'
import type { UnitContext } from '../interfaces/IUnit'

/**
 * Performance Observer
 * Monitors unit calculation performance and provides metrics
 */
export class PerformanceObserver implements IUnitObserver {
  private readonly performanceMetrics = {
    totalCalculations: 0,
    totalCalculationTime: 0,
    averageCalculationTime: 0,
    minCalculationTime: Infinity,
    maxCalculationTime: 0,
    calculationTimes: [] as number[],
    errors: 0,
    unitTypeStats: new Map<string, {
      count: number
      totalTime: number
      averageTime: number
      minTime: number
      maxTime: number
    }>()
  }

  private readonly maxHistorySize = 1000

  /**
   * Called when a unit value changes
   */
  onUnitValueChanged(unitId: string, oldValue: number, newValue: number): void {
    // Performance monitoring for value changes
    const changeTime = performance.now()
    
    // Update general metrics
    this.performanceMetrics.totalCalculations++
    
    // Calculate change magnitude for performance analysis
    const changeMagnitude = Math.abs(newValue - oldValue)
    
    // Log significant changes for performance analysis
    if (changeMagnitude > 100) {
      console.debug(`[PerformanceObserver] Large value change detected: ${unitId}`, {
        oldValue,
        newValue,
        changeMagnitude,
        timestamp: new Date().toISOString()
      })
    }
  }

  /**
   * Called when a unit is created
   */
  onUnitCreated(unitId: string, unitType: string): void {
    // Initialize performance tracking for new unit type
    if (!this.performanceMetrics.unitTypeStats.has(unitType)) {
      this.performanceMetrics.unitTypeStats.set(unitType, {
        count: 0,
        totalTime: 0,
        averageTime: 0,
        minTime: Infinity,
        maxTime: 0
      })
    }

    const stats = this.performanceMetrics.unitTypeStats.get(unitType)!
    stats.count++
  }

  /**
   * Called when a unit is destroyed
   */
  onUnitDestroyed(unitId: string): void {
    // Clean up performance data if needed
    // For now, just log the destruction
    console.debug(`[PerformanceObserver] Unit destroyed: ${unitId}`)
  }

  /**
   * Called when unit calculation starts
   */
  onUnitCalculationStarted(unitId: string): void {
    // Mark calculation start time
    const startTime = performance.now()
    
    // Store start time in unit context or use a Map
    // For now, we'll use a simple approach
    if (!this.calculationStartTimes.has(unitId)) {
      this.calculationStartTimes.set(unitId, startTime)
    }
  }

  /**
   * Called when unit calculation completes
   */
  onUnitCalculationCompleted(unitId: string, result: number, duration: number): void {
    // Update performance metrics
    this.updatePerformanceMetrics(duration)
    
    // Clean up start time
    this.calculationStartTimes.delete(unitId)
    
    // Log performance if it's significant
    if (duration > 16) { // Longer than one frame at 60fps
      console.warn(`[PerformanceObserver] Slow calculation detected: ${unitId}`, {
        duration: `${duration.toFixed(2)}ms`,
        result,
        timestamp: new Date().toISOString()
      })
    }
  }

  /**
   * Called when unit calculation fails
   */
  onUnitCalculationFailed(unitId: string, error: Error): void {
    // Update error metrics
    this.performanceMetrics.errors++
    
    // Log the error
    console.error(`[PerformanceObserver] Calculation failed: ${unitId}`, {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics() {
    return {
      ...this.performanceMetrics,
      unitTypeStats: Object.fromEntries(this.performanceMetrics.unitTypeStats)
    }
  }

  /**
   * Get performance metrics for a specific unit type
   */
  getUnitTypePerformance(unitType: string) {
    return this.performanceMetrics.unitTypeStats.get(unitType)
  }

  /**
   * Reset performance metrics
   */
  resetMetrics(): void {
    this.performanceMetrics.totalCalculations = 0
    this.performanceMetrics.totalCalculationTime = 0
    this.performanceMetrics.averageCalculationTime = 0
    this.performanceMetrics.minCalculationTime = Infinity
    this.performanceMetrics.maxCalculationTime = 0
    this.performanceMetrics.calculationTimes = []
    this.performanceMetrics.errors = 0
    this.performanceMetrics.unitTypeStats.clear()
  }

  /**
   * Export performance data for analysis
   */
  exportPerformanceData(): string {
    const data = {
      timestamp: new Date().toISOString(),
      metrics: this.getPerformanceMetrics(),
      summary: this.getPerformanceSummary()
    }
    
    return JSON.stringify(data, null, 2)
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary(): {
    status: 'excellent' | 'good' | 'fair' | 'poor'
    recommendations: string[]
  } {
    const avgTime = this.performanceMetrics.averageCalculationTime
    const errorRate = this.performanceMetrics.errors / Math.max(this.performanceMetrics.totalCalculations, 1)
    
    let status: 'excellent' | 'good' | 'fair' | 'poor' = 'excellent'
    const recommendations: string[] = []

    if (avgTime > 50) {
      status = 'poor'
      recommendations.push('Consider optimizing calculation algorithms')
      recommendations.push('Review unit calculation complexity')
    } else if (avgTime > 16) {
      status = 'fair'
      recommendations.push('Monitor calculation performance')
      recommendations.push('Consider caching frequently used values')
    } else if (avgTime > 5) {
      status = 'good'
      recommendations.push('Performance is acceptable')
    }

    if (errorRate > 0.1) {
      status = 'poor'
      recommendations.push('High error rate detected - review error handling')
    } else if (errorRate > 0.01) {
      recommendations.push('Monitor error rates')
    }

    return { status, recommendations }
  }

  /**
   * Private helper methods
   */
  private calculationStartTimes = new Map<string, number>()

  private updatePerformanceMetrics(duration: number): void {
    // Update general metrics
    this.performanceMetrics.totalCalculationTime += duration
    this.performanceMetrics.averageCalculationTime = 
      this.performanceMetrics.totalCalculationTime / this.performanceMetrics.totalCalculations
    
    // Update min/max
    if (duration < this.performanceMetrics.minCalculationTime) {
      this.performanceMetrics.minCalculationTime = duration
    }
    if (duration > this.performanceMetrics.maxCalculationTime) {
      this.performanceMetrics.maxCalculationTime = duration
    }

    // Store calculation time in history
    this.performanceMetrics.calculationTimes.push(duration)
    
    // Keep history size manageable
    if (this.performanceMetrics.calculationTimes.length > this.maxHistorySize) {
      this.performanceMetrics.calculationTimes.shift()
    }
  }
}
