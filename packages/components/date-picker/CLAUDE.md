# DatePicker (`@synerise/ds-date-picker`)

> Single-date picker with a dropdown calendar, optional time picker, quick-pick presets, and a formatted text input trigger — built on `react-day-picker` v7 and `date-fns` 2.

## Package structure

```
src/
  DatePicker.tsx              — main functional component (wraps RawDatePicker in a Dropdown)
  DatePicker.types.ts         — DatePickerProps, Texts, QuickPick, State, Modifier
  DatePicker.styles.ts        — OverlayContainer, Container, PickerWrapper, etc.
  DatePicker.const.ts         — TRIGGER_PROPS (popover trigger config)
  RawDatePicker/
    RawDatePicker.tsx         — class component; calendar logic + mode switching; wrapped with injectIntl
    RawDatePicker.types.ts    — RawDatePickerProps = Omit<DatePickerProps, 'dropdownProps'>
  Elements/
    DayPicker/                — calendar grid (react-day-picker wrapper)
    MonthPicker/              — 12-month grid; clicking title switches to YearPicker
    YearPicker/               — decade grid; clicking title switches to DecadePicker
    DecadePicker/             — century grid
    TimePicker/               — HH:MM:SS column selector with prev/next day navigation
    PickerInput/              — formatted text input trigger (uses ds-input)
    Footer/                   — Apply / Now / Date / Time mode-switch buttons
    QuickPicks/               — preset date buttons rendered in a left column
    NavigationHint/           — keyboard hint (used in other packages, not DatePicker)
    Navbar/                   — prev/next month navigation bar
    GridPicker/               — shared grid layout used by Month/Year/DecadePicker
  utils/
    getDefaultTexts.tsx       — merges consumer texts with react-intl defaults
  fns.tsx                     — date-fns v2 wrappers
  format.ts                   — fnsFormat wrapper
  localeUtils.ts              — locale helpers for react-day-picker
  utils.ts                    — changeDayWithHoursPreserved and other helpers
  index.ts                    — public exports
```

## Public exports

### `DatePicker` (default + named)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onApply` | `(date?: Date) => void` | _(required)_ | Called when user clicks Apply or selects a quick pick. Closes the dropdown. |
| `value` | `Date` | `undefined` | Controlled date value. |
| `showTime` | `boolean` | `false` | Enables the time picker panel (user can switch between date and time modes). |
| `disabled` | `boolean` | `undefined` | Disables input and prevents dropdown opening. |
| `readOnly` | `boolean` | `undefined` | Renders only the input trigger; no dropdown is rendered at all. |
| `autoFocus` | `boolean` | `undefined` | Opens the dropdown on mount. |
| `allowClear` | `boolean` | `true` | Shows the clear (✕) button on the input. |
| `onClear` | `() => void` | `undefined` | Called when user clicks the clear button. |
| `onValueChange` | `(date?: Date) => void` | `undefined` | Called on every date/time change (including before Apply). |
| `onDropdownVisibleChange` | `(visible: boolean) => void` | `undefined` | Called when the dropdown opens or closes. |
| `disabledDates` | `(date?: Date) => boolean` | `undefined` | Returns `true` for dates that should not be selectable. |
| `disabledHours` | `number[]` | `[]` | Hour values disabled in the time picker. |
| `disabledMinutes` | `number[]` | `[]` | Minute values disabled in the time picker. |
| `disabledSeconds` | `number[]` | `[]` | Second values disabled in the time picker. |
| `useStartOfDay` | `boolean` | `undefined` | Sets time to 00:00:00 when user selects a day. |
| `useEndOfDay` | `boolean` | `undefined` | Sets time to 23:59:59 when user selects a day. |
| `hideNow` | `boolean` | `undefined` | Hides the "Now" button in the footer. |
| `quickPicks` | `QuickPick[]` | `undefined` | Preset date buttons rendered in a left column beside the calendar. |
| `texts` | `Partial<Texts>` | `undefined` | Override i18n strings. |
| `valueFormatOptions` | `DateToFormatOptions` | `undefined` | Format options for displaying the selected date in the input. |
| `format` | `string` | `undefined` | **Deprecated** — use `valueFormatOptions` instead. |
| `popoverPlacement` | `'topLeft' \| 'topCenter' \| 'topRight' \| 'bottomLeft' \| 'bottomCenter' \| 'bottomRight'` | `undefined` | Dropdown placement. |
| `prefixel` | `ReactNode` | `undefined` | Content shown before the date value in the input. |
| `suffixel` | `ReactNode` | `undefined` | Content shown after the date value in the input. |
| `error` | `boolean` | `undefined` | Error state on the input. |
| `errorText` | `ReactNode` | `undefined` | Error message shown below the input. |
| `renderTrigger` | `() => ReactElement` | `undefined` | Replaces the default `PickerInput` with a custom trigger element. |
| `inputProps` | `Pick<InputProps, 'autoResize'>` | `undefined` | Extra props passed to the inner `PickerInput`. Currently only `autoResize`. |
| `dropdownProps` | `Partial<Omit<DropdownSharedProps, 'children' \| 'overlay'>>` | `undefined` | Extra props merged onto the `ds-dropdown` wrapper. |
| `overlayHTMLAttributes` | `HTMLAttributes<HTMLDivElement> & DataAttributes` | `undefined` | Extra HTML/data attributes on the overlay container div. |
| `triggerHTMLAttributes` | `HTMLAttributes<HTMLDivElement> & DataAttributes` | `undefined` | Extra HTML/data attributes on the trigger wrapper div. |
| `intl` | `IntlShape` | `undefined` | **Deprecated** — will be removed in 1.0. |

