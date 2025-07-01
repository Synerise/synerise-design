---
id: date-range-picker
title: DateRangePicker
---

DateRangePicker UI Component

## Installation

```
npm i @synerise/ds-date-range-picker
or
yarn add @synerise/ds-date-range-picker
```

## Usage

```
import DateRangePicker from '@synerise/ds-date-range-picker'

const value = {
  type: 'ABSOLUTE',
  from: '2018-10-09T00:00:00+02:00',
  to: '2018-12-08T23:59:59+01:00',
};

<DateRangePicker
  showTime
  onApply={console.log}
  showFilter={false}
  showRelativePicker
  value={value}
  forceAbsolute={false}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-date-range-picker--default"></iframe>

## API

| Property                  | Description                                                                      | Type                       | Default                                                       |
| ------------------------- | -------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------- |
| disabledDate              | Function to specify if particular dates are disabled or not                      | (date:Date)=>boolean       | -                                                             |
| disabledDefaultTexts      | Disables the default texts translations provided by `react-intl`                 | boolean                    | `false`                                                       |
| forceAbsolute             | Force the outcome to be converted to an absolute date                            | boolean                    | `false`                                                       |
| format                    | Format of the value displayed in the footer                                      | string                     | "MMM D, YYYY"                                                 |
| onApply                   | Callback executed after applying changes                                         | (date:Date)=>void          | -                                                             |
| ranges                    | An array containing custom ranges which may be used as a short-hand              | DateRange[]                | []                                                            |
| popoverProps              | Object representing props applied to the Antd Popover component                  | AntdPopoverProps           | {}                                                            |
| rangeUnits                | Units available in relative range picker                                         | RelativeUnits[]            | ['SECONDS','MINUTES','HOURS','DAYS','WEEKS','MONTHS','YEARS'] |
| readOnly                  | Makes picker readonly                                                            | boolean                    | `false`                                                       |
| disabled                  | Makes picker disabled                                                            | boolean                    | `false`                                                       |
| relativePast              | Enable relative filter for past ranges                                           | boolean                    | `false`                                                       |
| relativeFuture            | Enable relative filter for future ranges                                         | boolean                    | `false`                                                       |
| showTime                  | Enable user to choose particular hour                                            | boolean                    | `false`                                                       |
| showNowButton             | Include "now" button to select current time (last minue)                         | boolean                    | `true`                                                        |
| showFilter                | Enable range filtering                                                           | boolean                    | `false`                                                       |
| showCustomRange           | Enable custom range form in relative range picker                                | boolean                    | `true`                                                        |
| validate                  | Function to specify if particular date ranges are correct                        | (date:Date)=>boolean       | -                                                             |
| value                     | Value of the picker                                                              | DateRange                  |                                                               |
| defaultValue              | Default value of the picker (when value is undefined and when user clears input) | DateRange                  |                                                               |
| startAlwaysOnTheLeft      | Enable not to move month from left side to right side                            | boolean                    | `false`                                                       |
| onVisibleChange           | Callback executed when popover with dateRangePicker changes its visibility       | (visible: boolean) => void | -                                                             |
| filterValueSelectionModes | Allowed modes to display in filter                                               | DateLimitMode[]            | ["Range", "Hour"]                                             |
| getPopupContainer         | Function used to set the container of the date range picker.                     | Function(triggerNode)      | `() => document.body`                                         |
| texts                     | custom translations                                                              | Texts                      | undefined                                                     |
| disableDefaultTexts       | disable DS translations fallback                                                 | boolean                    | false                                                         |

### DateRange

| Property | Description                                    | Type                                  | Default |
| -------- | ---------------------------------------------- | ------------------------------------- | ------- |
| from     | Start date                                     | Date / string                         | -       |
| to       | End date                                       | Date / string                         | -       |
| type     | String key for identifying the range type      | 'ABSOLUTE' / 'RELATIVE' / 'SINCE'     | -       |
| duration | Duration of the relative range                 | {type: RelativeUnit, duration:number} | -       |
| offset   | Offset of the relative range from today's date | {type: RelativeUnit, duration:number} | -       |

`RelativeUnit = 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS'`

### Texts

