const alphanumericRegex = /[^a-zA-Z0-9]+/g;
const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

export const filterAlphanumeric = (colorValue: string): string =>
  colorValue.replace(alphanumericRegex, '');

export const isValidHexColor = (hex: string): boolean =>
  hexColorRegex.test(hex);

/**
 *
 * Method that creates an option element and then assigns a colour to its styles.
 * If the colour is correct, it is assigned to the element and can then be checked against the input data.
 *
 * @param {string} strColor
 * @returns {boolean}
 */
export const isValidTextColor = (strColor: string): boolean => {
  if (!strColor) {
    return false;
  }

  const s = new Option().style;
  s.color = strColor;
  return s.color === strColor;
};

/**
 *
 * A method that converts color in user-understandable notation to HEX notation.
 * It uses the canvas element for this
 *
 * @param {string} color
 * @returns {string}
 */
export const standardizeColor = (color: string): string => {
  const ctx = document.createElement('canvas').getContext('2d');
  if (ctx) {
    ctx.fillStyle = color;
    return ctx.fillStyle;
  }
  return '';
};

export const convert3DigitHexTo6Digit = (hexColor: string): string => {
  const alphaHexColor = filterAlphanumeric(hexColor);
  if (alphaHexColor.length === 3) {
    let newAlphaHexColor = '';

    for (let i = 0; i < alphaHexColor.length; i++) {
      newAlphaHexColor += alphaHexColor[i] + alphaHexColor[i];
    }
    return `#${newAlphaHexColor}`;
  }
  return hexColor;
};
