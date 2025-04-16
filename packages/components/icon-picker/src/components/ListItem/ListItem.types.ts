import type { FilterItem, ListProps, SourceType, ValueTypeForSource } from '../../IconPicker.types';

export type ListItemProps<Source extends SourceType> = {
  element: FilterItem<ValueTypeForSource<Source>>;
  index: number;
  itemsPerRow: number;
  onSelect: ListProps<Source>['onSelect'];
};
