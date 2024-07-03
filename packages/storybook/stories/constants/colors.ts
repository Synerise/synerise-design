
import { theme, defaultColorsOrder } from '@synerise/ds-core';


export const COLORS = theme.colorsOrder;
export const COLOR_NAMES = Array.from(new Set(Object.keys(theme.palette).map( (colorWithHue: string) => colorWithHue.substring(0, colorWithHue.indexOf('-'))) ));
export const COLORS_WITH_HUE = defaultColorsOrder;