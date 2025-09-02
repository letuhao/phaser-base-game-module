/**
 * Network System Enums
 * 
 * Enums for networking, synchronization, and multiplayer functionality
 */

// ============================================================================
// NETWORK CONNECTION ENUMS
// ============================================================================

/**
 * Network connection states enum
 */
export enum NetworkConnectionState {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  ERROR = 'error',
  TIMEOUT = 'timeout',
  REFUSED = 'refused',
}

/**
 * Network message types enum
 */
export enum NetworkMessageType {
  SYNC = 'sync',
  COMMAND = 'command',
  EVENT = 'event',
  STATE = 'state',
  CHAT = 'chat',
  PING = 'ping',
  PONG = 'pong',
  HANDSHAKE = 'handshake',
  DISCONNECT = 'disconnect',
  ERROR = 'error',
  CUSTOM = 'custom',
}

/**
 * Network authority types enum
 */
export enum NetworkAuthority {
  NONE = 'none',
  CLIENT = 'client',
  SERVER = 'server',
  SHARED = 'shared',
  MASTER = 'master',
  SLAVE = 'slave',
}

/**
 * Network update modes enum
 */
export enum NetworkUpdateMode {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  ON_CHANGE = 'on_change',
  INTERVAL = 'interval',
  CONDITIONAL = 'conditional',
}

// ============================================================================
// NETWORK PROTOCOL ENUMS
// ============================================================================

/**
 * Network protocol types enum
 */
export enum NetworkProtocol {
  TCP = 'tcp',
  UDP = 'udp',
  WEBSOCKET = 'websocket',
  WEBRTC = 'webrtc',
  HTTP = 'http',
  HTTPS = 'https',
  CUSTOM = 'custom',
}

/**
 * Network compression types enum
 */
export enum NetworkCompression {
  NONE = 'none',
  GZIP = 'gzip',
  DEFLATE = 'deflate',
  LZ4 = 'lz4',
  SNAPPY = 'snappy',
  BROTLI = 'brotli',
  CUSTOM = 'custom',
}

/**
 * Network encryption types enum
 */
export enum NetworkEncryption {
  NONE = 'none',
  TLS = 'tls',
  SSL = 'ssl',
  AES = 'aes',
  RSA = 'rsa',
  CUSTOM = 'custom',
}

// ============================================================================
// NETWORK SYNCHRONIZATION ENUMS
// ============================================================================

/**
 * Network sync modes enum
 */
export enum NetworkSyncMode {
  NONE = 'none',
  FULL = 'full',
  DELTA = 'delta',
  INTERPOLATED = 'interpolated',
  EXTRAPOLATED = 'extrapolated',
  PREDICTIVE = 'predictive',
}

/**
 * Network conflict resolution strategies enum
 */
export enum NetworkConflictResolutionStrategy {
  LAST_WRITE_WINS = 'last_write_wins',
  FIRST_WRITE_WINS = 'first_write_wins',
  SERVER_AUTHORITY = 'server_authority',
  CLIENT_AUTHORITY = 'client_authority',
  MERGE = 'merge',
  MANUAL = 'manual',
}

/**
 * Network reliability types enum
 */
export enum NetworkReliability {
  UNRELIABLE = 'unreliable',
  RELIABLE = 'reliable',
  RELIABLE_ORDERED = 'reliable_ordered',
  RELIABLE_SEQUENCED = 'reliable_sequenced',
  UNRELIABLE_SEQUENCED = 'unreliable_sequenced',
}

// ============================================================================
// NETWORK PERFORMANCE ENUMS
// ============================================================================

/**
 * Network quality levels enum
 */
export enum NetworkQuality {
  POOR = 'poor',
  FAIR = 'fair',
  GOOD = 'good',
  EXCELLENT = 'excellent',
}

/**
 * Network bandwidth levels enum
 */
export enum NetworkBandwidth {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  UNLIMITED = 'unlimited',
}

/**
 * Network latency categories enum
 */
export enum NetworkLatency {
  VERY_LOW = 'very_low',    // < 50ms
  LOW = 'low',              // 50-100ms
  MEDIUM = 'medium',        // 100-200ms
  HIGH = 'high',            // 200-500ms
  VERY_HIGH = 'very_high',  // > 500ms
}

// ============================================================================
// NETWORK SECURITY ENUMS
// ============================================================================

/**
 * Network authentication types enum
 */
export enum NetworkAuthentication {
  NONE = 'none',
  TOKEN = 'token',
  CERTIFICATE = 'certificate',
  OAUTH = 'oauth',
  CUSTOM = 'custom',
}

/**
 * Network permission levels enum
 */
export enum NetworkPermission {
  NONE = 'none',
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin',
  OWNER = 'owner',
}

/**
 * Network rate limiting types enum
 */
export enum NetworkRateLimit {
  NONE = 'none',
  PER_SECOND = 'per_second',
  PER_MINUTE = 'per_minute',
  PER_HOUR = 'per_hour',
  PER_DAY = 'per_day',
  CUSTOM = 'custom',
}
