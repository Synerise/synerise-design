import type { ReactElement, ReactNode } from 'react';

export type FilterItem = {
  item: ReactNode;
};

export type FilterElement = {
  category: string;
  items: FilterItem[];
};

export type IconPickerProps = {
  button: ReactElement;
  data: FilterElement[];
  onSelect: (val: ReactNode) => void;
  trigger: ('click' | 'hover' | 'contextMenu')[];
  placeholder: string;
  noResultMsg?: string | ReactElement;
};
