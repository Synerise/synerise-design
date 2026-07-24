import { type ReactNode } from 'react';

import { orderedBase } from '@synerise/ds-tokens/names';

import { type ColorMap, type MarkObj } from '../Slider.types';

export const getDefaultTooltipPopupContainer = (): HTMLElement =>
  document.querySelector(`.ant-slider`) as HTMLElement;

// A tracksColorMap value is either a palette key ('green-600', or a user-supplied key) or an
// already-resolved colour — an `ordered` token var ('var(--ds-…)') or a literal hex ('#…'). The
// latter are used verbatim; palette keys are resolved via theme.palette at the call site.
export const isResolvedColor = (value?: string): boolean =>
  !!value && (value.startsWith('var(') || value.startsWith('#'));

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
    colorMap['0'] = 'green-600';
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
