import * as React from 'react';
import { FilterElement } from '../IconPicker.types';

export type ListProps = {
  data: FilterElement[];
  onSelect: (value: React.ReactNode) => void;
  noResultMsg?: string | React.ReactNode;
};
