// @ts-expect-error no types
import toPx from 'unit-to-px';

const hasSameLength = (parsedValue: number, originalValue: unknown): boolean =>
  `${parsedValue}`.length === `${originalValue}`.length;

export const calculatePixels = (
  value: number | string | undefined,
): number | undefined => {
  if (typeof value === 'number') {
    return value;
  }
  const isWhiteSpaceString = typeof value === 'string' && !value.trim();
  if (!value || isWhiteSpaceString) {
    return 0;
  }
  // detect strings like "42" and convert to number
  if (
    typeof value !== 'number' &&
    !Number.isNaN(value as unknown as number) &&
    !Number.isNaN(parseFloat(value))
  ) {
    const parsedNumber = parseFloat(value);
    if (hasSameLength(parsedNumber, value)) {
      return parsedNumber;
    }
  }
  return toPx(value);
};
