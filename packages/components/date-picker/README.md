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

<DatePicker onApply={(date) => console.log(date)} />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-date-picker--default"></iframe>

## API

| Property        | Description                                                   | Type                         | Default    |
| --------------- | ------------------------------------------------------------- | ---------------------------- | ---------- |
| autoFocus       | Boolean value to force focus of an input                      | boolean                      | `false`    |
| showTime        | Boolean value to enable user to choose particular hour        | boolean                      | `false`    |
| value           | Value of the picker (Date or ISO 8601 string with offset in timezone mode) | `Date` / `string`   | new Date() |
| onApply         | Callback executed after applying changes                      | (date?:Date)=>void           | -          |
| timeZone | Timezone-aware mode: `onApply` emits a `TZDate` instead of a plain `Date`. `true` = provider TZ; string = specific IANA TZ | `true` / `string` | -       |
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

## Timezone-aware usage

```tsx
// Uses provider timezone from DSProvider / IntlProvider
<DatePicker value="2024-02-02T14:20:00+02:00" onApply={handleApply} showTime timeZone />

// Uses a specific timezone (overrides provider)
<DatePicker value="2024-02-02T14:20:00+09:00" onApply={handleApply} showTime timeZone="Asia/Tokyo" />
```

When `timeZone` is set, `onApply` / `onValueChange` emit a `TZDate` — the real instant plus the zone it was read in — rather than a plain `Date`. Being a `Date` subclass it needs no separate type. Project it to whichever wire format you need: `value.toISOString()` for the offset form (`…+09:00`), `new Date(value.getTime()).toISOString()` for `Z`.

## Breaking changes

- **Generic type parameter:** `DatePicker<ValueType extends Date | string = Date>`. The default (`Date`) is backwards-compatible.
- **`DatePickerProps` is now generic:** `DatePickerProps<ValueType>`. Consumers explicitly typing with `DatePickerProps` should use `DatePickerProps<Date>` for identical behaviour.
- **New `BaseDatePickerProps` type:** Non-generic base type extracted for props that don't depend on `ValueType`.

### QuickPick

| Property | Description      | Type      | Default |
| -------- | ---------------- | --------- | ------- |
| label    | Text for button  | ReactNode | -       |
| value    | value for button | Date      | -       |

### Texts

| Property         | Description                              | Type      | Default       |
| ---------------- | ---------------------------------------- | --------- | ------------- |
| apply            | Text for apply button                    | ReactNode | "Apply"       |
| now              | Text for "Now" button in footer          | ReactNode | "Now"         |
| inputPlaceholder | Placeholder text for the input           | string    | -             |
| clearTooltip     | Tooltip on the clear button              | ReactNode | "Clear"       |
| quickPicks       | Label above the quick picks column       | ReactNode | "Quick picks" |
