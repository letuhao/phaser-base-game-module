/**
 * Template Input Type Enum
 * Defines the types of inputs that can be processed by calculation templates
 */
export enum TemplateInputType {
  /** Size calculation input */
  SIZE = 'size',
  
  /** Position calculation input */
  POSITION = 'position',
  
  /** Scale calculation input */
  SCALE = 'scale',
  
  /** Mixed calculation input (size + position + scale) */
  MIXED = 'mixed'
}
