---
id: data-format
title: DataFormat
---

DataFormat UI Component

## Installation
```
npm i @synerise/ds-data-format
or
yarn add @synerise/ds-data-format
```

## Usage

```jsx harmony
import { FormattedNumber, FormattedDate, FormattedTime, FormattedDateTime, useDataFormat} from '@synerise/ds-data-format';

const {is12HoursClock, firstDayOfWeek, formatValue} = useDataFormat();

const DATE = new Date('2023-06-25T15:40:00');
const dateToFormat = DATE // moment(DATE) // dayjs(DATE)

is12HoursClock // true // false
firstDayOfWeek // Sunday = 0 // Monday = 1
formatValue(1234567);
formatValue(dateToFormat);
formatValue(dateToFormat, {targetFormat: 'date'});
formatValue(dateToFormat, {targetFormat: 'time'});
formatValue(dateToFormat, {targetFormat: 'datetime'});

<>
  <FormattedNumber value={1234567} options={{unit: 'percent'}}
  <FormattedDate value={dateToFormat} options={{month: 'long'}}
  <FormattedTime value={dateToFormat} options={{second: 'numeric'}}
  <FormattedDateTime value={dateToFormat} options={{ dateOptions: { month: 'long' }, timeOptions: { second: 'numeric' } }}
</>

```
## Examples

### Number
The `options` object is compatible with https://formatjs.io/docs/react-intl/api#formatnumber

| Code                                                                                                       | EU Notation                     | US Notation                     |
|------------------------------------------------------------------------------------------------------------|---------------------------------|---------------------------------|
| formatValue(1234567)                                                                                       | 1 234 567                       | 1,234,567                       |
| formatValue(1234567.89)                                                                                    | 1 234 567,89                    | 1,234,567.89                    |
| formatValue(1234567, { minimumFractionDigits: 2 })                                                         | 1 234 567,00                    | 1,234,567.00                    |
| formatValue(1234567.89, { maximumFractionDigits: 1 })                                                      | 1 234 567,9                     | 1,234,567.9                     |
| formatValue(1234567.89, { style: 'currency', currency: 'USD', prefix: 'Salary: ', suffix: ' per month' })) | Salary: $1 234 567,89 per month | Salary: $1,234,567.89 per month |
| formatValue(1234, { notation: 'compact' }))                                                                | 1,2K (with PL locale: 1,2 tys.) | 1.2K (with PL locale: 1.2 tys.) |
| formatValue(1, { pluralOptions: { type: 'ordinal' } }))                                                    | one                             | one                             |

### Date
The `options` object is compatible with https://formatjs.io/docs/react-intl/api#formatdate

| Code                                                 | EU Notation   | US Notation   |
|------------------------------------------------------|---------------|---------------|
| formatValue(date)                                    | 25.06.2023    | 6/25/2023     |
| formatValue(date, { month: 'long' })                 | 25 June 2023  | June 25, 2023 |
| formatValue(date, { targetFormat: 'weekday-long' })  | Sunday        | Sunday        |
| formatValue(date, { targetFormat: 'weekday-short' }) | Sun           | Sun           |
| formatValue(date, { targetFormat: 'month-long' })    | June          | June          |
| formatValue(date, { targetFormat: 'month-short' })   | Jun           | Jun           |

### Time
The `options` object is compatible with https://formatjs.io/docs/react-intl/api#formatdate

| Code                                                           | EU Notation | US Notation |
|----------------------------------------------------------------|-------------|-------------|
| formatValue(date, { targetFormat: 'time' })                    | 15:40       | 3:40 PM     |
| formatValue(date, { targetFormat: 'time', second: 'numeric' }) | 15:40:00    | 3:40:00 PM  |

### DateTime
The `dateOptions` object and the `timeOptions` object are compatible with https://formatjs.io/docs/react-intl/api#formatdate

| Code                                                                                                                | EU Notation               | US Notation               |
|---------------------------------------------------------------------------------------------------------------------|---------------------------|---------------------------|
| formatValue(date, { targetFormat: 'datetime' })                                                                     | 25.06.2023, 15:40         | 6/25/2023, 3:40 PM        |
| formatValue(date, { targetFormat: 'datetime', dateOptions: { month: 'long' }, timeOptions: { second: 'numeric' } }) | 25 June 2023, 3:40:00 PM  | June 25, 2023, 3:40:00 PM |

## Demo

<iframe src="/storybook-static/iframe.html?id=components-data-format--formattednumber"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-data-format--formatteddate"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-data-format--formattedtime"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-data-format--formatteddatetime"></iframe>