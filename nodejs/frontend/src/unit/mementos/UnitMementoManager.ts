import type { IUnitMementoCaretaker, IUnitMemento } from './IUnitMemento'
import { UnitMementoCaretaker } from './UnitMementoCaretaker'
import { UnitCalculationMemento } from './UnitCalculationMemento'
import type { UnitContext } from '../interfaces/IUnit'
import type { IUnitCalculationTemplate } from '../templates/IUnitCalculationTemplate'

/**
 * Unit Memento Manager
 * Integrates memento system with unit calculations
 * Provides automatic state saving and intelligent restoration
 */
export class UnitMementoManager {
  private readonly caretaker: IUnitMementoCaretaker
  private readonly autoSaveEnabled: boolean = true
  private readonly autoSaveThreshold: number = 100 // ms
  private readonly significantChangeThresholds = {
    timeThreshold: 50, // ms
    resultThreshold: 0.01 // 1% change
  }

  constructor() {
    this.caretaker = new UnitMementoCaretaker()
  }

  /**
   * Enable or disable automatic memento saving
   */
  setAutoSaveEnabled(enabled: boolean): void {
    this.autoSaveEnabled = enabled
    console.debug(`[UnitMementoManager] Auto-save ${enabled ? 'enabled' : 'disabled'}`)
  }

  /**
   * Set the auto-save threshold (minimum time between saves)
   */
  setAutoSaveThreshold(threshold: number): void {
    this.autoSaveThreshold = Math.max(0, threshold)
    console.debug(`[UnitMementoManager] Auto-save threshold set to ${threshold}ms`)
  }

  /**
   * Set thresholds for significant change detection
   */
  setSignificantChangeThresholds(thresholds: {
    timeThreshold: number
    resultThreshold: number
  }): void {
    this.significantChangeThresholds.timeThreshold = Math.max(0, thresholds.timeThreshold)
    this.significantChangeThresholds.resultThreshold = Math.max(0, thresholds.resultThreshold)
    console.debug(`[UnitMementoManager] Significant change thresholds updated:`, thresholds)
  }

  /**
   * Save calculation state automatically
   */
  autoSaveCalculation(
    template: IUnitCalculationTemplate,
    input: any,
    context: UnitContext,
    result: number,
    performanceMetrics: {
      totalTime: number
      stepTimes: Record<string, number>
      memoryUsage: number
    },
    success: boolean = true,
    errorMessage?: string
  ): void {
    if (!this.autoSaveEnabled) return

    const unitId = this.generateUnitId(template, context)
    const latestMemento = this.caretaker.getLatestMemento(unitId)

    // Check if we should save based on threshold
    if (latestMemento && latestMemento instanceof UnitCalculationMemento) {
      const timeSinceLastSave = Date.now() - latestMemento.getTimestamp().getTime()
      if (timeSinceLastSave < this.autoSaveThreshold) return

      // Check if change is significant enough to save
      if (!this.isSignificantChange(latestMemento, result, performanceMetrics.totalTime)) {
        return
      }
    }

    this.saveCalculationMemento(
      template,
      input,
      context,
      result,
      performanceMetrics,
      success,
      errorMessage
    )
  }

  /**
   * Save calculation memento manually
   */
  saveCalculationMemento(
    template: IUnitCalculationTemplate,
    input: any,
    context: UnitContext,
    result: number,
    performanceMetrics: {
      totalTime: number
      stepTimes: Record<string, number>
      memoryUsage: number
    },
    success: boolean = true,
    errorMessage?: string
  ): void {
    const unitId = this.generateUnitId(template, context)
    const unitType = this.getUnitType(template)
    const templateName = template.constructor.name
    const strategyName = this.getStrategyName(template)
    const validatorsUsed = this.getValidatorsUsed(template)

    let memento: UnitCalculationMemento

    if (success) {
      memento = UnitCalculationMemento.createFromSuccessfulCalculation(
        input,
        context,
        result,
        unitId,
        unitType,
        templateName,
        strategyName,
        validatorsUsed,
        performanceMetrics
      )
    } else {
      memento = UnitCalculationMemento.createFromFailedCalculation(
        input,
        context,
        unitId,
        unitType,
        templateName,
        strategyName,
        validatorsUsed,
        errorMessage || 'Unknown error',
        performanceMetrics
      )
    }

    this.caretaker.saveMemento(memento)
    console.debug(`[UnitMementoManager] Saved calculation memento for unit ${unitId}`)
  }

  /**
   * Restore unit to a specific calculation state
   */
  restoreToCalculation(
    template: IUnitCalculationTemplate,
    context: UnitContext,
    targetMemento: IUnitMemento
  ): boolean {
    if (!(targetMemento instanceof UnitCalculationMemento)) {
      console.error('[UnitMementoManager] Cannot restore: memento is not a calculation memento')
      return false
    }

    const unitId = this.generateUnitId(template, context)
    return this.caretaker.restoreToMemento(unitId, targetMemento)
  }

