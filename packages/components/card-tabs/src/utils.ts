export const getColor = (
  isActive: boolean,
  activeColor: string,
  defaultColor: string,
): string => {
  if (isActive) {
    return activeColor;
  }
  return defaultColor;
};
export const getLighterColor = (color: string): string => {
  if (color) {
    const levelRegex = /(\d){3}$/g;
    const matches = color.match(levelRegex);
    if (matches?.length) {
      const level: number = parseInt(matches[0], 10);
      return color.replace(levelRegex, (level - 100).toString());
    }
  }
  return color;
};
