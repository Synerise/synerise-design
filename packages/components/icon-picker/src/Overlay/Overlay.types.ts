import * as React from 'react';
import { FilterElement } from '../IconPicker.types';

export type OverlayTypes = {
  value: string;
  onSearchChange: (value: string) => void;
  data: FilterElement[];
  onClearInput?: () => void;
  onSelect: (value: React.ReactNode) => void;
  placeholder: string;
  focus: boolean;
  noResultMsg?: string | React.ReactNode;
};
