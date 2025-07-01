import type { ListChildComponentProps } from 'react-window';

import type {
  Column,
  ColumnManagerItemProps,
} from '../ColumnManagerItem/ColumManagerItem.types';

export type ColumnManagerSortableItemProps<ColumnType extends Column> =
  ListChildComponentProps<ColumnManagerItemProps<ColumnType>[]>;
