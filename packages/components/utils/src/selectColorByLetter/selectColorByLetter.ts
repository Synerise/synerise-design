import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as latinize from 'latinize';

export type ColorByLetter = {
  [index: string]: string;
};
export type ColorObject = { color: string; hue: string };
export type Color = string | ColorObject;

export const palette = ['blue', 'cyan', 'fern', 'green', 'orange', 'yellow', 'red', 'mars', 'pink', 'violet', 'purple'];

function getColorByLetter(): ColorByLetter {
  const colors = {};
  for(let i = 0; i<=25; i += 1) {
    colors[String.fromCharCode(i+65)] = palette[i % palette.length];
  }
  return colors;
}

export const colorByLetter = getColorByLetter();

export function getColor(colorString: string, forAvatar: boolean): Color {
  if (!forAvatar) return theme.palette[colorString];
  return {
    color: colorString.split('-')[0],
    hue: colorString.split('-')[1],
  };
};

function selectColorByLetter(letter?: string, forAvatar = false): Color {
  if (typeof letter !== 'string') {
    return getColor('orange-500', forAvatar);
  }

  const latinized = latinize(letter.toUpperCase());

  switch (latinized) {
    default:
      return getColor(`${colorByLetter[latinized] || 'orange'}-500`, forAvatar);
  }
};

export default selectColorByLetter;
