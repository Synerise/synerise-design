import { DateFilter } from '../../date.types';

export type RangeFilterStatusProps = {
  filter: DateFilter;
  disabled: boolean;
  label: string;
  onClick: () => void;
};
