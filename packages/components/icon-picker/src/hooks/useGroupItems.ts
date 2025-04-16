import { useMemo } from 'react';
import { FilterElement, GroupedFilterElement, SourceType, ValueTypeForSource } from '../IconPicker.types';

export const useGroupItems = <Source extends SourceType>(
  data: FilterElement<ValueTypeForSource<Source>>[],
  itemsPerRow: number
): GroupedFilterElement<Source>[] => {
  const groupedData = useMemo(() => {
    return data.reduce((flatItemsAndCategories, group) => {
      const { category, items } = group;
      flatItemsAndCategories.push([
        {
          category,
        },
      ]);

      const groupItemsLength = items.length;
      const rowCount = Math.ceil(groupItemsLength / itemsPerRow);
      for (let i = 0; i < rowCount; i += 1) {
        const rowItems = [];
        for (let j = 0; j < itemsPerRow; j += 1) {
          const idx = itemsPerRow * i + j;
          if (idx < groupItemsLength) {
            rowItems.push(items[idx]);
          }
        }
        flatItemsAndCategories.push(rowItems);
      }
      return flatItemsAndCategories;
    }, [] as GroupedFilterElement<Source>[]);
  }, [data, itemsPerRow]);

  return groupedData;
};
