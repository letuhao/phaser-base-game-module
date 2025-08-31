// Configuration interfaces - Level 1 (Extended from Level 0 IConfiguration)
export type { IThemeConfig } from './IThemeConfig'
export type { IPositionConfig } from './IPositionConfig'
export type { IAssetsConfig } from './IAssetsConfig'
export type { ISceneConfig } from './ISceneConfig'
export type { IGameLogicConfig } from './IGameLogicConfig'

// Configuration interfaces - Level 2 (Extended from Level 1 IPositionConfig)
export type { ILayoutConfig } from './ILayoutConfig'

// Configuration interfaces - Level 3 (Extended from Level 2 ILayoutConfig)
export type { IResponsiveConfig } from './IResponsiveConfig'

// Configuration interfaces - Level 4 (HTML-like Scene Structure)
export type { ISceneLoaderConfig } from './ISceneLoaderConfig'

// Style and styling configuration interfaces
export type { IStyleProperties } from './IStyleProperties'
export type { IStyle } from './IStyle'

// Re-export all configurations as a namespace for convenience
export * as Configs from './'
