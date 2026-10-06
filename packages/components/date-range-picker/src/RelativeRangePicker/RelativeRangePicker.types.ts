import type { IntlShape } from 'react-intl';

import type {
  DateRangePickerProps,
  RelativeMode,
  Texts,
} from '../DateRangePicker.types';
import type {
  DateRange,
  DateRangePreset,
  RelativeDateRange,
} from '../date.types';

export type RelativeRangePickerProps = {
  ranges?: DateRangePreset[];
  value: DateRange;
  onChange: (range: DateRange | undefined) => void;
  future?: boolean;
  past?: boolean;
  since?: boolean;
  intl: IntlShape;
  texts: Texts;
  relativeModes?: RelativeMode[];
  rangeUnits: DateRangePickerProps['rangeUnits'];
  showCustomRange?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: upstream type is not expressible here
  valueTransformer?: (e: RelativeDateRange | any) => RelativeDateRange | any;
};

export type State = {
  currentGroup: RelativeMode | null;
  future: boolean;
  past: boolean;
  showCustomForm: boolean;
  currentRange: RelativeDateRange;
  groupedRanges?: DateRangePreset[];
  sinceTimestamp?: Date | undefined;
  lastCustomRange?: RelativeDateRange;
};

/**
 * @deprecated use `RelativeRangePickerProps`
 */
export type Props = RelativeRangePickerProps;
