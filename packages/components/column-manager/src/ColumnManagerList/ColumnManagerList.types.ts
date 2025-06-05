import type { Column, ColumnManagerItemProps } from '../ColumnManagerItem/ColumManagerItem.types';
import type { ColumnManagerTexts } from '../ColumnManager.types';

export type ColumnManagerListProps<ColumnType extends Column> = {
  searchQuery: string;
  columns: ColumnType[];
  draggable?: boolean;
  handleOrderChange: (items: ColumnManagerItemProps<ColumnType>[]) => void;
  toggleColumn: (id: string, visible: boolean) => void;
  texts: ColumnManagerTexts;
};
