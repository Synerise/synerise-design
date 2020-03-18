import { FilterElement } from '../IconPicker.types';

export type OverlayTypes = {
  value: string;
  onSearchChange: (value: string) => void;
  data: FilterElement[];
  onClearInput?: () => void;
  onSelect: (value: string) => void;
  placeholder: string;
};
