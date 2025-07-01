export const omitKeys = (keys: string[], obj: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key)),
  );
