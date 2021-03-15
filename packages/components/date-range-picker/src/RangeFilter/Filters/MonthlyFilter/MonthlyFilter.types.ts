import { IntlShape } from 'react-intl';
import { RangeActions } from '../../Shared/TimeWindow/TimeWindow.types';
import { DenormalizedFilter, FilterDefinition } from '../../RangeFilter.types';
import { WithTranslations } from '../../../DateRangePicker.types';
import { DateLimitMode } from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';

export type MonthlyFilterProps = {
  value: Month[];
  onChange: (definition: Month[]) => void;
  intl: IntlShape;
  rangeClipboard?: Partial<FilterDefinition>;
  valueSelectionModes?: DateLimitMode[];
} & Partial<RangeActions> &
  WithTranslations;

export type Month<T = DenormalizedFilter> = {
  id: string | number;
  period: string;
  periodType?: string;
  definition: {
    [day: number]: T;
  };
};
