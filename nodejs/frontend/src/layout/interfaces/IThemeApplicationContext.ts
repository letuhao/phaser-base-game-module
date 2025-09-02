import { ThemeElementType } from '../enums/LayoutEnums';

/**
 * Theme application context interface
 * Defines the context for applying themes to elements
 */
export interface IThemeApplicationContext {
  sceneKey: string;
  gameObjectId?: string;
  elementType: ThemeElementType;
  priority: number;
  customProperties?: Record<string, unknown>;
}
