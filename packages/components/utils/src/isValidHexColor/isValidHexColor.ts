const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
export const isValidHexColor = (hex: string): boolean => hexColorRegex.test(hex);

export default isValidHexColor;
