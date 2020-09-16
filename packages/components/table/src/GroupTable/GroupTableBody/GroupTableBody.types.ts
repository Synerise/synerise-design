import * as React from 'react';
import { RowSelection } from '../../Table.types';
import { GroupColumnsType, GroupType } from '../GroupTable';

export interface Props<T extends unknown> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group: any;
  rowKey: string | Function | undefined;
  selection?: RowSelection<T>;
  allItems: T[];
  expanded: boolean;
  expandGroup: (key: React.ReactText) => void;
  columns?: GroupColumnsType<T>[];
  addItem?: (column: string, value: React.ReactText | boolean | object) => void;
  activeGroup?: Omit<GroupType<T>, 'rows'> | undefined;
  hideGroupExpander?: boolean;
}
