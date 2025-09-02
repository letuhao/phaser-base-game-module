/**
 * Music System Enums
 *
 * Enums for music genres, moods, and music-specific functionality
 */

// ============================================================================
// MUSIC ENUMS
// ============================================================================

/**
 * Music genres enum
 */
export enum MusicGenre {
  CLASSICAL = 'classical',
  ROCK = 'rock',
  POP = 'pop',
  JAZZ = 'jazz',
  BLUES = 'blues',
  COUNTRY = 'country',
  ELECTRONIC = 'electronic',
  HIP_HOP = 'hip-hop',
  REGGAE = 'reggae',
  FOLK = 'folk',
  AMBIENT = 'ambient',
  ORCHESTRAL = 'orchestral',
  CHORAL = 'choral',
  INSTRUMENTAL = 'instrumental',
  VOCAL = 'vocal',
  CUSTOM = 'custom',
}

/**
 * Music moods enum
 */
export enum MusicMood {
  HAPPY = 'happy',
  SAD = 'sad',
  ENERGETIC = 'energetic',
  CALM = 'calm',
  DRAMATIC = 'dramatic',
  ROMANTIC = 'romantic',
  MYSTERIOUS = 'mysterious',
  EPIC = 'epic',
  MELANCHOLIC = 'melancholic',
  UPLIFTING = 'uplifting',
  DARK = 'dark',
  BRIGHT = 'bright',
  CUSTOM = 'custom',
}

/**
 * Music intensity levels enum
 */
export enum MusicIntensity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  EXTREME = 'extreme',
  CUSTOM = 'custom',
}

/**
 * Music repeat modes enum
 */
export enum MusicRepeatMode {
  NONE = 'none',
  ONE = 'one',
  ALL = 'all',
  CUSTOM = 'custom',
}

/**
 * Network quality levels enum
 */
export enum NetworkQuality {
  POOR = 'poor',
  FAIR = 'fair',
  GOOD = 'good',
  EXCELLENT = 'excellent',
  CUSTOM = 'custom',
}

/**
 * Audio codec types enum
 */
export enum AudioCodec {
  MP3 = 'mp3',
  AAC = 'aac',
  FLAC = 'flac',
  OGG = 'ogg',
  WAV = 'wav',
  M4A = 'm4a',
  WEBM = 'webm',
  CUSTOM = 'custom',
}

/**
 * Audio format types enum
 */
export enum AudioFormat {
  COMPRESSED = 'compressed',
  UNCOMPRESSED = 'uncompressed',
  LOSSLESS = 'lossless',
  CUSTOM = 'custom',
}
