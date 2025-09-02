/**
 * Audio Game Object Interfaces Index
 *
 * Centralized export for all audio-specific game object interfaces
 */

// ============================================================================
// AUDIO INTERFACES
// ============================================================================

export type { IAudioObject } from './IAudioObject';
export type { ISound } from './ISound';
export type { IMusic } from './IMusic';

// ============================================================================
// AUDIO INTERFACE BUNDLES
// ============================================================================

/**
 * Core audio interfaces
 */
export const CORE_AUDIO_INTERFACES = {
  IAudioObject: 'IAudioObject',
} as const;

/**
 * Specific audio interfaces
 */
export const SPECIFIC_AUDIO_INTERFACES = {
  ISound: 'ISound',
  IMusic: 'IMusic',
} as const;

/**
 * All audio interfaces
 */
export const AUDIO_INTERFACES = {
  ...CORE_AUDIO_INTERFACES,
  ...SPECIFIC_AUDIO_INTERFACES,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CoreAudioInterface = (typeof CORE_AUDIO_INTERFACES)[keyof typeof CORE_AUDIO_INTERFACES];
export type SpecificAudioInterface =
  (typeof SPECIFIC_AUDIO_INTERFACES)[keyof typeof SPECIFIC_AUDIO_INTERFACES];
export type AudioInterface = (typeof AUDIO_INTERFACES)[keyof typeof AUDIO_INTERFACES];
