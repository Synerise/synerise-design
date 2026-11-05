import cloneDeep from 'lodash.clonedeep';
import groupBy from 'lodash.groupby';
import omit from 'lodash.omit';
import range from 'lodash.range';

import {
  COUNTED_FROM_ENUM,
  DAYS_OF_PERIOD_ENUM,
  type RangeFilterType,
  TYPES,
  TYPES_DATA,
} from './constants';
import type {
  DailyFilterValue,
  DenormalizedFilter,
  FilterDay,
  FilterValue,
  MonthlyDayRange,
  MonthlyFilterValue,
  RangeFilterDay,
  RangeFilterMonthRule,
  RangeFilterValue,
  RangeFilterWeekRule,
  WeeklyFilterValue,
} from './RangeFilter.types';
import type { SavedFilter } from './Shared/FilterDropdown/FilterDropdown.types';

type NormalizedTimes = { from: string; to: string; day?: string | number };

/*
 * Map field from components to datefilter schema
 * start => from
 * stop => to
 * 0-based => 1-based indexed days
 * */

export const mapTimeSchema = <T extends DenormalizedFilter>(item: T) => {
  const { start, stop, day, ...rest } = item;
  return {
    from: start,
    to: stop,
    day:
      day === undefined || (day !== undefined && Number.isNaN(+day))
        ? undefined
        : +day + 1,
    ...rest,
  };
};

/*
 * Map field from datefilter to components schema
 * from => start
 * to => stop
 * 1-based => 0-based indexed days
 * */
export const denormMapTimeSchema = <T extends NormalizedTimes>(item: T) => {
  const { from, to, day, ...rest } = item;
  return {
    start: from,
    stop: to,
    day:
      day === undefined ||
      (day !== undefined && Number.isNaN(+day)) ||
      Number.isNaN(+day)
        ? undefined
        : +day - 1,
    ...rest,
  };
};

// The weekly and monthly editors always set `day` through their day template.
const toRangeFilterDay = ({ restricted, display, ...rest }: FilterDay) =>
  mapTimeSchema(rest) as RangeFilterDay & Pick<FilterDay, 'week'>;

const NESTING_TYPE = 'IN_PLACE';

export const normalizeValue = (value: FilterValue): RangeFilterValue => {
  switch (value.type) {
    case TYPES.DAILY:
      return {
        ...mapTimeSchema(value.definition),
        type: value.type,
        nestingType: NESTING_TYPE,
      };
    case TYPES.WEEKLY:
      return {
        type: value.type,
        nestingType: NESTING_TYPE,
        days: Object.values(value.definition)
          .filter((day) => day.restricted)
          .map(toRangeFilterDay),
      };
    case TYPES.MONTHLY:
      return {
        type: value.type,
        nestingType: NESTING_TYPE,
        rules: value.definition.map((def) => {
          const days = Object.values(def.definition)
            .filter((day) => day.restricted)
            .map(toRangeFilterDay);
          const inverted = def.periodType !== COUNTED_FROM_ENUM.BEGINNING;

          if (def.period === DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK) {
            return {
              weeks: Object.entries(groupBy(days, 'week')).map(
                ([week, daysArray]) => ({
                  week: +week + 1,
                  days: daysArray.map((day) => ({
                    ...omit(day, ['week']),
                    type: value.type,
                    day: ((day.day - 1) % 7) + 1,
                  })),
                }),
              ),
              type: def.period,
              inverted,
            };
          }
          return { days, type: def.period, inverted };
        }),
      };
  }
};

export const createWeeklyRange = (days: RangeFilterDay[]) =>
  range(0, 8).reduce<WeeklyFilterValue['definition']>((acc, i) => {
    const day = days.find((d) => d.day === i);
    return day
      ? {
          ...acc,
          [i - 1]: {
            ...denormMapTimeSchema(day),
            restricted: true,
            display: true,
          },
        }
      : acc;
  }, {});

