/**
 * Access Control Enums
 * 
 * Enums for access types, permissions, and access control functionality
 */

// ============================================================================
// ACCESS TYPE ENUMS
// ============================================================================

/**
 * Access types enum
 */
export enum AccessType {
  GET = 'get',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  RESET = 'reset',
  CLEAR = 'clear',
  READ = 'read',
  WRITE = 'write',
  EXECUTE = 'execute',
  ADMIN = 'admin',
  OWNER = 'owner',
  CUSTOM = 'custom',
}

/**
 * Permission levels enum
 */
export enum PermissionLevel {
  NONE = 'none',
  READ_ONLY = 'read_only',
  READ_WRITE = 'read_write',
  FULL_ACCESS = 'full_access',
  ADMIN = 'admin',
  OWNER = 'owner',
  CUSTOM = 'custom',
}

/**
 * Access control types enum
 */
export enum AccessControlType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  PROTECTED = 'protected',
  INTERNAL = 'internal',
  RESTRICTED = 'restricted',
  CUSTOM = 'custom',
}
