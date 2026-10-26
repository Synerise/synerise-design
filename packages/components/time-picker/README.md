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
| onChange         | **Required.** Fired on unit select and dropdown close                                                                                    | (value: `Date` or `undefined`, timeString: string) => void                           | -                            |
| timeZone | Enables timezone-aware mode. `true` = provider TZ; string = specific IANA TZ                                                       | `boolean` / `string`                                                                 | -                            |
| units            | show only desired units                                                                                                                  | `dayjs.UnitType[]`                                                                   | ['hour', 'minute', 'second'] |
| use12HourClock   | use 12 hour clock instead of 24 (**deprecated** — prefer `DSProvider::dataFormatConfig`)                                                 | boolean                                                                              | -                            |
| valueFormatOptions | format options passed to ds-core `formatValue` for display string                                                                      | `DateToFormatOptions`                                                                | -                            |
| placeholder      | Placeholder of Timepicker input                                                                                                          | `string`                                                                             | i18n `DS.TIME-PICKER.PLACEHOLDER` |
| timeFormat       | dayjs format of date displayed in input — **deprecated**, prefer `valueFormatOptions` (see: https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#list-of-all-available-formats) | string | `'HH:mm:ss'` / `'hh:mm:ss A'` in 12-hour mode |
| trigger          | trigger that opens the dropdown                                                                                                          | `PopoverTriggerType[]`                                                               | ['click']                    |
| value            | selected value (Date or ISO 8601 string with offset in timezone mode)                                                                    | `Date` / `string`                                                                    | -                            |
| errorText        | error message shown on the input (hidden while dropdown is open)                                                                         | `React.ReactNode`                                                                    | -                            |
| onClockModeChange | fired when user switches AM/PM                                                                                                          | `(mode: string) => void`                                                             | -                            |
| raw              | render only the overlay panel, without input wrapper or dropdown                                                                         | boolean                                                                              | -                            |

## Timezone-aware usage

```tsx
// Uses provider timezone from DSProvider / IntlProvider
<TimePicker value="2024-02-02T14:20:00+02:00" onChange={handleChange} timeZone />

// Uses a specific timezone (overrides provider)
<TimePicker value="2024-02-02T14:20:00+09:00" onChange={handleChange} timeZone="Asia/Tokyo" />
```

## Breaking changes

- **`onChange` is now required.** Previously optional, now mandatory on all usages.
- **`onChange` always hands back a `Date`.** With `timeZone` set it is a `TZDate` carrying the resolved zone; without it, the plain `Date` it already was.
- **`defaultProps` removed.** Default values for `placement`, `trigger`, and `units` are now inline parameter defaults.
