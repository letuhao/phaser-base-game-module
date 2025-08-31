import * as Phaser from 'phaser';

/**
 * Factory Input Type Enum
 * Defines the types of inputs that can be processed by game object factories
 */
export enum FactoryInputType {
  /** Container creation input */
  CONTAINER = 'container',

  /** Image creation input */
  IMAGE = 'image',

  /** Text creation input */
  TEXT = 'text',

  /** Button creation input */
  BUTTON = 'button',

  /** Shape creation input */
  SHAPE = 'shape',

  /** Mixed creation input */
  MIXED = 'mixed'
}

/**
 * Base factory input interface
 */
export interface IBaseFactoryInput {
  /** Unique identifier for the factory input */
  readonly id: string;

  /** Type of factory input */
  readonly type: FactoryInputType;

  /** Scene where the game object will be created */
  readonly scene: Phaser.Scene;

  /** Optional parent container */
  readonly parent?: Phaser.GameObjects.Container;

  /** Optional metadata */
  readonly metadata?: Record<string, unknown>;
}

/**
 * Container factory input interface
 */
export interface IContainerFactoryInput extends IBaseFactoryInput {
  readonly type: FactoryInputType.CONTAINER;
  
  /** Container configuration */
  readonly config: {
    /** Container ID */
    id: string;
    
    /** Container name */
    name?: string;
    
    /** X position */
    x?: number;
    
    /** Y position */
    y?: number;
    
    /** Width */
    width?: number | 'fill';
    
    /** Height */
    height?: number | 'fill';
    
    /** Alpha value */
    alpha?: number;
    
    /** Visibility */
    visible?: boolean;
    
    /** Interactive flag */
    interactive?: boolean;
    
    /** Background color */
    backgroundColor?: number;
    
    /** Children game objects */
    children?: Array<{
      type: string;
      config: Record<string, unknown>;
    }>;
  };
}

/**
 * Image factory input interface
 */
export interface IImageFactoryInput extends IBaseFactoryInput {
  readonly type: FactoryInputType.IMAGE;
  
  /** Image configuration */
  readonly config: {
    /** Image ID */
    id: string;
    
    /** Image name */
    name?: string;
    
    /** Texture key */
    textureKey: string;
    
    /** Frame key */
    frameKey?: string | number;
    
    /** X position */
    x?: number;
    
    /** Y position */
    y?: number;
    
    /** Width */
    width?: number | 'fill';
    
    /** Height */
    height?: number | 'fill';
    
    /** Alpha value */
    alpha?: number;
    
    /** Visibility */
    visible?: boolean;
    
    /** Origin X (0-1) */
    originX?: number;
    
    /** Origin Y (0-1) */
    originY?: number;
  };
}

/**
 * Text factory input interface
 */
export interface ITextFactoryInput extends IBaseFactoryInput {
  readonly type: FactoryInputType.TEXT;
  
  /** Text configuration */
  readonly config: {
    /** Text ID */
    id: string;
    
    /** Text name */
    name?: string;
    
    /** Text content */
    text: string;
    
    /** X position */
    x?: number;
    
    /** Y position */
    y?: number;
    
    /** Font family */
    fontFamily?: string;
    
    /** Font size */
    fontSize?: string | number;
    
    /** Font color */
    color?: string;
    
    /** Alpha value */
    alpha?: number;
    
    /** Visibility */
    visible?: boolean;
    
    /** Origin X (0-1) */
    originX?: number;
    
    /** Origin Y (0-1) */
    originY?: number;
  };
}

/**
 * Button factory input interface
 */
export interface IButtonFactoryInput extends IBaseFactoryInput {
  readonly type: FactoryInputType.BUTTON;
  
  /** Button configuration */
  readonly config: {
    /** Button ID */
    id: string;
    
    /** Button name */
    name?: string;
    
    /** Button text */
    text?: string;
    
    /** Button texture */
    textureKey?: string;
    
    /** X position */
    x?: number;
    
    /** Y position */
    y?: number;
    
    /** Width */
    width?: number | 'fill';
    
    /** Height */
    height?: number | 'fill';
    
    /** Alpha value */
    alpha?: number;
    
    /** Visibility */
    visible?: boolean;
    
    /** Click handler */
    onClick?: () => void;
    
    /** Hover handler */
    onHover?: () => void;
  };
}

/**
 * Shape factory input interface
 */
export interface IShapeFactoryInput extends IBaseFactoryInput {
  readonly type: FactoryInputType.SHAPE;
  
