import latinize from 'latinize';

import { theme } from '@synerise/ds-core';
import { customColorNames } from '@synerise/ds-tokens/names';

export type ColorByLetter = {
  [index: string]: string;
};
export type ColorObject = { color: string; hue: string };
export type Color = string | ColorObject;

// Categorical family catalogue = the token package's custom-color set (single source of
// truth). Replaces the former hand-maintained list, so the allowed families live in one place.
export const palette = customColorNames;

function getColorByLetter(): ColorByLetter {
  const colors: Record<string, string> = {};
  for (let i = 0; i <= 25; i += 1) {
    colors[String.fromCharCode(i + 65)] = palette[i % palette.length];
  }
  return colors;
}

export const colorByLetter = getColorByLetter();

export function getColor(colorString: string, forAvatar: boolean): Color {
  if (!forAvatar) {
    return theme.palette[colorString];
  }
  return {
    color: colorString.split('-')[0],
    hue: colorString.split('-')[1],
  };
}

function selectColorByLetter(letter?: string, forAvatar = false): Color {
  return typeof letter !== 'string'
    ? getColor('orange-500', forAvatar)
    : getColor(
        `${colorByLetter[latinize(letter.toUpperCase())] || 'orange'}-500`,
        forAvatar,
      );
}

export default selectColorByLetter;
