const alphanumericRegex = /[^a-zA-Z0-9]+/g;
const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

export const filterAlphanumeric = (colorValue: string): string => colorValue.replace(alphanumericRegex, '');

export const isValidTextColor = (strColor: string): boolean => {
  if (!strColor) return false;
  // eslint-disable-next-line no-undef
  const s = new Option().style;
  s.color = strColor;
  return s.color === strColor;
};

export const standardizeColor = (color: string): string => {
  const ctx = document.createElement('canvas').getContext('2d');
  if (ctx) {
    ctx.fillStyle = color;
    return ctx.fillStyle;
  }
  return '';
};

export const isValidHexColor = (hex: string): boolean => hexColorRegex.test(hex);

export const convert3DigitHexTo6Digit = (hexColor: string): string => {
  const alphaHexColor = filterAlphanumeric(hexColor);
  if (alphaHexColor.length === 3) {
    let newAlphaHexColor = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < alphaHexColor.length; i++) {
      newAlphaHexColor += alphaHexColor[i] + alphaHexColor[i];
    }
    return `#${newAlphaHexColor}`;
  }
  return hexColor;
};
