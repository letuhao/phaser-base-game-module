/**
 * Audio Object Interface
 * 
 * Defines audio-specific functionality for game objects.
 * This interface extends IGameObject with audio-specific features.
 */

import * as Phaser from 'phaser';
import type { IGameObject } from '../IGameObject';
import { GameObjectType, AudioType, AudioFilterType } from '../../enums';

/**
 * Interface for audio game objects
 * 
 * Extends IGameObject with audio-specific functionality for sound management,
 * audio playback, and audio-specific behaviors.
 * 
 * Example implementation:
 * ```typescript
 * class MyAudioObject extends Phaser.GameObjects.GameObject implements IAudioObject {
 *   readonly gameObjectType = 'audio' as const;
 *   readonly audioType = 'sound' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IAudioObject extends IGameObject {
  // ============================================================================
  // AUDIO IDENTITY
  // ============================================================================
  
  /** The type of this game object (always 'audio') */
  readonly gameObjectType: GameObjectType;
  
  /** The specific type of audio element */
  readonly audioType: AudioType;
  
  // ============================================================================
  // AUDIO PROPERTIES
  // ============================================================================
  
  /** Audio source (URL, buffer, or data) */
  audioSource: string | ArrayBuffer | AudioBuffer | null;
  
  /** Audio volume (0.0 to 1.0) */
  volume: number;
  
  /** Audio pitch (1.0 = normal, 0.5 = half speed, 2.0 = double speed) */
  pitch: number;
  
  /** Audio pan (-1.0 = left, 0.0 = center, 1.0 = right) */
  pan: number;
  
  /** Whether audio is muted */
  muted: boolean;
  
  /** Whether audio is paused */
  paused: boolean;
  
  /** Whether audio is playing */
  playing: boolean;
  
  /** Whether audio is looping */
  loop: boolean;
  
  /** Audio duration in seconds */
  duration: number;
  
  /** Current playback position in seconds */
  currentTime: number;
  
  /** Audio playback rate (1.0 = normal) */
  playbackRate: number;
  
  /** Audio fade in duration in seconds */
  fadeInDuration: number;
  
  /** Audio fade out duration in seconds */
  fadeOutDuration: number;
  
  /** Audio crossfade duration in seconds */
  crossfadeDuration: number;
  
  /** Audio spatial positioning enabled */
  spatialAudio: boolean;
  
  /** Audio 3D position */
  audioPosition: Phaser.Math.Vector3;
  
  /** Audio 3D velocity */
  audioVelocity: Phaser.Math.Vector3;
  
  /** Audio rolloff factor for 3D audio */
  rolloffFactor: number;
  
  /** Audio reference distance for 3D audio */
  referenceDistance: number;
  
  /** Audio max distance for 3D audio */
  maxDistance: number;
  
  /** Audio cone inner angle for directional audio */
  coneInnerAngle: number;
  
  /** Audio cone outer angle for directional audio */
  coneOuterAngle: number;
  
  /** Audio cone outer gain for directional audio */
  coneOuterGain: number;
  
  /** Audio filter type */
  filterType: AudioFilterType;
  
  /** Audio filter frequency */
  filterFrequency: number;
  
  /** Audio filter Q factor */
  filterQ: number;
  
  /** Audio filter gain */
  filterGain: number;
  
  /** Audio compression threshold */
  compressionThreshold: number;
  
  /** Audio compression ratio */
  compressionRatio: number;
  
  /** Audio compression attack time */
  compressionAttack: number;
  
  /** Audio compression release time */
  compressionRelease: number;
  
  /** Audio reverb room size */
  reverbRoomSize: number;
  
  /** Audio reverb damping */
  reverbDamping: number;
  
  /** Audio reverb wet level */
  reverbWet: number;
  
  /** Audio reverb dry level */
  reverbDry: number;
  
  /** Audio reverb width */
  reverbWidth: number;
  
  /** Audio reverb freeze mode */
  reverbFreeze: boolean;
  
  // ============================================================================
  // AUDIO METHODS
  // ============================================================================
  
  /** Set audio source */
  setAudioSource(source: string | ArrayBuffer | AudioBuffer | null): this;
  
  /** Set audio volume */
  setVolume(volume: number): this;
  
  /** Set audio pitch */
  setPitch(pitch: number): this;
  
  /** Set audio pan */
  setPan(pan: number): this;
  
  /** Set audio muted state */
  setMuted(muted: boolean): this;
  
  /** Set audio loop state */
  setLoop(loop: boolean): this;
  
  /** Set audio playback rate */
  setPlaybackRate(rate: number): this;
  
  /** Set audio fade in duration */
  setFadeInDuration(duration: number): this;
  
  /** Set audio fade out duration */
  setFadeOutDuration(duration: number): this;
  
  /** Set audio crossfade duration */
  setCrossfadeDuration(duration: number): this;
  
  /** Set audio spatial positioning */
  setSpatialAudio(enabled: boolean): this;
  
  /** Set audio 3D position */
  setAudioPosition(x: number, y: number, z: number): this;
  
  /** Set audio 3D velocity */
  setAudioVelocity(x: number, y: number, z: number): this;
  
  /** Set audio rolloff factor */
  setRolloffFactor(factor: number): this;
  
  /** Set audio reference distance */
  setReferenceDistance(distance: number): this;
  
  /** Set audio max distance */
  setMaxDistance(distance: number): this;
  
  /** Set audio cone parameters */
  setAudioCone(innerAngle: number, outerAngle: number, outerGain: number): this;
  
  /** Set audio filter */
  setAudioFilter(type: AudioFilterType, frequency: number, Q: number, gain: number): this;
  
  /** Set audio compression */
  setAudioCompression(threshold: number, ratio: number, attack: number, release: number): this;
  
  /** Set audio reverb */
  setAudioReverb(roomSize: number, damping: number, wet: number, dry: number, width: number, freeze: boolean): this;
  
  /** Get audio source */
  getAudioSource(): string | ArrayBuffer | AudioBuffer | null;
  
  /** Get audio volume */
  getVolume(): number;
  
  /** Get audio pitch */
  getPitch(): number;
  
  /** Get audio pan */
  getPan(): number;
  
  /** Check if audio is muted */
  isMuted(): boolean;
  
  /** Check if audio is paused */
  isPaused(): boolean;
  
  /** Check if audio is playing */
  isPlaying(): boolean;
  
  /** Check if audio is looping */
  isLooping(): boolean;
  
  /** Get audio duration */
  getDuration(): number;
  
  /** Get current playback time */
  getCurrentTime(): number;
  
  /** Get audio playback rate */
  getPlaybackRate(): number;
  
  /** Get audio fade in duration */
  getFadeInDuration(): number;
  
  /** Get audio fade out duration */
  getFadeOutDuration(): number;
  
  /** Get audio crossfade duration */
  getCrossfadeDuration(): number;
  
  /** Check if spatial audio is enabled */
  isSpatialAudio(): boolean;
  
  /** Get audio 3D position */
  getAudioPosition(): Phaser.Math.Vector3;
  
  /** Get audio 3D velocity */
  getAudioVelocity(): Phaser.Math.Vector3;
  
  /** Get audio rolloff factor */
  getRolloffFactor(): number;
  
  /** Get audio reference distance */
  getReferenceDistance(): number;
  
  /** Get audio max distance */
  getMaxDistance(): number;
  
  /** Get audio cone parameters */
  getAudioCone(): { innerAngle: number; outerAngle: number; outerGain: number };
  
  /** Get audio filter parameters */
  getAudioFilter(): { type: AudioFilterType; frequency: number; Q: number; gain: number };
  
  /** Get audio compression parameters */
  getAudioCompression(): { threshold: number; ratio: number; attack: number; release: number };
  
  /** Get audio reverb parameters */
  getAudioReverb(): { roomSize: number; damping: number; wet: number; dry: number; width: number; freeze: boolean };
  
  /** Play audio */
  play(): this;
  
  /** Pause audio */
  pause(): this;
  
  /** Stop audio */
  stop(): this;
  
  /** Resume audio */
  resume(): this;
  
  /** Restart audio */
  restart(): this;
  
  /** Seek to specific time */
  seek(time: number): this;
  
  /** Fade in audio */
  fadeIn(duration?: number): this;
  
  /** Fade out audio */
  fadeOut(duration?: number): this;
  
  /** Crossfade to another audio */
  crossfadeTo(other: IAudioObject, duration?: number): this;
  
  /** Update audio spatial positioning */
  updateSpatialPosition(): void;
  
  /** Update audio filters */
  updateAudioFilters(): void;
  
  /** Update audio effects */
  updateAudioEffects(): void;
  
  /** Get audio waveform data */
  getWaveformData(): Float32Array;
  
  /** Get audio frequency data */
  getFrequencyData(): Uint8Array;
  
  /** Get audio time domain data */
  getTimeDomainData(): Float32Array;
  
  /** Check if audio is loaded */
  isLoaded(): boolean;
  
  /** Check if audio is ready to play */
  isReady(): boolean;
  
  /** Get audio loading progress */
  getLoadingProgress(): number;
  
  /** Get audio error state */
  getError(): string | null;
  
  /** Clear audio error */
  clearError(): this;
}
