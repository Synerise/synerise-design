export const getCharCount = (value?: string | null, limit?: number) => {
  if (limit && value && value.toString().length > limit) {
    return undefined;
  }
  return value ? value.toString().length : 0;
};
