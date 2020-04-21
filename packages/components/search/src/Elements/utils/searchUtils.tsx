import { FilterElement } from '../../Search.types';

export const getAllElementsFiltered = (data: FilterElement[] | undefined, value: string): FilterElement[] => {
  return (data && data.filter(el => el.text.toLowerCase().includes(value.toLocaleLowerCase()))) || [];
};
export const hasSomeElementFiltered = (data: FilterElement[] | undefined, currentValue: string): boolean => {
  return (!!data && data.some(el => el.text.toLowerCase().includes(currentValue.toLocaleLowerCase()))) || false;
};
export const hasSomeElement = (data: FilterElement[] | undefined): boolean => !!data && data.length > 0;
