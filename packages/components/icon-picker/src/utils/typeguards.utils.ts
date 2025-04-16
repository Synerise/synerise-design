import { SourceType, FASource, DSSource, DataSource, GroupedFilterElement, Category } from '../IconPicker.types';

export const isFASourceType = (data: SourceType): data is FASource => {
  return data === 'font-awesome';
};
export const isDSSourceType = (data: SourceType): data is DSSource => {
  return data === 'design-system';
};
export const isData = (data: SourceType): data is DataSource[] => {
  return Array.isArray(data);
};

export const isCategories = <Source extends SourceType>(
  element: GroupedFilterElement<Source>
): element is Category[] => {
  return !!('category' in element[0] && element[0].category);
};
