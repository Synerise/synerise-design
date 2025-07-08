export const prefixKeys = (keys: string | number | (string | number)[]) => {
  return keys && Array.isArray(keys)
    ? keys.map((el) => `.$${el}`)
    : `.$${keys}`;
};
