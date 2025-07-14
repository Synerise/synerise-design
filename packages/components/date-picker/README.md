---
id: date-picker
title: DatePicker
---

DatePicker UI Component

## Installation

```
npm i @synerise/ds-date-picker
or
yarn add @synerise/ds-date-picker
```

## Usage

```
import DatePicker from '@synerise/ds-date-picker'

<DatePicker />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-date-picker--default"></iframe>

## API

| Property        | Description                                                   | Type                         | Default    |
|-----------------|---------------------------------------------------------------|------------------------------|------------|
| autoFocus       | Boolean value to force focus of an input                      | boolean                      | `false`    |
| showTime        | Boolean value to enable user to choose particular hour        | boolean                      | `false`    |
| value           | Value of the picker                                           | Date                         | new Date() |
| onApply         | Callback executed after applying changes                      | (date:Date)=>void            | -          |
| disabled        | Boolean value to set disabled state of an input               | boolean                      | `false`    |
| disabledDates   | Function to specify if particular dates are disabled or not   | (date:Date)=>boolean         | -          |
| disabledHours   | Disabled hours for time picker                                | number[]                     | []         |
| disabledMinutes | Disabled minutes for time picker                              | number[]                     | []         |
| disabledSeconds | Disabled seconds for time picker                              | number[]                     | []         |
| useStartOfDay   | Boolean value to set hours to the start of the day            | boolean                      | `false`    |
| useEndOfDay     | Boolean value to set hours to the start of the day            | boolean                      | `false`    |
| texts           | Object containing texts                                       | object                       | {}         |
| prefixel        | String or ReactNode to set prefix                             | string / ReactNode           | -          |
| suffixel        | String or ReactNode to set suffix                             | string / ReactNode           | -          |
| hideNow         | Hide now button                                               | boolean / undefined          | -          |
| renderTrigger   | Function for rendering a custom trigger element               | ()=>ReactElement / undefined | -          |
| quickPicks      | render buttons for preset dates in left column next to picker | QuickPick[]                  | -          |

### QuickPick

| Property | Description      | Type      | Default |
|----------|------------------|-----------|---------|
| label    | Text for button  | ReactNode | -       |
| value    | value for button | Date      | -       |

### Texts

| Property   | Description                  | Type   | Default       |
| ---------- | ---------------------------- | ------ | ------------- |
| apply      | Text for apply button        | string | "Apply"       |
| selectTime | Text for select time button  | string | "Select time" |
| selectDate | Text for select date button  | string | "Select date" |
| now        | Text for select "now" button | string | "Now"         |
