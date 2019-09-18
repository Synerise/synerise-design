import { css } from 'styled-components';

const breakpoints = {
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

export type Media = {
  from: BreakpointsType;
  to: BreakpointsType;
  only: BreakpointsType;
};

type BreakpointsType = {
  [key: string]: (
    ...args
  ) => {
    min: number;
    max: number;
  };
};

export const MEDIA_FROM = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label].max / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export const MEDIA_TO = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label].max / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export const MEDIA_ONLY = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label].min / 16}em) and (max-width: ${breakpoints[label].max / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

const mediaQuery: Media = {
  from: MEDIA_FROM,
  to: MEDIA_TO,
  only: MEDIA_ONLY,
};

export default mediaQuery;
