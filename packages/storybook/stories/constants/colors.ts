
import { theme, defaultColorsOrder } from '@synerise/ds-core';


export const colors = theme.colorsOrder;
export const colorNames = Array.from(new Set(Object.keys(theme.palette).map( (colorWithHue: string) => colorWithHue.substring(0, colorWithHue.indexOf('-'))) ));
export const colorsWithHue = defaultColorsOrder;