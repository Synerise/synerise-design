export type InitialVectorOptions =
  | { leftPanel: number }
  | { rightPanel: number };

export const getInitialVector = (
  options: InitialVectorOptions | undefined,
  containerWidth: number,
): number => {
  if (!options) {
    return 0;
  }
  const half = containerWidth / 2;

  if ('leftPanel' in options) {
    return options.leftPanel - half;
  }

  if ('rightPanel' in options) {
    return half - options.rightPanel;
  }

  return 0;
};

const HALF_WIDTH = '50%';

export const calculateLeftPanelWidth = (vector: number): string => {
  return `calc(${HALF_WIDTH} + ${vector}px)`;
};

export const calculateRightPanelWidth = (vector: number): string => {
  return `calc(${HALF_WIDTH} - ${vector}px)`;
};
