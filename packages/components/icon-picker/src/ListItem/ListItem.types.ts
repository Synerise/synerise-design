import { FilterItem } from '../IconPicker.types';

export type ListItemProps = {
  element: FilterItem;
  index: number;
  onSelect: (value: React.ReactNode) => void;
};
