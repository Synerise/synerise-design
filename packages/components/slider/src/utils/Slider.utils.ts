import { defaultColorsOrder } from '@synerise/ds-core';

import { type ColorMapProps } from '../Slider.types';

export const getDefaultTooltipPopupContainer = (): HTMLElement =>
  document.querySelector(`.ant-slider`) as HTMLElement;

export const couldBeInverted = (
  value: number | number[],
  inverted: boolean,
): boolean => inverted && (typeof value === 'number' || value.length < 3);

export const mapToColor = (
  _: string | object,
  idx: number,
): Record<number, string> => ({
  [idx]: defaultColorsOrder[idx] as string,
});

/**
 * Converts an array of strings (e.g. colors) `["blue-600", "yellow-600"]`
 * into `{"0": "blue-600", "1": "yellow-600"}`.
 * @returns Object Record<string, string>
 */
export const buildDefaultTracksColorMap = (): ColorMapProps =>
  Object.assign(
    {} as Record<number, string>,
    ...defaultColorsOrder.map(mapToColor),
  );