  /** Shape configuration */
  readonly config: {
    /** Shape ID */
    id: string;
    
    /** Shape name */
    name?: string;
    
    /** Shape type */
    shapeType: 'rectangle' | 'circle' | 'ellipse' | 'triangle' | 'polygon';
    
    /** X position */
    x?: number;
    
    /** Y position */
    y?: number;
    
    /** Width */
    width?: number | 'fill';
    
    /** Height */
    height?: number | 'fill';
    
    /** Fill color */
    fillColor?: number;
    
    /** Fill alpha */
    fillAlpha?: number;
    
    /** Stroke color */
    strokeColor?: number;
    
    /** Stroke alpha */
    strokeAlpha?: number;
    
    /** Stroke width */
    strokeWidth?: number;
    
    /** Alpha value */
    alpha?: number;
    
    /** Visibility */
    visible?: boolean;
    
    /** Shape-specific properties */
    shapeProperties?: Record<string, unknown>;
  };
}

/**
 * Mixed factory input interface
 */
export interface IMixedFactoryInput extends IBaseFactoryInput {
  readonly type: FactoryInputType.MIXED;
  
  /** Mixed configuration */
  readonly config: {
    /** Mixed ID */
    id: string;
    
    /** Mixed name */
    name?: string;
    
    /** Mixed type */
    mixedType: string;
    
    /** Mixed properties */
    properties: Record<string, unknown>;
    
    /** X position */
    x?: number;
    
    /** Y position */
    y?: number;
    
    /** Alpha value */
    alpha?: number;
    
    /** Visibility */
    visible?: boolean;
  };
}

/**
 * Union type for all factory inputs
 */
export type IFactoryInput = 
  | IContainerFactoryInput
  | IImageFactoryInput
  | ITextFactoryInput
  | IButtonFactoryInput
  | IShapeFactoryInput
  | IMixedFactoryInput;

/**
 * Legacy factory input interface for backward compatibility
 */
export interface ILegacyFactoryInput {
  /** Legacy input */
  readonly input: unknown;
  
  /** Legacy type */
  readonly legacyType: string;
}

/**
 * Factory input validation result
 */
export interface IFactoryInputValidationResult {
  /** Is input valid */
  readonly isValid: boolean;
  
  /** Validation errors */
  readonly errors: string[];
  
  /** Validated factory input */
  readonly validatedInput?: IFactoryInput;
}

/**
 * Type guards for factory inputs
 */
export const isContainerFactoryInput = (input: unknown): input is IContainerFactoryInput => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'type' in input &&
    (input as { type: unknown }).type === FactoryInputType.CONTAINER &&
    'config' in input &&
    typeof (input as { config: unknown }).config === 'object'
  );
};

export const isImageFactoryInput = (input: unknown): input is IImageFactoryInput => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'type' in input &&
    (input as { type: unknown }).type === FactoryInputType.IMAGE &&
    'config' in input &&
    typeof (input as { config: unknown }).config === 'object'
  );
};

export const isTextFactoryInput = (input: unknown): input is ITextFactoryInput => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'type' in input &&
    (input as { type: unknown }).type === FactoryInputType.TEXT &&
    'config' in input &&
    typeof (input as { config: unknown }).config === 'object'
  );
};

export const isButtonFactoryInput = (input: unknown): input is IButtonFactoryInput => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'type' in input &&
    (input as { type: unknown }).type === FactoryInputType.BUTTON &&
    'config' in input &&
    typeof (input as { config: unknown }).config === 'object'
  );
};

export const isShapeFactoryInput = (input: unknown): input is IShapeFactoryInput => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'type' in input &&
    (input as { type: unknown }).type === FactoryInputType.SHAPE &&
    'config' in input &&
    typeof (input as { config: unknown }).config === 'object'
  );
};

export const isMixedFactoryInput = (input: unknown): input is IMixedFactoryInput => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'type' in input &&
    (input as { type: unknown }).type === FactoryInputType.MIXED &&
    'config' in input &&
    typeof (input as { config: unknown }).config === 'object'
  );
};

export const isLegacyFactoryInput = (input: unknown): input is ILegacyFactoryInput => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'legacyType' in input &&
    typeof (input as { legacyType: unknown }).legacyType === 'string'
  );
};

export const isValidFactoryInput = (input: unknown): input is IFactoryInput => {
  return (
    isContainerFactoryInput(input) ||
    isImageFactoryInput(input) ||
    isTextFactoryInput(input) ||
    isButtonFactoryInput(input) ||
    isShapeFactoryInput(input) ||
    isMixedFactoryInput(input)
  );
};

/**
 * Factory functions for creating factory inputs
 */
export const createContainerFactoryInput = (
  id: string,
  scene: Phaser.Scene,
  config: Omit<IContainerFactoryInput['config'], 'id'>,
  parent?: Phaser.GameObjects.Container,
  metadata?: Record<string, unknown>
): IContainerFactoryInput => ({
  id,
  type: FactoryInputType.CONTAINER,
  scene,
  parent,
  metadata,
  config: { id, ...config }
});