  /**
   * Undo last calculation for a unit
   */
  undoCalculation(template: IUnitCalculationTemplate, context: UnitContext): IUnitMemento | undefined {
    const unitId = this.generateUnitId(template, context)
    return this.caretaker.undo(unitId)
  }

  /**
   * Redo last undone calculation for a unit
   */
  redoCalculation(template: IUnitCalculationTemplate, context: UnitContext): IUnitMemento | undefined {
    const unitId = this.generateUnitId(template, context)
    return this.caretaker.redo(unitId)
  }

  /**
   * Check if undo is available for a unit
   */
  canUndoCalculation(template: IUnitCalculationTemplate, context: UnitContext): boolean {
    const unitId = this.generateUnitId(template, context)
    return this.caretaker.canUndo(unitId)
  }

  /**
   * Check if redo is available for a unit
   */
  canRedoCalculation(template: IUnitCalculationTemplate, context: UnitContext): boolean {
    const unitId = this.generateUnitId(template, context)
    return this.caretaker.canRedo(unitId)
  }

  /**
   * Get calculation history for a unit
   */
  getCalculationHistory(template: IUnitCalculationTemplate, context: UnitContext): {
    undo: IUnitMemento[]
    redo: IUnitMemento[]
  } {
    const unitId = this.generateUnitId(template, context)
    return this.caretaker.getHistory(unitId)
  }

  /**
   * Get all calculation mementos for a unit
   */
  getCalculationMementos(template: IUnitCalculationTemplate, context: UnitContext): IUnitMemento[] {
    const unitId = this.generateUnitId(template, context)
    return this.caretaker.getMementosForUnit(unitId)
  }

  /**
   * Get the latest calculation memento for a unit
   */
  getLatestCalculationMemento(template: IUnitCalculationTemplate, context: UnitContext): IUnitMemento | undefined {
    const unitId = this.generateUnitId(template, context)
    return this.caretaker.getLatestMemento(unitId)
  }

  /**
   * Analyze calculation performance for a unit
   */
  analyzeCalculationPerformance(template: IUnitCalculationTemplate, context: UnitContext): {
    totalCalculations: number
    successRate: number
    averageTime: number
    averageEfficiency: number
    bestPerformance: number
    worstPerformance: number
    trends: {
      timeTrend: 'improving' | 'declining' | 'stable'
      efficiencyTrend: 'improving' | 'declining' | 'stable'
    }
  } {
    const mementos = this.getCalculationMementos(template, context)
    const calculationMementos = mementos.filter(m => m instanceof UnitCalculationMemento) as UnitCalculationMemento[]

    if (calculationMementos.length === 0) {
      return {
        totalCalculations: 0,
        successRate: 0,
        averageTime: 0,
        averageEfficiency: 0,
        bestPerformance: 0,
        worstPerformance: 0,
        trends: { timeTrend: 'stable', efficiencyTrend: 'stable' }
      }
    }

    const successfulCalculations = calculationMementos.filter(m => m.wasSuccessful())
    const successRate = (successfulCalculations.length / calculationMementos.length) * 100

    const times = calculationMementos.map(m => m.getPerformanceMetrics().totalTime)
    const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length
    const bestPerformance = Math.min(...times)
    const worstPerformance = Math.max(...times)

    const efficiencies = calculationMementos.map(m => m.getEfficiencyScore())
    const averageEfficiency = efficiencies.reduce((sum, eff) => sum + eff, 0) / efficiencies.length

    // Analyze trends (simple linear regression)
    const trends = this.analyzeTrends(calculationMementos)

    return {
      totalCalculations: calculationMementos.length,
      successRate,
      averageTime,
      averageEfficiency,
      bestPerformance,
      worstPerformance,
      trends
    }
  }

  /**
   * Export calculation data for external analysis
   */
  exportCalculationData(template: IUnitCalculationTemplate, context: UnitContext): string {
    const mementos = this.getCalculationMementos(template, context)
    const calculationMementos = mementos.filter(m => m instanceof UnitCalculationMemento) as UnitCalculationMemento[]

    const exportData = {
      exportDate: new Date().toISOString(),
      unitId: this.generateUnitId(template, context),
      templateName: template.constructor.name,
      totalCalculations: calculationMementos.length,
      calculations: calculationMementos.map(m => ({
        timestamp: m.getTimestamp().toISOString(),
        input: m.getCalculationInput(),
        result: m.getCalculationResult(),
        success: m.wasSuccessful(),
        errorMessage: m.getErrorMessage(),
        performance: m.getPerformanceMetrics(),
        efficiency: m.getEfficiencyScore()
      }))
    }

    return JSON.stringify(exportData, null, 2)
  }

  /**
   * Get memento statistics
   */
  getMementoStats() {
    return this.caretaker.getMementoStats()
  }

  /**
   * Clear all mementos for a unit
   */
  clearUnitMementos(template: IUnitCalculationTemplate, context: UnitContext): void {
    const unitId = this.generateUnitId(template, context)
    this.caretaker.clearMementosForUnit(unitId)
  }

