export const arrayToTrueMap = <T extends string | number | symbol>(
  items: readonly T[],
): Record<T, true> =>
  items.reduce(
    (acc, item) => {
      acc[item] = true;
      return acc;
    },
    {} as Record<T, true>,
  );
