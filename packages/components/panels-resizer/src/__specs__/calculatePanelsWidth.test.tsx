import { getInitialVector, calculateLeftPanelWidth, calculateRightPanelWidth, InitialVectorOptions } from '../utils';

describe('Utility Functions', () => {
  describe('getInitialVector', () => {
    it('should return 0 when options are undefined', () => {
      const containerWidth = 1000;
      const result = getInitialVector(undefined, containerWidth);
      expect(result).toBe(0);
    });

    it('should calculate vector based on leftPanel option', () => {
      const containerWidth = 1000;
      const options: InitialVectorOptions = { leftPanel: 600 };
      const result = getInitialVector(options, containerWidth);
      expect(result).toBe(600 - 500);
      expect(result).toBe(100);
    });

    it('should calculate vector based on rightPanel option', () => {
      const containerWidth = 1000;
      const options: InitialVectorOptions = { rightPanel: 400 };
      const result = getInitialVector(options, containerWidth);
      expect(result).toBe(500 - 400);
      expect(result).toBe(100);
    });

    it('should return 0 if leftPanel equals half of containerWidth', () => {
      const containerWidth = 800;
      const options: InitialVectorOptions = { leftPanel: 400 };
      const result = getInitialVector(options, containerWidth);
      expect(result).toBe(0);
    });

    it('should return 0 if rightPanel equals half of containerWidth', () => {
      const containerWidth = 800;
      const options: InitialVectorOptions = { rightPanel: 400 };
      const result = getInitialVector(options, containerWidth);
      expect(result).toBe(0);
    });

    it('should handle cases where leftPanel is less than half of containerWidth', () => {
      const containerWidth = 1000;
      const options: InitialVectorOptions = { leftPanel: 300 };
      const result = getInitialVector(options, containerWidth);
      expect(result).toBe(300 - 500);
      expect(result).toBe(-200);
    });

    it('should handle cases where rightPanel is less than half of containerWidth', () => {
      const containerWidth = 1000;
      const options: InitialVectorOptions = { rightPanel: 300 };
      const result = getInitialVector(options, containerWidth);
      expect(result).toBe(500 - 300);
      expect(result).toBe(200);
    });
  });

  describe('calculateLeftPanelWidth', () => {
    it('should return correct CSS calc expression for positive vector', () => {
      const vector = 50;
      const result = calculateLeftPanelWidth(vector);
      expect(result).toBe('calc(50% + 50px)');
    });

    it('should return correct CSS calc expression for negative vector', () => {
      const vector = -30;
      const result = calculateLeftPanelWidth(vector);
      expect(result).toBe('calc(50% + -30px)');
    });

    it('should return correct CSS calc expression for zero vector', () => {
      const vector = 0;
      const result = calculateLeftPanelWidth(vector);
      expect(result).toBe('calc(50% + 0px)');
    });
  });

  describe('calculateRightPanelWidth', () => {
    it('should return correct CSS calc expression for positive vector', () => {
      const vector = 50;
      const result = calculateRightPanelWidth(vector);
      expect(result).toBe('calc(50% - 50px)');
    });

    it('should return correct CSS calc expression for negative vector', () => {
      const vector = -30;
      const result = calculateRightPanelWidth(vector);
      expect(result).toBe('calc(50% - -30px)');
    });

    it('should return correct CSS calc expression for zero vector', () => {
      const vector = 0;
      const result = calculateRightPanelWidth(vector);
      expect(result).toBe('calc(50% - 0px)');
    });
  });
});
