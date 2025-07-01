import {
  type DataSource,
  type FilterElement,
  type ValueTypeForSource,
} from '../IconPicker.types';

export const prepareItems = (
  data: DataSource[],
): FilterElement<ValueTypeForSource<DataSource[]>>[] => {
  return data.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      return {
        ...item,
        value: (item.value === undefined
          ? item.item
          : item.value) as ValueTypeForSource<DataSource[]>,
      };
    }),
  }));
};
