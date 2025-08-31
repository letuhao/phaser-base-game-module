import type { IUnitMementoCaretaker, IUnitMemento } from './IUnitMemento';
import { UnitMemento } from './IUnitMemento';
import { Logger } from '../../core/Logger';

/**
 * Unit Memento Caretaker Implementation
 * Manages memento storage, retrieval, and restoration
 * Provides advanced features like history management and undo/redo
 */
export class UnitMementoCaretaker implements IUnitMementoCaretaker {
  private mementos: Map<string, IUnitMemento[]> = new Map();
  private maxMementosPerUnit: number = 50;
  private maxTotalMementos: number = 1000;
  private undoStack: Map<string, IUnitMemento[]> = new Map();
  private redoStack: Map<string, IUnitMemento[]> = new Map();
  private readonly logger: Logger = Logger.getInstance();

  /**
   * Save a memento for a unit
   */
  saveMemento(memento: IUnitMemento): void {
    const unitId = memento.getUnitId();

    if (!this.mementos.has(unitId)) {
      this.mementos.set(unitId, []);
    }

    const unitMementos = this.mementos.get(unitId)!;

    // Add new memento
    unitMementos.push(memento);

    // Maintain maximum mementos per unit
    if (unitMementos.length > this.maxMementosPerUnit) {
      const removed = unitMementos.shift();
      if (removed) {
        this.logger.debug(
          'UnitMementoCaretaker',
          'saveMemento',
          `Removed old memento for unit ${unitId}: ${removed.getTimestamp()}`
        );
      }
    }

    // Clear redo stack when new memento is saved
    this.redoStack.delete(unitId);

    // Maintain total mementos limit
    this.enforceTotalMementosLimit();

    this.logger.debug(
      'UnitMementoCaretaker',
      'saveMemento',
      `Saved memento for unit ${unitId}: ${memento.getTimestamp()}`
    );
  }

  /**
   * Get a memento by unit ID and timestamp
   */
  getMemento(unitId: string, timestamp: Date): IUnitMemento | undefined {
    const unitMementos = this.mementos.get(unitId);
    if (!unitMementos) return undefined;

    return unitMementos.find(memento => memento.getTimestamp().getTime() === timestamp.getTime());
  }

  /**
   * Get all mementos for a unit
   */
  getMementosForUnit(unitId: string): IUnitMemento[] {
    return this.mementos.get(unitId) || [];
  }

  /**
   * Get the latest memento for a unit
   */
  getLatestMemento(unitId: string): IUnitMemento | undefined {
    const unitMementos = this.mementos.get(unitId);
    if (!unitMementos || unitMementos.length === 0) return undefined;

    return unitMementos[unitMementos.length - 1];
  }

  /**
   * Restore a unit to a specific memento state
   */
  restoreToMemento(unitId: string, memento: IUnitMemento): boolean {
    if (!memento.validate()) {
      this.logger.error(
        'UnitMementoCaretaker',
        'restoreToMemento',
        `Cannot restore invalid memento for unit ${unitId}`
      );
      return false;
    }

    // Save current state to undo stack before restoration
    const currentMemento = this.getLatestMemento(unitId);
    if (currentMemento) {
      this.addToUndoStack(unitId, currentMemento);
    }

    // Add target memento to undo stack
    this.addToUndoStack(unitId, memento);

    this.logger.debug(
      'UnitMementoCaretaker',
      'restoreToMemento',
      `Restored unit ${unitId} to memento: ${memento.getTimestamp()}`
    );
    return true;
  }

  /**
   * Delete a specific memento
   */
  deleteMemento(memento: IUnitMemento): boolean {
    const unitId = memento.getUnitId();
    const unitMementos = this.mementos.get(unitId);

    if (!unitMementos) return false;

    const index = unitMementos.findIndex(
      m => m.getTimestamp().getTime() === memento.getTimestamp().getTime()
    );

    if (index !== -1) {
      unitMementos.splice(index, 1);
      this.logger.debug(
        'UnitMementoCaretaker',
        'deleteMemento',
        `Deleted memento for unit ${unitId}: ${memento.getTimestamp()}`
      );
      return true;
    }

    return false;
  }

  /**
   * Clear all mementos for a unit
   */
  clearMementosForUnit(unitId: string): void {
    this.mementos.delete(unitId);
    this.undoStack.delete(unitId);
    this.redoStack.delete(unitId);
    this.logger.debug(
      'UnitMementoCaretaker',
      'clearMementosForUnit',
      `Cleared all mementos for unit ${unitId}`
    );
  }

  /**
   * Get memento statistics
   */
  getMementoStats(): {
    totalMementos: number;
    totalSize: number;
    unitsWithMementos: number;
    oldestMemento: Date | undefined;
    newestMemento: Date | undefined;
  } {
    let totalMementos = 0;
    let totalSize = 0;
    let oldestMemento: Date | undefined;
    let newestMemento: Date | undefined;

    for (const unitMementos of this.mementos.values()) {
      totalMementos += unitMementos.length;

      for (const memento of unitMementos) {
        totalSize += memento.getSize();

        const timestamp = memento.getTimestamp();
        if (!oldestMemento || timestamp < oldestMemento) {
          oldestMemento = timestamp;
        }
        if (!newestMemento || timestamp > newestMemento) {
          newestMemento = timestamp;
        }
      }
    }

    return {
      totalMementos,
      totalSize,
      unitsWithMementos: this.mementos.size,
      oldestMemento,
      newestMemento,
    };
  }

