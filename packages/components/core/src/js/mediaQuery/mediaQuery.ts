import {
  type FlattenSimpleInterpolation,
  type SimpleInterpolation,
  css,
} from 'styled-components';

import breakpoints, {
  type BreakpointKey,
} from '../DSProvider/ThemeProvider/breakpoints';

export type Media = {
  from: BreakpointsType;
  to: BreakpointsType;
  only: BreakpointsType;
};

type MediaTemplateFunction = (
  strings: TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
) => FlattenSimpleInterpolation;

type BreakpointsType = Record<BreakpointKey, MediaTemplateFunction>;

export const MEDIA_FROM: BreakpointsType = (
  Object.keys(breakpoints) as BreakpointKey[]
).reduce((acc, label) => {
  const mediaTemplateFunction: MediaTemplateFunction = (
    strings,
    ...interpolations
  ): FlattenSimpleInterpolation => css`
    @media (min-width: ${breakpoints[label].max / 16}em) {
      ${css(strings, ...interpolations)};
    }
  `;
  acc[label] = mediaTemplateFunction;

  return acc;
}, {} as BreakpointsType);

export const MEDIA_TO: BreakpointsType = (
  Object.keys(breakpoints) as BreakpointKey[]
).reduce((acc, label) => {
  acc[label] = (
    strings: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    @media (max-width: ${breakpoints[label].max / 16}em) {
      ${css(strings, ...interpolations)};
    }
  `;
  return acc;
}, {} as BreakpointsType);

export const MEDIA_ONLY: BreakpointsType = (
  Object.keys(breakpoints) as BreakpointKey[]
).reduce((acc, label) => {
  acc[label] = (
    strings: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    @media (min-width: ${breakpoints[label].min /
      16}em) and (max-width: ${breakpoints[label].max / 16}em) {
      ${css(strings, ...interpolations)};
    }
  `;

  return acc;
}, {} as BreakpointsType);

const mediaQuery: Media = {
  from: MEDIA_FROM,
  to: MEDIA_TO,
  only: MEDIA_ONLY,
};

export default mediaQuery;
