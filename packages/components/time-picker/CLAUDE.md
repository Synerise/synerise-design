# TimePicker (`@synerise/ds-time-picker`)
> A dropdown-based time picker that renders scrollable hour/minute/second columns with optional 12-hour (AM/PM) clock support, driven by a native `Date` value.

## Package structure
```
src/
 TimePicker.tsx — main component; builds unit config, handles AM/PM toggling, renders Dropdown + Input
 TimePicker.styles.tsx — styled-components for container, input wrapper, overlay, unit columns, cells
 Unit.tsx — scrollable column for a single time unit (hour, minute, or second)
 index.ts — public exports (default + constants + types)
 modules.d.ts — ambient module declarations
 types/
 TimePicker.types.ts — TimePickerProps, TimePickerDisabledUnits, ClockModes
 constants/
 timePicker.constants.ts — HOUR, MINUTE, SECOND, CLOCK_MODES, AM, PM, HOUR_12,
 DISABLE_CLOCK_MODE_HOUR, MAP_12_AM_TO_24_HOUR,
 MAP_12_PM_TO_24_HOUR, MAP_24_HOUR_TO_12
 timePicker.spec.constants.ts — test-only constants
 utils/
 timePicker.utils.ts — handleTimeChange: builds a new Date from a unit change or clock-mode toggle
 clockMode.utils.ts — getClockModeFromDate, getOppositeClockMode
 unit.utils.ts — getUnitSelectedNumber: converts 24-hour value to 12-hour display value
```

## Public exports

### Default export: `TimePicker`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| string` | — | Controlled selected time value. A `string` is parsed as an ISO 8601 datetime (e.g. `'2024-02-02T14:20:00+02:00'`). |
| `onChange` | `(value: Date \| undefined, timeString: string) => void` | — | **Required.** Fired on unit select and on dropdown close. |
| `timeZone` | `boolean \| string` | — | Opts into timezone-aware values: `onChange` emits a **`TZDate`** carrying the resolved zone instead of a plain `Date`. `true` uses the provider's `timeZone`; a string (e.g. `'Asia/Tokyo'`) overrides it. |
| `units` | `dayjs.UnitType[]` | `['hour', 'minute', 'second']` | Which columns to render |
| `placeholder` | `string` | i18n `DS.TIME-PICKER.PLACEHOLDER` | Input placeholder text |
| `placement` | `'topLeft' \| 'topCenter' \| 'topRight' \| 'bottomLeft' \| 'bottomCenter' \| 'bottomRight'` | `'bottomLeft'` | Dropdown placement |
| `trigger` | `PopoverTriggerType[]` | `['click']` | What opens the dropdown |
| `defaultOpen` | `boolean` | — | Open on first render |
| `alwaysOpen` | `boolean` | — | Keeps dropdown open; clear button replaces clock icon whenever a value is set |
| `disabled` | `boolean` | — | Disables input and dropdown |
| `disabledHours` | `number[]` | — | Hour values (24-hour) to disable |
| `disabledMinutes` | `number[]` | — | Minute values to disable |
| `disabledSeconds` | `number[]` | — | Second values to disable |
| `use12HourClock` | `boolean` (**deprecated**) | derived from `DSProvider` | Override AM/PM mode; prefer `DSProvider::dataFormatConfig` |
| `timeFormat` | `string` (**deprecated**) | `'HH:mm:ss'` / `'hh:mm:ss A'` | dayjs format for display string; prefer `valueFormatOptions` |
| `valueFormatOptions` | `DateToFormatOptions` | — | Passed to `@synerise/ds-core` `formatValue` for display |
| `onClockModeChange` | `(mode: string) => void` | — | Fired when user switches AM/PM |
| `clearTooltip` | `string \| ReactNode` | `<FormattedMessage … "Clear" />` | Tooltip on the clear (×) icon |
| `overlayClassName` | `string` | — | CSS class on the dropdown overlay container |
| `className` | `string` | — | CSS class on the root container (also receives `ds-time-picker`) |
| `containerStyle` | `CSSProperties` | `{}` | Inline style on the root container |
| `dropdownProps` | `Partial<DropdownSharedProps>` (omits `children`, `overlay`, `open`, `onOpenChange`, `disabled`) | `{}` | Extra props forwarded to `@synerise/ds-dropdown` |
| `inputProps` | `Partial<InputProps>` | `{}` | Extra props forwarded to `@synerise/ds-input` |
| `raw` | `boolean` | — | When `true`, renders only the overlay (no input wrapper or dropdown chrome) |
| `errorText` | `ReactNode` | — | Error message shown on the input; hidden while the dropdown is open |

### Named constant exports
| Export | Value / Type |
|--------|-------------|
| `AM` | `'AM'` |
| `PM` | `'PM'` |
| `HOUR` | `'hour'` (dayjs.UnitType) |
| `HOUR_12` | `12` |
| `CLOCK_MODES` | `['AM', 'PM']` |
| `DISABLE_CLOCK_MODE_HOUR` | `-1` (sentinel: disables the full AM or PM toggle) |
| `MAP_12_AM_TO_24_HOUR` | lookup: 12-hour AM index → 24-hour value |
| `MAP_12_PM_TO_24_HOUR` | lookup: 12-hour PM index → 24-hour value |
| `MAP_24_HOUR_TO_12` | lookup: 24-hour value → 12-hour display value |

### Named type exports
- `ClockModes` — `'AM' | 'PM'`
- `TimePickerProps` — full props interface

