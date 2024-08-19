import { ReactNode } from 'react';

export type UnorderedListItem = {
  id: string;
  label: ReactNode;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  index: number;
  subMenu?: UnorderedListItem[];
  subMenuProps?: Omit<ListProps, 'data'>;
  text?: ReactNode;
};

export type UnorderedListProps = {
  data: UnorderedListItem[];
  indexFormatter?: (index: number) => ReactNode;
  text?: ReactNode;
  className?: string;
};

// @deprecated - use UnorderedListProps instead
export type ListProps = UnorderedListProps;
