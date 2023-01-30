import filterAlphanumeric from '../filterAlphanumeric/filterAlphanumeric';

const convert3DigitHexTo6Digit = (hexColor: string): string => {
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

export default convert3DigitHexTo6Digit;
