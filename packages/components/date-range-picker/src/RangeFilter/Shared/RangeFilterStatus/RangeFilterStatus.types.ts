import { DateFilter } from '../../../date.types';
import { Texts } from '../../../DateRangePicker.types';

export type RangeFilterStatusProps = {
  filter: DateFilter | undefined;
  disabled: boolean;
  label: string;
  texts?: Partial<Texts>;
  onClick: () => void;
  onFilterRemove: () => void;
};
