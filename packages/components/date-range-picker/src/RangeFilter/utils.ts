import { MONTHLY_TYPES, TYPES } from './constants';
import groupBy from 'lodash/groupBy';
import omit from 'lodash/omit';
import range from 'lodash/range';
import { NormalizedFilter, DenormalizedFilter, FilterValue, FilterDefinition } from './RangeFilter.types';

/*
 * Map field from components to datefilter schema
 * start => from
 * stop => to
 * 0-based => 1-based indexed days
 * */

export const mapTimeSchema = (item: DenormalizedFilter): NormalizedFilter => {
  const { start, stop, day, ...rest } = item;
  return { from: start, to: stop, day: Number.isNaN(+day) ? undefined : +day + 1, ...rest };
};

/*
 * Map field from datefilter to components schema
 * from => start
 * to => stop
 * 1-based => 0-based indexed days
 * */
export const denormMapTimeSchema = (item: NormalizedFilter): DenormalizedFilter => {
  const { from, to, day, ...rest } = item;
  return { start: from, stop: to, day: Number.isNaN(+day) ? undefined : +day - 1, ...rest };
};

export const normalizeValue = ({ type, definition }: FilterValue) => {
  const result = { type, nestingType: 'IN_PLACE' }; // TODO - datepicker type
  let days;
  switch (type) {
    case TYPES.DAILY:
      return { ...mapTimeSchema(definition), ...result };
    case TYPES.WEEKLY:
      days = Object.values(definition)
        .filter(day => day.restricted)
        .map((item: DenormalizedFilter) => mapTimeSchema(item));
      break;
    case TYPES.MONTHLY && definition instanceof Array:
      const rules = [];
      (definition as FilterDefinition[]).map(def => {
        days = Object.values(def.definition)
          .filter((day: Object) => day.restricted)
          .map(({ restricted, display, ...rest }) => mapTimeSchema(rest));

        if (def.period === MONTHLY_TYPES.DAY_OF_WEEK) {
          rules.push({
            weeks: Object.entries(groupBy(days, 'week')).map(([week, days]) => ({
              week: +week + 1,
              days: days.map(day => ({ ...omit(day, ['week']), type: type })),
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
  result.days = days.map(({ restricted, display, ...rest }) => rest);
  return result;
};

export const createWeeklyRange = days =>
  range(0, 8).reduce((acc, i) => {
    const day = days.find(day => day.day === i);
    return day ? { ...acc, [i - 1]: { ...denormMapTimeSchema(day), restricted: true, display: true } } : acc;
  }, {});

export const createMonthlyWeekDayRange = rules =>
  range(0, 7 * 5 + 1).reduce((acc, i) => {
    const weekStartIndex = Math.floor(i / 7);
    const week = weekStartIndex;
    const dayOfWeek = i - weekStartIndex * 7;
    const days = rules.weeks.reduce(
      (prev, item) => [...prev, ...item.days.map(day => ({ ...denormMapTimeSchema(day), week: item.week - 1 }))],
      []
    );
    const day = days.find(day => day.week === week && day.day === dayOfWeek);
    return day ? { ...acc, [i]: { ...day, restricted: true, display: true } } : acc;
  }, {});

export const createMonthlyDayRange = rules =>
  range(0, 32).reduce((acc, i) => {
    const day = rules.days.find(day => day.day === i);
    return day ? { ...acc, [i - 1]: { ...denormMapTimeSchema(day), restricted: true, display: true } } : acc;
  }, {});

export const denormalizers: { [key: string]: Function } = {
  [TYPES.DAILY]: (values: NormalizedFilter) => denormMapTimeSchema(values),
  [TYPES.WEEKLY]: values => createWeeklyRange(values.days),
  [TYPES.MONTHLY]: values => {
    const monthlyDenormalizers = {
      [MONTHLY_TYPES.DAY_OF_MONTH]: createMonthlyDayRange,
      [MONTHLY_TYPES.DAY_OF_WEEK]: createMonthlyWeekDayRange,
    };
    return values.rules.map(value => ({
      definition: monthlyDenormalizers[value.type](value),
      period: value.type,
      id: Math.random(),
      periodType: value.inverted ? 'ending' : 'beginning',
    }));
  },
};

export const denormalizeValue = values => ({
  type: values.type,
  definition: denormalizers[values.type](values),
});

export const isValidValue = value => !value.definition.hasOwnProperty('type') || value.definition.type;
