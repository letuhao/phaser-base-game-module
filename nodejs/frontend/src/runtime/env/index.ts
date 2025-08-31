/**
 * Runtime Environment Configuration Index
 * Exports all environment-specific configurations
 */

export * from './backend.config';
export { default as backendConfig } from './backend.config';

// Re-export all runtime configurations as a namespace for convenience
export * as Runtime from './';
