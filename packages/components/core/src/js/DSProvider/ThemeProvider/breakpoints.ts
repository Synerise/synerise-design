export type BreakpointKey =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge';

export type BreakpointsData = Record<
  BreakpointKey,
  {
    min: number;
    max: number;
  }
>;

export const breakpoints: BreakpointsData = {
  xsmall: {
    min: 0,
    max: 320,
  },
  small: {
    min: 321,
    max: 768,
  },
  medium: {
    min: 769,
    max: 960,
  },
  large: {
    min: 961,
    max: 1280,
  },
  xlarge: {
    min: 1281,
    max: 1600,
  },
  xxlarge: {
    min: 1600,
    max: 0,
  },
};

export default breakpoints;
