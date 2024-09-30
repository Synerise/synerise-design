import { ReactNode } from 'react';

export type OrderedListItem = {
  id: string;
  label: ReactNode;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  index: number;
  subMenu?: OrderedListItem[];
  listStyle?: string;
  subMenuProps?: Omit<ListProps, 'data'>;
  text?: ReactNode;
};

export type ListProps = {
  data: OrderedListItem[];
  indexFormatter?: (index: number) => ReactNode;
  listStyle?: string;
  text?: ReactNode;
};