  /**
   * Generate a unique unit ID based on template and context
   */
  private generateUnitId(template: IUnitCalculationTemplate, context: UnitContext): string {
    const templateName = template.constructor.name
    const contextHash = this.hashContext(context)
    return `${templateName}-${contextHash}`
  }

  /**
   * Get the unit type from the template
   */
  private getUnitType(template: IUnitCalculationTemplate): string {
    // Extract unit type from template name
    const templateName = template.constructor.name
    if (templateName.includes('Size')) return 'size'
    if (templateName.includes('Position')) return 'position'
    if (templateName.includes('Scale')) return 'scale'
    return 'unknown'
  }

  /**
   * Get the strategy name from the template
   */
  private getStrategyName(template: IUnitCalculationTemplate): string {
    // This would need to be implemented based on the actual template structure
    // For now, return a placeholder
    return 'DefaultStrategy'
  }

  /**
   * Get the validators used by the template
   */
  private getValidatorsUsed(template: IUnitCalculationTemplate): string[] {
    // This would need to be implemented based on the actual template structure
    // For now, return a placeholder
    return ['DefaultValidator']
  }

  /**
   * Check if a change is significant enough to save
   */
  private isSignificantChange(
    lastMemento: UnitCalculationMemento,
    newResult: number,
    newTime: number
  ): boolean {
    const comparison = lastMemento.compareWith({
      getCalculationResult: () => newResult,
      getPerformanceMetrics: () => ({ totalTime: newTime, stepTimes: {}, memoryUsage: 0 }),
      getCalculationInput: () => ({}),
      getCalculationContext: () => ({}),
      getCalculationMetadata: () => ({}),
      wasSuccessful: () => true,
      getErrorMessage: () => undefined,
      getTemplateName: () => '',
      getStrategyName: () => '',
      getValidatorsUsed: () => [],
      getCalculationSummary: () => ({}),
      compareWith: () => ({}),
      isSignificantChange: () => false,
      getEfficiencyScore: () => 0,
      exportForAnalysis: () => '',
      getState: () => ({}),
      getTimestamp: () => new Date(),
      getUnitId: () => '',
      getVersion: () => '',
      getMetadata: () => ({}),
      validate: () => true,
      getSize: () => 0
    } as UnitCalculationMemento)

    return Math.abs(comparison.timeDifference) > this.significantChangeThresholds.timeThreshold ||
           Math.abs(comparison.resultDifference) > this.significantChangeThresholds.resultThreshold
  }

  /**
   * Analyze trends in calculation performance
   */
  private analyzeTrends(mementos: UnitCalculationMemento[]): {
    timeTrend: 'improving' | 'declining' | 'stable'
    efficiencyTrend: 'improving' | 'declining' | 'stable'
  } {
    if (mementos.length < 3) {
      return { timeTrend: 'stable', efficiencyTrend: 'stable' }
    }

    // Sort by timestamp
    const sortedMementos = [...mementos].sort((a, b) => 
      a.getTimestamp().getTime() - b.getTimestamp().getTime()
    )

    // Simple trend analysis: compare first third vs last third
    const firstThird = Math.floor(sortedMementos.length / 3)
    const lastThird = sortedMementos.length - firstThird

    const earlyTimes = sortedMementos.slice(0, firstThird).map(m => m.getPerformanceMetrics().totalTime)
    const lateTimes = sortedMementos.slice(lastThird).map(m => m.getPerformanceMetrics().totalTime)

    const earlyEfficiencies = sortedMementos.slice(0, firstThird).map(m => m.getEfficiencyScore())
    const lateEfficiencies = sortedMementos.slice(lastThird).map(m => m.getEfficiencyScore())

    const avgEarlyTime = earlyTimes.reduce((sum, time) => sum + time, 0) / earlyTimes.length
    const avgLateTime = lateTimes.reduce((sum, time) => sum + time, 0) / lateTimes.length

    const avgEarlyEfficiency = earlyEfficiencies.reduce((sum, eff) => sum + eff, 0) / earlyEfficiencies.length
    const avgLateEfficiency = lateEfficiencies.reduce((sum, eff) => sum + eff, 0) / lateEfficiencies.length

    const timeThreshold = 0.1 // 10% change
    const efficiencyThreshold = 5 // 5 points change

    const timeTrend: 'improving' | 'declining' | 'stable' = 
      (avgLateTime - avgEarlyTime) / avgEarlyTime < -timeThreshold ? 'improving' :
      (avgLateTime - avgEarlyTime) / avgEarlyTime > timeThreshold ? 'declining' : 'stable'

    const efficiencyTrend: 'improving' | 'declining' | 'stable' = 
      avgLateEfficiency - avgEarlyEfficiency > efficiencyThreshold ? 'improving' :
      avgEarlyEfficiency - avgLateEfficiency > efficiencyThreshold ? 'declining' : 'stable'

    return { timeTrend, efficiencyTrend }
  }

  /**
   * Hash context to create a unique identifier
   */
  private hashContext(context: UnitContext): string {
    // Simple hash function for context
    const contextString = JSON.stringify(context)
    let hash = 0
    for (let i = 0; i < contextString.length; i++) {
      const char = contextString.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16)
  }
}
