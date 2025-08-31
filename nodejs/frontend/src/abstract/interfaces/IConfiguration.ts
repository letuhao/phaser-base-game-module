/**
 * Base configuration interface for all configurations
 * Follows Interface Segregation Principle (ISP) and Dependency Inversion Principle (DIP)
 */
export interface IConfiguration {
  /**
   * Unique identifier for the configuration
   */
  readonly id: string;

  /**
   * Human-readable name for the configuration
   */
  readonly name: string;

  /**
   * Version of the configuration
   */
  readonly version: string;

  /**
   * Whether the configuration is currently active
   */
  readonly isActive: boolean;

  /**
   * When the configuration was last modified
   */
  readonly lastModified: Date;

  /**
   * Additional metadata for the configuration
   */
  readonly metadata: Record<string, any>;

  /**
   * Validate the configuration
   * @returns Array of validation error messages
   */
  validate(): string[];

  /**
   * Create a copy of the configuration with optional overrides
   * @param overrides Properties to override in the copy
   * @returns New configuration instance
   */
  clone(overrides?: Partial<this>): this;

  /**
   * Convert configuration to JSON string
   * @returns JSON string representation
   */
  toJSON(): string;

  /**
   * Create configuration from JSON string
   * @param json JSON string to parse
   * @returns Configuration instance
   */
  fromJSON(json: string): this;

  /**
   * Check if configuration is valid
   * @returns True if configuration is valid
   */
  isValid(): boolean;

  /**
   * Get configuration summary
   * @returns Summary object
   */
  getSummary(): ConfigurationSummary;
}

/**
 * Configuration summary structure
 */
export interface ConfigurationSummary {
  id: string;
  name: string;
  version: string;
  isActive: boolean;
  lastModified: Date;
  isValid: boolean;
  validationErrors: string[];
  metadataKeys: string[];
}
