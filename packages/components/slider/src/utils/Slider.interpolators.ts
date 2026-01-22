import type { RangerInterpolator } from '@tanstack/react-ranger';

/**
 * Linear interpolator for reversed slider
 * Maps values from right to left (max on left, min on right)
 */
export const reversedInterpolator: RangerInterpolator = {
  getPercentageForValue: (val: number, min: number, max: number): number => {
    if (max === min) {
      return 0;
    }
    // Reverse the percentage calculation
    return ((max - val) / (max - min)) * 100;
  },

  getValueForClientX: (
    clientX: number,
    trackDims: { width: number; left: number },
    min: number,
    max: number,
  ): number => {
    // Calculate position relative to track start
    const relativePosition = clientX - trackDims.left;
    // Get percentage from left
    const percentage = Math.min(
      Math.max(relativePosition / trackDims.width, 0),
      1,
    );
    // Reverse: percentage from left becomes percentage from right
    const reversedPercentage = 1 - percentage;
    // Convert back to value
    return min + reversedPercentage * (max - min);
  },
};
