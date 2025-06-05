import type { ListChildComponentProps } from 'react-window';
import type { ColumnManagerItemProps, Column } from '../ColumnManagerItem/ColumManagerItem.types';

export type ColumnManagerSortableItemProps<ColumnType extends Column> = ListChildComponentProps<
  ColumnManagerItemProps<ColumnType>[]
>;
