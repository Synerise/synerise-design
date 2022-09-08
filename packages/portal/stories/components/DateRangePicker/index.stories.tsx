import * as React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import DateRangePicker from '@synerise/ds-date-range-picker';
import { RawDateRangePicker } from '@synerise/ds-date-range-picker';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Daily from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Daily/Daily';
import Weekly from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Weekly/Weekly';
import { TimePickerProps } from '@synerise/ds-time-picker/dist/TimePicker.types';
import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
} from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/constants';
import { ABSOLUTE, RELATIVE, RELATIVE_PRESETS, ABSOLUTE_PRESETS } from '@synerise/ds-date-range-picker/dist/constants';
import { CONST } from '@synerise/ds-date-range-picker';
import { DateRange, RelativeDateRange } from '@synerise/ds-date-range-picker/dist/date.types';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import { utils } from '@synerise/ds-date-range-picker';

const { getDefaultTexts } = utils;

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '5vh' }}>
    <div style={{ width: '340px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);
const CUSTOM_COLORS = [
  '',
  'blue',
  'grey',
  'red',
  'green',
  'yellow',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
];
const POPOVER_PLACEMENT = {
  topLeft: 'topLeft',
  topRight: 'topRight',
  bottomLeft: 'bottomLeft',
  bottomRight: 'bottomRight',
  leftTop: 'leftTop',
  leftBottom: 'leftBottom',
  rightTop: 'rightTop',
  rightBottom: 'rightBottom',
};

export const TIME_PICKER_PROPS: Partial<TimePickerProps> = {
  containerStyle: { width: '268px', maxWidth: 'none' },
  units: ['hour', 'minute'],
  timeFormat: 'HH:mm',
  inputProps: { allowClear: true },
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

const optionValues: Record<string, DateRange> = {
  ...Object.assign({}, ...RELATIVE_PRESETS.map(e => ({ [e.key]: e }))),
  ...Object.assign({}, ...ABSOLUTE_PRESETS.map(e => ({ [e.key]: e }))),
  undefined: undefined,
  invalid: {
    type: ABSOLUTE,
    from: new Date('invalid date'),
  },
  'invalid-relative': {
    type: RELATIVE,
    future: false,
    offset: { type: CONST.YEARS, value: 3000000 },
    duration: { type: CONST.DAYS, value: 1 },
  },
  'first-week-2022-utc': {
    type: ABSOLUTE,
    from: new Date('Jan 1, 2022 00:00 UTC'),
    to: new Date('Jan 7, 2022 23:59:59 UTC'),
  },
  'first-week-2022-gmt1': {
    type: ABSOLUTE,
    from: new Date('Jan 1, 2022 00:00 GMT+1'),
    to: new Date('Jan 7, 2022 23:59:59 GMT+1'),
  },
};

const buildSelectKnobOptions = optionValues => {
  return Object.assign({}, ...Object.keys(optionValues).map(k => ({ [k]: k })));
};

const stories = {
  default: injectIntl(({ intl }) => {
    const intlTexts = boolean('use Intl', false) ? getDefaultTexts(intl) : texts;
    const value = {
      ...optionValues[
        select('Initial date (requires enabled destroying on hide)', buildSelectKnobOptions(optionValues), 'undefined')
      ],
    };
    value.translationKey = value.translationKey ?? value.key?.toLowerCase();
    const showTime = boolean('Set showTime', true);
    const setCustomArrowColor = boolean('Set custom arrow color', false);
    const topPlacementOfPopover = select('Bottom arrow color', CUSTOM_COLORS, 'grey');
    const bottomPlacementOfPopover = select('Top arrow color', CUSTOM_COLORS, 'grey');
    const additionalMapper = {
      topLeft: topPlacementOfPopover,
      topRight: topPlacementOfPopover,
      bottomLeft: bottomPlacementOfPopover,
      bottomRight: bottomPlacementOfPopover,
      leftTop: topPlacementOfPopover,
      leftBottom: bottomPlacementOfPopover,
      rightTop: topPlacementOfPopover,
      rightBottom: bottomPlacementOfPopover,
    };
    const setPlacement = select('Set placement of popover', POPOVER_PLACEMENT, 'bottomLeft');
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
    const forceAbsolute = boolean('Force absolute date on apply', false);
    const showRelativePicker = boolean('Set relative filter', true);
    const showFilter = boolean('Show relative date-hours-filter', false);
    return (
      <DateRangePicker
        onApply={action('OnApply')}
        showTime={showTime}
        value={value}
        relativeFuture
        forceAbsolute={forceAbsolute}
        showRelativePicker={showRelativePicker}
        showFilter={showFilter}
        texts={intlTexts}
        popoverProps={{ placement: setPlacement, destroyTooltipOnHide: boolean('Destroy tooltip on hide', false) }}
        arrowColor={setCustomArrowColor && additionalMapper}
        forceAdjacentMonths={boolean('Set adjacent months', false)}
        relativeModes={getRelativeModes(modesObj)}
      />
    );
  }),
  lifetimeByDefault: () => {
    const value = ABSOLUTE_PRESETS.find(e => e.key === CONST.ALL_TIME);
    const DateRangePicker = injectIntl(RawDateRangePicker);
    return (
      <DateRangePicker
        showRelativePicker
        relativeModes={['PAST', 'FUTURE', 'SINCE']}
        texts={texts}
        value={value}
        onApply={action('OnApply')}
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
  overwritingBaseStylesCheck: () => {
    /**
     * in some circumstances antd default styles overwrite provided display: flex;
     */
    const DefaultAntInputStyles = styled.div`
      .ant-input-group.ant-input-group-compact {
        // as in 'antd@4.7.0/lib/input/style/index.css:523'
        display: block;
      }
    `;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const value = React.useState<RelativeDateRange>({});
    return (
      <DefaultAntInputStyles>
        <DateRangePicker
          onApply={action('OnApply')}
          value={value}
          relativeFuture
          showRelativePicker={true}
          showFilter={true}
          texts={texts}
          relativeModes={['PAST', 'FUTURE', 'SINCE']}
        />
      </DefaultAntInputStyles>
    );
  },
};

export default {
  name: 'Components/Pickers/DateRangePicker',
  config: {},
  component: DateRangePicker,
  stories,
  decorator,
};
