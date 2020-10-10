import { groupBy, omit, range } from 'lodash';
import { MONTHLY_TYPES, TYPES } from './constants';

import {
  NormalizedFilter,
  DenormalizedFilter,
  FilterValue,
  FilterDefinition,
  WeekFilter,
  NormalizedFilterBase,
  WeeklyFilterDefinition,
  MonthlyFilterDefinition,
} from './RangeFilter.types';
import { SavedFilter } from './FilterDropdown/FilterDropdown.types';

/*
 * Map field from components to datefilter schema
 * start => from
 * stop => to
 * 0-based => 1-based indexed days
 * */

export const mapTimeSchema = (item: DenormalizedFilter): NormalizedFilter => {
  const { start, stop, day, ...rest } = item;
  return { from: start, to: stop, day: day===undefined ||  (day!==undefined &&  Number.isNaN(+day)) ? undefined : +day + 1, ...rest };
};

/*
 * Map field from datefilter to components schema
 * from => start
 * to => stop
 * 1-based => 0-based indexed days
 * */
export const denormMapTimeSchema = (item: NormalizedFilter): DenormalizedFilter => {
  const { from, to, day, ...rest } = item;
  return {
    start: from,
    stop: to,
    day: day===undefined ||  (day!==undefined &&  Number.isNaN(+day)) || Number.isNaN(+day) ? undefined : +day - 1,
    ...rest,
  } as DenormalizedFilter;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeValue = ({ type, definition }: FilterValue): NormalizedFilterBase | { rules: any } => {
  const result = { type, nestingType: 'IN_PLACE' };
  let days: unknown[];
  let rules: unknown[] = [];
  switch (type) {
    case TYPES.DAILY:
      return { ...mapTimeSchema(definition as DenormalizedFilter), ...result };
    case TYPES.WEEKLY:
      days = Object.values(definition as WeeklyFilterDefinition)
        .filter(day => day.restricted)
        .map(item => mapTimeSchema(item as DenormalizedFilter));
      break;
    case TYPES.MONTHLY:
      rules = [];
      (definition as MonthlyFilterDefinition[]).map(def => {
        days = Object.values(def.definition)
          .filter(day => day.restricted)
          .map(({ restricted, display, ...rest }) => mapTimeSchema(rest as DenormalizedFilter));

        if (def.period === MONTHLY_TYPES.DAY_OF_WEEK) {
          rules.push({
            weeks: Object.entries(groupBy(days, 'week')).map(([week, daysArray]) => ({
              week: +week + 1,
              days: daysArray.map(day => ({ ...omit(day as object, ['week']), type })),
            })),
            type: def.period,
            inverted: def.periodType !== 'beginning',
          });
        } else {
          rules.push({ days, type: def.period, inverted: def.periodType !== 'beginning' });
        }
        return rules;
      });
      return { ...result, rules };
    default:
      days = [];
      break;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  result.days = days.map(({ restricted, display, ...rest }) => rest) as Partial<FilterDefinition>[];
  return result;
};

export const createWeeklyRange = (days: NormalizedFilter[]): {} =>
  range(0, 8).reduce((acc, i) => {
    const day = days.find(d => d.day === i);
    return day ? { ...acc, [i - 1]: { ...denormMapTimeSchema(day), restricted: true, display: true } } : acc;
  }, {});

export const createMonthlyWeekDayRange = (rules: { weeks?: (NormalizedFilter & WeekFilter)[] }): MonthlyDayRange =>
  range(0, 7 * 5 + 1).reduce((acc: {}, i: number) => {
    const weekStartIndex = Math.floor(i / 7);
    const week = weekStartIndex;
    const dayOfWeek = i - weekStartIndex * 7;
    const days: NormalizedFilter[] =
      rules.weeks &&
      rules.weeks.reduce(
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        (prev, item) => [...prev, ...item.days.map(day => ({ ...denormMapTimeSchema(day), week: item.week - 1 }))],
        []
      );
    const day = days.find(d => d.week === week && d.day === dayOfWeek);
    return day ? { ...acc, [i]: { ...day, restricted: true, display: true } } : acc;
  }, {});

export type MonthlyDayRange = {
  [key: string]: DenormalizedFilter & { restricted: boolean; display: boolean };
};
export const createMonthlyDayRange = (rules: { days?: NormalizedFilter[] }): MonthlyDayRange =>
  range(0, 32).reduce((acc: {}, i: number) => {
    const day = rules.days && rules.days.find(d => d.day === i);
    return day ? { ...acc, [i - 1]: { ...denormMapTimeSchema(day), restricted: true, display: true } } : acc;
  }, {});

export const denormalizers: { [key: string]: Function } = {
  [TYPES.DAILY]: (values: NormalizedFilter) => denormMapTimeSchema(values),
  [TYPES.WEEKLY]: (values: { days: [] }) => createWeeklyRange(values.days),
  [TYPES.MONTHLY]: (values: { rules: FilterDefinition[] }) => {
    const monthlyDenormalizers = {
      [MONTHLY_TYPES.DAY_OF_MONTH]: createMonthlyDayRange,
      [MONTHLY_TYPES.DAY_OF_WEEK]: createMonthlyWeekDayRange,
    };
    return values.rules.map(value => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      definition: monthlyDenormalizers[value.type](value),
      period: value.type,
      id: Math.random(),
      periodType: value.inverted ? 'ending' : 'beginning',
    }));
  },
};

export const denormalizeValue = (values: FilterValue): Partial<FilterValue> => ({
  type: values.type,
  definition: denormalizers[values.type](values),
});

export const isValidValue = (value: FilterValue): boolean =>
  Boolean(
    value?.definition && (!Object.prototype.hasOwnProperty.call(value?.definition, 'type') || value.definition.type)
  );

export const isDuplicate = (itemsList: SavedFilter[], item: SavedFilter): boolean => {
  return itemsList.some(i => i.name.toLowerCase() === item.name.toLowerCase() && i.id !== item.id);
};
const DEFAULT_NAME = 'Filter';

export const addSuffixToDuplicate = (itemsList: SavedFilter[], editedItem: SavedFilter): SavedFilter => {
  let newItem = editedItem;
  while (isDuplicate(itemsList, newItem)) {
    newItem = { ...newItem, name: `${newItem.name || DEFAULT_NAME} (1)` };
  }
  return newItem;
};
