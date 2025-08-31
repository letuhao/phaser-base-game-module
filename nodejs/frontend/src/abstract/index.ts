// Abstract Interfaces - Level 0 (Base interfaces)
export * from './interfaces/IConfiguration';
export * from './interfaces/IHttpClient';
export * from './interfaces/IWebhookClient';

// Abstract Configuration Interfaces - Level 1 (Extended interfaces)
export * from './configs/IThemeConfig';
export * from './configs/IPositionConfig';
export * from './configs/IAssetsConfig';
export * from './configs/ISceneConfig';
export * from './configs/IGameLogicConfig';

// Abstract Base Interfaces - Level 1 (Game object interfaces)
export * from './base/IGameObject';

// Re-export all abstract functionality as a namespace for convenience
export * as Abstract from './';
