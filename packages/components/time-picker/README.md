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
| units            | show only desired units                                                                                                                  | string[]                                                                             | ['hour', 'minute', 'second'] |
| use12HourClock   | use 12 hour clock instead of 24                                                                                                          | boolean                                                                              | -                            |
| placeholder      | Placeholder of Timepicker input                                                                                                          | `string`                                                                             | `Select time`                |
| timeFormat       | format of date displayed in input (see: https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#list-of-all-available-formats) | string                                                                               | `'HH:mm:ss'`                 |
| trigger          | trigger that opens the dropdown                                                                                                          | ['click'] / ['hover']                                              | ['click']                    |
| value            | selected value                                                                                                                           | Date                                                                                 | -                            |
