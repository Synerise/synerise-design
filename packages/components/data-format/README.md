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

### For function components:

```tsx harmony
import React, { FC } from 'react';

import {
  FormattedDate,
  FormattedDateTime,
  FormattedNumber,
  FormattedTime,
  useDataFormat,
} from '@synerise/ds-data-format';

const DATE = new Date('2023-06-25T15:40:00');
const DATE_TO_FORMAT = DATE; // moment(DATE) // dayjs(DATE)

export const FunctionComponent: FC = (): JSX.Element => {
  const {
    firstDayOfWeek,
    isSundayFirstWeekDay,
    is12HoursClock,
    formatValue,
    formatMultipleValues,
    getConstants,
    thousandDelimiter,
    decimalDelimiter,
  } = useDataFormat();

  firstDayOfWeek; // Sunday = 0 // Monday = 1
  isSundayFirstWeekDay; // true // false
  is12HoursClock; // true // false

  formatValue(1234567);
  formatValue(DATE_TO_FORMAT);
  formatValue(DATE_TO_FORMAT, { targetFormat: 'date' });
  formatValue(DATE_TO_FORMAT, { targetFormat: 'time' });
  formatValue(DATE_TO_FORMAT, { targetFormat: 'datetime' });

  formatMultipleValues([1234567, 1234567]);
  formatMultipleValues([DATE_TO_FORMAT, DATE_TO_FORMAT], {
    targetFormat: 'datetime',
  });

  getConstants('months-long');
  getConstants('months-short');
  getConstants('weekdays-long');
  getConstants('weekdays-short');
  getConstants(
    'months-long',
    { namingConvention: 'lowerCase' },
    new Date(2022, 10),
    new Date(2023, 2),
    'month',
  );

  thousandDelimiter; // "," // " "
  decimalDelimiter; // "." // ","

  return (
    <>
      <FormattedNumber value={1234567} options={{ unit: 'percent' }} />
      <FormattedDate value={DATE_TO_FORMAT} options={{ month: 'long' }} />
      <FormattedTime value={DATE_TO_FORMAT} options={{ second: 'numeric' }} />
      <FormattedDateTime
        value={DATE_TO_FORMAT}
        options={{
          dateOptions: { month: 'long' },
          timeOptions: { second: 'numeric' },
        }}
      />
    </>
  );
};
```

For class components:

```tsx harmony
import React, { Component, FC } from 'react';
import { withDataFormat, WithDataFormatProps } from '@synerise/ds-data-format';

type ClassComponentProps = {
  ...
} & WithDataFormatProps;

class ClassComponent extends Component<ClassComponentProps> {
  constructor(props: ClassComponentProps) {
    super(props);
  }

  render() {
    const {
      firstDayOfWeek,
      isSundayFirstWeekDay,
      is12HoursClock,
      formatValue,
      formatMultipleValues,
      getConstants,
      thousandDelimiter,
      decimalDelimiter,
    } = this.props;

    return (
      <>
        <div>{formatValue(1234567)}</div>
      </>
    );
  }
}

export default withDataFormat(ClassComponent) as FC<ClassComponentProps>;
```

## Examples

### Number

The `options` object is compatible with https://formatjs.io/docs/react-intl/api#formatnumber

| Code                                                                                                       | EU Notation                     | US Notation                     |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------- |
| formatValue(1234567)                                                                                       | 1 234 567                       | 1,234,567                       |
| formatValue(1234567.89)                                                                                    | 1 234 567,89                    | 1,234,567.89                    |
| formatValue(1234567, { minimumFractionDigits: 2 })                                                         | 1 234 567,00                    | 1,234,567.00                    |
| formatValue(1234567.89, { maximumFractionDigits: 1 })                                                      | 1 234 567,9                     | 1,234,567.9                     |
| formatValue(1234567.89, { style: 'currency', currency: 'USD', prefix: 'Salary: ', suffix: ' per month' })) | Salary: $1 234 567,89 per month | Salary: $1,234,567.89 per month |
| formatValue(1234, { notation: 'compact' }))                                                                | 1,2K (with PL locale: 1,2 tys.) | 1.2K (with PL locale: 1.2 tys.) |
| formatValue(1, { pluralOptions: { type: 'ordinal' } }))                                                    | one                             | one                             |

### Date

The `options` object is compatible with https://formatjs.io/docs/react-intl/api#formatdate

| Code                                                 | EU Notation  | US Notation   |
| ---------------------------------------------------- | ------------ | ------------- |
| formatValue(date)                                    | 25.06.2023   | 6/25/2023     |
| formatValue(date, { month: 'long' })                 | 25 June 2023 | June 25, 2023 |
| formatValue(date, { targetFormat: 'weekday-long' })  | Sunday       | Sunday        |
| formatValue(date, { targetFormat: 'weekday-short' }) | Sun          | Sun           |
| formatValue(date, { targetFormat: 'month-long' })    | June         | June          |
| formatValue(date, { targetFormat: 'month-short' })   | Jun          | Jun           |

### Time

The `options` object is compatible with https://formatjs.io/docs/react-intl/api#formatdate

| Code                                                           | EU Notation | US Notation |
| -------------------------------------------------------------- | ----------- | ----------- |
| formatValue(date, { targetFormat: 'time' })                    | 15:40       | 3:40 PM     |
| formatValue(date, { targetFormat: 'time', second: 'numeric' }) | 15:40:00    | 3:40:00 PM  |

### DateTime

The `dateOptions` object and the `timeOptions` object are compatible with https://formatjs.io/docs/react-intl/api#formatdate

| Code                                                                                                                | EU Notation              | US Notation               |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------- |
| formatValue(date, { targetFormat: 'datetime' })                                                                     | 25.06.2023, 15:40        | 6/25/2023, 3:40 PM        |
| formatValue(date, { targetFormat: 'datetime', dateOptions: { month: 'long' }, timeOptions: { second: 'numeric' } }) | 25 June 2023, 3:40:00 PM | June 25, 2023, 3:40:00 PM |

### formatMultipleValues

| Code                                                                   | EU Notation                      | US Notation                      |
| ---------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| formatMultipleValues([1234567, 1234567], { minimumFractionDigits: 2 }) | ['1 234 567,00', '1 234 567,00'] | ['1,234,567.00', '1,234,567.00'] |
| formatMultipleValues([date, date], { targetFormat: 'month-long' })     | ['June', 'June']                 | ['June', 'June']                 |

### getConstants

| Code                                                                                        | EU Notation                    | US Notation                    |
| ------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------ |
| getConstants('months-long')                                                                 | ['January', '...', 'December'] | ['January', '...', 'December'] |
| getConstants('months-short')                                                                | ['Jan', '...', 'Dec']          | ['Jan', '...', 'Dec']          |
| getConstants('weekdays-long')                                                               | ['Monday', '...', 'Sunday']    | ['Sunday', '...', 'Saturday']  |
| getConstants('weekdays-short')                                                              | ['Mon', '...', 'Sun']          | ['Sun', '...', 'Sat']          |
| getConstants('months-long', { namingConvention: 'lowerCase' }, startDate, endDate, 'month') | ['november', '...', 'march']   | ['november', '...', 'march']   |

## Demo

<iframe src="/storybook-static/iframe.html?id=components-data-format--formattednumber"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-data-format--formatteddate"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-data-format--formattedtime"></iframe>
<iframe src="/storybook-static/iframe.html?id=components-data-format--formatteddatetime"></iframe>
