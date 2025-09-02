/**
 * Physics Shape Enums
 * 
 * Enums for physics shapes, collision types, and physics-specific functionality
 */

// ============================================================================
// PHYSICS SHAPE ENUMS
// ============================================================================

/**
 * Physics shape types enum
 */
export enum PhysicsShapeType {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  POLYGON = 'polygon',
  TRAPEZOID = 'trapezoid',
  ELLIPSE = 'ellipse',
  TRIANGLE = 'triangle',
  HEXAGON = 'hexagon',
  STAR = 'star',
  CUSTOM = 'custom',
}

/**
 * Collision shape types enum
 */
export enum CollisionShapeType {
  BOX = 'box',
  SPHERE = 'sphere',
  CAPSULE = 'capsule',
  MESH = 'mesh',
  CONVEX_HULL = 'convex_hull',
  COMPOUND = 'compound',
  CUSTOM = 'custom',
}

/**
 * Physics material types enum
 */
export enum PhysicsMaterialType {
  DEFAULT = 'default',
  RUBBER = 'rubber',
  METAL = 'metal',
  WOOD = 'wood',
  GLASS = 'glass',
  ICE = 'ice',
  CONCRETE = 'concrete',
  STEEL = 'steel',
  PLASTIC = 'plastic',
  FABRIC = 'fabric',
  CUSTOM = 'custom',
}
