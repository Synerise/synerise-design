import isEqual from 'lodash.isequal';
import type React from 'react';

import { type CollectorValue } from './Collector.types';

const INPUT_MIN_WIDTH = 150;

export const scrollWithHorizontalArrow = (
  ref: React.RefObject<HTMLElement>,
  event: React.KeyboardEvent<HTMLElement>,
  scrollStep: number | undefined = 200,
): void => {
  if (event.key === 'ArrowLeft') {
    ref?.current &&
      ref.current.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  }
  if (event.key === 'ArrowRight') {
    ref?.current &&
      ref.current.scrollBy({ left: scrollStep, behavior: 'smooth' });
  }
};

export const filterOutNullishArrayItems = <T>(
  array: (T | null | '' | undefined)[],
) => {
  const filtered: T[] = array.filter((val) => Boolean(val)) as T[];
  return filtered;
};

export const isOverflown = (
  elementRef: React.RefObject<HTMLDivElement>,
): boolean => {
  if (elementRef !== null && elementRef.current !== null) {
    const element = elementRef.current;
    return element.scrollWidth - INPUT_MIN_WIDTH > element.clientWidth;
  }
  return false;
};
export const filterValueSuggestions = (
  suggestions: CollectorValue[],
  selected: CollectorValue[],
  searchValue: string,
  lookupKey: string,
): CollectorValue[] => {
  return suggestions.filter((suggestion) => {
    const matchesSearchValue = (suggestion[lookupKey] as string)
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const notInSelected = !selected.find((item) => isEqual(item, suggestion));
    return matchesSearchValue && notInSelected;
  });
};
