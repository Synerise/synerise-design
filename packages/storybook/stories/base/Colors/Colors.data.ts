import { theme } from '@synerise/ds-core';

export const HUES = ['050', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
export const generatePalette = (color: string) => {
  const data = {};
  HUES.forEach(hue => {
    data[`${color}-${hue}`] = theme.palette[`${color}-${hue}`];
  });
  return data;
};
