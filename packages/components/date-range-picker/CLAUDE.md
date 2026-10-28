# DateRangePicker (`@synerise/ds-date-range-picker`)

> Full-featured date range selector supporting absolute ranges, relative presets, custom relative ranges, time selection, and recurring schedule filters (daily/weekly/monthly) — wrapped in a floating popover.

## Package structure

```
src/
  DateRangePicker.tsx       — main component (forwardRef, popover wrapper)
  DateRangePicker.types.ts  — DateRangePickerProps, Texts, RelativeMode, AddonType
  DateRangePicker.styles.ts — top-level styled-components
  RawDateRangePicker.tsx    — core picker logic without popover
  date.types.ts             — DateRange, DateFilter, RelativeUnits, RangeKey
  constants.tsx             — MODES, COLUMNS, presets, POPOVER_*_CONFIG
  utils.ts                  — normalizeRange, getDefaultTexts, DEFAULT_RANGE (toIsoString is re-exported from ds-core)
  fns.ts                    — re-exports / wrappers around date-fns
  RangePicker/              — absolute date picker (dual-month calendar)
  RelativeRangePicker/      — relative preset + custom range picker
  RangePickerInput/         — trigger input displaying selected range
  Footer/                   — apply button + selected range summary
  RangeFilter/              — recurring schedule filters (Daily/Weekly/Monthly)
  AddonCollapse/            — collapsible section used by relative picker and filter
  dateUtils/                — date utility functions (add, sub, startOf, endOf, toDateValue, …)
```

## Public exports

### `DateRangePicker` (default export)

