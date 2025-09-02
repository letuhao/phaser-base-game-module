/**
 * Sound Audio Interface
 *
 * Defines sound-specific functionality for audio game objects.
 */

import type { IAudioObject } from './IAudioObject';
import {
  SoundCategoryType,
  AudioFormatType,
  AudioChannelType,
  AudioQualityLevel,
  AudioCurveType,
  AudioType,
} from '../../enums';

/**
 * Interface for sound audio game objects
 *
 * Extends IAudioObject with sound-specific functionality for short audio clips,
 * sound effects, and sound management.
 *
 * Example implementation:
 * ```typescript
 * class MySound extends Phaser.GameObjects.GameObject implements ISound {
 *   readonly gameObjectType = 'audio' as const;
 *   readonly audioType = 'sound' as const;
 *   // Implementation
 * }
 * ```
 */
export interface ISound extends IAudioObject {
  // ============================================================================
  // SOUND IDENTITY
  // ============================================================================

  /** The specific type of audio element (always 'sound') */
  readonly audioType: AudioType.SOUND;

  // ============================================================================
  // SOUND PROPERTIES
  // ============================================================================

  /** Sound category */
  soundCategory: SoundCategoryType;

  /** Sound priority (higher = more important) */
  priority: number;

  /** Maximum number of simultaneous instances */
  maxInstances: number;

  /** Current number of playing instances */
  currentInstances: number;

  /** Sound preload state */
  preload: boolean;

  /** Sound cache state */
  cached: boolean;

  /** Sound streaming state */
  streaming: boolean;

  /** Sound compression format */
  compressionFormat: AudioFormatType;

  /** Sound bitrate */
  bitrate: number;

  /** Sound sample rate */
  sampleRate: number;

  /** Sound channels (mono/stereo) */
  channels: AudioChannelType;

  /** Sound quality level */
  quality: AudioQualityLevel;

  /** Sound fade in curve */
  fadeInCurve: AudioCurveType;

  /** Sound fade out curve */
  fadeOutCurve: AudioCurveType;

  /** Sound crossfade curve */
  crossfadeCurve: AudioCurveType;

  /** Sound envelope attack time */
  envelopeAttack: number;

  /** Sound envelope decay time */
  envelopeDecay: number;

  /** Sound envelope sustain level */
  envelopeSustain: number;

  /** Sound envelope release time */
  envelopeRelease: number;

  /** Sound distortion amount */
  distortion: number;

  /** Sound echo delay */
  echoDelay: number;

  /** Sound echo feedback */
  echoFeedback: number;

  /** Sound echo wet level */
  echoWet: number;

  /** Sound echo dry level */
  echoDry: number;

  /** Sound chorus rate */
  chorusRate: number;

  /** Sound chorus depth */
  chorusDepth: number;

  /** Sound chorus feedback */
  chorusFeedback: number;

  /** Sound chorus wet level */
  chorusWet: number;

  /** Sound chorus dry level */
  chorusDry: number;

  /** Sound flanger rate */
  flangerRate: number;

  /** Sound flanger depth */
  flangerDepth: number;

  /** Sound flanger feedback */
  flangerFeedback: number;

  /** Sound flanger wet level */
  flangerWet: number;

  /** Sound flanger dry level */
  flangerDry: number;

  // ============================================================================
  // SOUND METHODS
  // ============================================================================

  /** Set sound category */
  setSoundCategory(category: SoundCategoryType): this;

  /** Set sound priority */
  setPriority(priority: number): this;

  /** Set maximum instances */
  setMaxInstances(maxInstances: number): this;

  /** Set sound preload state */
  setPreload(preload: boolean): this;

  /** Set sound cache state */
  setCached(cached: boolean): this;

  /** Set sound streaming state */
  setStreaming(streaming: boolean): this;

  /** Set sound compression format */
  setCompressionFormat(format: AudioFormatType): this;

  /** Set sound bitrate */
  setBitrate(bitrate: number): this;

  /** Set sound sample rate */
  setSampleRate(sampleRate: number): this;

  /** Set sound channels */
  setChannels(channels: AudioChannelType): this;

  /** Set sound quality level */
  setQuality(quality: AudioQualityLevel): this;

  /** Set sound fade curves */
  setFadeCurves(fadeIn: AudioCurveType, fadeOut: AudioCurveType): this;

  /** Set sound crossfade curve */
  setCrossfadeCurve(curve: AudioCurveType): this;

  /** Set sound envelope */
  setEnvelope(attack: number, decay: number, sustain: number, release: number): this;

  /** Set sound distortion */
  setDistortion(amount: number): this;

  /** Set sound echo */
  setEcho(delay: number, feedback: number, wet: number, dry: number): this;

  /** Set sound chorus */
  setChorus(rate: number, depth: number, feedback: number, wet: number, dry: number): this;

  /** Set sound flanger */
  setFlanger(rate: number, depth: number, feedback: number, wet: number, dry: number): this;

  /** Get sound category */
  getSoundCategory(): string;

  /** Get sound priority */
  getPriority(): number;

  /** Get maximum instances */
  getMaxInstances(): number;

  /** Get current instances */
  getCurrentInstances(): number;

  /** Check if sound is preloaded */
  isPreloaded(): boolean;

  /** Check if sound is cached */
  isCached(): boolean;

  /** Check if sound is streaming */
  isStreaming(): boolean;

  /** Get sound compression format */
  getCompressionFormat(): string;

  /** Get sound bitrate */
  getBitrate(): number;

  /** Get sound sample rate */
  getSampleRate(): number;

  /** Get sound channels */
  getChannels(): string;

  /** Get sound quality level */
  getQuality(): string;

  /** Get sound fade curves */
  getFadeCurves(): { fadeIn: string; fadeOut: string };

  /** Get sound crossfade curve */
  getCrossfadeCurve(): string;

  /** Get sound envelope */
  getEnvelope(): { attack: number; decay: number; sustain: number; release: number };

  /** Get sound distortion */
  getDistortion(): number;

  /** Get sound echo */
  getEcho(): { delay: number; feedback: number; wet: number; dry: number };

  /** Get sound chorus */
  getChorus(): { rate: number; depth: number; feedback: number; wet: number; dry: number };

  /** Get sound flanger */
  getFlanger(): { rate: number; depth: number; feedback: number; wet: number; dry: number };

  /** Play sound instance */
  playInstance(): this;

  /** Stop all sound instances */
  stopAllInstances(): this;

  /** Pause all sound instances */
  pauseAllInstances(): this;

  /** Resume all sound instances */
  resumeAllInstances(): this;

  /** Get sound instance count */
  getInstanceCount(): number;

  /** Check if sound can play (not at max instances) */
  canPlay(): boolean;

  /** Preload sound */
  preloadSound(): Promise<this>;

  /** Cache sound */
  cacheSound(): this;

  /** Uncache sound */
  uncacheSound(): this;

  /** Get sound file size */
  getFileSize(): number;

  /** Get sound memory usage */
  getMemoryUsage(): number;

  /** Optimize sound for playback */
  optimizeSound(): this;

  /** Compress sound */
  compressSound(quality: AudioQualityLevel): this;

  /** Decompress sound */
  decompressSound(): this;

  /** Get sound metadata */
  getMetadata(): {
    title?: string;
    artist?: string;
    album?: string;
    year?: number;
    genre?: string;
    duration?: number;
  };

  /** Set sound metadata */
  setMetadata(metadata: {
    title?: string;
    artist?: string;
    album?: string;
    year?: number;
    genre?: string;
    duration?: number;
  }): this;
}
