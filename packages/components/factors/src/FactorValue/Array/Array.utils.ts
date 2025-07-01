import { v4 as uuid } from 'uuid';

import { type ArrayValueElement, type ArrayValueWithID } from './Array.types';

export const matchesSearchQuery = (
  item: string | number,
  searchQuery: string,
) => {
  return String(item)
    .toLocaleLowerCase()
    .includes(searchQuery.toLocaleLowerCase());
};

export const arrayWithUUID = <ItemType extends 'string' | 'number'>(
  items: ArrayValueElement<ItemType>[],
): ArrayValueWithID<ItemType>[] => {
  return items.map((item) => ({
    value: item,
    id: uuid(),
  }));
};

export const sanitiseValues = (element: string) => {
  return element.trim();
};
export const isNumberAsString = (value: string): boolean => {
  return sanitiseValues(value) === `${parseFloat(sanitiseValues(value))}`;
};

export const isArrayOfNumbersAsString = (array: string[]) => {
  const sanitisedArray = array.map(sanitiseValues);
  const comparisonArray = array.map(
    (item) => `${parseFloat(sanitiseValues(item))}`,
  );
  return JSON.stringify(sanitisedArray) === JSON.stringify(comparisonArray);
};