export const createMonthlyWeekDayRange = (
  rule: RangeFilterWeekRule,
): MonthlyDayRange =>
  range(0, 7 * 5 + 1).reduce<MonthlyDayRange>((acc, i) => {
    const weekStartIndex = Math.floor(i / 7);
    const week = weekStartIndex;
    const dayOfWeek = i - weekStartIndex * 7;

    const days = rule.weeks.reduce<FilterDay[]>(
      (prev, item) => [
        ...prev,
        ...item.days.map((day) => ({
          ...denormMapTimeSchema(day),
          week: item.week - 1,
        })),
      ],
      [],
    );
    const day = days.find((d) => d.week === week && d.day === dayOfWeek);
    return day
      ? { ...acc, [i]: { ...day, restricted: true, display: true } }
      : acc;
  }, {});

export const createMonthlyDayRange = (
  rule: RangeFilterMonthRule,
): MonthlyDayRange =>
  range(0, 32).reduce<MonthlyDayRange>((acc, i) => {
    const day = rule.days && rule.days.find((d) => d.day === i);
    return day
      ? {
          ...acc,
          [i - 1]: {
            ...denormMapTimeSchema(day),
            restricted: true,
            display: true,
          },
        }
      : acc;
  }, {});

export const denormalizeValue = (value: RangeFilterValue): FilterValue => {
  switch (value.type) {
    case TYPES.DAILY:
      return { type: value.type, definition: denormMapTimeSchema(value) };
    case TYPES.WEEKLY:
      return { type: value.type, definition: createWeeklyRange(value.days) };
    case TYPES.MONTHLY:
      return {
        type: value.type,
        definition: value.rules.map((rule) => ({
          period: rule.type,
          id: Math.random(),
          periodType: rule.inverted
            ? COUNTED_FROM_ENUM.ENDING
            : COUNTED_FROM_ENUM.BEGINNING,
          definition:
            rule.type === DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK
              ? createMonthlyWeekDayRange(rule)
              : createMonthlyDayRange(rule),
        })),
      };
  }
};

export const defaultFilterValue = (type: RangeFilterType): FilterValue => {
  switch (type) {
    case TYPES.DAILY:
      return { type, definition: cloneDeep(TYPES_DATA.DAILY.definition) };
    case TYPES.WEEKLY:
      return { type, definition: cloneDeep(TYPES_DATA.WEEKLY.definition) };
    case TYPES.MONTHLY:
      return { type, definition: cloneDeep(TYPES_DATA.MONTHLY.definition) };
  }
};

export const validators = {
  [TYPES.DAILY]: (value: DailyFilterValue) =>
    Boolean(!!value?.definition?.start && !!value?.definition?.stop),
  [TYPES.WEEKLY]: (value: WeeklyFilterValue) =>
    Boolean(value?.definition && !!Object.keys(value.definition).length),
  [TYPES.MONTHLY]: (value: MonthlyFilterValue) =>
    Boolean(
      value?.definition &&
        !!Object.keys(value.definition) &&
        Object.keys(value.definition[0].definition).length > 0,
    ),
};

export const isValidValue = (value?: FilterValue): boolean => {
  switch (value?.type) {
    case TYPES.DAILY:
      return validators[value.type](value);
    case TYPES.WEEKLY:
      return validators[value.type](value);
    case TYPES.MONTHLY:
      return validators[value.type](value);
    default:
      return true;
  }
};

export const isDuplicate = (
  itemsList: SavedFilter[],
  item: SavedFilter,
): boolean => {
  return itemsList.some(
    (i) => i.name.toLowerCase() === item.name.toLowerCase() && i.id !== item.id,
  );
};
const DEFAULT_NAME = 'Filter';

export const addSuffixToDuplicate = (
  itemsList: SavedFilter[],
  editedItem: SavedFilter,
): SavedFilter => {
  let newItem = editedItem;
  while (isDuplicate(itemsList, newItem)) {
    newItem = { ...newItem, name: `${newItem.name || DEFAULT_NAME} (1)` };
  }
  return newItem;
};
