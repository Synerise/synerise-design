import * as React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import DateRangePicker from '@synerise/ds-date-range-picker';
import { RawDateRangePicker } from '@synerise/ds-date-range-picker';
import { boolean, text, select, optionsKnob } from '@storybook/addon-knobs';
import { action, configureActions } from '@storybook/addon-actions';
import Daily from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Daily/Daily';
import Weekly from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Weekly/Weekly';
import Monthly from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Monthly/Monthly';
import RangeFilter from '@synerise/ds-date-range-picker/dist/RangeFilter/RangeFilter';
import { TYPES } from '@synerise/ds-date-range-picker/dist/RangeFilter/constants';
import { DateLimitMode, AvailableFilterTypes } from '@synerise/ds-date-range-picker/dist/RangeFilter/Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { TimePickerProps } from '@synerise/ds-time-picker';
import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
} from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/constants';
import {
  DAYS_OF_PERIOD_ENUM,
  COUNTED_FROM_ENUM,
} from '@synerise/ds-date-range-picker/dist/RangeFilter/constants';
import { ABSOLUTE, RELATIVE, RELATIVE_PRESETS, ABSOLUTE_PRESETS } from '@synerise/ds-date-range-picker/dist/constants';
import { CONST } from '@synerise/ds-date-range-picker';
import { DateRange, RelativeDateRange } from '@synerise/ds-date-range-picker/dist/date.types';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import { utils } from '@synerise/ds-date-range-picker';

const { getDefaultTexts } = utils;

configureActions({
  depth: 20
})

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '5vh' }}>
    <div style={{ width: '600px', margin: 'auto' }}>{storyFn()}</div>
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
  valueFormatOptions: { second: undefined },
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
  custom: 'Custom range',
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
  'custom-last-30-days': {
    type: RELATIVE,
    future: false,
    offset: { type: CONST.DAYS, value: 1 },
    duration: { type: CONST.DAYS, value: 30 },
  },
  'custom-last-month': {
    type: RELATIVE,
    future: false,
    offset: { type: CONST.MONTHS, value: 0 },
    duration: { type: CONST.MONTHS, value: 1 },
  },
  'custom-second-but-last-month': {
    type: RELATIVE,
    future: false,
    offset: { type: CONST.MONTHS, value: 1 },
    duration: { type: CONST.MONTHS, value: 1 },
  },
  'custom-next-second-but-first-month': {
    type: RELATIVE,
    future: true,
    offset: { type: CONST.MONTHS, value: 1 },
    duration: { type: CONST.MONTHS, value: 1 },
  },
  'custom-this-week': {
    type: RELATIVE,
    future: false,
    offset: { type: CONST.WEEKS, value: 0 },
    duration: { type: CONST.WEEKS, value: 1 },
  },
  'custom-last-week': {
    type: RELATIVE,
    future: false,
    offset: { type: CONST.WEEKS, value: 1 },
    duration: { type: CONST.WEEKS, value: 1 },
  },
  'custom-second-but-last-week': {
    type: RELATIVE,
    future: false,
    offset: { type: CONST.WEEKS, value: 2 },
    duration: { type: CONST.WEEKS, value: 1 },
  },
  'custom-next-week': {
    type: RELATIVE,
    future: true,
    offset: { type: CONST.WEEKS, value: 0 },
    duration: { type: CONST.WEEKS, value: 1 },
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
  'since 2023q1': {
    type: RELATIVE,
    duration: {
      type: 'DAYS',
      value: 14,
    },
    offset: {
      type: 'SINCE',
      value: new Date(
        new Date(2023, 0, 1).getTime() + ((new Date(2024, 0, 1).getTime() - new Date(2023, 0, 1).getTime()) * 1) / 4
      ),
    },
  },
};

const buildSelectKnobOptions = optionValues => {
  return Object.assign({}, ...Object.keys(optionValues).map(k => ({ [k]: k })));
};

