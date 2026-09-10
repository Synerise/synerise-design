/**
 * Turns a formatted date into a placeholder of the same shape: `08-09-2026` becomes
 * `_ _ - _ _ - _ _ _ _`. Digits are replaced as well as letters, because the sample is a real
 * formatted value rather than a token pattern.
 */
export const replaceLettersWithUnderscore = (input: string): string => {
  return input.replace(/[a-zA-Z0-9]/g, '_ ');
};
