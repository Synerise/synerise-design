const alphanumericRegex = /[^a-zA-Z0-9]+/g;
const filterAlphanumeric = (colorValue: string): string => colorValue.replace(alphanumericRegex, '');

export default filterAlphanumeric;
