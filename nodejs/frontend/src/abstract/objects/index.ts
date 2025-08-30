// Object interfaces for game objects
export type { IBound, IBounds, IBoundAlignment, IBoundConstraints } from './IBound'
export type { IScalable, IScale, IScaleConstraints, IScaleAnimation } from './IScalable'
export type { IContainer } from './IContainer'
export type { ILayoutable } from './ILayoutable'

// Re-export all object interfaces as a namespace for convenience
export * as Objects from './'
