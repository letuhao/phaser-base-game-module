/**
 * Audio Format Enums
 *
 * Enums for audio formats, channels, quality, and audio-specific functionality
 */

// ============================================================================
// AUDIO FORMAT ENUMS
// ============================================================================

/**
 * Audio format types enum
 */
export enum AudioFormatType {
  MP3 = 'mp3',
  OGG = 'ogg',
  WAV = 'wav',
  AAC = 'aac',
  FLAC = 'flac',
  WEBM = 'webm',
  M4A = 'm4a',
  CUSTOM = 'custom',
}

/**
 * Audio channel types enum
 */
export enum AudioChannelType {
  MONO = 'mono',
  STEREO = 'stereo',
  SURROUND = 'surround',
  SURROUND_5_1 = 'surround_5_1',
  SURROUND_7_1 = 'surround_7_1',
  CUSTOM = 'custom',
}

/**
 * Audio quality levels enum
 */
export enum AudioQualityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  LOSSLESS = 'lossless',
  CUSTOM = 'custom',
}

/**
 * Audio curve types enum
 */
export enum AudioCurveType {
  LINEAR = 'linear',
  EXPONENTIAL = 'exponential',
  LOGARITHMIC = 'logarithmic',
  SINE = 'sine',
  COSINE = 'cosine',
  CUSTOM = 'custom',
}

/**
 * Sound category types enum
 */
export enum SoundCategoryType {
  EFFECT = 'effect',
  UI = 'ui',
  AMBIENT = 'ambient',
  VOICE = 'voice',
  MUSIC = 'music',
  NOTIFICATION = 'notification',
  ALERT = 'alert',
  FEEDBACK = 'feedback',
  CUSTOM = 'custom',
}
