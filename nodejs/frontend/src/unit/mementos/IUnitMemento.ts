/**
 * Unit Memento Interface
 * Allows saving and restoring unit states
 */
export interface IUnitMemento {
  /** Get the saved state */
  getState(): any
  
  /** Get the timestamp when the memento was created */
  getTimestamp(): Date
  
  /** Get the unit ID this memento belongs to */
  getUnitId(): string
  
  /** Get the memento version */
  getVersion(): string
  
  /** Get metadata about the saved state */
  getMetadata(): {
    unitType: string
    stateSize: number
    checksum: string
    description: string
  }
  
  /** Validate the memento integrity */
  validate(): boolean
  
  /** Get the memento size in bytes */
  getSize(): number
}

/**
 * Unit Memento Implementation
 * Concrete implementation of the memento pattern
 */
export class UnitMemento implements IUnitMemento {
  private readonly state: any
  private readonly timestamp: Date
  private readonly unitId: string
  private readonly version: string
  private readonly metadata: {
    unitType: string
    stateSize: number
    checksum: string
    description: string
  }
  
  constructor(
    state: any,
    unitId: string,
    unitType: string,
    description: string = '',
    version: string = '1.0.0'
  ) {
    this.state = state
    this.timestamp = new Date()
    this.unitId = unitId
    this.version = version
    
    // Calculate metadata
    const stateString = JSON.stringify(state)
    this.metadata = {
      unitType,
      stateSize: stateString.length,
      checksum: this.calculateChecksum(stateString),
      description
    }
  }
  
  getState(): any {
    return this.state
  }
  
  getTimestamp(): Date {
    return this.timestamp
  }
  
  getUnitId(): string {
    return this.unitId
  }
  
  getVersion(): string {
    return this.version
  }
  
  getMetadata() {
    return { ...this.metadata }
  }
  
  validate(): boolean {
    const stateString = JSON.stringify(this.state)
    const currentChecksum = this.calculateChecksum(stateString)
    return currentChecksum === this.metadata.checksum
  }
  
  getSize(): number {
    return this.metadata.stateSize
  }
  
  private calculateChecksum(str: string): string {
    // Simple checksum calculation - in production, use a proper hash function
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString(16)
  }
}

/**
 * Unit Memento Caretaker
 * Manages memento storage and retrieval
 */
export interface IUnitMementoCaretaker {
  /** Save a memento */
  saveMemento(memento: IUnitMemento): void
  
  /** Get a memento by unit ID and timestamp */
  getMemento(unitId: string, timestamp: Date): IUnitMemento | undefined
  
  /** Get all mementos for a unit */
  getMementosForUnit(unitId: string): IUnitMemento[]
  
  /** Get the latest memento for a unit */
  getLatestMemento(unitId: string): IUnitMemento | undefined
  
  /** Restore a unit to a specific memento state */
  restoreToMemento(unitId: string, memento: IUnitMemento): boolean
  
  /** Delete a memento */
  deleteMemento(memento: IUnitMemento): boolean
  
  /** Clear all mementos for a unit */
  clearMementosForUnit(unitId: string): void
  
  /** Get memento statistics */
  getMementoStats(): {
    totalMementos: number
    totalSize: number
    unitsWithMementos: number
    oldestMemento: Date | undefined
    newestMemento: Date | undefined
  }
}
