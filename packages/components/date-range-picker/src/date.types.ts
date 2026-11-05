import type { RangeFilterValue } from './RangeFilter/RangeFilter.types';

export type RelativeUnit =
  | 'SECONDS'
  | 'MINUTES'
  | 'HOURS'
  | 'DAYS'
  | 'WEEKS'
  | 'MONTHS'
  | 'YEARS';

/**
 * @deprecated use `RelativeUnit`. `'SINCE'` is not a unit: it marks the offset of a SINCE range,
 * whose `value` is the anchor `Date`. SINCE is unscoped and not supported.
 */
export type RelativeUnits = RelativeUnit | 'SINCE';

export type RangeKey =
  | 'TODAY'
  | 'YESTERDAY'
  | 'TOMORROW'
  | 'LAST_WEEK'
  | 'THIS_WEEK'
  | 'NEXT_WEEK'
  | 'LAST_7_DAYS'
  | 'NEXT_7_DAYS'
  | 'LAST_MONTH'
  | 'THIS_MONTH'
  | 'NEXT_MONTH'
  | 'LAST_3_MONTHS'
  | 'NEXT_3_MONTHS'
  | 'LAST_6_MONTHS'
  | 'NEXT_6_MONTHS'
  | 'LAST_YEAR'
  | 'NEXT_YEAR'
  | 'ALL_TIME';

export type NullableDateLimit = null | string | Date;
export type DateLimit = string | Date;

/**
 * @deprecated use `DateRange`, which `onApply` and `onValueChange` emit. `DateRange.filter` is a
 * `RangeFilterValue`.
 */
export type DateFilter = {
  key?: string;
  type: 'ABSOLUTE' | 'RELATIVE' | 'SINCE';
  from?: NullableDateLimit;
  to?: NullableDateLimit;
  duration?: {
    type: RelativeUnits;
    value: number;
  };
  offset?: {
    type: RelativeUnits;
    value: number;
  };
};

export type DateRangeBase = {
  key?: RangeKey | string;
  /**
   * `true` only for FUTURE presets and the FUTURE / SINCE modes, which are unscoped and not
   * supported. PAST presets and `ALL_TIME` carry `false`.
   */
  future?: boolean;
  /** The schedule set by the filter addon (`showFilter`). */
  filter?: RangeFilterValue;
  translationKey?: string;
  id?: string | number;
  timestamp?: Date;
};

/**
 * `from` / `to` arrive as offset-carrying ISO strings, or as `TZDate`s with the `timeZone` prop.
 * A `Date` passed in is read as a real instant.
 */
export type AbsoluteDateRange = DateRangeBase & {
  type: 'ABSOLUTE';
  from?: NullableDateLimit;
  to?: NullableDateLimit;
};

export type Duration = {
  type: RelativeUnit;
  value: number;
};

/** The last (or, unsupported, next) `duration`, shifted back by `offset`. */
export type RelativeDateRange = DateRangeBase & {
  type: 'RELATIVE';
  offset: Duration;
  duration: Duration;
  from?: NullableDateLimit;
  to?: NullableDateLimit;
};

/**
 * What the SINCE mode emits: `type` stays `'RELATIVE'`, and the anchor `Date` sits in
 * `offset.value`. Tell it from a `RelativeDateRange` with `isSinceRange`.
 *
 * @deprecated SINCE is unscoped and not supported.
 */
export type SinceDateRange = DateRangeBase & {
  type: 'RELATIVE';
  offset: { type: 'SINCE'; value: Date };
  duration: Duration;
  from?: NullableDateLimit;
  to?: NullableDateLimit;
};

type PresetType = {
  key: string;
  translationKey?: string;
};
export type RelativeDateRangePreset = RelativeDateRange & PresetType;
export type AbsoluteDateRangePreset = AbsoluteDateRange & PresetType;
export type DateRangePreset = RelativeDateRangePreset | AbsoluteDateRangePreset;

export type DateRange = AbsoluteDateRange | RelativeDateRange | SinceDateRange;
