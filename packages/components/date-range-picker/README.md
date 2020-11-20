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

| Property             | Description                                                         | Type                 | Default       |
| -------------------- | ------------------------------------------------------------------- | -------------------- | ------------- |
| disabledDate         | Function to specify if particular dates are disabled or not         | (date:Date)=>boolean | -             |
| disabledDefaultTexts | Disables the default texts translations provided by `react-intl`    | boolean              | `false`       |
| forceAbsolute        | Force the outcome to be converted to an absolute date               | boolean              | `false`       |
| format               | Format of the value displayed in the footer                         | string               | "MMM D, YYYY" |
| onApply              | Callback executed after applying changes                            | (date:Date)=>void    | -             |
| ranges               | An array containing custom ranges which may be used as a short-hand | DateRange[]          | []            |
| popoverProps         | Object representing props applied to the Antd Popover component     | AntdPopoverProps     | {}            |
| relativePast         | Enable relative filter for past ranges                              | boolean              | `false`       |
| relativeFuture       | Enable relative filter for future ranges                            | boolean              | `false`       |
| showTime             | Enable user to choose particular hour                               | boolean              | `false`       |
| showFilter           | Enable range filtering                                              | boolean              | `false`       |
| validate             | Function to specify if particular date ranges are correct           | (date:Date)=>boolean | -             |
| value                | Value of the picker                                                 | DateRange            | new Date()    |

### DateRange

| Property | Description                                    | Type                                  | Default |
| -------- | ---------------------------------------------- | ------------------------------------- | ------- |
| from     | Start date                                     | Date / string                         | -       |
| to       | End date                                       | Date / string                         | -       |
| type     | String key for identifying the range type      | 'ABSOLUTE' / 'RELATIVE' / 'SINCE'     | -       |
| duration | Duration of the relative range                 | {type: RelativeUnit, duration:number} | -       |
| offset   | Offset of the relative range from today's date | {type: RelativeUnit, duration:number} | -       |

`RelativeUnit = 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS'`