- `texts` prop is now optional
- all keys in `texts` is now also optional
- if `texts` is `undefined` or if a key in `texts` is `undefined` default DS translations will appear in the component
- `disableDefaultTexts` disables the above fallback, i.e. if any key is missing in `texts` then an empty string is used as a translation (this prop is provided for testing custom translation completeness)

| translation key       | Type      | Default  |
| --------------------- | --------- | -------- |
| endDatePlaceholder    | string    | -------- |
| startDatePlaceholder  | string    | -------- |
| selectDate            | string    | -------- |
| selectTime            | string    | -------- |
| filterName            | string    | -------- |
| custom                | ReactNode | -------- |
| today                 | ReactNode | -------- |
| yesterday             | ReactNode | -------- |
| apply                 | ReactNode | -------- |
| clear                 | ReactNode | -------- |
| now                   | ReactNode | -------- |
| emptyDateError        | ReactNode | -------- |
| last7Days             | ReactNode | -------- |
| thisWeek              | ReactNode | -------- |
| lastWeek              | ReactNode | -------- |
| thisMonth             | ReactNode | -------- |
| lastMonth             | ReactNode | -------- |
| last3Months           | ReactNode | -------- |
| last6Months           | ReactNode | -------- |
| lastYear              | ReactNode | -------- |
| allTime               | ReactNode | -------- |
| tomorrow              | ReactNode | -------- |
| next7Days             | ReactNode | -------- |
| nextWeek              | ReactNode | -------- |
| nextMonth             | ReactNode | -------- |
| next3Months           | ReactNode | -------- |
| next6Months           | ReactNode | -------- |
| nextYear              | ReactNode | -------- |
| more                  | ReactNode | -------- |
| relativeDateRange     | ReactNode | -------- |
| last                  | ReactNode | -------- |
| before                | ReactNode | -------- |
| after                 | ReactNode | -------- |
| since                 | ReactNode | -------- |
| next                  | ReactNode | -------- |
| seconds               | ReactNode | -------- |
| minutes               | ReactNode | -------- |
| hours                 | ReactNode | -------- |
| days                  | ReactNode | -------- |
| weeks                 | ReactNode | -------- |
| months                | ReactNode | -------- |
| years                 | ReactNode | -------- |
| timestampLast         | ReactNode | -------- |
| timestampNext         | ReactNode | -------- |
| timestampTill         | ReactNode | -------- |
| filter                | ReactNode | -------- |
| startDate             | ReactNode | -------- |
| endDate               | ReactNode | -------- |
| remove                | ReactNode | -------- |
| savedFiltersTrigger   | ReactNode | -------- |
| clearRange            | ReactNode | -------- |
| copyRange             | ReactNode | -------- |
| pasteRange            | ReactNode | -------- |
| range                 | ReactNode | -------- |
| hour                  | ReactNode | -------- |
| filterEnabled         | ReactNode | -------- |
| selectDateFilter      | ReactNode | -------- |
| datesFilter           | ReactNode | -------- |
| cancel                | ReactNode | -------- |
| everyDay              | ReactNode | -------- |
| nthDayOfMonth         | ReactNode | -------- |
| daysOf                | ReactNode | -------- |
| countedFrom           | ReactNode | -------- |
| addRule               | ReactNode | -------- |
| addTime               | ReactNode | -------- |
| change                | ReactNode | -------- |
| weekly                | ReactNode | -------- |
| monthly               | ReactNode | -------- |
| daily                 | ReactNode | -------- |
| saveFilter            | ReactNode | -------- |
| selected              | ReactNode | -------- |
| selectDaysDescription | ReactNode | -------- |
| selectAll             | ReactNode | -------- |
| unselectAll           | ReactNode | -------- |
| inverseSelection      | ReactNode | -------- |
| setTimeFor            | ReactNode | -------- |
| week                  | ReactNode | -------- |
| month                 | ReactNode | -------- |
| beginning             | ReactNode | -------- |
| ending                | ReactNode | -------- |
| maximumRanges         | ReactNode | -------- |

### Undocumented props

- min in `MonthlyFilter` - controls minimal amount of entires in monthly filter, disable with `undefined`, default is `1`
