export type SearchItemListProps<T> = {
  data: T[] | undefined;
  highlight?: string;
  itemRender: (item: T) => JSX.Element;
  listProps?: object;
  onItemClick?: (e: T) => void;
  rowHeight: number;
  width: number;
  visibleRows?: number;
};
