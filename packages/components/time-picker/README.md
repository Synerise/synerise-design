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

| Property         | Description                                                                                                                              | Type                                                                                 | Default      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------ |
| placement        | placement of dropdown                                                                                                                    | 'topLeft' / 'topCenter' / 'topRight' / 'bottomLeft' / 'bottomCenter' / 'bottomRight' | 'bottomLeft' |
| value            | selected value                                                                                                                           | Date                                                                                 | -            |
| defaultOpen      | whether to display the dropdown by default                                                                                               | boolean                                                                              | -            |
| alwaysOpen       | whether or not to always display the dropdown (can't be closed)                                                                          | boolean                                                                              | -            |
| timeFormat       | format of date displayed in input (see: https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#list-of-all-available-formats) | string                                                                               | 'HH:mm:ss'   |
| use12HourClock   | use 12 hour clock instead of 24                                                                                                          | boolean                                                                              | -            |
| trigger          | trigger that opens the dropdown                                                                                                          | ['click'] / ['hover'] / ['contextMenu']                                              | ['click']    |
| disabled         | option to disabled input                                                                                                                 | boolean                                                                              | -            |
| overlayClassName | class name passed down to the overlay container                                                                                          | string                                                                               | -            |
| className        | class name passed down to container                                                                                                      | string                                                                               | -            |
| onChange         | event fired when date has changed                                                                                                        | (value: Date, timeString: string) => void                                            | -            |
