import { type ListProps } from 'react-window';

type ListPropsEnhanced = Partial<ListProps> & {
  scrollTop?: number;
};

export type SearchItemListProps<T> = {
  data: T[] | undefined;
  highlight?: string;
  /**
   * @description it is STRONGLY discouraged to use <Menu.Item> in itemRender, especially when the results are wrapped in a virtualised list
   */
  itemRender: (item: T) => JSX.Element;
  listProps?: ListPropsEnhanced;
  onItemClick?: (e: T) => void;
  rowHeight: number;
  width: number | string;
  visibleRows?: number;
  height?: number;
  /**
   * @description - set to false if items returned itemRender do NOT require being wraped in an antd <Menu> wrapper component.
   * @deprecated - this prop will be removed once all implementations stop using <Menu.Item> in itemRender
   */
  renderInMenu?: boolean;
};
