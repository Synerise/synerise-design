export const compareKeys = (a: string[], b: string[]) => {
  const sa = new Set(a);
  const sb = new Set(b);
  if (sa.size !== sb.size) {
    return false;
  }
  for (const v of sa) {
    if (!sb.has(v)) {
      return false;
    }
  }
  return true;
};
