import * as React from 'react';
import { RowSelection } from '../Table.types';

export interface Props<T extends { key: React.ReactText }> {
  selection?: RowSelection<T>;
  dataSource: T[];
  rowKey?: Function | string;
}
