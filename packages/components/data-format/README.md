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
import { useDataFormat } from '@synerise/ds-data-format';

const { is12HoursClock, firstDayOfWeek, formattedValue } = useDataFormat();

const DATE = new Date('2023-06-25T15:40:00');
const dateToFormat = DATE // or moment(DATE); or dayjs(DATE)

is12HoursClock // true or false
firstDayOfWeek // 0 or 1
formattedValue(1234567);
formattedValue(dateToFormat);
formattedValue(dateToFormat, { targetFormat: 'date' });
formattedValue(dateToFormat, { targetFormat: 'time' });
formattedValue(dateToFormat, { targetFormat: 'datetime' });

```
## Examples

### Number
| Code                                                                                                          | EU Notation                     | US Notation                     |
|---------------------------------------------------------------------------------------------------------------|---------------------------------|---------------------------------|
| formattedValue(1234567)                                                                                       | 1 234 567                       | 1,234,567                       |
| formattedValue(1234567.89)                                                                                    | 1 234 567,89                    | 1,234,567.89                    |
| formattedValue(1234567, { minimumFractionDigits: 2 })                                                         | 1 234 567,00                    | 1,234,567.00                    |
| formattedValue(1234567.89, { maximumFractionDigits: 1 })                                                      | 1 234 567,9                     | 1,234,567.9                     |
| formattedValue(1234567.89, { style: 'currency', currency: 'USD', prefix: 'Salary: ', suffix: ' per month' })) | Salary: $1 234 567,89 per month | Salary: $1,234,567.89 per month |
| formattedValue(1234, { notation: 'compact' }))                                                                | 1,2K (with PL locale: 1,2 tys.) | 1.2K (with PL locale: 1.2 tys.) |
| formattedValue(1, { pluralOptions: { type: 'ordinal' } }))                                                    | one                             | one                             |

### Date

| Code                                                    | EU Notation   | US Notation   |
|---------------------------------------------------------|---------------|---------------|
| formattedValue(date)                                    | 25.06.2023    | 6/25/2023     |
| formattedValue(date, { month: 'long' })                 | 25 June 2023  | June 25, 2023 |
| formattedValue(date, { targetFormat: 'weekday-long' })  | Sunday        | Sunday        |
| formattedValue(date, { targetFormat: 'weekday-short' }) | Sun           | Sun           |
| formattedValue(date, { targetFormat: 'month-long' })    | June          | June          |
| formattedValue(date, { targetFormat: 'month-short' })   | Jun           | Jun           |

### Time

| Code                                                              | EU Notation | US Notation |
|-------------------------------------------------------------------|-------------|-------------|
| formattedValue(date, { targetFormat: 'time' })                    | 15:40       | 3:40 PM     |
| formattedValue(date, { targetFormat: 'time', second: 'numeric' }) | 15:40:00    | 3:40:00 PM  |

### DateTime

| Code                                                                                                                    | EU Notation               | US Notation               |
|-------------------------------------------------------------------------------------------------------------------------|---------------------------|---------------------------|
| formattedValue(date, { targetFormat: 'datetime' })                                                                      | 25.06.2023, 15:40         | 6/25/2023, 3:40 PM        |
| formattedValue(date, { targetFormat: 'datetime', dateOptions: { month: 'long' }, timeOptions: { second: 'numeric' } })  | 25 June 2023, 3:40:00 PM  | June 25, 2023, 3:40:00 PM |

## Demo

<iframe src="/storybook-static/iframe.html?id=components-data-format--formattednumber"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-data-format--formatteddate"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-data-format--formattedtime"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-data-format--formatteddatetime"></iframe>