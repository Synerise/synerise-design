import * as React from 'react';

export type FilterItem = {
  item: string | React.ReactNode;
};

export type FilterElement = {
  category: string;
  items: FilterItem[];
};

export type IconPickerProps = {
  button: React.ReactNode;
  data: FilterElement[];
  onSelect: (val: React.ReactNode) => void;
  trigger: ('click' | 'hover' | 'contextMenu')[];
  placeholder: string;
};
