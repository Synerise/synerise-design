import memoize from 'memoize-one';

import type { ListItemData, SourceType } from '../IconPicker.types';

export const createItemData = memoize(
  <Source extends SourceType>(
    items: ListItemData<Source>['items'],
    elementSize: ListItemData<Source>['elementSize'],
    onSelect: ListItemData<Source>['onSelect'],
    itemsPerRow: ListItemData<Source>['itemsPerRow'],
  ): ListItemData<Source> => ({
    items,
    elementSize,
    onSelect,
    itemsPerRow,
  }),
);
