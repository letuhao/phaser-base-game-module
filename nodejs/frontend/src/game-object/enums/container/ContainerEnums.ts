/**
 * Container System Enums
 *
 * Enums for container types, layouts, and container-specific functionality
 */

// ============================================================================
// CONTAINER TYPE ENUMS
// ============================================================================

/**
 * Container types enum
 */
export enum ContainerType {
  DIV = 'div',
  SECTION = 'section',
  ARTICLE = 'article',
  MAIN = 'main',
  ASIDE = 'aside',
  HEADER = 'header',
  FOOTER = 'footer',
  NAV = 'nav',
  CUSTOM = 'custom',
}

/**
 * Container layout types enum
 */
export enum ContainerLayoutType {
  BLOCK = 'block',
  INLINE = 'inline',
  FLEX = 'flex',
  GRID = 'grid',
  ABSOLUTE = 'absolute',
  RELATIVE = 'relative',
  FIXED = 'fixed',
  STICKY = 'sticky',
  CUSTOM = 'custom',
}

/**
 * Container overflow types enum
 */
export enum ContainerOverflowType {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  SCROLL = 'scroll',
  AUTO = 'auto',
  CUSTOM = 'custom',
}

/**
 * Container display types enum
 */
export enum ContainerDisplayType {
  BLOCK = 'block',
  INLINE = 'inline',
  INLINE_BLOCK = 'inline_block',
  FLEX = 'flex',
  GRID = 'grid',
  NONE = 'none',
  CUSTOM = 'custom',
}
