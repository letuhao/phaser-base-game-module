/**
 * Base configuration interface for all game configurations
 * Provides common properties and methods that all configurations should implement
 */
export interface IConfiguration {
  /** Unique identifier for this configuration */
  readonly id: string;

  /** Configuration name for display purposes */
  readonly name: string;

  /** Configuration version for tracking changes */
  readonly version: string;

  /** Whether this configuration is currently active/enabled */
  readonly isActive: boolean;

  /** Timestamp when this configuration was last modified */
  readonly lastModified: Date;

  /** Configuration metadata for additional information */
  readonly metadata: Record<string, any>;

  /** Validates the configuration and returns validation errors if any */
  validate(): string[];

  /** Clones the configuration with optional overrides */
  clone(overrides?: Partial<this>): this;

  /** Serializes the configuration to JSON */
  toJSON(): string;

  /** Deserializes the configuration from JSON */
  fromJSON(json: string): this;
}
