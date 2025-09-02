/**
 * Audio System Enums
 * 
 * Enums for audio, sound, and music systems
 */

// ============================================================================
// AUDIO TYPES ENUMS
// ============================================================================

/**
 * Audio types enum
 */
export enum AudioType {
  SFX = 'sfx',
  SOUND = 'sound',
  MUSIC = 'music',
  VOICE = 'voice',
  AMBIENT = 'ambient',
  UI = 'ui',
  FOOTSTEP = 'footstep',
  WEAPON = 'weapon',
  ENVIRONMENT = 'environment',
  CUSTOM = 'custom',
}

/**
 * Audio states enum
 */
export enum AudioState {
  STOPPED = 'stopped',
  PLAYING = 'playing',
  PAUSED = 'paused',
  LOADING = 'loading',
  ERROR = 'error',
  BUFFERING = 'buffering',
  ENDED = 'ended',
}

/**
 * Audio formats enum
 */
export enum AudioFormat {
  MP3 = 'mp3',
  OGG = 'ogg',
  WAV = 'wav',
  AAC = 'aac',
  M4A = 'm4a',
  WEBM = 'webm',
  FLAC = 'flac',
}

// ============================================================================
// AUDIO EFFECTS ENUMS
// ============================================================================

/**
 * Audio effect types enum
 */
export enum AudioEffectType {
  REVERB = 'reverb',
  ECHO = 'echo',
  DELAY = 'delay',
  DISTORTION = 'distortion',
  FILTER = 'filter',
  COMPRESSOR = 'compressor',
  LIMITER = 'limiter',
  EQUALIZER = 'equalizer',
  CHORUS = 'chorus',
  FLANGER = 'flanger',
  PHASER = 'phaser',
  WAH = 'wah',
  PITCH_SHIFT = 'pitch_shift',
  TIME_STRETCH = 'time_stretch',
  FADE = 'fade',
  CROSSFADE = 'crossfade',
}

/**
 * Audio filter types enum
 */
export enum AudioFilterType {
  LOW_PASS = 'low_pass',
  HIGH_PASS = 'high_pass',
  BAND_PASS = 'band_pass',
  NOTCH = 'notch',
  ALL_PASS = 'all_pass',
  LOW_SHELF = 'low_shelf',
  HIGH_SHELF = 'high_shelf',
  PEAKING = 'peaking',
}

// ============================================================================
// AUDIO SPATIAL ENUMS
// ============================================================================

/**
 * Audio spatial model enum
 */
export enum AudioSpatialModel {
  NONE = 'none',
  PANNER = 'panner',
  HRTF = 'hrtf',
  EQUAL_POWER = 'equal_power',
  CUSTOM = 'custom',
}

/**
 * Audio distance model enum
 */
export enum AudioDistanceModel {
  LINEAR = 'linear',
  INVERSE = 'inverse',
  EXPONENTIAL = 'exponential',
  CUSTOM = 'custom',
}

/**
 * Audio rolloff factor enum
 */
export enum AudioRolloffFactor {
  NONE = 'none',
  LINEAR = 'linear',
  LOGARITHMIC = 'logarithmic',
  CUSTOM = 'custom',
}

// ============================================================================
// AUDIO LOOP ENUMS
// ============================================================================

/**
 * Audio loop modes enum
 */
export enum AudioLoopMode {
  NONE = 'none',
  LOOP = 'loop',
  PING_PONG = 'ping_pong',
  RANDOM = 'random',
  CUSTOM = 'custom',
}

/**
 * Audio fade types enum
 */
export enum AudioFadeType {
  NONE = 'none',
  LINEAR = 'linear',
  EXPONENTIAL = 'exponential',
  LOGARITHMIC = 'logarithmic',
  SINE = 'sine',
  COSINE = 'cosine',
  CUSTOM = 'custom',
}

// ============================================================================
// AUDIO PRIORITY ENUMS
// ============================================================================

/**
 * Audio priority levels enum
 */
export enum AudioPriority {
  LOWEST = 0,
  LOW = 1,
  NORMAL = 5,
  HIGH = 10,
  HIGHEST = 100,
  CRITICAL = 1000,
}

/**
 * Audio channel types enum
 */
export enum AudioChannelType {
  MONO = 'mono',
  STEREO = 'stereo',
  SURROUND_5_1 = 'surround_5_1',
  SURROUND_7_1 = 'surround_7_1',
  AMBIENT = 'ambient',
  CUSTOM = 'custom',
}
