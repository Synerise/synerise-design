import { type ListProps } from 'react-window';

type ListPropsEnhanced = Partial<ListProps> & {
  scrollTop?: number;
};

export type SearchItemListProps<T> = {
  data: T[] | undefined;
  highlight?: string;
  /**
   * @description render a lightweight row (e.g. <ListItem> from @synerise/ds-list-item); avoid heavy components, especially when the results are wrapped in a virtualised list
   */
  itemRender: (item: T) => JSX.Element;
  listProps?: ListPropsEnhanced;
  onItemClick?: (e: T) => void;
  rowHeight: number;
  width: number | string;
  visibleRows?: number;
  height?: number;
};
