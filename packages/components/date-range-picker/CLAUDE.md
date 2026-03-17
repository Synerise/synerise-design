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
  utils.ts                  — normalizeRange, getDefaultTexts, toIsoString, DEFAULT_RANGE
  fns.ts                    — re-exports / wrappers around date-fns
  RangePicker/              — absolute date picker (dual-month calendar)
  RelativeRangePicker/      — relative preset + custom range picker
  RangePickerInput/         — trigger input displaying selected range
  Footer/                   — apply button + selected range summary
  RangeFilter/              — recurring schedule filters (Daily/Weekly/Monthly)
  AddonCollapse/            — collapsible section used by relative picker and filter
  dateUtils/                — date utility functions (add, sub, format, startOf, endOf, …)
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

Namespace export: `normalizeRange`, `toIsoString`, `toIsoStringWithoutZone`, `getDefaultTexts`, `DEFAULT_RANGE`, `START_OF`, `END_OF`.

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

## Key dependencies

- `react-day-picker ^7` — calendar grid rendering inside `RangePicker`
- `@synerise/ds-popover` — floating popover (floating-ui underneath)
- `date-fns ^2` + `date-fns-tz 1.1.4` — date arithmetic and timezone support
- `dayjs ^1.8` — used in parts of `RangeFilter`
- `ramda ^0.27` — functional utilities in `RangeFilter`
- `react-intl` — i18n (peer dependency via host app)

## Implementation notes

- `disabled` and `readOnly` both suppress the popover entirely — the component renders just the trigger element without `<Popover>`.
- `renderPopoverTrigger` takes precedence if it returns a non-undefined value; `popoverTrigger` is checked before that; the default `RangePickerInput` is used otherwise.
- `valueTransformer` is applied inside `RawDateRangePicker` before calling `onApply` — default transformer strips `ALL_TIME`-specific props.
- `forceAbsolute` converts relative `DateRange` values to absolute bounds before emitting — useful when downstream systems don't understand relative types.
- `RangePicker` (absolute calendar) is a class-based `PureComponent` — avoid passing new function references on every render to prevent unnecessary re-renders.
- `RelativeRangePicker` is also a class-based `PureComponent`.
- The `SINCE` mode is a variant of relative dating anchored to a specific timestamp rather than "now".
- `normalizeRange()` from `utils` converts relative ranges to absolute `Date` objects — used internally and safe to call from consuming code.
