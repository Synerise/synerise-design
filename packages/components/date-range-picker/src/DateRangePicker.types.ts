import * as React from 'react';
import { WrappedComponentProps } from 'react-intl';
import { PopoverProps } from 'antd/lib/popover';

import { DateToFormatOptions } from '@synerise/ds-data-format';

import { DateFilter, DateRange, RelativeUnits } from './date.types';
import { FilterDefinition } from './RangeFilter/RangeFilter.types';
import { SavedFilter } from './RangeFilter/Shared/FilterDropdown/FilterDropdown.types';
import { Props as FooterProps } from './Footer/Footer.types';
import { RangePickerInputProps } from './RangePickerInput/RangePickerInput.types';

export { DateRange } from './date.types';

export type CustomColorArrow =
  | 'blue'
  | 'grey'
  | 'red'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'mars'
  | 'orange'
  | 'fern'
  | 'cyan'
  | 'purple'
  | 'violet';
export type AdditionalMapper = {
  topLeft: CustomColorArrow;
  topRight: CustomColorArrow;
  bottomLeft: CustomColorArrow;
  bottomRight: CustomColorArrow;
  leftTop: CustomColorArrow;
  leftBottom: CustomColorArrow;
  rightTop: CustomColorArrow;
  rightBottom: CustomColorArrow;
};
export interface DateRangePickerProps extends WrappedComponentProps {
  /**
   * overwrite default container's class. Default value is `ds-date-range-picker`.
   */
  containerClass?: string;
  readOnly?: boolean;
  disableDefaultTexts?: boolean;
  disabledDate?: (date?: Date) => boolean;
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  format?: string;
  valueFormatOptions?: DateToFormatOptions;
  forceAdjacentMonths?: boolean;
  forceAbsolute?: boolean;
  footerProps?: Partial<FooterProps>;
  onValueChange?: (value: Partial<DateFilter> | undefined) => void;
  onApply: (value: Partial<DateFilter> | undefined) => void;
  onVisibleChange?: (visible: boolean) => void;
  onFilterSave?: (filters: SavedFilter[]) => void;
  popoverProps?: Partial<PopoverProps>;
  popoverTrigger?: React.ReactNode;
  ranges?: DateRange[];
  rangeUnits?: Array<RelativeUnits>;
  relativeFuture?: boolean;
  relativePast?: boolean;
  relativeModes?: RelativeMode[];
  savedFilters?: SavedFilter[];
  showRelativePicker?: boolean;
  showFilter?: boolean;
  showTime?: boolean;
  showCustomRange?: boolean;
  texts: Texts;
  validate?: (value: DateRange) => { valid: boolean; message?: string };
  value: DateRange;
  /**
   * transforms value, by default omits ALL_TIME props
   */
  valueTransformer?: (value: DateRange) => DateRange;
  arrowColor?: AdditionalMapper;
  disableAbsoluteTimepickerInRelative?: boolean;
  rangePickerInputProps?: RangePickerInputProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  renderPopoverTrigger?: (...args: any) => JSX.Element;
}

/**
 * @deprecated use `DateRangePickerProps`
 */
export type Props = DateRangePickerProps;

export type RelativeMode = 'PAST' | 'FUTURE' | 'SINCE';
export interface State {
  mode: string;
  value: DateRange;
  filter?: FilterDefinition;
  visibleAddonKey?: string | undefined;
}
export type Texts = {
  [k in Translations]: string | React.ReactNode;
} & {
  [k in TranslationsPlaceholders]: string;
};

export type TranslationsPlaceholders = 'endDatePlaceholder' | 'startDatePlaceholder' | 'selectDate' | 'selectTime';
export type Translations =
  | 'custom'
  | 'today'
  | 'yesterday'
  | 'apply'
  | 'clear'
  | 'now'
  | 'emptyDateError'
  | 'last7Days'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'last3Months'
  | 'last6Months'
  | 'lastYear'
  | 'allTime'
  | 'tomorrow'
  | 'next7Days'
  | 'nextWeek'
  | 'nextMonth'
  | 'next3Months'
  | 'next6Months'
  | 'nextYear'
  | 'more'
  | 'relativeDateRange'
  | 'last'
  | 'before'
  | 'after'
  | 'since'
  | 'next'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years'
  | 'timestampLast'
  | 'timestampNext'
  | 'timestampTill'
  | 'filter'
  | 'startDate'
  | 'endDate'
  | 'remove'
  | 'savedFiltersTrigger'
  | 'clearRange'
  | 'copyRange'
  | 'pasteRange';

export type WithTranslations = {
  texts?: Texts;
};

export type AddonType = {
  content: React.ReactNode;
  key: string;
};
