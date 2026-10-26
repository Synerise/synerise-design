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
or
pnpm add @synerise/ds-date-range-picker
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

| Property                  | Description                                                                      | Type                       | Default                                                       |
| ------------------------- | -------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------- |
| disabledDate              | Function to specify if particular dates are disabled or not                      | (date:Date)=>boolean       | -                                                             |
| disabledDefaultTexts      | Disables the default texts translations provided by `react-intl`                 | boolean                    | `false`                                                       |
| forceAbsolute             | Force the outcome to be converted to an absolute date                            | boolean                    | `false`                                                       |
| onApply                   | Callback executed after applying changes                                         | (value: Partial<DateFilter> \| undefined) => void | -                                              |
| ranges                    | An array containing custom ranges which may be used as a short-hand              | DateRangePreset[]          | []                                                            |
| popoverProps              | Object representing props applied to the ds-popover component                    | Partial<PopoverProps>      | {}                                                            |
| rangeUnits                | Units available in relative range picker                                         | RelativeUnits[]            | ['SECONDS','MINUTES','HOURS','DAYS','WEEKS','MONTHS','YEARS'] |
| readOnly                  | Makes picker readonly                                                            | boolean                    | `false`                                                       |
| disabled                  | Makes picker disabled                                                            | boolean                    | `false`                                                       |
| relativePast              | Enable relative filter for past ranges                                           | boolean                    | `false`                                                       |
| relativeFuture            | Enable relative filter for future ranges                                         | boolean                    | `false`                                                       |
| showTime                  | Enable user to choose particular hour                                            | boolean                    | `false`                                                       |
| showNowButton             | Include "now" button to select current time (last minue)                         | boolean                    | `true`                                                        |
| showFilter                | Enable range filtering                                                           | boolean                    | `false`                                                       |
| showCustomRange           | Enable custom range form in relative range picker                                | boolean                    | `true`                                                        |
| validate                  | Function to specify if particular date ranges are correct                        | (value: DateRange) => { valid: boolean; message?: string } | -                                  |
| value                     | Value of the picker                                                              | DateRange                  |                                                               |
| defaultValue              | Default value of the picker (when value is undefined and when user clears input) | DateRange                  |                                                               |
| showRelativePicker        | Show collapsible relative range picker addon                                     | boolean                    | `false`                                                       |
| relativeModes             | Explicitly set available relative modes                                          | RelativeMode[]             | -                                                             |
| valueFormatOptions        | Format options for the displayed value                                           | DateToFormatOptions        | -                                                             |
| onValueChange             | Callback executed on every value change (before Apply)                           | (value: Partial<DateFilter> \| undefined) => void | -                                              |
| onVisibleChange           | Callback executed when popover with dateRangePicker changes its visibility       | (visible: boolean) => void | -                                                             |
| filterValueSelectionModes | Allowed modes to display in filter                                               | DateLimitMode[]            | ["Range", "Hour"]                                             |
| getPopupContainer         | Function used to set the container of the date range picker.                     | Function(triggerNode)      | `() => document.body`                                         |
| texts                     | custom translations                                                              | Texts                      | undefined                                                     |
| disableDefaultTexts       | disable DS translations fallback                                                 | boolean                    | false                                                         |

### DateRange

| Property | Description                                    | Type                                  | Default |
| -------- | ---------------------------------------------- | ------------------------------------- | ------- |
| from     | Start date                                     | Date / string                         | -       |
| to       | End date                                       | Date / string                         | -       |
| type     | String key for identifying the range type      | 'ABSOLUTE' / 'RELATIVE' / 'SINCE'     | -       |
| duration | Duration of the relative range                 | {type: RelativeUnit, duration:number} | -       |
| offset   | Offset of the relative range from today's date | {type: RelativeUnit, duration:number} | -       |

`RelativeUnit = 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS'`

### Texts

- `texts` prop is now optional
- all keys in `texts` is now also optional
- if `texts` is `undefined` or if a key in `texts` is `undefined` default DS translations will appear in the component
- `disableDefaultTexts` disables the above fallback, i.e. if any key is missing in `texts` then an empty string is used as a translation (this prop is provided for testing custom translation completeness)

