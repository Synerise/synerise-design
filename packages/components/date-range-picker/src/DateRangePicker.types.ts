import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { IntlShape } from 'react-intl';

import type { DateToFormatOptions } from '@synerise/ds-core';
import type { LegacyPlacement, PopoverProps } from '@synerise/ds-popover';

import type { DateRange, DateRangePreset, RelativeUnit } from './date.types';
import type { Props as FooterProps } from './Footer/Footer.types';
import type { RangeFilterType } from './RangeFilter/constants';
import type { SavedFilter } from './RangeFilter/Shared/FilterDropdown/FilterDropdown.types';
import type {
  DateLimitMode,
  RangeDisplayMode,
} from './RangeFilter/Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import type { RangePickerInputProps } from './RangePickerInput/RangePickerInput.types';

export type DateRangePickerProps = {
  /**
   * @deprecated - not used, this prop will be dropped in v1.x
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
  valueFormatOptions?: DateToFormatOptions;
  forceAdjacentMonths?: boolean;
  forceAbsolute?: boolean;
  /** Overrides of the footer's state and texts; its handlers and value belong to the panel. */
  footerProps?: Partial<
    Omit<
      FooterProps,
      'onApply' | 'onSwitchMode' | 'mode' | 'value' | 'timeZone'
    >
  >;
  /**
   * Fires on every change in the panel, before Apply. With the `timeZone` prop the bounds are
   * emitted as on `onApply`; without it they are the panel's local dates.
   */
  onValueChange?: (value: DateRange) => void;
  /**
   * Opts into timezone-aware values: the emitted `from` / `to` become `TZDate`s carrying the
   * resolved zone instead of offset-carrying ISO strings, and the panel works in that zone.
   * `true` uses the provider's `timeZone`; a string names an IANA zone directly. Omitted, the
   * component behaves exactly as before — provider zone, ISO strings out.
   */
  timeZone?: boolean | string;
  /**
   * Fires on Apply, and with `undefined` (or `defaultValue`, when set) when the trigger input is
   * cleared. Absolute bounds are offset-carrying ISO strings, or `TZDate`s with the `timeZone`
   * prop; a relative range carries no bounds unless `forceAbsolute` resolves it.
   */
  onApply: (value: DateRange | undefined) => void;
  onVisibleChange?: (visible: boolean) => void;
  onFilterSave?: (filters: SavedFilter[]) => void;
  popoverProps?: Partial<Omit<PopoverProps, 'placement'>>;
  popoverTrigger?: ReactNode;
  placement?: LegacyPlacement;
  ranges?: DateRangePreset[];
  rangeUnits?: RelativeUnit[];
  /**
   * @deprecated has no effect on the modes offered — they come from `relativeModes` only
   */
  relativeFuture?: boolean;
  /**
   * @deprecated has no effect on the modes offered — they come from `relativeModes` only
   */
  relativePast?: boolean;
  /**
   * Modes of the relative picker, which renders only when this is non-empty. Pass `['PAST']`:
   * `'FUTURE'` and `'SINCE'` are unscoped and not supported.
   */
  relativeModes?: RelativeMode[];
  savedFilters?: SavedFilter[];
  showRelativePicker?: boolean;
  showFilter?: boolean;
  showTime?: boolean;
  showCustomRange?: boolean;
  showNowButton?: boolean;
  texts?: Partial<Texts>;
  validate?: (value: DateRange) => { valid: boolean; message?: string };
  value?: DateRange;
  defaultValue?: DateRange;
  /**
   * transforms value, by default omits ALL_TIME props
   */
  valueTransformer?: (value: DateRange) => DateRange;
  disableAbsoluteTimepickerInRelative?: boolean;
  rangePickerInputProps?: Omit<
    RangePickerInputProps,
    'disabled' | 'readOnly'
  > & {
    /**
     * @deprecated has no effect — pass `disabled` to DateRangePicker
     */
    disabled?: RangePickerInputProps['disabled'];
    /**
     * @deprecated has no effect — pass `readOnly` to DateRangePicker
     */
    readOnly?: RangePickerInputProps['readOnly'];
  };
  allowedFilterTypes?: RangeFilterType[];
  /** Renders a custom trigger; return nothing to fall back to `popoverTrigger` or the input. */
  renderPopoverTrigger?: (args: {
    setPopupVisible: Dispatch<SetStateAction<boolean>>;
  }) => ReactNode;
  isTruncateMs?: boolean;
  filterValueSelectionModes?: DateLimitMode[];
  filterRangeDisplayMode?: RangeDisplayMode;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
};

/**
 * @deprecated use `DateRangePickerProps`
 */
export type Props = DateRangePickerProps;

export type RawDateRangePickerProps = Omit<DateRangePickerProps, 'placement'>;

/**
 * Only `'PAST'` is supported. `'FUTURE'` and `'SINCE'` are unscoped and not supported, and will
 * be removed.
 */
export type RelativeMode = 'PAST' | 'FUTURE' | 'SINCE';
export type Texts = {
  [k in Translations]: ReactNode;
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
