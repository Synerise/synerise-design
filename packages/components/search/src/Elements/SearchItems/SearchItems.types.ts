import { type ListProps } from 'react-window';

type ListPropsEnhanced = Partial<ListProps> & {
  scrollTop?: number;
};

export type SearchItemListProps<T> = {
  data: T[] | undefined;
  highlight?: string;
  itemRender: (item: T) => JSX.Element;
  listProps?: ListPropsEnhanced;
  onItemClick?: (e: T) => void;
  rowHeight: number;
  width: number | string;
  visibleRows?: number;
  height?: number;
  // @deprecated
  renderInMenu?: boolean;
};
