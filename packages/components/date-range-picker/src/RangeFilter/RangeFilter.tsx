import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import range from 'lodash/range';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import groupBy from 'lodash/groupBy';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import  omit from 'lodash/omit';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep';
import ButtonGroup from '@synerise/ds-button-group';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import { MONTHLY_TYPES, TYPES, TYPES_DATA } from './constants';
import * as S from './RangeFilter.styles';
import { DateRange } from '../date.types';
import { State, Props, Day, FilterValue, Rule } from './RangeFilter.types';

/*
 * Map field from components to datefilter schema
 * start => from
 * stop => to
 * 0-based => 1-based indexed days
 * */
const mapTimeSchema = (item: Day): DateRange & { day: number } => {
  const { start, stop, day, ...rest } = item;
  return { from: start, to: stop, day: day && Number.isNaN(+day) ? undefined : +day + 1, ...rest };
};

/*
 * Map field from datefilter to components schema
 * from => start
 * to => stop
 * 1-based => 0-based indexed days
 * */
const denormMapTimeSchema = (item: DateRange & { day: number | undefined }): Day => {
  const { from, to, day, ...rest } = item;
  return { start: from, stop: to, day: day && Number.isNaN(+day) ? undefined : +day - 1, ...rest };
};

const normalizeValue = ({ type, definition }: FilterValue) => {
  const result = { type, nestingType: 'IN_PLACE' }; // TODO - datepicker type
  let days;
  switch (type) {
    case TYPES.DAILY:
      return { ...mapTimeSchema(definition), ...result };
    case TYPES.WEEKLY:
      days = Object.values(definition)
        .filter((day: Day) => day.restricted)
        .map((item: Day) => mapTimeSchema(item));
      break;
    case TYPES.MONTHLY:
      const rules = [];
      definition.map((def) => {
        days = Object.values(def.definition)
          .filter((day: Day) => day.restricted)
          .map(({ restricted, display, ...rest }) => mapTimeSchema(rest));

        if (def.period === MONTHLY_TYPES.DAY_OF_WEEK) {
          rules.push({
            weeks: Object.entries(groupBy(days, 'week')).map(([week, days]) => ({
              week: +week + 1,
              days: days.map((day) => ({ ...omit(day, ['week']), type: type })),
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

const createWeeklyRange = (days: { day: number }[]) =>
  range(0, 8).reduce((acc: object, i: number) => {
    const day = days.find((day) => day.day === i);
    return day ? { ...acc, [i - 1]: { ...denormMapTimeSchema(day), restricted: true, display: true } } : acc;
  }, {});

const createMonthlyWeekDayRange = (rules) =>
  range(0, 7 * 5 + 1).reduce((acc: object, i: number) => {
    const weekStartIndex = Math.floor(i / 7);
    const week = weekStartIndex;
    const dayOfWeek = i - weekStartIndex * 7;
    const days = rules.weeks.reduce(
      (prev, item) => [...prev, ...item.days.map((day) => ({ ...denormMapTimeSchema(day), week: item.week - 1 }))],
      []
    );
    const day = days.find((day) => day.week === week && day.day === dayOfWeek);
    return day ? { ...acc, [i]: { ...day, restricted: true, display: true } } : acc;
  }, {});

const createMonthlyDayRange = (rules: Rule) =>
  range(0, 32).reduce((acc: Day, i: number) => {
    const day = rules.days.find((d: Day) => d.day === i);
    return day ? { ...acc, [i - 1]: { ...denormMapTimeSchema(day), restricted: true, display: true } } : acc;
  }, {});

const denormalizers = {
  [TYPES.DAILY]: (values: DateRange & { day: number | undefined }) => denormMapTimeSchema(values),
  [TYPES.WEEKLY]: (values) => createWeeklyRange(values.days),
  [TYPES.MONTHLY]: (values) => {
    const monthlyDenormalizers = {
      [MONTHLY_TYPES.DAY_OF_MONTH]: createMonthlyDayRange,
      [MONTHLY_TYPES.DAY_OF_WEEK]: createMonthlyWeekDayRange,
    };
    return values.rules.map((value) => ({
      definition: monthlyDenormalizers[value.type](value),
      period: value.type,
      id: Math.random(),
      periodType: value.inverted ? 'ending' : 'beginning',
    }));
  },
};

const denormalizeValue = (values: FilterValue): FilterValue => ({
  type: values.type,
  definition: denormalizers[values.type](values),
});

const isValidValue = (value: FilterValue): boolean => !value.definition.hasOwnProperty('type') || value.definition.type;

class RangeFilter extends React.PureComponent<Props, State> {
  static defaultProps = {
    value: { type: TYPES.DAILY, ...TYPES_DATA.DAILY.definition },
  };

  constructor(props: Props) {
    super(props);
    this.state = { value: denormalizeValue(props.value) };
  }

  componentWillReceiveProps(props: Props) {
    this.setState({ value: denormalizeValue(props.value) });
  }

  handleApply = (): void => {
    const { onApply } = this.props;
    const { value } = this.state;
    onApply && onApply(normalizeValue(value));
  };

  handleCancel = (): void => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  handleTypeChange = (type: React.ReactText): void => {
    this.setValue({ type, definition: cloneDeep(TYPES_DATA[type].definition) });
  };

  render(): JSX.Element {
    const { value } = this.state;
    const { type, definition } = value;
    const Component = type && TYPES_DATA[type] && TYPES_DATA[type].component;
    const { intl } = this.props;

    return (
      <S.Container>
        <S.Header>
          <S.Title>{intl.formatMessage({ id: 'SNRS.DATE.DATES_FILTER' })}</S.Title>
        </S.Header>
        <S.Body>
          <ButtonGroup fullWidth style={{ marginBottom: 16 }} size="large">
            {Object.values(TYPES).map((key) => (
              <Button
                key={key}
                type={value.type === key ? 'primary' : undefined}
                onClick={(): void => this.handleTypeChange(key)}
              >
                {intl.formatMessage({ id: TYPES_DATA[key].labelTranslationKey })}
              </Button>
            ))}
          </ButtonGroup>
          {Component && (
            <Component value={definition} onChange={(def): void => this.setState({ value: { ...value, def } })} />
          )}
        </S.Body>
        <S.Footer>
          <Button onClick={this.handleCancel}>{intl.formatMessage({ id: 'SNRS.ACTIONS.CANCEL' })}</Button>
          <Button type="primary" disabled={!isValidValue(value)} onClick={this.handleApply}>
            {intl.formatMessage({ id: 'SNRS.ACTIONS.APPLY' })}
          </Button>
        </S.Footer>
      </S.Container>
    );
  }
}

export default injectIntl(RangeFilter);
