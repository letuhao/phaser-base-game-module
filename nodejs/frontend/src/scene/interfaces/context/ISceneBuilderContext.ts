/**
 * Scene Builder Context Interface
 *
 * Defines builder context abstraction for scene building operations.
 */

import type { ISceneContext } from './ISceneContext';
import type { IGameObject } from '../../../game-object/interfaces/IGameObject';
import type { IStyle } from '../../../layout/interfaces/IStyle';
import type { IUnit } from '../../../unit/interfaces/IUnit';

/**
 * Builder context operations
 */
export enum BuilderContextOperation {
  CREATE_GAME_OBJECT = 'create_game_object',
  APPLY_LAYOUT = 'apply_layout',
  APPLY_THEME = 'apply_theme',
  CONVERT_UNIT = 'convert_unit',
  VALIDATE_CONFIG = 'validate_config',
}

/**
 * Builder context configuration
 */
export interface BuilderContextConfig {
  enableCaching: boolean;
  enablePooling: boolean;
  enableValidation: boolean;
  maxConcurrentOperations: number;
  operationTimeout: number;
  metadata?: Record<string, any>;
}

/**
 * Interface for scene builder contexts
 */
export interface ISceneBuilderContext extends ISceneContext {
  /** Builder context configuration */
  builderContextConfig: BuilderContextConfig;

  /** Game object factory */
  gameObjectFactory: IGameObjectFactory;

  /** Layout manager */
  layoutManager: ILayoutManager;

  /** Unit converter */
  unitConverter: IUnitConverter;

  /** Theme manager */
  themeManager: IThemeManager;

  /** Responsive manager */
  responsiveManager: IResponsiveManager;

  /** Set builder context configuration */
  setBuilderContextConfig(config: BuilderContextConfig): this;

  /** Set game object factory */
  setGameObjectFactory(factory: IGameObjectFactory): this;

  /** Set layout manager */
  setLayoutManager(manager: ILayoutManager): this;

  /** Set unit converter */
  setUnitConverter(converter: IUnitConverter): this;

  /** Set theme manager */
  setThemeManager(manager: IThemeManager): this;

  /** Set responsive manager */
  setResponsiveManager(manager: IResponsiveManager): this;

  /** Get builder context configuration */
  getBuilderContextConfig(): BuilderContextConfig;

  /** Get game object factory */
  getGameObjectFactory(): IGameObjectFactory;

  /** Get layout manager */
  getLayoutManager(): ILayoutManager;

  /** Get unit converter */
  getUnitConverter(): IUnitConverter;

  /** Get theme manager */
  getThemeManager(): IThemeManager;

  /** Get responsive manager */
  getResponsiveManager(): IResponsiveManager;

  /** Create game object */
  createGameObject(gameObjectType: string, config: any): Promise<IGameObject | null>;

  /** Apply layout */
  applyLayout(gameObject: IGameObject, layout: IStyle): Promise<boolean>;

  /** Apply theme */
  applyTheme(gameObject: IGameObject, themeClass: string): Promise<boolean>;

  /** Convert unit value */
  convertUnitValue(unitValue: IUnit, context: any): number;

  /** Validate configuration */
  validateConfiguration(config: any): boolean;
}

/**
 * Game Object Factory Interface
 */
export interface IGameObjectFactory {
  createGameObject(type: string, config: any): Promise<IGameObject | null>;
  registerGameObjectType(type: string, creator: any): void;
  unregisterGameObjectType(type: string): void;
  getSupportedTypes(): string[];
}

/**
 * Layout Manager Interface
 */
export interface ILayoutManager {
  applyLayout(gameObject: IGameObject, layout: IStyle): Promise<boolean>;
  getLayoutProperties(gameObject: IGameObject): IStyle | null;
  updateLayout(gameObject: IGameObject, updates: Partial<IStyle>): Promise<boolean>;
}

/**
 * Unit Converter Interface
 */
export interface IUnitConverter {
  convertUnit(unitValue: IUnit, context: any): number;
  convertToUnit(value: number, unit: string, context: any): IUnit;
  getSupportedUnits(): string[];
}

/**
 * Theme Manager Interface
 */
export interface IThemeManager {
  applyTheme(gameObject: IGameObject, themeClass: string): Promise<boolean>;
  getThemeProperties(themeClass: string): any;
  registerTheme(themeClass: string, properties: any): void;
  unregisterTheme(themeClass: string): void;
}

/**
 * Responsive Manager Interface
 */
export interface IResponsiveManager {
  getCurrentBreakpoint(): string;
  applyResponsiveConfig(gameObject: IGameObject, breakpoint: string): Promise<boolean>;
  registerBreakpoint(breakpoint: string, config: any): void;
  unregisterBreakpoint(breakpoint: string): void;
}