export const createImageFactoryInput = (
  id: string,
  scene: Phaser.Scene,
  config: Omit<IImageFactoryInput['config'], 'id'>,
  parent?: Phaser.GameObjects.Container,
  metadata?: Record<string, unknown>
): IImageFactoryInput => ({
  id,
  type: FactoryInputType.IMAGE,
  scene,
  parent,
  metadata,
  config: { id, ...config }
});

export const createTextFactoryInput = (
  id: string,
  scene: Phaser.Scene,
  config: Omit<ITextFactoryInput['config'], 'id'>,
  parent?: Phaser.GameObjects.Container,
  metadata?: Record<string, unknown>
): ITextFactoryInput => ({
  id,
  type: FactoryInputType.TEXT,
  scene,
  parent,
  metadata,
  config: { id, ...config }
});

export const createButtonFactoryInput = (
  id: string,
  scene: Phaser.Scene,
  config: Omit<IButtonFactoryInput['config'], 'id'>,
  parent?: Phaser.GameObjects.Container,
  metadata?: Record<string, unknown>
): IButtonFactoryInput => ({
  id,
  type: FactoryInputType.BUTTON,
  scene,
  parent,
  metadata,
  config: { id, ...config }
});

export const createShapeFactoryInput = (
  id: string,
  scene: Phaser.Scene,
  config: Omit<IShapeFactoryInput['config'], 'id'>,
  parent?: Phaser.GameObjects.Container,
  metadata?: Record<string, unknown>
): IShapeFactoryInput => ({
  id,
  type: FactoryInputType.SHAPE,
  scene,
  parent,
  metadata,
  config: { id, ...config }
});

export const createMixedFactoryInput = (
  id: string,
  scene: Phaser.Scene,
  config: Omit<IMixedFactoryInput['config'], 'id'>,
  parent?: Phaser.GameObjects.Container,
  metadata?: Record<string, unknown>
): IMixedFactoryInput => ({
  id,
  type: FactoryInputType.MIXED,
  scene,
  parent,
  metadata,
  config: { id, ...config }
});

/**
 * Convert legacy input to factory input
 */
export const convertToFactoryInput = (input: unknown): IFactoryInput => {
  // Handle legacy input
  if (isLegacyFactoryInput(input)) {
    // Convert legacy input to appropriate factory input
    const legacyInput = input.input;
    if (typeof legacyInput === 'object' && legacyInput !== null) {
      const legacyObj = legacyInput as Record<string, unknown>;
      
      // Try to determine type from legacy input
      if ('type' in legacyObj && typeof legacyObj.type === 'string') {
        const type = legacyObj.type as string;
        
        if (type === 'container') {
          return createContainerFactoryInput(
            legacyObj.id as string || 'legacy-container',
            legacyObj.scene as Phaser.Scene,
            legacyObj as any,
            legacyObj.parent as Phaser.GameObjects.Container
          );
        }
        
        if (type === 'image') {
          return createImageFactoryInput(
            legacyObj.id as string || 'legacy-image',
            legacyObj.scene as Phaser.Scene,
            legacyObj as any,
            legacyObj.parent as Phaser.GameObjects.Container
          );
        }
        
        if (type === 'text') {
          return createTextFactoryInput(
            legacyObj.id as string || 'legacy-text',
            legacyObj.scene as Phaser.Scene,
            legacyObj as any,
            legacyObj.parent as Phaser.GameObjects.Container
          );
        }
        
        if (type === 'button') {
          return createButtonFactoryInput(
            legacyObj.id as string || 'legacy-button',
            legacyObj.scene as Phaser.Scene,
            legacyObj as any,
            legacyObj.parent as Phaser.GameObjects.Container
          );
        }
        
        if (type === 'shape') {
          return createShapeFactoryInput(
            legacyObj.id as string || 'legacy-shape',
            legacyObj.scene as Phaser.Scene,
            legacyObj as any,
            legacyObj.parent as Phaser.GameObjects.Container
          );
        }
      }
    }
    
    // Default to mixed factory input for unknown legacy types
    return createMixedFactoryInput(
      'legacy-mixed',
      {} as Phaser.Scene, // Will be set by caller
      {
        mixedType: input.legacyType,
        properties: input.input as Record<string, unknown>
      }
    );
  }
  
  // Handle IUnit (if it has a calculate method)
  if (typeof input === 'object' && input !== null && 'calculate' in input) {
    // Convert IUnit to mixed factory input
    return createMixedFactoryInput(
      'unit-mixed',
      {} as Phaser.Scene, // Will be set by caller
      {
        mixedType: 'unit',
        properties: input as Record<string, unknown>
      }
    );
  }
  
  // Handle unknown input - default to mixed factory input
  return createMixedFactoryInput(
    'unknown-mixed',
    {} as Phaser.Scene, // Will be set by caller
    {
      mixedType: 'unknown',
      properties: input as Record<string, unknown>
    }
  );
};
