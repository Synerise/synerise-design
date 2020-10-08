import { DateFilter } from '../../date.types';

export type RangeFilterStatusProps = {
  filter: DateFilter | undefined;
  disabled: boolean;
  label: string;
  onClick: () => void;
  onFilterRemove: () => void;
};
