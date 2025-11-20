import { type ReactElement } from 'react';

import { type AnyObject } from '../../Search.types';

export type SearchRendererProps = {
  title?: string;
  tooltip?: string;
  data: AnyObject[] | undefined;
  width: number;
  height?: number;
  rowHeight?: number;
  listProps?: Record<string, unknown>;
  itemRender?: (item: AnyObject) => ReactElement;
  onItemClick: (item: AnyObject) => void;
  highlight: string;
};
