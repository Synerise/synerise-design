export const getAllElementsFiltered = <T extends object>(
  data: T[] | undefined | null,
  value: string,
  elementTextLookupKey: keyof T,
): object[] => {
  return (
    (data &&
      data.filter((el) =>
        String(el[elementTextLookupKey])
          .toLowerCase()
          .includes(value.toLocaleLowerCase()),
      )) ||
    []
  );
};

export const hasSomeElementFiltered = <T extends object>(
  data: T[] | undefined | null,
  currentValue: string,
  elementTextLookupKey: keyof T,
): boolean => {
  return (
    (!!data &&
      data.some((el) =>
        String(el[elementTextLookupKey])
          .toLowerCase()
          .includes(currentValue.toLocaleLowerCase()),
      )) ||
    false
  );
};

export const hasSomeElement = (
  data: Record<string, unknown>[] | undefined,
): boolean => !!data && data.length > 0;