| translation key       | Type      | Default  |
| --------------------- | --------- | -------- |
| endDatePlaceholder    | string    | -------- |
| startDatePlaceholder  | string    | -------- |
| selectDate            | string    | -------- |
| selectTime            | string    | -------- |
| filterName            | string    | -------- |
| custom                | ReactNode | -------- |
| today                 | ReactNode | -------- |
| yesterday             | ReactNode | -------- |
| apply                 | ReactNode | -------- |
| clear                 | ReactNode | -------- |
| now                   | ReactNode | -------- |
| emptyDateError        | ReactNode | -------- |
| last7Days             | ReactNode | -------- |
| thisWeek              | ReactNode | -------- |
| lastWeek              | ReactNode | -------- |
| thisMonth             | ReactNode | -------- |
| lastMonth             | ReactNode | -------- |
| last3Months           | ReactNode | -------- |
| last6Months           | ReactNode | -------- |
| lastYear              | ReactNode | -------- |
| allTime               | ReactNode | -------- |
| tomorrow              | ReactNode | -------- |
| next7Days             | ReactNode | -------- |
| nextWeek              | ReactNode | -------- |
| nextMonth             | ReactNode | -------- |
| next3Months           | ReactNode | -------- |
| next6Months           | ReactNode | -------- |
| nextYear              | ReactNode | -------- |
| more                  | ReactNode | -------- |
| relativeDateRange     | ReactNode | -------- |
| last                  | ReactNode | -------- |
| before                | ReactNode | -------- |
| after                 | ReactNode | -------- |
| since                 | ReactNode | -------- |
| next                  | ReactNode | -------- |
| seconds               | ReactNode | -------- |
| minutes               | ReactNode | -------- |
| hours                 | ReactNode | -------- |
| days                  | ReactNode | -------- |
| weeks                 | ReactNode | -------- |
| months                | ReactNode | -------- |
| years                 | ReactNode | -------- |
| timestampLast         | ReactNode | -------- |
| timestampNext         | ReactNode | -------- |
| timestampTill         | ReactNode | -------- |
| filter                | ReactNode | -------- |
| startDate             | ReactNode | -------- |
| endDate               | ReactNode | -------- |
| remove                | ReactNode | -------- |
| savedFiltersTrigger   | ReactNode | -------- |
| clearRange            | ReactNode | -------- |
| copyRange             | ReactNode | -------- |
| pasteRange            | ReactNode | -------- |
| range                 | ReactNode | -------- |
| hour                  | ReactNode | -------- |
| filterEnabled         | ReactNode | -------- |
| selectDateFilter      | ReactNode | -------- |
| datesFilter           | ReactNode | -------- |
| cancel                | ReactNode | -------- |
| everyDay              | string    | -------- |
| nthDayOfMonth         | ReactNode | -------- |
| daysOf                | ReactNode | -------- |
| countedFrom           | ReactNode | -------- |
| addRule               | ReactNode | -------- |
| addTime               | ReactNode | -------- |
| change                | ReactNode | -------- |
| weekly                | ReactNode | -------- |
| monthly               | ReactNode | -------- |
| daily                 | ReactNode | -------- |
| saveFilter            | ReactNode | -------- |
| selected              | ReactNode | -------- |
| selectDaysDescription | ReactNode | -------- |
| selectAll             | ReactNode | -------- |
| unselectAll           | ReactNode | -------- |
| inverseSelection      | ReactNode | -------- |
| setTimeFor            | ReactNode | -------- |
| week                  | ReactNode | -------- |
| month                 | ReactNode | -------- |
| beginning             | ReactNode | -------- |
| ending                | ReactNode | -------- |
| maximumRanges         | ReactNode | -------- |
| clickToSelect         | ReactNode | -------- |

### Undocumented props

- min in `MonthlyFilter` - controls minimal amount of entires in monthly filter, disable with `undefined`, default is `1`

## Timezone support

Timezone handling is **opt-in, behind the `timeZone` prop**. Set it and the picker:

- decodes incoming `from`/`to` by their own offset and displays them in the resolved timezone
- resolves relative ranges, the circled "today" and the "Now" button on that timezone's clock
- emits `from`/`to` as **`TZDate`**s carrying the instant and the zone

`true` resolves to the provider's `timeZone`; a string names an IANA zone directly. Display then
does not depend on `dataFormatConfig.applyTimeZoneOffset` — the picker asks for that projection
itself.

### Without the prop

Behaviour is unchanged from before the prop existed, and a `timeZone` on the provider does **not**
switch it on. That is deliberate: every unmigrated consumer already sits under an `IntlProvider`
carrying a zone, so reading it would re-base all of them at once.

Specifically, without the prop:

- incoming bounds are decoded by stripping a `±hh:mm` suffix and reading the rest as a **browser**
  wall clock — the offset is discarded, not honoured. A `Z`-terminated string or a `Date` does not
  match that pattern at all and is read as a real instant in the browser's zone.
- the calendar, the trigger and the footer render on the browser clock, and formatting is
  whatever `dataFormatConfig` does with it
- `onApply` still emits offset-carrying **ISO strings**, with the offset taken from the provider's
  timezone — that half was always zone-aware and stays so

The first point is a bug; `timeZone` is how it is fixed. Migrating a consumer means adding the
prop and updating whatever reads `onApply`, since the bounds change from strings to `TZDate`s.

### The `value` contract

A day selected in the calendar spans `00:00:00`–`23:59:59` **of the provider's timezone**, so
the two ends of a one-day range are different instants than the OS-local day would be. Read the
calendar day back in the provider timezone (`utcToZonedTime` or `getValueAsLocalDate` from
`@synerise/ds-core`) — reading local fields of the emitted instant moves a full-day range to the
neighbouring day.

`value.from` / `value.to` accept both forms:

| Form | Interpretation |
|---|---|
| ISO string (`'2026-08-11T00:00:00+09:00'`) | Decoded by its own offset. Preferred — it is unambiguous and it is what the component emits. |
| `Date` | A **real instant**, projected into the provider timezone for display. `new Date(emittedIsoString)` is therefore safe; a `Date` built from local calendar fields (e.g. `startOfDay(new Date())`) means "that instant", not "that day in the provider timezone". |

## Breaking changes

- **`utils.toIsoString` now re-exports the `@synerise/ds-core` implementation.** The name and signature are unchanged, but the offset arithmetic is corrected: zones that are not a whole number of hours ahead of UTC (`+05:30`, `+09:30`, `+05:45`, `+12:45`, `-03:30`) previously encoded with `:00` minutes, and the offset was read off the date's UTC fields rather than the wall clock it carries, which picked the wrong side of a DST transition.
- **`normalizeRange` signature changed:** Now accepts an optional second parameter `timeZone?: string`.
