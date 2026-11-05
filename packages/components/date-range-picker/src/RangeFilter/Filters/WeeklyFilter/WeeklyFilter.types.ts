import type { IntlShape } from 'react-intl';

import type { WithTranslations } from '../../../DateRangePicker.types';
import type { FilterDefinition } from '../../RangeFilter.types';
import type {
  DateLimitMode,
  RangeDisplayMode,
} from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import type {
  Days,
  RangeActions,
} from '../../Shared/TimeWindow/TimeWindow.types';

export type WeeklyFilterProps = {
  value: Days;
  onChange: (days: Days) => void;
  intl: IntlShape;
  rangeClipboard: Partial<FilterDefinition>;
  valueSelectionModes: DateLimitMode[];
  rangeDisplayMode?: RangeDisplayMode;
} & WithTranslations &
  Partial<RangeActions>;