const stories = {
  default: injectIntl(({ intl }) => {
    const initialValue = {
      ...optionValues[
        select(
          'Initial date (requires opening canvas in new window)',
          buildSelectKnobOptions(optionValues),
          'undefined'
        )
      ],
    };
    initialValue.translationKey = initialValue.translationKey ?? initialValue.key?.toLowerCase();

    const showValue = boolean('Print current value', false) || undefined;
    const [value, setValue] = React.useState<DateRange>(initialValue);
    if (value) {
      value.translationKey = value.translationKey ?? value.key?.toLowerCase();
    }
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
      SINCE: boolean('Set relative since mode', false),
    };
    const getRelativeModes = (modesObject: object) => {
      const keys = Object.keys(modesObject);
      const enabledModes = keys.filter(k => !!modesObject[k]);
      return enabledModes;
    };
    const forceAbsolute = boolean('Force absolute date on apply', false);
    const showRelativePicker = boolean('Set relative filter', true);
    const showFilter = boolean('Show relative date-hours-filter', false);
    const disableAbsoluteTimepickerInRelative = boolean(
      'Disable time-picker for relative dates (so no hidden convertion to an absolute date)',
      false
    );
    const rangePickerInputProps = {
      preferRelativeDesc: boolean('Prefer descriptive relative dates', false),
    };
    const twice = boolean('Render twice', false);
    const customTrigger = boolean('Custom trigger', false);
    const readOnly = boolean('Set readOnly', false);
    let filterValueModes;
    if (showFilter) {
      filterValueModes = {
        Range: boolean('Filter mode: range', true),
        Hour: boolean('Filter mode: hour', true),
      };
    }
    const getFilterSelectionModes = (modesObject: object) => {
      const keys = Object.keys(modesObject);
      const enabledModes = keys.filter(k => !!modesObject[k]);
      return enabledModes;
    };

    const datePicker = (
      <>
        <DateRangePicker
          onApply={v => {
            action('OnApply')(v);
            setValue(v);
          }}
          showTime={showTime}
          value={value}
          relativeFuture
          forceAbsolute={forceAbsolute}
          showRelativePicker={showRelativePicker}
          showFilter={showFilter}
          filterValueSelectionModes={filterValueModes && getFilterSelectionModes(filterValueModes)}
          texts={texts}
          popoverProps={{ placement: setPlacement, destroyTooltipOnHide: boolean('Destroy tooltip on hide', false) }}
          arrowColor={setCustomArrowColor && additionalMapper}
          forceAdjacentMonths={boolean('Set adjacent months', false)}
          relativeModes={getRelativeModes(modesObj)}
          disableAbsoluteTimepickerInRelative={disableAbsoluteTimepickerInRelative}
          rangePickerInputProps={rangePickerInputProps}
          {...(customTrigger ? { popoverTrigger: <button>{JSON.stringify(value, null, 2)}</button> } : {})}
          readOnly={readOnly}
        />
        {showValue && <pre>{JSON.stringify(value, null, 2)}</pre>}
      </>
    );
    if (twice) {
      return (
        <div>
          {datePicker}
          {datePicker}
        </div>
      );
    }
    return datePicker;
  }),
  lifetimeByDefault: () => {
    const value = ABSOLUTE_PRESETS.find(e => e.key === CONST.ALL_TIME);
    const DateRangePicker = injectIntl(RawDateRangePicker);
    return (
      <DateRangePicker
        showRelativePicker
        showTime
        showFilter
        relativeModes={['PAST', 'FUTURE', 'SINCE']}
        texts={texts}
        value={value}
        onApply={action('OnApply')}
      />
    );
  },
  relativeDates: () => {
    const Table = styled.table`
      td {
        white-space: nowrap;
        padding: 4px 12px;
        text-align: right;
      }
      td.opacity {
        opacity: 0.5;
      }
    `;
    const presets = optionValues;
    const now = new Date();
    const dateStr = (date: Date) => {
      try {
        return JSON.stringify(
          {
            utc: date?.toUTCString(),
            iso: date?.toISOString(),
            str: date?.toString(),
            locale: date?.toLocaleString(),
          },
          null,
          2
        );
      } catch (e) {
        return e;
      }
    };
    return (
      <>
        <Table style={{ width: '600px' }}>
          <thead>
            <tr>
              <td>relative date range</td>
              <td></td>
              <td>value.from</td>
              <td>value.to</td>
              <td>ending month of date-range-end</td>
            </tr>
          </thead>
          <tbody>
            {Object.entries(presets).map(([k, e]) => {
              const dateRange = utils.normalizeRange(e);
              return (
                <tr>
                  <td title={JSON.stringify(e, null, 2)}>{k}</td>
                  <td className="opacity"></td>
                  <td>
                    <div title={dateStr(dateRange?.from)}>{dateRange?.from?.toLocaleString()}</div>
                  </td>
                  <td>
                    <div title={dateStr(dateRange?.to)}>{dateRange?.to?.toLocaleString()}</div>
                  </td>
                  <td className="opacity">
                    <div title={dateStr(dateRange?.to)}>{utils.END_OF['MONTHS'](dateRange?.to)?.toLocaleString()}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
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

  dateFilterStandalone: () => {
    const value = undefined;
    const showTime = boolean('Set showTime', true);
    const hideFooter = boolean('hide footer', true);
    const [filters, setFilters] = React.useState(savedFilters);
    const valueSelectionModes:DateLimitMode = ['Range'];

    const allowedFilterLabel = 'Filter types';
    const optionsObj = {
      display: 'inline-check',
    };
    const allowedFilterTypes: AvailableFilterTypes[] = optionsKnob(allowedFilterLabel, TYPES, Object.values(TYPES), optionsObj);

    // RangeFilterTypes 
    return (
      <RangeFilter
        value={value} 
        hideFooter={hideFooter}
        onCancel={action('onCancel')}
        onChange={action('onChange')}
        onApply={action('onApply')}
        onFilterSave={action('onFilterSave')}
        savedFilters={filters}
        allowedFilterTypes={allowedFilterTypes}
        valueSelectionModes={valueSelectionModes}
        texts={{
          ...texts,
          startDatePlaceholder: 'Start date',
          endDatePlaceholder: 'End date',
          clear: 'Clear',
          emptyDateError: 'Date cannot be empty',
        }}
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
    return <Weekly timePickerProps={TIME_PICKER_PROPS} onChange={v => { action('onChange')(v); setValue(v); }} value={value} disabled={disabled} />;
  },
  monthlyDateFilter: () => {
    const disabled = boolean('Set disabled', false);
    const countedFromOptions = {
      Beginning: COUNTED_FROM_ENUM.BEGINNING,
      End: COUNTED_FROM_ENUM.ENDING
    };
    const periodTypeOptions = {
      "Days of month": DAYS_OF_PERIOD_ENUM.DAY_OF_MONTH,
      "Days of week": DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK
    }
    const countedFrom = select('Counted from', countedFromOptions, COUNTED_FROM_ENUM.BEGINNING);
    const periodType = select('Period type', periodTypeOptions, DAYS_OF_PERIOD_ENUM.DAY_OF_MONTH);
    
    const [value, setValue] = React.useState({});
  
    return <Monthly 
      countedFrom={countedFrom} 
      periodType={periodType} 
      timePickerProps={TIME_PICKER_PROPS} 
      onChange={v => {
        action('OnChange')(v);
        setValue(v);
      }}
      value={value} 
      disabled={disabled} />;
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

  noCustomTexts: () => {
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
        popoverProps={{ placement: 'bottomLeft' }}
        forceAdjacentMonths={boolean('Set adjacent months', false)}
        showFilter={true}
        relativeModes={getRelativeModes(modesObj)}
      />
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
