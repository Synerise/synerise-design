import React from 'react';

export type OrderedListItem = {
  id: string;
  label: string;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  index: number;
  subMenu?: OrderedListItem[];
  listStyle?: string;
  subMenuProps?: Omit<ListProps, 'data'>;
  text?: React.ReactNode | string;
};

export type ListProps = {
  data: OrderedListItem[];
  indexFormatter?: (index: number) => React.ReactNode | string;
  listStyle?: string;
  text?: React.ReactNode | string;
};
