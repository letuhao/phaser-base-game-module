/**
 * Asset System Enums Index
 * 
 * Centralized exports for all asset system enums.
 * Provides a single import point for asset-related enums.
 */

// ============================================================================
// MAIN ASSET ENUMS
// ============================================================================

export {
  // Asset Loader Enums
  LoaderType,
  LoaderState,
  LoadingStrategy,
  LoadingStrategyType,
  
  // Asset Manager Enums
  ManagerOperation,
  
  // Asset Factory Enums
  FactoryOperation,
  LoaderFactoryOperation,
  
  // Asset Strategy Enums
  ValidationStrategyType,
  
  // Asset Scene Enums
  SceneAssetPhase
} from './AssetEnums';

// ============================================================================
// CONVENIENCE RE-EXPORTS
// ============================================================================

// Re-export commonly used enums with shorter names
export {
  LoaderType as Loader,
  LoaderState as State,
  LoadingStrategy as Strategy,
  LoadingStrategyType as StrategyType,
  ManagerOperation as Operation,
  FactoryOperation as FactoryOp,
  LoaderFactoryOperation as LoaderFactoryOp,
  ValidationStrategyType as ValidationType,
  SceneAssetPhase as Phase
} from './AssetEnums';
