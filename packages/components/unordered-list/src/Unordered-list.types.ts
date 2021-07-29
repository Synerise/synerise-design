import * as React from 'react';

export type UnorderedListItem = {
  id: string;
  label: React.ReactNode | string;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  index: number;
  subMenu?: UnorderedListItem[];
  subMenuProps?: Omit<ListProps, 'data'>;
  text?: React.ReactNode | string;
};

export type ListProps = {
  data: UnorderedListItem[];
  indexFormatter?: (index: number) => React.ReactNode | string;
  text?: React.ReactNode | string;
};
