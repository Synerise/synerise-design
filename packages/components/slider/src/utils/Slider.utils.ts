import { type ReactNode } from 'react';

import { customColors, orderedBase } from '@synerise/ds-tokens/names';

import { type ColorMap, type MarkObj } from '../Slider.types';

export const getDefaultTooltipPopupContainer = (): HTMLElement =>
  document.querySelector(`.ant-slider`) as HTMLElement;

// A tracksColorMap value is either a palette key ('green-600', or a user-supplied key) or an
// already-resolved colour — an `ordered` token var ('var(--ds-…)') or a literal hex ('#…'). The
// latter are used verbatim; palette keys are mapped to a reversible token (never theme.palette).
export const isResolvedColor = (value?: string): boolean =>
  !!value && (value.startsWith('var(') || value.startsWith('#'));

// Resolve a colour-map value to a CSS colour WITHOUT touching theme.palette (which is being
// retired). An already-resolved token/hex is used verbatim; a palette key ('blue-600') maps to the
// reversible custom-colour token (customColors[hue][shade] — dark-mode aware). Anything unmapped —
// an unknown hue/shade or an empty value — falls back to the given predefined token, so a bad
// `tracksColorMap` key renders a real colour instead of an undefined palette lookup.
export const resolveTrackColor = (
  value: string | undefined,
  fallback: string,
): string => {
  if (!value || isResolvedColor(value)) {
    return value || fallback;
  }
  const match = value.match(/^(.+)-(\d{2,3})$/);
  if (match) {
    const [, hue, shade] = match;
    const custom = customColors[hue]?.[String(Number(shade))];
    if (custom) {
      return custom;
    }
  }
  return fallback;
};

export const couldBeInverted = (
  value: number | readonly number[],
  inverted?: boolean,
): boolean =>
  Boolean(inverted && (typeof value === 'number' || value.length < 3));

export const getDefaultColorMap = (
  handleCount: number,
  type: 'default' | 'allocation' | 'range',
) => {
  const colorMap: ColorMap = {};
  if (type !== 'allocation' && handleCount <= 2) {
    // Default single / 2-handle fill: the slider module default (positive/success green).
    colorMap['0'] = 'var(--ds-slider-fill-default)';
  } else {
    // Categorical queue: each segment takes the next `ordered` token slot (a flipping
    // var(--ds-color-background-ordered-<N>-base) string), replacing the old palette keys.
    orderedBase.forEach((token, index) => {
      colorMap[index] = token;
    });
  }
  return colorMap;
};

export const isMarksObjType = (item: MarkObj | ReactNode): item is MarkObj => {
  return Boolean(item && typeof item === 'object' && 'label' in item);
};

export const getClosestIndex = (
  values: number[],
  targetValue: number,
): number => {
  let closestIndex = 0;
  let minDistance = Math.abs(values[0] - targetValue);

  for (let i = 1; i < values.length; i++) {
    const distance = Math.abs(values[i] - targetValue);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
};

export const getVisibleSectionsForType =
  (type: 'range' | 'allocation' | 'default', total: number) =>
  (_: unknown, index: number) => {
    if (type === 'range') {
      return index !== 0 && index !== total - 1;
    }
    if (type === 'default') {
      return index !== total - 1;
    }

    return true;
  };

export const getTranslateX = (element: HTMLElement): number => {
  const style = window.getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
};
