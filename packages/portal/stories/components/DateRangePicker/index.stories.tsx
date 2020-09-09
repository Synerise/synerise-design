import * as React from 'react';

import DateRangePicker from '@synerise/ds-date-range-picker';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '5vh' }}>
    <div style={{ width: '340px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);
const texts = {
  custom: 'Custom',
  today: 'Today',
  yesterday: 'Yesterday',
  apply: 'Apply',
  endDatePlaceholder: 'End date',
  startDatePlaceholder: 'Start date',
  clear: 'Clear',
  now: 'Now',
  selectDate: 'Select date',
  emptyDateError: 'Date cannot be empty',
  last7Days: 'Last 7 days',
  thisWeek: 'This week',
  lastWeek: 'Last week',
  thisMonth: 'This month',
  lastMonth: 'Last month',
  last3Months: 'Last 3 months',
  last6Months: 'Last 6 months',
  lastYear: 'Last year',
  allTime: 'Lifetime',
  tomorrow: 'Tomorrow',
  next7Days: 'Next 7 days',
  nextWeek: 'Next week',
  nextMonth: 'Next month',
  next3Months: 'Next 3 months',
  next6Months: 'Next 6 months',
  nextYear: 'Next year',
  more: 'More',
  relativeDateRange: 'Relative date range',
  last: 'Last',
  before: 'before',
  after: 'after',
  since: 'Since',
  next: 'Next',
  seconds: 'Seconds',
  minutes: 'Minutes',
  hours: 'Hours',
  days: 'Days',
  weeks: 'Weeks',
  months: 'Months',
  years: 'Years',
  timestampLast: 'Last',
  timestampNext: 'Next',
  timestampTill: 'till',
  filter: 'Filter',
  selectTime: 'Select time',
  startDate: 'Start date',
  endDate: 'End date',
};

const stories = {
  default: () => {
    const value = undefined;
    const showTime = boolean('Set showTime', true);
    const modesObj = {
      PAST: boolean('Set relative past mode', true),
      FUTURE: boolean('Set relative future mode', true),
      SINCE: boolean('Set relative since mode', true),
    };
    const getRelativeModes = (modesObject: object) => {
      const keys = Object.keys(modesObject);
      const enabledModes = keys.filter(k => !!modesObject[k]);
      return enabledModes;
    };
    const showRelativePicker = boolean('Set relative filter', true);
    return (
      <DateRangePicker
        onApply={action('OnApply')}
        showTime={showTime}
        value={value}
        relativeFuture
        forceAbsolute
        showRelativePicker={showRelativePicker}
        texts={texts}
        popoverPlacement="bottomLeft"
        forceAdjacentMonths={boolean('Set adjacent months', false)}
        relativeModes={getRelativeModes(modesObj)}
      />
    );
  },
  withDateFilter: () => {
    const value = undefined;
    const showTime = boolean('Set showTime', true);
    const modesObj = {
      PAST: boolean('Set relative past mode', true),
      FUTURE: boolean('Set relative future mode', true),
      SINCE: boolean('Set relative since mode', true),
    };
    const getRelativeModes = (modesObject: object) => {
      const keys = Object.keys(modesObject);
      const enabledModes = keys.filter(k => !!modesObject[k]);
      return enabledModes;
    };
    const showRelativePicker = boolean('Set relative filter', true);
    return (
      <DateRangePicker
        onApply={action('OnApply')}
        showTime={showTime}
        value={value}
        relativeFuture
        forceAbsolute
        showRelativePicker={showRelativePicker}
        texts={{
          startDatePlaceholder: 'Start date',
          endDatePlaceholder: 'End date',
          clear: 'Clear',
          emptyDateError: 'Date cannot be empty',
        }}
        popoverPlacement="bottomLeft"
        forceAdjacentMonths={boolean('Set adjacent months', false)}
        showFilter={true}
        relativeModes={getRelativeModes(modesObj)}
      />
    );
  },
  withStartDate: () => {
    const value = {
      filter: undefined,
      from: '2020-08-18T22:00:00.000Z',
      to: undefined,
      type: 'ABSOLUTE',
    };
    const showTime = boolean('Set showTime', true);
    const showRelativePicker = boolean('Set relative filter', true);
    return (
      <DateRangePicker
        onApply={action('OnApply')}
        showTime={showTime}
        value={value}
        relativeFuture
        forceAbsolute
        showRelativePicker={showRelativePicker}
        texts={texts}
        popoverPlacement="bottomLeft"
      />
    );
  },
};

export default {
  name: 'Pickers/DateRangePicker',
  config: {},
  component: DateRangePicker,
  stories,
  decorator,
};
