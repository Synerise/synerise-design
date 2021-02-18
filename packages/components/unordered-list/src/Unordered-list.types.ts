import * as React from 'react';

export type UnorderedListItem = {
  id: string;
  label: string;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  index: number;
  subMenu?: UnorderedListItem[];
  listStyle?: string;
  subMenuProps?: Omit<ListProps, 'data'>;
  text?: React.ReactNode | string;
};

export type ListProps = {
  data: UnorderedListItem[];
  indexFormatter?: (index: number) => React.ReactNode | string;
  listStyle?: string;
  text?: React.ReactNode | string;
};
