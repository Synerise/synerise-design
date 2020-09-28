import { MONTHLY_TYPES, TYPES } from './constants';
import { groupBy, omit, range } from 'lodash';

import {
  NormalizedFilter,
  DenormalizedFilter,
  FilterValue,
  FilterDefinition,
  ComponentDataType,
  WeekFilter,
} from './RangeFilter.types';

/*
 * Map field from components to datefilter schema
 * start => from
 * stop => to
 * 0-based => 1-based indexed days
 * */

export const mapTimeSchema = (item: DenormalizedFilter): NormalizedFilter => {
  const { start, stop, day, ...rest } = item;
  return { from: start, to: stop, day: day && Number.isNaN(+day) ? undefined : +day + 1, ...rest };
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
    day: day && Number.isNaN(+day) ? undefined : +day - 1,
    ...rest,
  } as DenormalizedFilter;
};

export const normalizeValue = ({ type, definition }: FilterValue): ComponentDataType | { rules: any } => {
  const result = { type, nestingType: 'IN_PLACE' }; // TODO - datepicker type
  let days: any[];
  const rules: any[] = [];
  switch (type) {
    case TYPES.DAILY:
      return { ...mapTimeSchema(definition), ...result };
    case TYPES.WEEKLY:
      days = Object.values(definition as FilterDefinition)
        .filter((day: { restricted: boolean }) => day.restricted)
        .map((item: DenormalizedFilter) => mapTimeSchema(item));
      break;
    case TYPES.MONTHLY && definition instanceof Array:
      (definition as [{ definition: FilterDefinition[]; period: string; periodType: string }]).map(def => {
        days = Object.values(def.definition)
          .filter(d => !!d.restricted)
          .map(({ restricted, display, ...rest }) => mapTimeSchema(rest));

        if (def.period === MONTHLY_TYPES.DAY_OF_WEEK) {
          rules.push({
            weeks: Object.entries(groupBy(days, 'week')).map(([week, days]) => ({
              week: +week + 1,
              days: days.map(day => ({ ...omit(day, ['week']), type })),
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
  result.days = days.map(({ restricted, display, ...rest }: { restricted: boolean; display: string }) => rest);
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
  !value.definition.hasOwnProperty('type') || value.definition.type;
