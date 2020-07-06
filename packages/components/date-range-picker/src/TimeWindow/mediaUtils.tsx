/*
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mapValues from 'lodash/mapValues';
import { css, FlattenSimpleInterpolation } from 'styled-components';

export type MediaRange = {
  min: number;
  max: number;
};
export type Breakpoints = {
  [key: string]: MediaRange;
};

export const breakpoints: Breakpoints = {
  small: {
    min: 0,
    max: 640,
  },
  medium: {
    min: 641,
    max: 1024,
  },
  large: {
    min: 1025,
    max: 1200,
  },
  xlarge: {
    min: 1201,
    max: 0,
  },
};

// $FlowFixMe
const themeBreakpoints = Object.values(mapValues(breakpoints, (item: MediaRange) => `${item.max}px`)).slice(0, -1);

export { themeBreakpoints };

export type Media = {
  from: Breakpoints;
  to: Breakpoints;
  only: Breakpoints;
};

export const mediaFrom = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args: Breakpoints[]): FlattenSimpleInterpolation => css`
    @media (min-width: ${breakpoints[label].max / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export const mediaTo = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args: Breakpoints[]): FlattenSimpleInterpolation => css`
    @media (max-width: ${breakpoints[label].max / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export const mediaOnly = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args: Breakpoints[]): FlattenSimpleInterpolation => css`
    @media (min-width: ${breakpoints[label].min / 16}em) and (max-width: ${breakpoints[label].max / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export const media: Media = {
  from: mediaFrom as Breakpoints,
  to: mediaTo as Breakpoints,
  only: mediaOnly as Breakpoints,
};
*/
