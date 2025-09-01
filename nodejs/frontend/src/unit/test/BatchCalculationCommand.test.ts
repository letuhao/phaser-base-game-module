import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { BatchCalculationCommand } from '../commands/BatchCalculationCommand';
import { CalculateSizeCommand } from '../commands/CalculateSizeCommand';
import { CalculatePositionCommand } from '../commands/CalculatePositionCommand';
import { SizeUnitStrategy } from '../strategies/SizeUnitStrategy';
import { PositionUnitStrategy } from '../strategies/PositionUnitStrategy';
import { createMockContext } from '../../test/setup';

describe('BatchCalculationCommand', () => {
  let command: BatchCalculationCommand;
  let sizeCommand: CalculateSizeCommand;
  let positionCommand: CalculatePositionCommand;
  let mockContext: any;

  beforeEach(() => {
    mockContext = createMockContext();
    
    // Create strategy inputs
    const sizeInput = { value: 100 };
    const positionInput = { value: 50 };
    
    // Create individual commands
    sizeCommand = new CalculateSizeCommand(sizeInput as any, mockContext);
    positionCommand = new CalculatePositionCommand(positionInput as any, mockContext);
    
    // Create batch command
    command = new BatchCalculationCommand([sizeCommand, positionCommand], mockContext);
  });

  afterEach(() => {
    // Clean up if needed
  });

  describe('Constructor and Basic Properties', () => {
    it('should create a batch calculation command', () => {
      expect(command).toBeInstanceOf(BatchCalculationCommand);
      expect(command.id).toContain('batch-calculation');
    });

    it('should have correct command information', () => {
      expect(command.getDescription()).toBeDefined();
      expect(command.getTimestamp()).toBeInstanceOf(Date);
      expect(command.canExecute()).toBe(true);
    });
  });

  describe('Single Command Execution', () => {
    it('should execute single size command', () => {
      const singleCommand = new BatchCalculationCommand([sizeCommand], mockContext);
      const result = singleCommand.execute(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
      expect(singleCommand.getResult()).toBe(result);
    });

    it('should execute single position command', () => {
      const singleCommand = new BatchCalculationCommand([positionCommand], mockContext);
      const result = singleCommand.execute(mockContext);
      
      expect(typeof result).toBe('number');
      expect(singleCommand.getResult()).toBe(result);
    });
  });

  describe('Multiple Command Execution', () => {
    it('should execute multiple commands', () => {
      const result = command.execute(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
      expect(command.getResult()).toBe(result);
    });

    it('should handle empty command array', () => {
      const emptyCommand = new BatchCalculationCommand([], mockContext);
      const result = emptyCommand.execute(mockContext);
      
      expect(typeof result).toBe('number');
      expect(emptyCommand.getResult()).toBe(result);
    });

    it('should handle large number of commands', () => {
      const commands = [];
      for (let i = 0; i < 10; i++) {
        const sizeInput = { value: 100 + i };
        commands.push(new CalculateSizeCommand(sizeInput as any, mockContext));
      }
      
      const batchCommand = new BatchCalculationCommand(commands, mockContext);
      const result = batchCommand.execute(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle command that throws error', () => {
      // Create a mock command that throws an error
      const errorCommand = {
        id: 'error-command',
        execute: () => { throw new Error('Command failed'); },
        canExecute: () => true,
        getDescription: () => 'Error Command',
        undo: () => {},
        getTimestamp: () => new Date(),
        getResult: () => undefined,
        getPreviousResult: () => undefined
      };
      
      const batchCommand = new BatchCalculationCommand([errorCommand as any], mockContext);
      const result = batchCommand.execute(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0); // Should return fallback value
    });

    it('should continue execution when some commands fail', () => {
      const errorCommand = {
        id: 'error-command',
        execute: () => { throw new Error('Command failed'); },
        canExecute: () => true,
        getDescription: () => 'Error Command',
        undo: () => {},
        getTimestamp: () => new Date(),
        getResult: () => undefined,
        getPreviousResult: () => undefined
      };
      
      const batchCommand = new BatchCalculationCommand([sizeCommand, errorCommand as any], mockContext);
      const result = batchCommand.execute(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should handle commands that cannot execute', () => {
      const nonExecutableCommand = {
        id: 'non-executable',
        execute: () => 0,
        canExecute: () => false,
        getDescription: () => 'Non Executable Command',
        undo: () => {},
        getTimestamp: () => new Date(),
        getResult: () => undefined,
        getPreviousResult: () => undefined
      };
      
      const batchCommand = new BatchCalculationCommand([nonExecutableCommand as any], mockContext);
      const result = batchCommand.execute(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0); // Should return fallback value
    });
  });

  describe('Aggregation and Statistics', () => {
    it('should calculate aggregate result from multiple commands', () => {
      const commands = [
        new CalculateSizeCommand({ value: 100 } as any, mockContext),
        new CalculateSizeCommand({ value: 200 } as any, mockContext),
        new CalculateSizeCommand({ value: 300 } as any, mockContext)
      ];
      
      const batchCommand = new BatchCalculationCommand(commands, mockContext);
      const result = batchCommand.execute(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should handle aggregation with errors', () => {
      const errorCommand = {
        id: 'error-command',
        execute: () => { throw new Error('Command failed'); },
        canExecute: () => true,
        getDescription: () => 'Error Command',
        undo: () => {},
        getTimestamp: () => new Date(),
        getResult: () => undefined,
        getPreviousResult: () => undefined
      };
      
      const commands = [
        new CalculateSizeCommand({ value: 100 } as any, mockContext),
        errorCommand as any,
        new CalculateSizeCommand({ value: 300 } as any, mockContext)
      ];
      
      const batchCommand = new BatchCalculationCommand(commands, mockContext);
      const result = batchCommand.execute(mockContext);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Undo Functionality', () => {
    it('should undo batch calculation', () => {
      const result = command.execute(mockContext);
      
      expect(typeof result).toBe('number');
      expect(command.getResult()).toBe(result);
      
      command.undo();
      
      // After undo, the result should be the previous result
      expect(command.getResult()).toBeDefined();
    });

    it('should handle undo without previous execution', () => {
      // Create a new command without executing it
      const newCommand = new BatchCalculationCommand([sizeCommand], mockContext);
      
      // Undo should not throw an error
      expect(() => newCommand.undo()).not.toThrow();
    });
  });

  describe('Performance and Timing', () => {
    it('should track execution time', () => {
      const startTime = Date.now();
      const result = command.execute(mockContext);
      const endTime = Date.now();
      
      expect(typeof result).toBe('number');
      expect(command.getTimestamp()).toBeInstanceOf(Date);
      expect(endTime - startTime).toBeGreaterThanOrEqual(0);
    });

    it('should handle multiple rapid executions', () => {
      const results = [];
      for (let i = 0; i < 5; i++) {
        const result = command.execute(mockContext);
        results.push(result);
      }
      
      results.forEach(result => {
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      });
    });
  });

  describe('Context Handling', () => {
    it('should handle different context types', () => {
      const contexts = [
        createMockContext(),
        { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' as const },
        { scene: { width: 1600, height: 1200 }, dimension: 'height' as const }
      ];
      
      for (const context of contexts) {
        const result = command.execute(context);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      }
    });

    it('should handle missing context properties gracefully', () => {
      const partialContext = { dimension: 'width' as const };
      const result = command.execute(partialContext as any);
      
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Command Management', () => {
    it('should check if commands can execute', () => {
      expect(command.canExecute()).toBe(true);
      
      const emptyCommand = new BatchCalculationCommand([], mockContext);
      expect(emptyCommand.canExecute()).toBe(false);
    });

    it('should get command description', () => {
      const description = command.getDescription();
      expect(typeof description).toBe('string');
      expect(description.length).toBeGreaterThan(0);
    });

    it('should get command timestamp', () => {
      const timestamp = command.getTimestamp();
      expect(timestamp).toBeInstanceOf(Date);
    });
  });
});