## Usage patterns

```tsx
import TimePicker from '@synerise/ds-time-picker';

// Basic controlled usage
const [time, setTime] = React.useState<Date | undefined>(undefined);
<TimePicker value={time} onChange={(date) => setTime(date)} />

// Timezone-aware usage -- `onChange` hands back a TZDate carrying the resolved zone
const [isoTime, setIsoTime] = React.useState<string | undefined>('2024-02-02T14:20:00+02:00');
<TimePicker value={isoTime} onChange={(val) => setIsoTime(val)} timeZone />

// Specific timezone override (ignores provider timezone)
<TimePicker value={isoTime} onChange={(val) => setIsoTime(val)} timeZone="Asia/Tokyo" />

// Render just the panel (no input)
<TimePicker value={time} onChange={(date) => setTime(date)} raw />

// Only hour + minute columns
<TimePicker value={time} onChange={(date) => setTime(date)} units={['hour', 'minute']} />

// Disable specific hours (24-hour values)
<TimePicker
 value={time}
 onChange={(date) => setTime(date)}
 disabledHours={[0, 1, 2, 3, 4, 5, 6]}
/>

// Pass -1 in disabledHours to block the entire AM or PM toggle
// (DISABLE_CLOCK_MODE_HOUR = -1 disables PM; 12 + -1 disables AM)
import { DISABLE_CLOCK_MODE_HOUR } from '@synerise/ds-time-picker';
<TimePicker disabledHours={[DISABLE_CLOCK_MODE_HOUR]} .. />
```

## Styling

All visual elements use styled-components tokens (no hardcoded colours). Key styled components:
- `S.Container` — outermost wrapper with `ds-time-picker` class
- `S.OverlayContainer` — the dropdown panel (`data-testid="tp-overlay-container"`)
- `S.Unit` / `S.Cell` / `S.CellText` — column and row layout for each time unit
- `S.UnitSeperator` — colon divider between columns
- `S.ClearIcon` — styled icon wrapper used for the clear button

## Key dependencies

| Package | Role |
|---------|------|
| `dayjs` + `dayjs/plugin/customParseFormat` | Date manipulation and display formatting |
| `lodash.range` | Generates `[0.23]` / `[0.59]` option arrays |
| `@synerise/ds-dropdown` | Dropdown wrapper |
| `@synerise/ds-input` | Trigger input field |
| `@synerise/ds-icon` | Clock and close icons (`ClockM`, `Close3S`) |
| `@synerise/ds-tooltip` | Wraps the clear icon |
| `@synerise/ds-scrollbar` | Scroll container inside each `Unit` column |
| `@synerise/ds-core` `useDataFormat` | Reads locale-aware 12/24-hour clock preference |
| `react-intl` | i18n strings for placeholder and clear tooltip |
| `debounce` | Scroll-snap debounce in `Unit.tsx` |

## Implementation notes

- **12-hour clock detection:** `use12HourClock` prop overrides, otherwise read from `useDataFormat().is12HoursClock`.
- **`onChange` is required** — the prop is no longer optional. All consumers must provide an `onChange` handler. This is a **breaking change** from previous versions where `onChange` was optional.
- **No `ValueType` generic.** `value` takes a `Date` or an ISO string; `onChange` always hands back
  a `Date`. The two used to share one type parameter, which forced a consumer holding a `Date` to
  declare its output as `string`.
- **`timeZone`:** opts into timezone-aware values. `onChange` then emits a **`TZDate`** — a `Date`
  subclass carrying the resolved zone — rather than a plain `Date`. `true` resolves the provider's
  `timeZone` from `react-intl`; a string names an IANA zone directly. Same contract as
  `ds-date-picker` and `ds-date-range-picker`. Note `TZDate.toISOString()` returns the *offset*
  form (`…+09:00`), not `Z`; for a `Z` instant use `new Date(value.getTime()).toISOString()`.
- **Without the prop the value passes through as a plain `Date`**, never a `TZDate` — pinned by a
  spec, since widening it would silently change what consumers serialize with no compiler error.
- **Rendering is gated on the same prop, not on `intl.timeZone`.** `getTimeString` re-anchors and
  forces `applyTimeZoneOffset` only when `timeZone` resolved to something; a zone on the provider
  alone changes nothing, because every unmigrated consumer already has one. It also names
  `timeZone` in the format options rather than relying on the config's — with a *string* prop the
  resolved zone is not the provider's, and the re-anchor and the projection have to agree.
- **Controlled-only value:** There is no uncontrolled mode. `onChange` is the only way to update the displayed time.
- **`onChange` fires twice per interaction:** once when a cell is clicked (immediate) and once when the dropdown closes (`onVisibleChange`).
- **`disabledHours` with AM/PM:** Use sentinel `-1` (`DISABLE_CLOCK_MODE_HOUR`) to disable the entire PM toggle. Use `12` (`HOUR_12`) combined with `-1` to disable the AM toggle.
- **Scroll snap in `Unit`:** The `Unit` component auto-scrolls to the selected cell and snaps free-scrolling to the nearest 32 px cell boundary via a debounced scroll handler.
- **Test runner:** Vitest. Timezone-specific tests are run under multiple TZ env variables (UTC, America/New_York, Europe/Warsaw) via `pnpm test:timezones`.
- **`timeFormat` / `use12HourClock`:** Both props are deprecated in favour of `valueFormatOptions` and `DSProvider::dataFormatConfig` respectively.
