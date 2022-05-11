import * as React from 'react';

import DateRangePicker from '@synerise/ds-date-range-picker';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Daily from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Daily/Daily';
import Weekly from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Weekly/Weekly';
import { TimePickerProps } from '@synerise/ds-time-picker/dist/TimePicker.types';
import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
} from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/constants';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '5vh' }}>
    <div style={{ width: '340px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);

export const TIME_PICKER_PROPS: Partial<TimePickerProps> = {
  containerStyle: { width: '268px', maxWidth: 'none' },
  units: ['hour', 'minute'],
  timeFormat: 'HH:mm',
};

const savedFilters = [];
const texts = {
  after: 'after',
  allTime: 'Lifetime',
  apply: 'Apply',
  before: 'before',
  clear: 'Clear',
  clearRange: ' Clear range',
  copyRange: 'Copy range',
  custom: 'Custom',
  days: 'Days',
  emptyDateError: 'Date cannot be empty',
  endDate: 'End date',
  endDatePlaceholder: 'End date',
  filter: 'Date filter',
  hours: 'Hours',
  last3Months: 'Last 3 months',
  last6Months: 'Last 6 months',
  last7Days: 'Last 7 days',
  last: 'Last',
  lastMonth: 'Last month',
  lastWeek: 'Last week',
  lastYear: 'Last year',
  minutes: 'Minutes',
  months: 'Months',
  more: 'More',
  next3Months: 'Next 3 months',
  next6Months: 'Next 6 months',
  next7Days: 'Next 7 days',
  next: 'Next',
  nextMonth: 'Next month',
  nextWeek: 'Next week',
  nextYear: 'Next year',
  now: 'Now',
  pasteRange: 'Paste range',
  relativeDateRange: 'Relative date range',
  remove: 'Remove',
  savedFiltersTrigger: 'Saved filters',
  seconds: 'Seconds',
  selectDate: 'Select date',
  selectTime: 'Select time',
  since: 'Since',
  startDate: 'Start date',
  startDatePlaceholder: 'Start date',
  thisMonth: 'This month',
  thisWeek: 'This week',
  timestampLast: 'Last',
  timestampNext: 'Next',
  timestampTill: 'till',
  today: 'Today',
  tomorrow: 'Tomorrow',
  weeks: 'Weeks',
  years: 'Years',
  yesterday: 'Yesterday',
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
        popoverProps={{ placement: 'bottomLeft' }}
        forceAdjacentMonths={boolean('Set adjacent months', false)}
        relativeModes={getRelativeModes(modesObj)}
      />
    );
  },
  withCustomTrigger: () => {
    const value = undefined;
    const [tooltipVisible, setTooltipVisible] = React.useState(false);
    const [dateRangeVisible, setDateRangeVisible] = React.useState(false);
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
        popoverProps={{ placement: 'bottomLeft' }}
        forceAdjacentMonths={boolean('Set adjacent months', false)}
        relativeModes={getRelativeModes(modesObj)}
        onVisibleChange={visible => {
          setTooltipVisible(false);
          setDateRangeVisible(visible);
        }}
        popoverTrigger={
          <Tooltip
            trigger={['hover']}
            onVisibleChange={setTooltipVisible}
            visible={!dateRangeVisible && tooltipVisible}
            placement={'bottom'}
            description={text(
              'Tooltip description',
              'Date range picker with custom trigger button and tooltip with description'
            )}
            type="largeSimple"
          >
            <Button>Custom trigger</Button>
          </Tooltip>
        }
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
    const [filters, setFilters] = React.useState(savedFilters);
    const showRelativePicker = boolean('Set relative filter', true);
    return (
      <DateRangePicker
        onApply={action('OnApply')}
        showTime={showTime}
        value={value}
        relativeFuture
        forceAbsolute
        showRelativePicker={showRelativePicker}
        savedFilters={filters}
        onFilterSave={setFilters}
        texts={{
          ...texts,
          startDatePlaceholder: 'Start date',
          endDatePlaceholder: 'End date',
          clear: 'Clear',
          emptyDateError: 'Date cannot be empty',
        }}
        popoverProps={{ placement: 'bottomLeft' }}
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
        popoverProps={{ placement: 'bottomLeft' }}
      />
    );
  },
  dailyDateFilter: () => {
    const disabled = boolean('Set disabled', false);

    const [value, setValue] = React.useState([
      {
        start: DEFAULT_RANGE_START,
        stop: DEFAULT_RANGE_END,
        restricted: false,
        display: false,
        inverted: false,
        mode: 'Hour',
      },
    ]);

    return <Daily timePickerProps={TIME_PICKER_PROPS} onChange={setValue} value={value} disabled={disabled} />;
  },
  weeklyDateFilter: () => {
    const disabled = boolean('Set disabled', false);
    const [value, setValue] = React.useState({});
    return <Weekly timePickerProps={TIME_PICKER_PROPS} onChange={setValue} value={value} disabled={disabled} />;
  },
};

export default {
  name: 'Components/Pickers/DateRangePicker',
  config: {},
  component: DateRangePicker,
  stories,
  decorator,
};
