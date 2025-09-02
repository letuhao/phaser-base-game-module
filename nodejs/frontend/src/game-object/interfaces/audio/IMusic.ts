/**
 * Music Audio Interface
 * 
 * Defines music-specific functionality for audio game objects.
 */

import * as Phaser from 'phaser';
import type { IAudioObject } from './IAudioObject';
import { MusicGenre, MusicMood, MusicIntensity, MusicRepeatMode, NetworkQuality, AudioCodec, AudioFormat, AudioCurveType, AudioFilterType, AudioType, AudioQualityLevel, AudioChannelType } from '../../enums';

/**
 * Interface for music audio game objects
 * 
 * Extends IAudioObject with music-specific functionality for long-form audio,
 * music playback, and music management.
 * 
 * Example implementation:
 * ```typescript
 * class MyMusic extends Phaser.GameObjects.GameObject implements IMusic {
 *   readonly gameObjectType = 'audio' as const;
 *   readonly audioType = 'music' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IMusic extends IAudioObject {
  // ============================================================================
  // MUSIC IDENTITY
  // ============================================================================
  
  /** The specific type of audio element (always 'music') */
  readonly audioType: AudioType.MUSIC;
  
  // ============================================================================
  // MUSIC PROPERTIES
  // ============================================================================
  
  /** Music genre */
  genre: MusicGenre;
  
  /** Music tempo (BPM) */
  tempo: number;
  
  /** Music key signature */
  keySignature: string;
  
  /** Music time signature */
  timeSignature: string;
  
  /** Music mood */
  mood: MusicMood;
  
  /** Music intensity level */
  intensity: MusicIntensity;
  
  /** Music energy level */
  energy: number;
  
  /** Music valence (positive/negative emotion) */
  valence: number;
  
  /** Music danceability */
  danceability: number;
  
  /** Music acousticness */
  acousticness: number;
  
  /** Music instrumentalness */
  instrumentalness: number;
  
  /** Music liveness */
  liveness: number;
  
  /** Music speechiness */
  speechiness: number;
  
  /** Music loudness */
  loudness: number;
  
  /** Music dynamic range */
  dynamicRange: number;
  
  /** Music frequency spectrum */
  frequencySpectrum: Float32Array;
  
  /** Music beat tracking */
  beatTracking: boolean;
  
  /** Music beat detection sensitivity */
  beatSensitivity: number;
  
  /** Music beat threshold */
  beatThreshold: number;
  
  /** Music beat history */
  beatHistory: number[];
  
  /** Music current beat */
  currentBeat: number;
  
  /** Music beat interval */
  beatInterval: number;
  
  /** Music next beat time */
  nextBeatTime: number;
  
  /** Music crossfade enabled */
  crossfadeEnabled: boolean;
  
  /** Music crossfade curve */
  crossfadeCurve: AudioCurveType;
  
  /** Music playlist position */
  playlistPosition: number;
  
  /** Music playlist total */
  playlistTotal: number;
  
  /** Music shuffle mode */
  shuffleMode: boolean;
  
  /** Music repeat mode */
  repeatMode: MusicRepeatMode;
  
  /** Music auto-play next */
  autoPlayNext: boolean;
  
  /** Music gapless playback */
  gaplessPlayback: boolean;
  
  /** Music preload next */
  preloadNext: boolean;
  
  /** Music buffer size */
  bufferSize: number;
  
  /** Music streaming quality */
  streamingQuality: AudioQualityLevel;
  
  /** Music adaptive bitrate */
  adaptiveBitrate: boolean;
  
  /** Music offline mode */
  offlineMode: boolean;
  
  /** Music download progress */
  downloadProgress: number;
  

  
  /** Music buffer health */
  bufferHealth: number;
  
  /** Music network quality */
  networkQuality: NetworkQuality;
  
  /** Music bitrate */
  bitrate: number;
  
  /** Music codec */
  codec: AudioCodec;
  
  /** Music sample rate */
  sampleRate: number;
  
  /** Music bit depth */
  bitDepth: number;
  
  /** Music channels */
  channels: AudioChannelType;
  
  /** Music format */
  format: AudioFormat;
  
  /** Music file size */
  fileSize: number;
  
  /** Music duration */
  duration: number;
  
  /** Music current time */
  currentTime: number;
  
  /** Music remaining time */
  remainingTime: number;
  
  /** Music progress percentage */
  progress: number;
  

  
  /** Music error message */
  errorMessage: string | null;
  
  /** Music volume */
  volume: number;
  
  /** Music muted */
  muted: boolean;
  
  /** Music loop */
  loop: boolean;
  
  /** Music pitch */
  pitch: number;
  
  /** Music playback rate */
  playbackRate: number;
  
  /** Music pan */
  pan: number;
  
  /** Music fade in duration */
  fadeInDuration: number;
  
  /** Music fade out duration */
  fadeOutDuration: number;
  

  
  /** Music spatial audio */
  spatialAudio: boolean;
  
  /** Music 3D position */
  audioPosition: Phaser.Math.Vector3;
  
  /** Music 3D velocity */
  audioVelocity: Phaser.Math.Vector3;
  
  /** Music rolloff factor */
  rolloffFactor: number;
  
  /** Music reference distance */
  referenceDistance: number;
  
  /** Music max distance */
  maxDistance: number;
  
  /** Music cone inner angle */
  coneInnerAngle: number;
  
  /** Music cone outer angle */
  coneOuterAngle: number;
  
  /** Music cone outer gain */
  coneOuterGain: number;
  
  /** Music filter type */
  filterType: AudioFilterType;
  
  /** Music filter frequency */
  filterFrequency: number;
  
  /** Music filter Q factor */
  filterQ: number;
  
  /** Music filter gain */
  filterGain: number;
  
  /** Music compression threshold */
  compressionThreshold: number;
  
  /** Music compression ratio */
  compressionRatio: number;
  
  /** Music compression attack time */
  compressionAttack: number;
  
  /** Music compression release time */
  compressionRelease: number;
  
  /** Music reverb room size */
  reverbRoomSize: number;
  
  /** Music reverb damping */
  reverbDamping: number;
  
  /** Music reverb wet level */
  reverbWet: number;
  
  /** Music reverb dry level */
  reverbDry: number;
  
  /** Music reverb width */
  reverbWidth: number;
  
  /** Music reverb freeze mode */
  reverbFreeze: boolean;
  
  // ============================================================================
  // MUSIC METHODS
  // ============================================================================
  
  /** Set music genre */
  setGenre(genre: MusicGenre): this;
  
  /** Set music tempo */
  setTempo(tempo: number): this;
  
  /** Set music key signature */
  setKeySignature(keySignature: string): this;
  
  /** Set music time signature */
  setTimeSignature(timeSignature: string): this;
  
  /** Set music mood */
  setMood(mood: MusicMood): this;
  
  /** Set music intensity */
  setIntensity(intensity: MusicIntensity): this;
  
  /** Set music energy */
  setEnergy(energy: number): this;
  
  /** Set music valence */
  setValence(valence: number): this;
  
  /** Set music danceability */
  setDanceability(danceability: number): this;
  
  /** Set music acousticness */
  setAcousticness(acousticness: number): this;
  
  /** Set music instrumentalness */
  setInstrumentalness(instrumentalness: number): this;
  
  /** Set music liveness */
  setLiveness(liveness: number): this;
  
  /** Set music speechiness */
  setSpeechiness(speechiness: number): this;
  
  /** Set music loudness */
  setLoudness(loudness: number): this;
  
  /** Set music dynamic range */
  setDynamicRange(dynamicRange: number): this;
  
  /** Set music beat tracking */
  setBeatTracking(enabled: boolean, sensitivity?: number, threshold?: number): this;
  
  /** Set music crossfade */
  setCrossfade(enabled: boolean, duration?: number, curve?: AudioCurveType): this;
  
  /** Set music playlist position */
  setPlaylistPosition(position: number): this;
  
  /** Set music shuffle mode */
  setShuffleMode(enabled: boolean): this;
  
  /** Set music repeat mode */
  setRepeatMode(mode: MusicRepeatMode): this;
  
  /** Set music auto-play next */
  setAutoPlayNext(enabled: boolean): this;
  
  /** Set music gapless playback */
  setGaplessPlayback(enabled: boolean): this;
  
  /** Set music preload next */
  setPreloadNext(enabled: boolean): this;
  
  /** Set music buffer size */
  setBufferSize(size: number): this;
  
  /** Set music streaming quality */
  setStreamingQuality(quality: AudioQualityLevel): this;
  
  /** Set music adaptive bitrate */
  setAdaptiveBitrate(enabled: boolean): this;
  
  /** Set music offline mode */
  setOfflineMode(enabled: boolean): this;
  
  /** Get music genre */
  getGenre(): string;
  
  /** Get music tempo */
  getTempo(): number;
  
  /** Get music key signature */
  getKeySignature(): string;
  
  /** Get music time signature */
  getTimeSignature(): string;
  
  /** Get music mood */
  getMood(): string;
  
  /** Get music intensity */
  getIntensity(): string;
  
  /** Get music energy */
  getEnergy(): number;
  
  /** Get music valence */
  getValence(): number;
  
  /** Get music danceability */
  getDanceability(): number;
  
  /** Get music acousticness */
  getAcousticness(): number;
  
  /** Get music instrumentalness */
  getInstrumentalness(): number;
  
  /** Get music liveness */
  getLiveness(): number;
  
  /** Get music speechiness */
  getSpeechiness(): number;
  
  /** Get music loudness */
  getLoudness(): number;
  
  /** Get music dynamic range */
  getDynamicRange(): number;
  
  /** Get music frequency spectrum */
  getFrequencySpectrum(): Float32Array;
  
  /** Check if music beat tracking is enabled */
  isBeatTrackingEnabled(): boolean;
  
  /** Get music beat sensitivity */
  getBeatSensitivity(): number;
  
  /** Get music beat threshold */
  getBeatThreshold(): number;
  
  /** Get music beat history */
  getBeatHistory(): number[];
  
  /** Get music current beat */
  getCurrentBeat(): number;
  
  /** Get music beat interval */
  getBeatInterval(): number;
  
  /** Get music next beat time */
  getNextBeatTime(): number;
  
  /** Check if music crossfade is enabled */
  isCrossfadeEnabled(): boolean;
  
  /** Get music crossfade duration */
  getCrossfadeDuration(): number;
  
  /** Get music crossfade curve */
  getCrossfadeCurve(): string;
  
  /** Get music playlist position */
  getPlaylistPosition(): number;
  
  /** Get music playlist total */
  getPlaylistTotal(): number;
  
  /** Check if music shuffle mode is enabled */
  isShuffleModeEnabled(): boolean;
  
  /** Get music repeat mode */
  getRepeatMode(): string;
  
  /** Check if music auto-play next is enabled */
  isAutoPlayNextEnabled(): boolean;
  
  /** Check if music gapless playback is enabled */
  isGaplessPlaybackEnabled(): boolean;
  
  /** Check if music preload next is enabled */
  isPreloadNextEnabled(): boolean;
  
  /** Get music buffer size */
  getBufferSize(): number;
  
  /** Get music streaming quality */
  getStreamingQuality(): string;
  
  /** Check if music adaptive bitrate is enabled */
  isAdaptiveBitrateEnabled(): boolean;
  
  /** Check if music offline mode is enabled */
  isOfflineModeEnabled(): boolean;
  
  /** Get music download progress */
  getDownloadProgress(): number;
  
  /** Check if music is downloaded */
  isDownloaded(): boolean;
  
  /** Check if music is streaming */
  isStreaming(): boolean;
  
  /** Check if music is buffering */
  isBuffering(): boolean;
  
  /** Get music buffer health */
  getBufferHealth(): number;
  
  /** Get music network quality */
  getNetworkQuality(): string;
  
  /** Get music bitrate */
  getBitrate(): number;
  
  /** Get music codec */
  getCodec(): string;
  
  /** Get music sample rate */
  getSampleRate(): number;
  
  /** Get music bit depth */
  getBitDepth(): number;
  
  /** Get music channels */
  getChannels(): string;
  
  /** Get music format */
  getFormat(): string;
  
  /** Get music file size */
  getFileSize(): number;
  
  /** Get music duration */
  getDuration(): number;
  
  /** Get music current time */
  getCurrentTime(): number;
  
  /** Get music remaining time */
  getRemainingTime(): number;
  
  /** Get music progress percentage */
  getProgress(): number;
  
  /** Check if music is paused */
  isPaused(): boolean;
  
  /** Check if music is playing */
  isPlaying(): boolean;
  
  /** Check if music is stopped */
  isStopped(): boolean;
  
  /** Check if music is loading */
  isLoading(): boolean;
  
  /** Check if music is ready */
  isReady(): boolean;
  
  /** Check if music has error */
  hasError(): boolean;
  
  /** Get music error message */
  getErrorMessage(): string | null;
  
  /** Get music volume */
  getVolume(): number;
  
  /** Check if music is muted */
  isMuted(): boolean;
  
  /** Check if music is looping */
  isLooping(): boolean;
  
  /** Get music pitch */
  getPitch(): number;
  
  /** Get music playback rate */
  getPlaybackRate(): number;
  
  /** Get music pan */
  getPan(): number;
  
  /** Get music fade in duration */
  getFadeInDuration(): number;
  
  /** Get music fade out duration */
  getFadeOutDuration(): number;
  
  /** Get music crossfade duration */
  getCrossfadeDuration(): number;
  
  /** Check if music spatial audio is enabled */
  isSpatialAudio(): boolean;
  
  /** Get music 3D position */
  getAudioPosition(): Phaser.Math.Vector3;
  
  /** Get music 3D velocity */
  getAudioVelocity(): Phaser.Math.Vector3;
  
  /** Get music rolloff factor */
  getRolloffFactor(): number;
  
  /** Get music reference distance */
  getReferenceDistance(): number;
  
  /** Get music max distance */
  getMaxDistance(): number;
  
  /** Get music cone parameters */
  getAudioCone(): { innerAngle: number; outerAngle: number; outerGain: number };
  
  /** Get music filter parameters */
  getAudioFilter(): { type: AudioFilterType; frequency: number; Q: number; gain: number };
  
  /** Get music compression parameters */
  getAudioCompression(): { threshold: number; ratio: number; attack: number; release: number };
  
  /** Get music reverb parameters */
  getAudioReverb(): { roomSize: number; damping: number; wet: number; dry: number; width: number; freeze: boolean };
  
  /** Play music */
  play(): this;
  
  /** Pause music */
  pause(): this;
  
  /** Stop music */
  stop(): this;
  
  /** Resume music */
  resume(): this;
  
  /** Restart music */
  restart(): this;
  
  /** Seek to specific time */
  seek(time: number): this;
  
  /** Fade in music */
  fadeIn(duration?: number): this;
  
  /** Fade out music */
  fadeOut(duration?: number): this;
  
  /** Crossfade to another music */
  crossfadeTo(other: IMusic, duration?: number): this;
  
  /** Update music spatial positioning */
  updateSpatialPosition(): void;
  
  /** Update music filters */
  updateAudioFilters(): void;
  
  /** Update music effects */
  updateAudioEffects(): void;
  
  /** Get music waveform data */
  getWaveformData(): Float32Array;
  
  /** Get music frequency data */
  getFrequencyData(): Uint8Array;
  
  /** Get music time domain data */
  getTimeDomainData(): Float32Array;
  
  /** Check if music is loaded */
  isLoaded(): boolean;
  
  /** Check if music is ready to play */
  isReady(): boolean;
  
  /** Get music loading progress */
  getLoadingProgress(): number;
  
  /** Get music error state */
  getError(): string | null;
  
  /** Clear music error */
  clearError(): this;
  
  /** Play next music in playlist */
  playNext(): this;
  
  /** Play previous music in playlist */
  playPrevious(): this;
  
  /** Skip to specific music in playlist */
  skipTo(index: number): this;
  
  /** Shuffle playlist */
  shufflePlaylist(): this;
  
  /** Unshuffle playlist */
  unshufflePlaylist(): this;
  
  /** Repeat current music */
  repeatCurrent(): this;
  
  /** Repeat all music */
  repeatAll(): this;
  
  /** Stop repeating */
  stopRepeating(): this;
  
  /** Download music for offline playback */
  downloadMusic(): Promise<this>;
  
  /** Delete downloaded music */
  deleteDownloadedMusic(): this;
  
  /** Get music metadata */
  getMetadata(): { title?: string; artist?: string; album?: string; year?: number; genre?: string; duration?: number };
  
  /** Set music metadata */
  setMetadata(metadata: { title?: string; artist?: string; album?: string; year?: number; genre?: string; duration?: number }): this;
  
  /** Analyze music for beat detection */
  analyzeMusic(): Promise<this>;
  
  /** Get music analysis results */
  getAnalysisResults(): { tempo: number; key: string; timeSignature: string; energy: number; valence: number; danceability: number };
  
  /** Set music analysis results */
  setAnalysisResults(results: { tempo: number; key: string; timeSignature: string; energy: number; valence: number; danceability: number }): this;
  
  /** Update music beat tracking */
  updateBeatTracking(): void;
  
  /** Get music beat at time */
  getBeatAtTime(time: number): number;
  
  /** Get music time at beat */
  getTimeAtBeat(beat: number): number;
  
  /** Get music beat strength */
  getBeatStrength(): number;
  
  /** Get music beat confidence */
  getBeatConfidence(): number;
  
  /** Get music tempo change */
  getTempoChange(): number;
  
  /** Get music tempo confidence */
  getTempoConfidence(): number;
  
  /** Get music key change */
  getKeyChange(): string;
  
  /** Get music key confidence */
  getKeyConfidence(): number;
  
  /** Get music time signature change */
  getTimeSignatureChange(): string;
  
  /** Get music time signature confidence */
  getTimeSignatureConfidence(): number;
  
  /** Get music energy change */
  getEnergyChange(): number;
  
  /** Get music valence change */
  getValenceChange(): number;
  
  /** Get music danceability change */
  getDanceabilityChange(): number;
  
  /** Get music acousticness change */
  getAcousticnessChange(): number;
  
  /** Get music instrumentalness change */
  getInstrumentalnessChange(): number;
  
  /** Get music liveness change */
  getLivenessChange(): number;
  
  /** Get music speechiness change */
  getSpeechinessChange(): number;
  
  /** Get music loudness change */
  getLoudnessChange(): number;
  
  /** Get music dynamic range change */
  getDynamicRangeChange(): number;
  
  /** Get music frequency spectrum change */
  getFrequencySpectrumChange(): Float32Array;
  
  /** Get music beat history change */
  getBeatHistoryChange(): number[];
  
  /** Get music current beat change */
  getCurrentBeatChange(): number;
  
  /** Get music beat interval change */
  getBeatIntervalChange(): number;
  
  /** Get music next beat time change */
  getNextBeatTimeChange(): number;
  
  /** Get music crossfade enabled change */
  getCrossfadeEnabledChange(): boolean;
  
  /** Get music crossfade duration change */
  getCrossfadeDurationChange(): number;
  
  /** Get music crossfade curve change */
  getCrossfadeCurveChange(): string;
  
  /** Get music playlist position change */
  getPlaylistPositionChange(): number;
  
  /** Get music playlist total change */
  getPlaylistTotalChange(): number;
  
  /** Get music shuffle mode change */
  getShuffleModeChange(): boolean;
  
  /** Get music repeat mode change */
  getRepeatModeChange(): string;
  
  /** Get music auto-play next change */
  getAutoPlayNextChange(): boolean;
  
  /** Get music gapless playback change */
  getGaplessPlaybackChange(): boolean;
  
  /** Get music preload next change */
  getPreloadNextChange(): boolean;
  
  /** Get music buffer size change */
  getBufferSizeChange(): number;
  
  /** Get music streaming quality change */
  getStreamingQualityChange(): string;
  
  /** Get music adaptive bitrate change */
  getAdaptiveBitrateChange(): boolean;
  
  /** Get music offline mode change */
  getOfflineModeChange(): boolean;
  
  /** Get music download progress change */
  getDownloadProgressChange(): number;
  
  /** Get music is downloaded change */
  getIsDownloadedChange(): boolean;
  
  /** Get music is streaming change */
  getIsStreamingChange(): boolean;
  
  /** Get music is buffering change */
  getIsBufferingChange(): boolean;
  
  /** Get music buffer health change */
  getBufferHealthChange(): number;
  
  /** Get music network quality change */
  getNetworkQualityChange(): string;
  
  /** Get music bitrate change */
  getBitrateChange(): number;
  
  /** Get music codec change */
  getCodecChange(): string;
  
  /** Get music sample rate change */
  getSampleRateChange(): number;
  
  /** Get music bit depth change */
  getBitDepthChange(): number;
  
  /** Get music channels change */
  getChannelsChange(): string;
  
  /** Get music format change */
  getFormatChange(): string;
  
  /** Get music file size change */
  getFileSizeChange(): number;
  
  /** Get music duration change */
  getDurationChange(): number;
  
  /** Get music current time change */
  getCurrentTimeChange(): number;
  
  /** Get music remaining time change */
  getRemainingTimeChange(): number;
  
  /** Get music progress change */
  getProgressChange(): number;
  
  /** Get music is paused change */
  getIsPausedChange(): boolean;
  
  /** Get music is playing change */
  getIsPlayingChange(): boolean;
  
  /** Get music is stopped change */
  getIsStoppedChange(): boolean;
  
  /** Get music is loading change */
  getIsLoadingChange(): boolean;
  
  /** Get music is ready change */
  getIsReadyChange(): boolean;
  
  /** Get music has error change */
  getHasErrorChange(): boolean;
  
  /** Get music error message change */
  getErrorMessageChange(): string | null;
  
  /** Get music volume change */
  getVolumeChange(): number;
  
  /** Get music muted change */
  getMutedChange(): boolean;
  
  /** Get music loop change */
  getLoopChange(): boolean;
  
  /** Get music pitch change */
  getPitchChange(): number;
  
  /** Get music playback rate change */
  getPlaybackRateChange(): number;
  
  /** Get music pan change */
  getPanChange(): number;
  
  /** Get music fade in duration change */
  getFadeInDurationChange(): number;
  
  /** Get music fade out duration change */
  getFadeOutDurationChange(): number;
  
  /** Get music crossfade duration change */
  getCrossfadeDurationChange(): number;
  
  /** Get music spatial audio change */
  getSpatialAudioChange(): boolean;
  
  /** Get music 3D position change */
  getAudioPositionChange(): Phaser.Math.Vector3;
  
  /** Get music 3D velocity change */
  getAudioVelocityChange(): Phaser.Math.Vector3;
  
  /** Get music rolloff factor change */
  getRolloffFactorChange(): number;
  
  /** Get music reference distance change */
  getReferenceDistanceChange(): number;
  
  /** Get music max distance change */
  getMaxDistanceChange(): number;
  
  /** Get music cone parameters change */
  getAudioConeChange(): { innerAngle: number; outerAngle: number; outerGain: number };
  
  /** Get music filter parameters change */
  getAudioFilterChange(): { type: AudioFilterType; frequency: number; Q: number; gain: number };
  
  /** Get music compression parameters change */
  getAudioCompressionChange(): { threshold: number; ratio: number; attack: number; release: number };
  
  /** Get music reverb parameters change */
  getAudioReverbChange(): { roomSize: number; damping: number; wet: number; dry: number; width: number; freeze: boolean };
}