Popover-wrapped picker. Uses `forwardRef<HTMLDivElement>` — the ref points to the trigger wrapper element.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateRange` | — | **Required.** Controlled value |
| `onApply` | `(value: Partial<DateFilter> \| undefined) => void` | — | **Required.** Fires when user clicks Apply |
| `defaultValue` | `DateRange` | `undefined` | Fallback when value is undefined or user clears |
| `placement` | `LegacyPlacement` | `'top'` | Popover placement |
| `showTime` | `boolean` | `false` | Enable time selection |
| `showRelativePicker` | `boolean` | `false` | Show relative range addon |
| `relativePast` | `boolean` | `false` | Enable PAST mode in relative picker |
| `relativeFuture` | `boolean` | `false` | Enable FUTURE mode in relative picker |
| `relativeModes` | `RelativeMode[]` | `undefined` | Explicitly set available modes (`'PAST' \| 'FUTURE' \| 'SINCE'`) |
| `showFilter` | `boolean` | `false` | Show recurring schedule filter addon |
| `showCustomRange` | `boolean` | `true` | Show custom range form in relative picker |
| `showNowButton` | `boolean` | `true` | Show "Now" button in time picker |
| `forceAbsolute` | `boolean` | `false` | Convert relative ranges to absolute on apply |
| `forceAdjacentMonths` | `boolean` | `false` | Force left/right calendars to always show adjacent months |
| `disabledDate` | `(date?: Date) => boolean` | `undefined` | Disable individual dates |
| `validate` | `(value: DateRange) => { valid: boolean; message?: string }` | `undefined` | Validate selected range before apply |
| `ranges` | `DateRangePreset[]` | `[]` | Custom preset ranges |
| `rangeUnits` | `RelativeUnits[]` | all units | Units available in relative picker |
| `texts` | `Partial<Texts>` | `undefined` | Translations override — all keys optional |
| `disableDefaultTexts` | `boolean` | `false` | Disable built-in i18n fallbacks (for testing completeness) |
| `valueFormatOptions` | `DateToFormatOptions` | `undefined` | Format options for displayed value |
| `onValueChange` | `(value: Partial<DateFilter> \| undefined) => void` | `undefined` | Fires on every change (before Apply) |
| `onVisibleChange` | `(visible: boolean) => void` | `undefined` | Fires when popover opens/closes |
| `onFilterSave` | `(filters: SavedFilter[]) => void` | `undefined` | Fires when a filter is saved |
| `disabled` | `boolean` | `false` | Disables picker (no popover, input non-interactive) |
| `readOnly` | `boolean` | `false` | Read-only (no popover, value displayed) |
| `popoverTrigger` | `ReactNode` | `undefined` | Replace default `RangePickerInput` trigger |
| `renderPopoverTrigger` | `(...args: any) => JSX.Element` | `() => undefined` | Render-prop alternative for custom trigger |
| `popoverProps` | `Partial<Omit<PopoverProps, 'placement'>>` | `{}` | Pass-through to `@synerise/ds-popover` |
| `rangePickerInputProps` | `Omit<RangePickerInputProps, 'disabled' \| 'readOnly'>` | `{}` | Pass-through to trigger input |
| `footerProps` | `Partial<FooterProps>` | `undefined` | Pass-through to Footer |
| `allowedFilterTypes` | `RangeFilterType[]` | `undefined` | Restrict schedule filter types (DAILY/WEEKLY/MONTHLY) |
| `filterValueSelectionModes` | `DateLimitMode[]` | `["Range", "Hour"]` | Allowed modes in filter form |
| `filterRangeDisplayMode` | `RangeDisplayMode` | `undefined` | How the time window is rendered |
| `savedFilters` | `SavedFilter[]` | `undefined` | Pre-loaded saved filters |
| `valueTransformer` | `(value: DateRange) => DateRange` | omits ALL_TIME props | Transform applied to value before emitting |
| `isTruncateMs` | `boolean` | `undefined` | Truncate milliseconds from times |
| `containerClass` | `string` | `'ds-date-range-picker'` | CSS class on the root wrapper |
| `getPopupContainer` | `(node: HTMLElement) => HTMLElement` | `() => document.body` | Popover mount container |
| `intl` | `IntlShape` | — | **Deprecated** — use `valueFormatOptions` |
| `format` | `string` | — | **Deprecated** — use `valueFormatOptions` |

### `RawDateRangePicker`

Same API as `DateRangePicker` but renders the picker panel directly (no popover, no input trigger). Use when embedding the panel in a custom container.

### `DailyDateFilter`

Standalone daily schedule filter component.

### `WeeklyDateFilter`

Standalone weekly schedule filter component.

| Prop | Type | Description |
|------|------|-------------|
| `value` | `WeeklySchedule` | Controlled value |
| `onChange` | `(v: WeeklySchedule) => void` | Change callback |
| `texts` | `Partial<Texts>` | Translations |
| …and more — see `WeeklyProps` | | |

### `MonthlyDateFilter`

Standalone monthly schedule filter component.

### `TimeWindow`

Visualises a time window range (used inside `RangeFilter`). Exported for standalone use.

### `getDisabledTimeOptions`

```ts
getDisabledTimeOptions(startDate: Date, endDate: Date): DisabledTimeOptions
```

Returns disabled hour/minute/second options for Ant Design time pickers when a range is constrained.

### `fnsFormat`

Re-export of `format` from `date-fns` — use for consistent date formatting across the design system.

### `utils`

Namespace export: `normalizeRange`, `toIsoString` (re-exported from `@synerise/ds-core`), `toIsoStringWithoutZone`, `getDefaultTexts`, `DEFAULT_RANGE`, `START_OF`, `END_OF`.

> `toIsoString` is re-exported from `@synerise/ds-core`, which owns the wall-clock convention. This package used to carry its own copy with wrong arithmetic for non-whole-hour offsets; the name is kept so consumers get the fix without a migration.

### `CONST`

Namespace export: all constants (`MODES`, `COLUMNS`, `RELATIVE_PRESETS`, `ABSOLUTE_PRESETS`, `TIME_OPTIONS`, mode strings, etc.).

### Type exports

`AbsoluteDateRange`, `RelativeDateRange`, `DateRange`, `DateRangePreset`, `RelativeDateRangePreset`, `AbsoluteDateRangePreset`, `DateRangePickerProps`, `DateRangePickerTexts`, `WeeklyProps`, `WeeklyScheduleDayValue`, `WeeklySchedule`, `DayOfWeekIndex`, `DEFAULT_RANGE_END`, `DEFAULT_RANGE_START`.

## Core data types

```ts
// Absolute range
{ type: 'ABSOLUTE', from?: Date | string | null, to?: Date | string | null, key?: RangeKey }

// Relative range (last N units)
{ type: 'RELATIVE', duration: { type: RelativeUnits, value: number }, offset: { type: RelativeUnits, value: number } }

// Since a timestamp
{ type: 'SINCE', duration: ..., offset: ... }

type RelativeUnits = 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS' | 'SINCE' | …

type RangeKey = 'TODAY' | 'YESTERDAY' | 'LAST_7_DAYS' | 'ALL_TIME' | … (17 presets)
```

## Usage patterns

```tsx
import DateRangePicker from '@synerise/ds-date-range-picker';
import type { DateRange } from '@synerise/ds-date-range-picker';

