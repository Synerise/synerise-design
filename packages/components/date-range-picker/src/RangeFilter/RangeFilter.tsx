import React from 'react';
import range from 'lodash/range';
import groupBy from 'lodash/groupBy';
import omit from 'lodash/omit';
import cloneDeep from 'lodash/cloneDeep';
import ButtonGroup from '@synerise/ds-button-group';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import { MONTHLY_TYPES, TYPES, TYPES_DATA } from './constants';
import { Body, Container, Footer, Header, Title } from './RangeFilter.styles';

/*
 * Map field from components to datefilter schema
 * start => from
 * stop => to
 * 0-based => 1-based indexed days
 * */
const mapTimeSchema = item => {
  const { start, stop, day, ...rest } = item;
  return { from: start, to: stop, day: Number.isNaN(+day) ? undefined : +day + 1, ...rest };
};

/*
 * Map field from datefilter to components schema
 * from => start
 * to => stop
 * 1-based => 0-based indexed days
 * */
const denormMapTimeSchema = item => {
  const { from, to, day, ...rest } = item;
  return { start: from, stop: to, day: Number.isNaN(+day) ? undefined : +day - 1, ...rest };
};

const normalizeValue = ({ type, definition }) => {
  const result = { type, nestingType: 'IN_PLACE' }; // TODO - datepicker type
  let days;
  switch (type) {
    case TYPES.DAILY:
      return { ...mapTimeSchema(definition), ...result };
    case TYPES.WEEKLY:
      days = Object.values(definition)
        .filter((day: Object) => day.restricted)
        .map((item: Object) => mapTimeSchema(item));
      break;
    case TYPES.MONTHLY:
      const rules = [];
      definition.map(def => {
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

const createWeeklyRange = days =>
  range(0, 8).reduce((acc, i) => {
    const day = days.find(day => day.day === i);
    return day ? { ...acc, [i - 1]: { ...denormMapTimeSchema(day), restricted: true, display: true } } : acc;
  }, {});

const createMonthlyWeekDayRange = rules =>
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

const createMonthlyDayRange = rules =>
  range(0, 32).reduce((acc, i) => {
    const day = rules.days.find(day => day.day === i);
    return day ? { ...acc, [i - 1]: { ...denormMapTimeSchema(day), restricted: true, display: true } } : acc;
  }, {});

const denormalizers = {
  [TYPES.DAILY]: values => denormMapTimeSchema(values),
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

const denormalizeValue = values => ({
  type: values.type,
  definition: denormalizers[values.type](values),
});

const isValidValue = value => !value.definition.hasOwnProperty('type') || value.definition.type;

class RangeFilter extends React.PureComponent {
  static defaultProps = {
    value: { type: TYPES.DAILY, ...TYPES_DATA.DAILY.definition },
  };

  constructor(props) {
    super(props);
    this.state = { value: denormalizeValue(props.value) };
  }

  componentWillReceiveProps(props) {
    this.setValue(denormalizeValue(props.value));
  }

  handleApply = () => this.props.onApply && this.props.onApply(normalizeValue(this.state.value));

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  handleTypeChange = type => this.setValue({ type, definition: cloneDeep(TYPES_DATA[type].definition) });

  setValue = value => this.setState({ value });

  render() {
    const { value } = this.state;
    const { type, definition } = value;
    const Component = type && TYPES_DATA[type] && TYPES_DATA[type].component;
    const { intl } = this.props;

    return (
      <Container>
        <Header>
          <Title>{intl.formatMessage({ id: 'SNRS.DATE.DATES_FILTER' })}</Title>
        </Header>
        <Body>
          <ButtonGroup fullWidth style={{ marginBottom: 16 }} size="large">
            {Object.values(TYPES).map(key => (
              <Button
                key={key}
                type={value.type === key ? 'primary' : undefined}
                onClick={() => this.handleTypeChange(key)}
              >
                {intl.formatMessage({ id: TYPES_DATA[key].labelTranslationKey })}
              </Button>
            ))}
          </ButtonGroup>
          {Component && (
            <Component value={definition} onChange={definition => this.setValue({ ...value, definition })} />
          )}
        </Body>
        <Footer>
          <Button onClick={this.handleCancel}>{intl.formatMessage({ id: 'SNRS.ACTIONS.CANCEL' })}</Button>
          <Button type="primary" disabled={!isValidValue(value)} onClick={this.handleApply}>
            {intl.formatMessage({ id: 'SNRS.ACTIONS.APPLY' })}
          </Button>
        </Footer>
      </Container>
    );
  }
}

export default injectIntl(RangeFilter);
