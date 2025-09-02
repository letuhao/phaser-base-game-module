import type { IUnitStrategy } from '../strategies/IUnitStrategy';
import type { IStrategyInput } from '../interfaces/IStrategyInput';
import { Logger } from '../../core/Logger';

/**
 * Strategy Manager
 * Handles strategy registration, selection, and management
 * Follows Single Responsibility Principle - only manages strategies
 */
export interface IStrategyManager {
  // Strategy registration
  registerStrategy(strategy: IUnitStrategy): void;
  unregisterStrategy(unitType: string): boolean;

  // Strategy selection
  getStrategy(input: IStrategyInput): IUnitStrategy | undefined;
  getStrategiesByType(type: string): IUnitStrategy[];
  getBestStrategy(input: IStrategyInput): IUnitStrategy | undefined;

  // Strategy management
  getAllStrategies(): IUnitStrategy[];
  getStrategyCount(): number;
  getStrategyCountByType(type: string): number;
  clearStrategies(): void;

  // Strategy validation
  hasStrategy(unitType: string): boolean;
  validateStrategy(strategy: IUnitStrategy): boolean;
}

/**
 * Strategy Manager Implementation
 * Concrete implementation of strategy management
 */
export class StrategyManager implements IStrategyManager {
  private strategies: Map<string, IUnitStrategy> = new Map();
  private readonly logger: Logger = Logger.getInstance();

  /**
   * Register a new strategy
   */
  public registerStrategy(strategy: IUnitStrategy): void {
    this.logger.debug('StrategyManager', 'registerStrategy', 'Registering strategy', {
      unitType: strategy.unitType,
      priority: strategy.getPriority(),
    });

    try {
      if (this.validateStrategy(strategy)) {
        this.strategies.set(strategy.unitType, strategy);
        this.logger.info(
          'StrategyManager',
          'registerStrategy',
          'Strategy registered successfully',
          {
            unitType: strategy.unitType,
          }
        );
      } else {
        throw new Error(`Invalid strategy for unit type: ${strategy.unitType}`);
      }
    } catch (error) {
      this.logger.error('StrategyManager', 'registerStrategy', 'Failed to register strategy', {
        unitType: strategy.unitType,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * Unregister a strategy by unit type
   */
  public unregisterStrategy(unitType: string): boolean {
    const strategy = this.strategies.get(unitType);
    if (strategy) {
      this.strategies.delete(unitType);
      this.logger.info(
        'StrategyManager',
        'unregisterStrategy',
        'Strategy unregistered successfully',
        {
          unitType,
        }
      );
      return true;
    }

    this.logger.debug(
      'StrategyManager',
      'unregisterStrategy',
      'Strategy not found for unregistration',
      { unitType }
    );
    return false;
  }

  /**
   * Get a strategy that can handle the given input
   */
  public getStrategy(input: IStrategyInput): IUnitStrategy | undefined {
    for (const strategy of Array.from(this.strategies.values())) {
      if (strategy.canHandle(input)) {
        this.logger.debug('StrategyManager', 'getStrategy', 'Found matching strategy', {
          unitType: strategy.unitType,
          priority: strategy.getPriority(),
        });
        return strategy;
      }
    }

    this.logger.debug('StrategyManager', 'getStrategy', 'No matching strategy found', {
      inputType: typeof input,
    });
    return undefined;
  }

  /**
   * Get the best strategy for the given input (highest priority)
   */
  public getBestStrategy(input: IStrategyInput): IUnitStrategy | undefined {
    const matchingStrategies = Array.from(this.strategies.values())
      .filter(strategy => strategy.canHandle(input))
      .sort((a, b) => a.getPriority() - b.getPriority());

    if (matchingStrategies.length > 0) {
      const bestStrategy = matchingStrategies[0];
      this.logger.debug('StrategyManager', 'getBestStrategy', 'Found best strategy', {
        unitType: bestStrategy.unitType,
        priority: bestStrategy.getPriority(),
        totalMatches: matchingStrategies.length,
      });
      return bestStrategy;
    }

    this.logger.debug('StrategyManager', 'getBestStrategy', 'No matching strategies found');
    return undefined;
  }

  /**
   * Get all strategies for a specific type
   */
  public getStrategiesByType(type: string): IUnitStrategy[] {
    return Array.from(this.strategies.values()).filter(s => s.unitType === type);
  }

  /**
   * Get all registered strategies
   */
  public getAllStrategies(): IUnitStrategy[] {
    return Array.from(this.strategies.values());
  }

  /**
   * Get total strategy count
   */
  public getStrategyCount(): number {
    return this.strategies.size;
  }

  /**
   * Get strategy count by type
   */
  public getStrategyCountByType(type: string): number {
    return this.getStrategiesByType(type).length;
  }

  /**
   * Clear all registered strategies
   */
  public clearStrategies(): void {
    const count = this.strategies.size;
    this.strategies.clear();
    this.logger.info('StrategyManager', 'clearStrategies', 'All strategies cleared', { count });
  }

  /**
   * Check if a strategy exists for the given unit type
   */
  public hasStrategy(unitType: string): boolean {
    return this.strategies.has(unitType);
  }

  /**
   * Validate a strategy before registration
   */
  public validateStrategy(strategy: IUnitStrategy): boolean {
    if (!strategy) {
      this.logger.warn('StrategyManager', 'validateStrategy', 'Strategy is null or undefined');
      return false;
    }

    if (!strategy.unitType || typeof strategy.unitType !== 'string') {
      this.logger.warn('StrategyManager', 'validateStrategy', 'Invalid unit type', {
        unitType: strategy.unitType,
      });
      return false;
    }

    if (typeof strategy.calculate !== 'function') {
      this.logger.warn('StrategyManager', 'validateStrategy', 'Missing calculate method');
      return false;
    }

    if (typeof strategy.canHandle !== 'function') {
      this.logger.warn('StrategyManager', 'validateStrategy', 'Missing canHandle method');
      return false;
    }

    if (typeof strategy.getPriority !== 'function') {
      this.logger.warn('StrategyManager', 'validateStrategy', 'Missing getPriority method');
      return false;
    }

    this.logger.debug('StrategyManager', 'validateStrategy', 'Strategy validation passed', {
      unitType: strategy.unitType,
    });
    return true;
  }
}