// Minimal absolute
const [value, setValue] = useState<DateRange>({ type: 'ABSOLUTE' });

<DateRangePicker
  value={value}
  onApply={(v) => setValue(v as DateRange)}
/>

// With relative picker and time
<DateRangePicker
  value={value}
  onApply={(v) => setValue(v as DateRange)}
  showTime
  showRelativePicker
  relativePast
  relativeFuture
/>

// Embed panel directly (no popover)
import { RawDateRangePicker } from '@synerise/ds-date-range-picker';

<RawDateRangePicker value={value} onApply={handleApply} showTime />
```

## Modes (panel layout)

The inner panel has three modes controlled by `RawDateRangePicker`:

| Mode | Description |
|------|-------------|
| `DATE` | Absolute dual-month calendar (`RangePicker`) |
| `TIME` | Time-of-day picker (shown when `showTime=true`) |
| `FILTER` | Recurring schedule filter (`RangeFilter`) |

Addons (relative picker, filter) appear below the calendar and are toggled via `AddonCollapse`. Only one addon is expanded at a time.

## i18n

`DateRangePicker` calls `useIntl()` internally — **must be rendered inside a `react-intl` `IntlProvider`**. Built-in English translations are loaded automatically; pass `texts` for overrides or a different language. `disableDefaultTexts=true` disables the fallbacks (useful for testing translation completeness).

## Styling

- Main styles in `DateRangePicker.styles.ts` — panel is 636 px wide (`Container`)
- All sub-components have co-located `*.styles.ts(x)` files
- Uses `@synerise/ds-core` tokens — no hardcoded colour values
- Popover overlay has `data-testid="ds-date-range-picker-overlay"` and class `ds-date-range-popover`
- Each half of the panel is wrapped in `data-testid="date-range-picker-side-left"` / `-side-right` — the scope E2E suites use to reach the days and navigation of one side. The wrapper hosts whichever picker the side is in (day grid, month/year grid, or time picker), so the testid is stable across modes

## Key dependencies

- `react-day-picker ^10` — calendar grid rendering inside `RangePicker` (see the v10 notes in `ds-date-picker`'s CLAUDE.md; day cells now contain a `<button class="DayPicker-Day-Button">`)
- `@synerise/ds-popover` — floating popover (floating-ui underneath)
- `date-fns ^4` — date arithmetic, imported **by name from the package root** (`import { addDays as fnsAddDays } from 'date-fns'`). v4 submodules are named-export-only, so the old `import fnsAddDays from 'date-fns/addDays'` form yields `undefined`
- Loosely-typed date values are normalised by `dateUtils/toDateValue.ts`, which replaced `@date-fns/upgrade`'s `legacyParse`. Use it rather than `new Date` or `toDate`: a naive string must be read as *local* time, and only `parseISO` does that. Note `toDateValue(null)` is the **epoch**, which `isValid` accepts — preserved deliberately, since call sites are written around it
- Timezone handling is not this package's: `toIsoString` is re-exported from `@synerise/ds-core`, which owns the wall-clock convention and the `@date-fns/tz` dependency behind it
- `dayjs ^1.8` — used in parts of `RangeFilter`
- `ramda ^0.27` — functional utilities in `RangeFilter`
- `react-intl` — i18n (peer dependency via host app)

## Implementation notes

- The popover is opened with `autoUpdate` and `stickyPlacement`: it keeps the side it opened on while its content changes height (expanding the custom relative range, collapsing an addon) and chooses again on scroll, viewport resize or a move of the trigger. `popoverProps={{ stickyPlacement: false }}` restores the old behaviour.
- `disabled` and `readOnly` both suppress the popover entirely — the component renders just the trigger element without `<Popover>`.
- `renderPopoverTrigger` takes precedence if it returns a non-undefined value; `popoverTrigger` is checked before that; the default `RangePickerInput` is used otherwise.
- `valueTransformer` is applied inside `RawDateRangePicker` before calling `onApply` — default transformer strips `ALL_TIME`-specific props.
- `forceAbsolute` converts relative `DateRange` values to absolute bounds before emitting — useful when downstream systems don't understand relative types.
- `RangePicker` (absolute calendar) is a class-based `PureComponent` — avoid passing new function references on every render to prevent unnecessary re-renders.
- `getModifiers()` in `RangePicker/utils.ts` returns react-day-picker `Matcher`s keyed by modifier name; each key becomes a `DayPicker-Day--<key>` class. It normalises the `Date | string | null` range bounds to `Date`, which the v7 code did with casts.
- `RelativeRangePicker` is also a class-based `PureComponent`.
- The `SINCE` mode is a variant of relative dating anchored to a specific timestamp rather than "now".
- **`timeZone` prop — the only switch for timezone behaviour.** Set it and the panel decodes incoming bounds by their own offset, works in the resolved zone, and emits `from` / `to` as **`TZDate`**s carrying that zone instead of offset-carrying ISO strings. `true` uses the provider's `timeZone`; a string names an IANA zone directly. Same contract as `ds-date-picker` and `ds-time-picker`. `TZDate.toISOString()` gives the offset form; use `new Date(bound.getTime()).toISOString()` for a `Z` instant.
- **Without the prop nothing is timezone-aware, including a `timeZone` on the provider.** A zone on the `IntlProvider` must not switch any of this on: every unmigrated consumer already has one, so reading it re-bases all of them at once. Opted out, bounds are decoded by `rmvTZOffset` (strip `±hh:mm`, read the rest as a browser wall clock — the offset is *discarded*, which is the bug the prop fixes), the panel renders on the browser clock, and `onApply` emits ISO strings whose offset comes from the provider zone. That last half was always zone-aware; `encodeTimeZone` in `RawDateRangePicker` is what keeps it so, and dropping its `?? intl.timeZone` would emit `+00:00` and move every saved instant.
- **The resolved zone is passed down as a prop, never read from `useIntl` in a child.** `Footer`, `RangePickerInput`, `RangePicker`, `RelativeRangePicker`, `CustomRangeForm` and `TimestampRange` all take `timeZone?: string`, which is `undefined` when the prop is absent. `dateUtils/getNow` takes the same value rather than an `IntlShape`. A `useIntl().timeZone` read in any of them silently re-introduces the ungated behaviour, and the `without the timeZone prop` block in `DateRangePicker.timezones.spec.tsx` is what catches it.
- **Internal date convention:** inside the panel a `Date` holds the *wall clock of the provider timezone* in its local fields — `toIsoString` (ds-core) is the encoder of that convention, `getValueAsLocalDate` / `getLocalDateInTimeZone` the decoders. Conversion happens only at the boundaries: values coming in (`normalizeRange(value, timeZone)`, and the time panel's ISO strings in `handleRangeChange`) and values going out (`toEmittedLimit` in `handleApply` / `onValueChange`). Display sites re-anchor to a real instant via `getDateToDisplay` and force `applyTimeZoneOffset: true` through `getFormatOptionsToDisplay` (`dateUtils/displayDate.ts`), because `formatValue` only projects an instant into the provider timezone when that flag is set and it defaults to `false` in `DataFormatConfig`. Mixing the two representations shifts values by the browser-to-provider timezone delta.
- **`value` accepts a `Date` as a true instant**, an ISO string as offset-carrying. A day selected in the calendar is `00:00:00`–`23:59:59` in the *provider* timezone, so consumers must read the calendar day back in that timezone rather than from browser-local fields.
- **Everything that means "now" goes through `dateUtils/getNow.ts`** — `getNow(intl)` returns the provider's clock as a wall-clock date. It backs the relative presets (`TODAY`/`YESTERDAY`/`LAST_MONTH` resolve on the provider's day, which across the date line is not the browser's), the circled `today` calendar modifier, the month the calendars open on, the "Now" button and the SINCE anchor. Nothing in the package may capture `new Date()` at module load — the one remaining case, `RangeFilter/Shared/TimeWindow/utils.tsx`, is a deliberate date carrier for time-of-day strings and is commented as such.
- `normalizeRange(range, timeZone?)` from `utils` converts relative ranges to absolute `Date` objects and optionally adjusts for timezone — used internally and safe to call from consuming code. The `timeZone` argument means two different things by branch: for a **relative** range it is the clock "now" is read from; for an **absolute** one it decodes incoming bounds (a `Date` there is read as a real instant). Internal call sites therefore use `normalizeLocalRange(range, timeZone)`, which passes the timezone only on the relative branch — handing it to the absolute branch would re-decode bounds that are already wall clock and shift them by the timezone delta.
- **`utils.toIsoString` is a re-export of ds-core's**, not a local implementation. Do not reintroduce a copy here: the one that used to live in `src/utils.ts` dropped the minutes of every non-whole-hour offset and read the offset off the wrong clock.
