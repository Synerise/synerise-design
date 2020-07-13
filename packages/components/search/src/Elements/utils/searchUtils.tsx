export const getAllElementsFiltered = (
  data: object[] | undefined,
  value: string,
  elementTextLookupKey: string
): object[] => {
  return (data && data.filter(el => el[elementTextLookupKey].toLowerCase().includes(value.toLocaleLowerCase()))) || [];
};

export const hasSomeElementFiltered = (
  data: object[] | undefined,
  currentValue: string,
  elementTextLookupKey: string
): boolean => {
  return (
    (!!data && data.some(el => el[elementTextLookupKey].toLowerCase().includes(currentValue.toLocaleLowerCase()))) ||
    false
  );
};

export const hasSomeElement = (data: object[] | undefined): boolean => !!data && data.length > 0;
