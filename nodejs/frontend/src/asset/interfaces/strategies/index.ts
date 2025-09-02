/**
 * Asset Strategy Interfaces Index
 * 
 * Centralized export for all asset strategy interfaces
 */

export type { ILoadingStrategy } from './ILoadingStrategy';
export type { ICachingStrategy } from './ICachingStrategy';
export type { IValidationStrategy } from './IValidationStrategy';

export { LoadingStrategyType } from '../../enums';
export { CachingStrategyType } from './ICachingStrategy';
export { ValidationStrategyType } from '../../enums';

/**
 * Asset strategy interfaces bundle
 */
export const ASSET_STRATEGY_INTERFACES = {
  ILoadingStrategy: 'ILoadingStrategy',
  ICachingStrategy: 'ICachingStrategy',
  IValidationStrategy: 'IValidationStrategy',
} as const;

export type AssetStrategyInterface = typeof ASSET_STRATEGY_INTERFACES[keyof typeof ASSET_STRATEGY_INTERFACES];
