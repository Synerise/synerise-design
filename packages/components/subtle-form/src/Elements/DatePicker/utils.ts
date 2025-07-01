export const replaceLettersWithUnderscore = (input: string): string => {
  return input.replace(/[a-zA-Z]/g, '_ ');
};

export const getFormattingString = (
  formatProp: string | undefined,
  showTime: boolean | undefined,
): string => {
  if (!formatProp) {
    return showTime ? 'dd-MM-yyyy, HH:mm' : 'dd-MM-yyyy';
  }
  return formatProp;
};
