import * as React from 'react';

export type OrderedListProps = {
  list?: boolean;
  options?: boolean;
  type: string | 'numbers' | 'withZeros' | 'withLetters' | 'withRomanian';
  content: React.ReactNode;
};

export type OrderedListItem = {
  id: string;
  label: string;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  index: number;
  subMenu?: OrderedListItem[];
};

export type ListProps = {
  data: OrderedListItem[];
  indexFormatter?: (index: number) => React.ReactNode | string;
};
