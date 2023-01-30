const alphanumericRegex = /[^a-zA-Z0-9]+/g;
const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

export const filterAlphanumeric = (colorValue: string): string => colorValue.replace(alphanumericRegex, '');

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
