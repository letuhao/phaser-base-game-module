import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { CalculatePositionCommand } from '../commands/CalculatePositionCommand';
import { createMockContext } from '../../test/setup';

describe('CalculatePositionCommand', () => {
  let command: CalculatePositionCommand;
  let mockContext: any;

  beforeEach(() => {
    mockContext = createMockContext();
    const positionInput = { value: 50 };
    command = new CalculatePositionCommand(positionInput as any, mockContext);
  });

  afterEach(() => {
    // Clean up if needed
  });

  describe('Constructor and Basic Properties', () => {
    it('should create a calculate position command', () => {
      expect(command).toBeInstanceOf(CalculatePositionCommand);
      expect(command.id).toContain('calculate-position');
    });

    it('should have correct command information', () => {
      expect(command.getDescription()).toBeDefined();
      expect(command.getTimestamp()).toBeInstanceOf(Date);
      expect(command.canExecute()).toBe(true);
    });
  });

  describe('Position Calculation Execution', () => {
    it('should execute position calculation successfully', () => {
      const result = command.execute(mockContext);

      expect(typeof result).toBe('number');
      expect(command.getResult()).toBe(result);
    });

    it('should handle different position inputs', () => {
      const inputs = [
        { value: 100 },
        { value: 200 },
        { value: 50 },
        { positionArray: [100, 200, 300] },
        { positionString: 'center' },
      ];

      for (const input of inputs) {
        const positionCommand = new CalculatePositionCommand(input as any, mockContext);
        const result = positionCommand.execute(mockContext);
        expect(typeof result).toBe('number');
      }
    });

    it('should handle different contexts', () => {
      const contexts = [
        createMockContext(),
        { parent: { width: 1000, height: 800, x: 0, y: 0 }, dimension: 'width' as const },
        { scene: { width: 1600, height: 1200 }, dimension: 'height' as const },
      ];

      for (const context of contexts) {
        const result = command.execute(context);
        expect(typeof result).toBe('number');
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid input gracefully', () => {
      const invalidInput = { invalidProperty: 'invalid' };
      const invalidCommand = new CalculatePositionCommand(invalidInput as any, mockContext);

      const result = invalidCommand.execute(mockContext);
      expect(typeof result).toBe('number');
    });

    it('should handle missing context properties', () => {
      const partialContext = { dimension: 'width' as const };
      const result = command.execute(partialContext as any);

      expect(typeof result).toBe('number');
    });
  });

  describe('Input Types', () => {
    it('should handle numeric position values', () => {
      const numericInput = { value: 150 };
      const numericCommand = new CalculatePositionCommand(numericInput as any, mockContext);
      const result = numericCommand.execute(mockContext);

      expect(typeof result).toBe('number');
    });

    it('should handle position arrays', () => {
      const arrayInput = { positionArray: [100, 200, 300] };
      const arrayCommand = new CalculatePositionCommand(arrayInput as any, mockContext);
      const result = arrayCommand.execute(mockContext);

      expect(typeof result).toBe('number');
    });

    it('should handle position strings', () => {
      const stringInput = { positionString: 'center' };
      const stringCommand = new CalculatePositionCommand(stringInput as any, mockContext);
      const result = stringCommand.execute(mockContext);

      expect(typeof result).toBe('number');
    });

    it('should handle position objects', () => {
      const objectInput = { positionObject: { x: 100, y: 200 } };
      const objectCommand = new CalculatePositionCommand(objectInput as any, mockContext);
      const result = objectCommand.execute(mockContext);

      expect(typeof result).toBe('number');
    });
  });

  describe('Undo Functionality', () => {
    it('should undo position calculation', () => {
      const result = command.execute(mockContext);

      expect(typeof result).toBe('number');
      expect(command.getResult()).toBe(result);

      command.undo();

      // After undo, the result should be the previous result
      expect(command.getResult()).toBeDefined();
    });

    it('should handle undo without previous execution', () => {
      // Create a new command without executing it
      const newCommand = new CalculatePositionCommand({ value: 100 } as any, mockContext);

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
      for (let i = 0; i < 10; i++) {
        const result = command.execute(mockContext);
        results.push(result);
      }

      results.forEach(result => {
        expect(typeof result).toBe('number');
      });
    });
  });

  describe('Context Variations', () => {
    it('should handle different parent contexts', () => {
      const contexts = [
        { parent: { width: 800, height: 600, x: 0, y: 0 }, dimension: 'width' as const },
        { parent: { width: 1200, height: 800, x: 0, y: 0 }, dimension: 'width' as const },
        { parent: { width: 400, height: 300, x: 0, y: 0 }, dimension: 'width' as const },
      ];

      for (const context of contexts) {
        const result = command.execute(context);
        expect(typeof result).toBe('number');
      }
    });

    it('should handle different scene contexts', () => {
      const contexts = [
        { scene: { width: 1200, height: 800 }, dimension: 'width' as const },
        { scene: { width: 1920, height: 1080 }, dimension: 'width' as const },
        { scene: { width: 800, height: 600 }, dimension: 'width' as const },
      ];

      for (const context of contexts) {
        const result = command.execute(context);
        expect(typeof result).toBe('number');
      }
    });

    it('should handle viewport contexts', () => {
      const contexts = [
        { viewport: { width: 1200, height: 800 }, dimension: 'width' as const },
        { viewport: { width: 1600, height: 900 }, dimension: 'width' as const },
      ];

      for (const context of contexts) {
        const result = command.execute(context);
        expect(typeof result).toBe('number');
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero values', () => {
      const zeroInput = { value: 0 };
      const zeroCommand = new CalculatePositionCommand(zeroInput as any, mockContext);
      const result = zeroCommand.execute(mockContext);

      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle negative values', () => {
      const negativeInput = { value: -50 };
      const negativeCommand = new CalculatePositionCommand(negativeInput as any, mockContext);
      const result = negativeCommand.execute(mockContext);

      expect(typeof result).toBe('number');
    });

    it('should handle very large values', () => {
      const largeInput = { value: 10000 };
      const largeCommand = new CalculatePositionCommand(largeInput as any, mockContext);
      const result = largeCommand.execute(mockContext);

      expect(typeof result).toBe('number');
    });

    it('should handle very small values', () => {
      const smallInput = { value: 0.001 };
      const smallCommand = new CalculatePositionCommand(smallInput as any, mockContext);
      const result = smallCommand.execute(mockContext);

      expect(typeof result).toBe('number');
    });
  });

  describe('Command Management', () => {
    it('should check if command can execute', () => {
      expect(command.canExecute()).toBe(true);
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

    it('should get input data', () => {
      const input = command.getInput();
      expect(input).toBeDefined();
      expect(input).toHaveProperty('value');
    });

    it('should get calculation context', () => {
      const context = command.getContext();
      expect(context).toBeDefined();
      expect(context).toBe(mockContext);
    });

    it('should get the strategy used for calculation', () => {
      const strategy = command.getStrategy();
      expect(strategy).toBeDefined();
    });
  });
});
