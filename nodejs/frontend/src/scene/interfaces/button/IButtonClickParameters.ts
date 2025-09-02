/**
 * Button Click Parameters Interface
 *
 * Defines the structure for button click parameters and configuration data.
 * Provides type-safe access to parameter values and configuration options.
 */

// ============================================================================
// BUTTON CLICK PARAMETERS INTERFACE
// ============================================================================

export interface IButtonClickParameters {
  readonly [key: string]: IButtonClickParameterValue;
}

// ============================================================================
// BUTTON CLICK PARAMETER VALUE INTERFACE
// ============================================================================

export type IButtonClickParameterValue =
  | string
  | number
  | boolean
  | IButtonClickParameterValue[]
  | IButtonClickParameters;

// ============================================================================
// BUTTON CLICK CUSTOM DATA INTERFACE
// ============================================================================

export interface IButtonClickCustomData {
  readonly [key: string]: IButtonClickParameterValue;
}

// ============================================================================
// BUTTON CLICK ACTION RESULT INTERFACE
// ============================================================================

export interface IButtonClickActionResult {
  readonly success: boolean;
  readonly data?: IButtonClickParameterValue;
  readonly error?: string;
  readonly metadata?: IButtonClickCustomData;
}

// ============================================================================
// GAME OBJECT CLICK EVENT INTERFACE
// ============================================================================

export interface IGameObjectClickEvent {
  readonly eventType: string;
  readonly target: IGameObjectClickTarget;
  readonly coordinates: IGameObjectClickCoordinates;
  readonly modifiers: IGameObjectClickModifiers;
  readonly timestamp: Date;
}

// ============================================================================
// GAME OBJECT CLICK TARGET INTERFACE
// ============================================================================

export interface IGameObjectClickTarget {
  readonly gameObjectId: string;
  readonly gameObjectType: string;
  readonly buttonId?: string;
  readonly buttonType?: string;
}

// ============================================================================
// GAME OBJECT CLICK COORDINATES INTERFACE
// ============================================================================

export interface IGameObjectClickCoordinates {
  readonly x: number;
  readonly y: number;
  readonly worldX: number;
  readonly worldY: number;
  readonly localX: number;
  readonly localY: number;
}

// ============================================================================
// GAME OBJECT CLICK MODIFIERS INTERFACE
// ============================================================================

export interface IGameObjectClickModifiers {
  readonly ctrlKey: boolean;
  readonly shiftKey: boolean;
  readonly altKey: boolean;
  readonly metaKey: boolean;
  readonly button: number;
  readonly buttons: number;
}
