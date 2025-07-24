import { type PopoverProps } from 'antd/lib/popover';
import { type ReactNode } from 'react';
import { type IntlShape } from 'react-intl';

import { type DateToFormatOptions } from '@synerise/ds-data-format';

import { type Props as FooterProps } from './Footer/Footer.types';
import { type FilterDefinition } from './RangeFilter/RangeFilter.types';
import { type SavedFilter } from './RangeFilter/Shared/FilterDropdown/FilterDropdown.types';
import {
  type DateLimitMode,
  type RangeDisplayMode,
} from './RangeFilter/Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { type RangeFilterType } from './RangeFilter/constants';
import { type RangePickerInputProps } from './RangePickerInput/RangePickerInput.types';
import {
  type DateFilter,
  type DateRange,
  type DateRangePreset,
  type RelativeUnits,
} from './date.types';

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
export type DateRangePickerProps = {
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  intl?: IntlShape;
  /**
   * overwrite default container's class. Default value is `ds-date-range-picker`.
   */
  containerClass?: string;
  readOnly?: boolean;
  disabled?: boolean;
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
  popoverTrigger?: ReactNode;
  ranges?: DateRangePreset[];
  rangeUnits?: Array<RelativeUnits>;
  relativeFuture?: boolean;
  relativePast?: boolean;
  relativeModes?: RelativeMode[];
  savedFilters?: SavedFilter[];
  showRelativePicker?: boolean;
  showFilter?: boolean;
  showTime?: boolean;
  showCustomRange?: boolean;
  showNowButton?: boolean;
  texts?: Partial<Texts>;
  validate?: (value: DateRange) => { valid: boolean; message?: string };
  value: DateRange;
  defaultValue?: DateRange;
  /**
   * transforms value, by default omits ALL_TIME props
   */
  valueTransformer?: (value: DateRange) => DateRange;
  arrowColor?: AdditionalMapper;
  disableAbsoluteTimepickerInRelative?: boolean;
  rangePickerInputProps?: Omit<
    RangePickerInputProps,
    'disabled' | 'readOnly'
  > & {
    /**
     * @deprecated - pass 'disabled' prop directly to DateRangePicker
     */
    disabled?: RangePickerInputProps['disabled'];
    /**
     * @deprecated - pass 'readOnly' prop directly to DateRangePicker
     */
    readOnly?: RangePickerInputProps['readOnly'];
  };
  allowedFilterTypes?: RangeFilterType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderPopoverTrigger?: (...args: any) => JSX.Element;
  isTruncateMs?: boolean;
  filterValueSelectionModes?: DateLimitMode[];
  filterRangeDisplayMode?: RangeDisplayMode;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
};

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
  alignContentToTop?: boolean;
}
export type Texts = {
  [k in Translations]: string | ReactNode;
} & {
  [k in TranslationsPlaceholders]: string;
};

export type TranslationsPlaceholders =
  | 'endDatePlaceholder'
  | 'startDatePlaceholder'
  | 'selectDate'
  | 'selectTime'
  | 'everyDay'
  | 'filterName';
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
  | 'pasteRange'
  | 'range'
  | 'hour'
  | 'filterEnabled'
  | 'selectDateFilter'
  | 'datesFilter'
  | 'cancel'
  | 'nthDayOfMonth'
  | 'daysOf'
  | 'countedFrom'
  | 'addRule'
  | 'addTime'
  | 'change'
  | 'weekly'
  | 'monthly'
  | 'daily'
  | 'saveFilter'
  | 'selected'
  | 'selectDaysDescription'
  | 'selectAll'
  | 'unselectAll'
  | 'inverseSelection'
  | 'setTimeFor'
  | 'week'
  | 'month'
  | 'beginning'
  | 'ending'
  | 'maximumRanges'
  | 'clickToSelect';

export type WithTranslations = {
  texts: Texts;
};

export type AddonType = {
  content: ReactNode;
  key: string;
};