### `RawDatePicker` (named)

The calendar panel without the input trigger or dropdown wrapper. A class component wrapped with `injectIntl`. Accepts `RawDatePickerProps` = `Omit<DatePickerProps, 'dropdownProps'>`. Use directly when you need to embed the calendar inline without a trigger input.

### `DayPicker`, `MonthPicker`, `YearPicker`, `TimePicker` (named)

Low-level calendar sub-elements. Exported for advanced composition. See their `.types.ts` for individual prop interfaces. These are internal building blocks and not intended for typical consumer use.

### Types (exported)

| Export | Description |
|--------|-------------|
| `DatePickerProps` | Full props interface |
| `QuickPick` | `{ label: ReactNode; value: Date }` |
| `Texts` | `{ apply, now, inputPlaceholder, clearTooltip, quickPicks }` — all `ReactNode` except `inputPlaceholder: string` |

## Usage patterns

```tsx
import DatePicker from '@synerise/ds-date-picker';

// Controlled
const [date, setDate] = useState<Date | undefined>(undefined);

<DatePicker
  value={date}
  onApply={(d) => setDate(d)}
  onClear={() => setDate(undefined)}
/>

// With time picker
<DatePicker
  value={date}
  onApply={setDate}
  showTime
/>

// With quick picks
<DatePicker
  value={date}
  onApply={setDate}
  quickPicks={[
    { label: 'Today', value: new Date() },
    { label: 'Yesterday', value: subDays(new Date(), 1) },
  ]}
/>

// Inline calendar (no trigger input)
import { RawDatePicker } from '@synerise/ds-date-picker';
<RawDatePicker value={date} onApply={setDate} />
```

## Key dependencies

- `react-day-picker` v7 — calendar grid, day modifiers, locale utilities
- `date-fns` 2.16.1 — all date arithmetic (pinned version)
- `@date-fns/upgrade` — `legacyParse` compat shim for date-fns v1→v2 migration in `RawDatePicker`
- `@synerise/ds-dropdown` — wraps `RawDatePicker` as a popover triggered by `PickerInput`
- `@synerise/ds-input` — base for `PickerInput`
- `react-intl` (peer dep) — default label strings; `IntlProvider` required in tree

## Implementation notes

- **`onApply` is required** — `DatePickerProps` has `onApply: (date?: Date) => void` without `?`.
- **`RawDatePicker` is a class component** — wrapped with `react-intl` legacy `injectIntl` HOC, not `useIntl`. It reads `this.props.intl` internally. The deprecated `intl` prop on `DatePickerProps` was a way to pass a custom `IntlShape` in older usage — now ignored.
- **`readOnly` short-circuits the Dropdown** — when `readOnly={true}`, the component renders only the `PickerInput` (or `renderTrigger` output) with no calendar attached.
- **Mode switching** — clicking the month name in `DayPicker` switches to `'month'` mode; clicking the year name switches to `'year'` mode. The back navigation in those modes returns to `'date'`. Selecting a day when `showTime=true` switches to `'time'` mode automatically.
- **`useStartOfDay` / `useEndOfDay`** — applied on day click, before `onValueChange` fires. `useStartOfDay` takes precedence if both are set (implemented as `if/else if` in `handleDayClick`).
- **Time preserved on day change** — when changing the day while already having a time selected (`changed=true`), hours/minutes/seconds from the previous value are preserved (`changeDayWithHoursPreserved`).
- **Apply vs onChange** — `onValueChange` fires on every day/time interaction. `onApply` fires only when the user explicitly clicks Apply (or selects a quick pick), and also closes the dropdown.
- **`dropdownProps.open`** — if provided, it OR-s with internal `dropVisible` state: `open={(dropdownProps?.open || dropVisible) && !disabled}`. This means both sources can open the dropdown independently.
- **`format` is deprecated** — use `valueFormatOptions: DateToFormatOptions` (from `@synerise/ds-core`) for display formatting.
- **`inputPlaceholder` i18n default is empty** — `getDefaultTexts` calls `intl.formatMessage({ id: 'DS.DATE-PICKER.SELECT-DATE' })` with no `defaultMessage`, so the placeholder is empty if the message is not in the IntlProvider's messages.
