import groupBy from 'lodash.groupby';
import omit from 'lodash.omit';
import range from 'lodash.range';

import {
  type DenormalizedFilter,
  type FilterDefinition,
  type FilterValue,
  type MonthlyFilterDefinition,
  type NormalizedFilter,
  type NormalizedFilterBase,
  type WeekFilter,
  type WeeklyFilterDefinition,
} from './RangeFilter.types';
import { type SavedFilter } from './Shared/FilterDropdown/FilterDropdown.types';
import { COUNTED_FROM_ENUM, DAYS_OF_PERIOD_ENUM, TYPES } from './constants';

/*
 * Map field from components to datefilter schema
 * start => from
 * stop => to
 * 0-based => 1-based indexed days
 * */

export const mapTimeSchema = (item: DenormalizedFilter): NormalizedFilter => {
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
export const denormMapTimeSchema = (
  item: NormalizedFilter,
): DenormalizedFilter => {
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
  } as DenormalizedFilter;
};

export const normalizeValue = ({
  type,
  definition,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: FilterValue): NormalizedFilterBase | { rules: any } => {
  const result = { type, nestingType: 'IN_PLACE' };
  let days: unknown[];
  let rules: unknown[] = [];
  switch (type) {
    case TYPES.DAILY:
      return { ...mapTimeSchema(definition as DenormalizedFilter), ...result };
    case TYPES.WEEKLY:
      days = Object.values(definition as WeeklyFilterDefinition)
        .filter((day) => day.restricted)
        .map((item) => mapTimeSchema(item as DenormalizedFilter));
      break;
    case TYPES.MONTHLY:
      rules = [];
      (definition as MonthlyFilterDefinition[]).map((def) => {
        days = Object.values(def.definition)
          .filter((day) => day.restricted)
          .map(({ restricted, display, ...rest }) =>
            mapTimeSchema(rest as DenormalizedFilter),
          );

        if (def.period === DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK) {
          rules.push({
            weeks: Object.entries(groupBy(days, 'week')).map(
              ([week, daysArray]) => ({
                week: +week + 1,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                days: daysArray.map((day: any) => {
                  const dayOfWeek = ((day.day - 1) % 7) + 1;
                  return {
                    ...omit(day as object, ['week']),
                    type,
                    day: dayOfWeek,
                  };
                }),
              }),
            ),
            type: def.period,
            inverted: def.periodType !== COUNTED_FROM_ENUM.BEGINNING,
          });
        } else {
          rules.push({
            days,
            type: def.period,
            inverted: def.periodType !== COUNTED_FROM_ENUM.BEGINNING,
          });
        }
        return rules;
      });
      return { ...result, rules };
    default:
      days = [];
      break;
  }

  // @ts-expect-error days doesnt exist in type
  result.days = days.map(
    // @ts-expect-error types mismatch
    ({ restricted, display, ...rest }) => rest,
  ) as Partial<FilterDefinition>[];
  return result;
};

export const createWeeklyRange = (days: NormalizedFilter[]) =>
  range(0, 8).reduce((acc, i) => {
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

export const createMonthlyWeekDayRange = (rules: {
  weeks?: (NormalizedFilter & WeekFilter)[];
}): MonthlyDayRange =>
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  range(0, 7 * 5 + 1).reduce((acc: {}, i: number) => {
    const weekStartIndex = Math.floor(i / 7);
    const week = weekStartIndex;
    const dayOfWeek = i - weekStartIndex * 7;

    // @ts-expect-error: FIXME: Type 'undefined' is not assignable to type 'NormalizedFilter[]'.ts(2322)
    const days: NormalizedFilter[] =
      rules.weeks &&
      rules.weeks.reduce(
        // @ts-expect-error: FIXME: Type 'undefined' is not assignable to type 'NormalizedFilter[]'.ts(2322)
        (prev, item) => [
          ...prev,
          // @ts-expect-error: days doesn't exist in type
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

export type MonthlyDayRange = {
  [key: string]: DenormalizedFilter & { restricted: boolean; display: boolean };
};
export const createMonthlyDayRange = (rules: {
  days?: NormalizedFilter[];
}): MonthlyDayRange =>
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  range(0, 32).reduce((acc: {}, i: number) => {
    const day = rules.days && rules.days.find((d) => d.day === i);
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

export const denormalizers: { [key: string]: Function } = {
  [TYPES.DAILY]: (values: NormalizedFilter) => denormMapTimeSchema(values),
  [TYPES.WEEKLY]: (values: { days: [] }) => createWeeklyRange(values.days),
  [TYPES.MONTHLY]: (values: { rules: FilterDefinition[] }) => {
    const monthlyDenormalizers = {
      [DAYS_OF_PERIOD_ENUM.DAY_OF_MONTH]: createMonthlyDayRange,
      [DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK]: createMonthlyWeekDayRange,
    };
    return values.rules.map((value) => ({
      period: value.type,
      id: Math.random(),
      periodType: value.inverted
        ? COUNTED_FROM_ENUM.ENDING
        : COUNTED_FROM_ENUM.BEGINNING,

      // @ts-ignore
      definition: monthlyDenormalizers[value.type](value),
    }));
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validators: { [key: string]: (values: any) => boolean } = {
  [TYPES.DAILY]: (values: FilterValue) =>
    Boolean(!!values?.definition?.start && !!values?.definition?.stop),
  [TYPES.WEEKLY]: (values: WeeklyFilterDefinition) =>
    Boolean(values?.definition && !!Object.keys(values.definition).length),
  [TYPES.MONTHLY]: (values: FilterValue<MonthlyFilterDefinition>) =>
    Boolean(
      values?.definition &&
        !!Object.keys(values.definition) &&
        // @ts-expect-error requires type refactor
        Object.keys(values.definition[0].definition).length > 0,
    ),
};

export const denormalizeValue = (
  values: FilterValue<FilterDefinition>,
): Partial<FilterValue<FilterDefinition>> => ({
  type: values.type,
  definition: denormalizers[values.type](values),
});

const alwaysValid = (): true => true;
export const isValidValue = (value: FilterValue<FilterDefinition>): boolean => {
  const validator =
    typeof validators[value?.type] === 'function'
      ? validators[value.type]
      : alwaysValid;
  return validator(value);
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
