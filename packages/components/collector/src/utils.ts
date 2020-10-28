import * as React from 'react';
import { CollectorValue } from './Collector.types';

const INPUT_MIN_WIDTH = 150;
export const arrayToLowerCase = (array: CollectorValue[] = [], lookupKey: string): CollectorValue[] =>
  array.map(element => ({ ...element, [lookupKey]:  element[lookupKey] && (element[lookupKey] as string).toLowerCase() }));

export const scrollWithHorizontalArrow = (
  ref: React.RefObject<HTMLElement>,
  event: React.KeyboardEvent<HTMLElement>,
  scrollStep: number | undefined = 200
): void => {
  if (event.key === 'ArrowLeft') {
    ref?.current && ref.current.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  }
  if (event.key === 'ArrowRight') {
    ref?.current && ref.current.scrollBy({ left: scrollStep, behavior: 'smooth' });
  }
};

export const isOverflown = (elementRef: React.RefObject<HTMLDivElement>): boolean => {
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
  lookupKey: string
): CollectorValue[] => {
  const selectedLowerCase = arrayToLowerCase(selected, lookupKey);
  return suggestions.filter(
    item =>
      (item[lookupKey] as string).toLowerCase().includes(searchValue.toLowerCase()) &&
      !selectedLowerCase.find(x=> x[lookupKey] && item[lookupKey] && x[lookupKey]===item[lookupKey].toLowerCase())
  );
};
