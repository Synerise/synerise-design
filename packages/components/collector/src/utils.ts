import * as React from 'react';

const INPUT_MIN_WIDTH = 150;
export const arrayToLowerCase = (array: string[] = []): string[] => array.map(element => element.toLowerCase());

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
export const filterValueSuggestions = (suggestions: string[], selected: string[], searchValue: string): string[] => {
  const selectedLowerCase = arrayToLowerCase(selected);
  return suggestions.filter(
    item => item.toLowerCase().includes(searchValue.toLowerCase()) && !selectedLowerCase.includes(item.toLowerCase())
  );
};
