export const getAllElementsFiltered = (
  data: object[] | undefined | null,
  value: string,
  elementTextLookupKey: string,
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

export const hasSomeElementFiltered = (
  data: object[] | undefined | null,
  currentValue: string,
  elementTextLookupKey: string,
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
