import { type IntlShape } from 'react-intl';

import {
  type DateRangePickerProps,
  type RelativeMode,
  type Texts,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
