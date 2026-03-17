---
id: time-picker
title: TimePicker
---

TimePicker UI Component

## Installation

```
npm i @synerise/ds-time-picker
or
yarn add @synerise/ds-time-picker
or
pnpm add @synerise/ds-time-picker
```

## Usage

```
import TimePicker from '@synerise/ds-time-picker'

<TimePicker />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-timepicker--default"></iframe>

## API

| Property         | Description                                                                                                                              | Type                                                                                 | Default                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------- |
| alwaysOpen       | whether or not to always display the dropdown (can't be closed)                                                                          | boolean                                                                              | -                            |
| className        | class name passed down to container                                                                                                      | string                                                                               | -                            |
| clearTooltip     | Clear icon tooltip                                                                                                                       | `string` / `React.ReactNode`                                                         | `Clear`                      |
| containerStyle   | Style object applied to the input container                                                                                              | React.CSSProperties                                                                  | {}                           |
| defaultOpen      | whether to display the dropdown by default                                                                                               | boolean                                                                              | -                            |
| disabled         | option to disabled input                                                                                                                 | boolean                                                                              | -                            |
| dropdownProps    | Props object applied to the dropdown component                                                                                           | DropdownProps                                                                        | {}                           |
| inputProps       | Props object applied to the input component                                                                                              | InputProps                                                                           | {}                           |
| placement        | placement of dropdown                                                                                                                    | `topLeft` / `topCenter` / `topRight` / `bottomLeft` / `bottomCenter` / `bottomRight` | `bottomLeft`                 |
| overlayClassName | class name passed down to the overlay container                                                                                          | string                                                                               | -                            |
| onChange         | event fired when date has changed                                                                                                        | (value: `Date` or `undefined`, timeString: string) => void                           | -                            |
| units            | show only desired units                                                                                                                  | `dayjs.UnitType[]`                                                                   | ['hour', 'minute', 'second'] |
| use12HourClock   | use 12 hour clock instead of 24 (**deprecated** — prefer `DSProvider::dataFormatConfig`)                                                 | boolean                                                                              | -                            |
| valueFormatOptions | format options passed to ds-core `formatValue` for display string                                                                      | `DateToFormatOptions`                                                                | -                            |
| placeholder      | Placeholder of Timepicker input                                                                                                          | `string`                                                                             | i18n `DS.TIME-PICKER.PLACEHOLDER` |
| timeFormat       | dayjs format of date displayed in input — **deprecated**, prefer `valueFormatOptions` (see: https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#list-of-all-available-formats) | string | `'HH:mm:ss'` / `'hh:mm:ss A'` in 12-hour mode |
| trigger          | trigger that opens the dropdown                                                                                                          | `PopoverTriggerType[]`                                                               | ['click']                    |
| value            | selected value                                                                                                                           | Date                                                                                 | -                            |
| errorText        | error message shown on the input (hidden while dropdown is open)                                                                         | `React.ReactNode`                                                                    | -                            |
| onClockModeChange | fired when user switches AM/PM                                                                                                          | `(mode: string) => void`                                                             | -                            |
| raw              | render only the overlay panel, without input wrapper or dropdown                                                                         | boolean                                                                              | -                            |
