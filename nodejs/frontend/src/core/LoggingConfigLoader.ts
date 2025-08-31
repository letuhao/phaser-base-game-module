import { logger } from './Logger';

// Generic LoggerConfig interface that any scene can implement
export interface LoggerConfig {
  id: string;
  name: string;
  version: string;
  isActive: boolean;
  lastModified: Date;
  metadata: Record<string, any>;
  globalLevel: any; // Generic type to avoid conflicts
  objects: Array<{
    name: string;
    level: any;
    enabled: boolean;
    includePerformance: boolean;
    includeStackTrace: boolean;
  }>;
  server: {
    enabled: boolean;
    endpoint: string;
    apiKey?: string;
    batchSize: number;
    retryAttempts: number;
    retryDelay: number;
    timeout: number;
    sendErrorsImmediately: boolean;
    sendGameEventsImmediately: boolean;
    includePerformanceData: boolean;
    includeUserAgent: boolean;
    includeSessionData: boolean;
  };
  console: {
    enabled: boolean;
    colors: boolean;
    showData: boolean;
    showStackTrace: boolean;
    maxDataDepth: number;
  };
  formatOptions: {
    showTimestamp: boolean;
    showLogLevel: boolean;
    showObjectName: boolean;
    useJsonStringify: boolean;
    maxMessageLength: number;
  };
  performance: {
    enabled: boolean;
    fpsThreshold: number;
    memoryThreshold: number;
    networkMonitoring: boolean;
    customMetrics: string[];
  };
  buffering: {
    enabled: boolean;
    maxBufferSize: number;
    flushInterval: number;
    persistOnUnload: boolean;
  };
  errorTracking: {
    enabled: boolean;
    includeStackTrace: boolean;
    trackUnhandledErrors: boolean;
    trackPromiseRejections: boolean;
    maxErrorHistory: number;
  };
  session: {
    enabled: boolean;
    generateSessionId: boolean;
    includeUserInfo: boolean;
    trackPageViews: boolean;
  };
  validate(): string[];
  clone(overrides?: Partial<LoggerConfig>): LoggerConfig;
  toJSON(): string;
  fromJSON(json: string): LoggerConfig;
  isValid(): boolean;
  getSummary(): {
    id: string;
    name: string;
    version: string;
    isActive: boolean;
    lastModified: Date;
    isValid: boolean;
    validationErrors: string[];
    metadataKeys: string[];
  };
}

/**
 * Logging configuration loader for scenes
 * Loads and applies scene-specific logging configurations
 * Common utility that can be used by all scenes
 * Follows SOLID principles - no direct dependencies on specific scene configs
 */
export class LoggingConfigLoader {
  private static instance: LoggingConfigLoader;
  private loadedConfigs: Map<string, LoggerConfig> = new Map();

  private constructor() {
    // No default configs - scenes must register their own configs
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): LoggingConfigLoader {
    if (!LoggingConfigLoader.instance) {
      LoggingConfigLoader.instance = new LoggingConfigLoader();
    }
    return LoggingConfigLoader.instance;
  }

  /**
   * Register a logging configuration for a scene
   */
  public registerConfig(sceneName: string, config: LoggerConfig): void {
    this.loadedConfigs.set(sceneName, config);
    logger.info(
      'LoggingConfigLoader',
      'registerConfig',
      'registerConfig',
      'Registered logging config for scene: ${sceneName}'
    );
  }

  /**
   * Load and apply logging configuration for a scene
   */
  public loadConfig(sceneName: string): boolean {
    const config = this.loadedConfigs.get(sceneName);

    if (!config) {
      logger.warn(
        'LoggingConfigLoader',
        'loadConfig',
        'loadConfig',
        'No logging config found for scene: ${sceneName}, using default'
      );
      return false;
    }

    try {
      // Apply the configuration to the logger
      logger.updateConfig(config);

      // Log the configuration change
      logger.info(
        'LoggingConfigLoader',
        'loadConfig',
        'Applied logging config for scene: ${sceneName}',
        {
          globalLevel: config.globalLevel,
          consoleEnabled: config.console.enabled,
          serverEnabled: config.server.enabled,
          objectCount: config.objects.length,
        }
      );

      return true;
    } catch (error) {
      logger.error(
        'LoggingConfigLoader',
        'loadConfig',
        'Failed to apply logging config for scene: ${sceneName}',
        error
      );
      return false;
    }
  }

  /**
   * Get available scene configurations
   */
  public getAvailableConfigs(): string[] {
    return Array.from(this.loadedConfigs.keys());
  }

  /**
   * Check if a scene has a logging configuration
   */
  public hasConfig(sceneName: string): boolean {
    return this.loadedConfigs.has(sceneName);
  }

  /**
   * Get a specific scene configuration
   */
  public getConfig(sceneName: string): LoggerConfig | undefined {
    return this.loadedConfigs.get(sceneName);
  }

  /**
   * Reset logger to default configuration
   */
  public resetToDefault(): void {
    try {
      // Reset to default config
      logger.updateConfig({
        globalLevel: 2, // INFO level
        console: {
          enabled: true,
          colors: true,
          showData: true,
          showStackTrace: true,
          maxDataDepth: 3,
        },
        server: {
          enabled: true,
          endpoint: '',
          batchSize: 10,
          retryAttempts: 1,
          retryDelay: 3000,
          timeout: 10000,
          sendErrorsImmediately: true,
          sendGameEventsImmediately: true,
          includePerformanceData: true,
          includeUserAgent: true,
          includeSessionData: true,
        },
      });

      logger.info(
        'LoggingConfigLoader',
        'resetToDefault',
        'resetToDefault',
        'Reset logger to default configuration'
      );
    } catch (error) {
      logger.error(
        'LoggingConfigLoader',
        'resetToDefault',
        'Failed to reset logger to default configuration',
        error
      );
    }
  }
}

// Export convenience function
export const loadSceneLoggingConfig = (sceneName: string): boolean => {
  return LoggingConfigLoader.getInstance().loadConfig(sceneName);
};

export default LoggingConfigLoader;