  /**
   * Undo the last operation for a unit
   */
  undo(unitId: string): IUnitMemento | undefined {
    const undoStack = this.undoStack.get(unitId);
    if (!undoStack || undoStack.length === 0) return undefined;

    const memento = undoStack.pop()!;

    // Add to redo stack
    if (!this.redoStack.has(unitId)) {
      this.redoStack.set(unitId, []);
    }
    this.redoStack.get(unitId)!.push(memento);

    this.logger.debug(
      'UnitMementoCaretaker',
      'undo',
      `Undo operation for unit ${unitId}: ${memento.getTimestamp()}`
    );
    return memento;
  }

  /**
   * Redo the last undone operation for a unit
   */
  redo(unitId: string): IUnitMemento | undefined {
    const redoStack = this.redoStack.get(unitId);
    if (!redoStack || redoStack.length === 0) return undefined;

    const memento = redoStack.pop()!;

    // Add back to undo stack
    if (!this.undoStack.has(unitId)) {
      this.undoStack.set(unitId, []);
    }
    this.undoStack.get(unitId)!.push(memento);

    this.logger.debug(
      'UnitMementoCaretaker',
      'redo',
      `Redo operation for unit ${unitId}: ${memento.getTimestamp()}`
    );
    return memento;
  }

  /**
   * Check if undo is available for a unit
   */
  canUndo(unitId: string): boolean {
    const undoStack = this.undoStack.get(unitId);
    return undoStack ? undoStack.length > 0 : false;
  }

  /**
   * Check if redo is available for a unit
   */
  canRedo(unitId: string): boolean {
    const redoStack = this.redoStack.get(unitId);
    return redoStack ? redoStack.length > 0 : false;
  }

  /**
   * Get undo/redo history for a unit
   */
  getHistory(unitId: string): {
    undo: IUnitMemento[];
    redo: IUnitMemento[];
  } {
    return {
      undo: this.undoStack.get(unitId) || [],
      redo: this.redoStack.get(unitId) || [],
    };
  }

  /**
   * Set maximum mementos per unit
   */
  setMaxMementosPerUnit(max: number): void {
    this.maxMementosPerUnit = Math.max(1, max);
    this.enforceMementosPerUnitLimit();
  }

  /**
   * Set maximum total mementos
   */
  setMaxTotalMementos(max: number): void {
    this.maxTotalMementos = Math.max(1, max);
    this.enforceTotalMementosLimit();
  }

  /**
   * Export mementos for a unit (for backup/transfer)
   */
  exportMementos(unitId: string): string {
    const unitMementos = this.mementos.get(unitId) || [];
    const exportData = {
      unitId,
      exportDate: new Date().toISOString(),
      mementos: unitMementos.map(memento => ({
        state: memento.getState(),
        timestamp: memento.getTimestamp().toISOString(),
        version: memento.getVersion(),
        metadata: memento.getMetadata(),
      })),
    };

    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Import mementos for a unit (for backup/transfer)
   */
  importMementos(exportData: string): boolean {
    try {
      const data = JSON.parse(exportData);
      const { unitId, mementos } = data;

      if (!unitId || !Array.isArray(mementos)) {
        throw new Error('Invalid export data format');
      }

      // Clear existing mementos for this unit
      this.clearMementosForUnit(unitId);

      // Import mementos
      for (const mementoData of mementos) {
        const memento = new UnitMemento(
          mementoData.state,
          unitId,
          mementoData.metadata.unitType,
          mementoData.metadata.description,
          mementoData.version
        );
        this.saveMemento(memento);
      }

      this.logger.debug(
        'UnitMementoCaretaker',
        'importMementos',
        `Imported ${mementos.length} mementos for unit ${unitId}`
      );
      return true;
    } catch (error) {
      this.logger.error('UnitMementoCaretaker', 'importMementos', 'Import failed', {
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  }

  /**
   * Add memento to undo stack
   */
  private addToUndoStack(unitId: string, memento: IUnitMemento): void {
    if (!this.undoStack.has(unitId)) {
      this.undoStack.set(unitId, []);
    }

    const undoStack = this.undoStack.get(unitId)!;
    undoStack.push(memento);

    // Limit undo stack size
    if (undoStack.length > this.maxMementosPerUnit) {
      undoStack.shift();
    }
  }

  /**
   * Enforce maximum mementos per unit limit
   */
  private enforceMementosPerUnitLimit(): void {
    for (const [unitId, unitMementos] of this.mementos.entries()) {
      while (unitMementos.length > this.maxMementosPerUnit) {
        const removed = unitMementos.shift();
        if (removed) {
          this.logger.debug(
            'UnitMementoCaretaker',
            'enforceMementosPerUnitLimit',
            `Enforced limit: removed memento for unit ${unitId}`
          );
        }
      }
    }
  }

  /**
   * Enforce maximum total mementos limit
   */
  private enforceTotalMementosLimit(): void {
    const stats = this.getMementoStats();

    if (stats.totalMementos <= this.maxTotalMementos) return;

    // Remove oldest mementos across all units
    const allMementos: Array<{ unitId: string; memento: IUnitMemento }> = [];

    for (const [unitId, unitMementos] of this.mementos.entries()) {
      for (const memento of unitMementos) {
        allMementos.push({ unitId, memento });
      }
    }

    // Sort by timestamp (oldest first)
    allMementos.sort(
      (a, b) => a.memento.getTimestamp().getTime() - b.memento.getTimestamp().getTime()
    );

    // Remove oldest mementos
    const toRemove = allMementos.slice(0, stats.totalMementos - this.maxTotalMementos);

    for (const { unitId, memento } of toRemove) {
      this.deleteMemento(memento);
    }

    this.logger.debug(
      'UnitMementoCaretaker',
      'enforceTotalMementosLimit',
      `Enforced total limit: removed ${toRemove.length} oldest mementos`
    );
  }
}
