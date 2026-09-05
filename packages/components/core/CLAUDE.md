# Core (`@synerise/ds-core`)

> Foundation package for the Synerise Design System — provides the root `DSProvider` (locale + theme + data format + toaster), the styled-components theme object, media query helpers, data formatting hooks/components, a toast notification system, and shared dropdown context.

## Package structure

```
src/js/
 index.ts — public exports
 DSProvider/
 DSProvider.tsx — composite root provider
 LocaleProvider/ — react-intl IntlProvider wrapper
 LocaleProvider.tsx
 LocaleProvider.types.ts — LocaleProviderProps, IntlMessages, NestedMessages
 ThemeProvider/
 ThemeProvider.tsx — styled-components ThemeProvider wrapper
 theme.ts — theme object, useTheme, defaultColorsOrder, themeVariables
 breakpoints.ts — breakpoint definitions (xsmall → xxlarge)
 variables.ts — CSS variables and colour palette values
 data-format/
 providers/DataFormatConfigProvider.tsx — context provider for notation config
 components/ — FormattedDate, FormattedDateTime, FormattedNumber, FormattedTime, FormattedRelativeDateTimeFrom/To
 hooks/
 useDataFormat.ts — main hook: formatValue, formatMultipleValues, getConstants, delimiters
 useDataFormatConfig.ts — reads DataFormatConfigContext
 useDataFormatIntls.ts — reads DataFormatIntlsContext
 useDataFormatUtils.ts — locale/notation utilities
 useRelativeDateTimeUpdate.ts — interval-based updater for relative timestamps
 useSingleIntl.ts — creates a standalone IntlShape from a locale string
 contexts/
 DataFormatConfigContext.tsx — holds DataFormatConfig
 DataFormatIntlsContext.ts — holds three IntlShape instances (number/date/time)
 hocs/withDataFormat.tsx — HOC for class components (injects UseDataFormatProps)
 types/ — DataFormatConfig, DataFormatNotationType, etc.
 constants/ — DEFAULT_DATA_FORMAT_CONFIG, DATE_CONSTANTS_TARGET_FORMATS
 toaster/
 Toaster.tsx — thin wrapper around react-hot-toast <Toaster>
 contexts/ToasterContext.ts — ToastContextType { options, setOptions }
 providers/ToasterProvider.tsx — manages ToasterProps state
 hooks/useToaster.ts — reads ToasterContext
 constants.ts — TOASTER_DEFAULTS
 DropdownContext/
 DropdownContext.tsx — DropdownContextProps { isOpen, activeIndex, setIsOpen, hideOnItemClick }
 DropdownContextProvider.tsx — thin Provider wrapper
 useDropdown.ts — reads DropdownContext
 overlays/
 overlayRegistry.ts — force every open DS overlay closed through its own close path
 overlayZIndex.tsx — OverlayZIndexContext: nested overlays stack above their parent
 mediaQuery/
 mediaQuery.ts — MEDIA_FROM, MEDIA_TO, MEDIA_ONLY tagged-template helpers
 testing/
 renderWithProvider/renderWithProvider.tsx — RTL render() wrapped in DSProvider
 sleep.ts — Promise-based sleep utility
 style.ts — Less import entry point
src/i18n/
 en.json, es.json, pl.json, pt.json — bundled translation strings
src/style/
 core.less, colors.less, variables.less — global styles and CSS custom properties
```

## Public exports

### `DSProvider` (default export)

Root provider. Must wrap the entire application. Composes `LocaleProvider` → `ThemeProvider` → `DataFormatConfigProvider` → `ToasterProvider`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locale` | `string` | — | BCP 47 locale tag (e.g. `'en-US'`, `'pl-PL'`) |
| `defaultLocale` | `string` | — | Fallback locale when `messages` key is missing |
| `messages` | `NestedMessages` | — | i18n message map (supports nested objects) |
| `defaultMessages` | `NestedMessages` | — | Fallback message map |
| `timeZone` | `string` | — | IANA timezone string (e.g. `'Europe/Warsaw'`) |
| `onErrorIntl` | `(error: OnErrorFn[0]) => void` | — | react-intl error handler; suppress or log missing translation keys |
| `theme` | `ThemePropsVars` | `dsTheme` | Override the styled-components theme; merged with defaults |
| `dataFormatConfig` | `DataFormatConfig` | EU notation | Date/number format notation config |
| `toasterProps` | `false \| Partial<ToasterProps>` | `false` | Pass `TOASTER_DEFAULTS` or a custom config to enable the toast container; `false` disables the `<Toaster>` element |
| `children` | `ReactNode` | — | App content |

> `toasterProps !== false` is required for `<Toaster>` to render. The `ToasterProvider` is always mounted; only the `<Toaster>` output element is conditional.

### `theme`

The default `ThemePropsVars` object. Passed automatically via `DSProvider`; also importable for use outside styled-components (e.g. inline styles, tests).

```ts
theme.palette['blue-600'] // '#0064D6'
theme.variables['--ds-color-..'] // CSS variable value
theme.space // [0, 8, 12, 16, 24, 32, 48, 64]
theme.breakpoints // ['768px', '960px', '1280px']
theme.colorsOrder // array of 21 colour hex values in display order
theme.variable('--ds-name') // looks up variables by CSS var name
```

### `useTheme`

`() => ThemePropsVars` — styled-components `useTheme` typed to `ThemePropsVars`. Use inside any component rendered within `DSProvider`.

### `themeVariables`

`Record<string, string>` — all CSS variable name→value pairs from the design token set.

### `defaultColorsOrder`

`readonly string[]` — 21 palette keys in the canonical display order (`'blue-600'`, `'green-600'`, …).

### `DefaultColor`

Type alias for the union of all 21 values in `defaultColorsOrder`.

### `ThemeProps` / `ThemePropsVars` / `WithTheme`

TypeScript helper types for styled-components. Use `ThemeProps` or `WithTheme` in styled-component interpolations:

```ts
const Box = styled.div<ThemeProps>`
 color: ${({ theme }) => theme.palette['blue-600']};
`;
```

### `mediaQuery`

Object with three groups of tagged-template helpers for responsive styled-components:

| Property | Behaviour |
|----------|-----------|
| `mediaQuery.from.<breakpoint>` | `min-width` media query |
| `mediaQuery.to.<breakpoint>` | `max-width` media query |
| `mediaQuery.only.<breakpoint>` | `min-width AND max-width` range |

Breakpoints: `xsmall` (≤320px), `small` (321–768px), `medium` (769–960px), `large` (961–1280px), `xlarge` (1281–1600px), `xxlarge` (≥1600px).

```ts
const Sidebar = styled.div`
 width: 300px;
 ${mediaQuery.to.medium`width: 100%;`}
`;
```

---

## Data formatting

### `useDataFormat`

Primary hook for locale-aware formatting. Requires `DSProvider` (or `DataFormatConfigProvider` + `IntlProvider`) as ancestor.

Returns `UseDataFormatProps`:

| Field | Type | Description |
|-------|------|-------------|
| `formatValue` | overloaded fn | Format a number, Date, Moment, or dayjs value |
| `formatMultipleValues` | overloaded fn | Map over an array with `formatValue` |
| `getConstants` | overloaded fn | Get locale-ordered arrays of month/weekday names |
| `firstDayOfWeek` | `number` | 0 = Sunday, 1 = Monday |
| `isSundayFirstWeekDay` | `boolean` | Derived from `firstDayOfWeek` |
| `is12HoursClock` | `boolean` | Based on `timeFormatNotation` |
| `thousandDelimiter` | `Delimiter` | `','` (US) or `' '` (EU) |
| `decimalDelimiter` | `Delimiter` | `'.'` (US) or `','` (EU) |

`formatValue` dispatch: `moment` instance → `getFormattedDateFromMoment`; `dayjs` → `getFormattedDateFromDayjs`; `Date` → `getFormattedDate`; `number` → `getFormattedNumber`; `string` → passthrough.

### `DataFormatConfig`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `startWeekDayNotation` | `'US' \| 'EU'` | `'EU'` | Sunday-first (US) or Monday-first (EU) |
| `dateFormatNotation` | `'US' \| 'EU'` | `'EU'` | MM/DD/YYYY (US) vs DD.MM.YYYY (EU) |
| `timeFormatNotation` | `'US' \| 'EU'` | `'EU'` | 12h (US) vs 24h (EU) |
| `numberFormatNotation` | `'US' \| 'EU'` | `'EU'` | Comma thousands (US) vs space thousands (EU) |
| `applyTimeZoneOffset` | `boolean` | — | Apply timezone offset to date formatting |

### Formatting components

All accept `value` (the value to format) and `options` (format options). They render a plain `<span>`.

| Component | Value type | Options type |
|-----------|-----------|-------------|
| `FormattedNumber` | `number` | `NumberToFormatOptions` |
| `FormattedDate` | `Date \| Moment \| Dayjs` | `DateToFormatOptions` |
| `FormattedTime` | `Date \| Moment \| Dayjs` | `DateToFormatOptions` |
| `FormattedDateTime` | `Date \| Moment \| Dayjs` | `{ dateOptions, timeOptions }` |
| `FormattedRelativeDateTimeFrom` | `Date \| Moment \| Dayjs` | relative options |
| `FormattedRelativeDateTimeTo` | `Date \| Moment \| Dayjs` | relative options |

### `withDataFormat`

HOC for class components. Injects `UseDataFormatProps` as props. Usage: `export default withDataFormat(MyClass)`.

---

## Toaster

### `useToaster`

`() => ToastContextType` — returns `{ options: Partial<ToasterProps>, setOptions }`. Use `setOptions` to dynamically change toast position/style after mount.

### `ToasterProvider`

Lower-level provider. Used internally by `DSProvider`. Can be used standalone if `DSProvider` is not available.

### `TOASTER_DEFAULTS`

Default `ToasterProps`: `position: 'bottom-left'`, `reverseOrder: false`, `gutter: 8`, `containerStyle: { padding: '24px' }`, `toastOptions: { removeDelay: 200 }`.

---

## DropdownContext

Shared open-state context for `@synerise/ds-dropdown` and custom dropdowns.

### `DropdownContextProvider`

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Current open state |
| `activeIndex` | `number \| null` | Currently highlighted item index |
| `setIsOpen` | `(newOpen: boolean) => void` | Open/close handler |
| `hideOnItemClick` | `string \| boolean` | Whether clicking an item closes the dropdown |

### `useDropdown`

`() => DropdownContextProps | undefined` — returns `undefined` if no `DropdownContextProvider` is in the tree.

---

## Overlay registry

Lets an app force every open DS overlay closed in reaction to an app-level event — e.g. the active workspace changed in another tab, so any modal or dropdown is now holding state bound to the previous workspace.

Overlays close through their own close paths, so consumer handlers fire, exit transitions run and focus is restored. Nothing is removed from the DOM behind React's back.

### `closeAllOverlays(options?): Promise<void>`

| Option | Type | Description |
|--------|------|-------------|
| `kinds` | `OverlayKind[]` | Restrict the sweep to these kinds. Omit to close every registered overlay. |

`OverlayKind` is `'modal' | 'drawer' | 'popover' | 'dropdown' | 'tooltip' | 'popconfirm'`.

```ts
import { closeAllOverlays } from '@synerise/ds-core';

await closeAllOverlays();                                  // everything
await closeAllOverlays({ kinds: ['modal', 'drawer'] });     // leave tooltips alone
```

Registered by `@synerise/ds-modal`, `@synerise/ds-drawer` and `@synerise/ds-popover`. Popover-level registration also covers `@synerise/ds-dropdown`, `@synerise/ds-tooltip`, `@synerise/ds-popconfirm`, and everything built on them (`ds-select`, `ds-table-new`, …).

Per kind, closing runs:

| Kind | Close path |
|------|-----------|
| `modal` | `onCancel` (awaited when it returns a promise), then the modal's internal close + `afterClose` |
| `drawer` | `onClose` |
| popover kinds | `context.onOpenChange(false, undefined, 'escape-key')` — the same funnel as pressing Escape, so `onDismiss` fires too |

### `registerOverlay(entry): () => void`

For components that render their own overlays and want to join the sweep. Call while open, use the returned function as the effect cleanup:

```ts
useEffect(() => {
  if (!isOpen) return undefined;
  return registerOverlay({ kind: 'modal', close: () => onClose() });
}, [isOpen]);
```

### `createOverlayCloseEvent<T>(target)`

Builds the stand-in event handed to `onCancel` / `onClose`, since a programmatic close has no real event. `target` and `currentTarget` are the overlay root; `preventDefault` and `stopPropagation` are no-ops.

### Behaviour worth knowing

- **Closing order is newest-registered first**, so a dropdown opened inside a modal closes before the modal.
- **Controlled overlays follow their owner.** The sweep fires `onCancel` / `onOpenChange` / `onClose`; if the owner ignores it and keeps `open` at `true`, that overlay stays open. Forcing it shut would desync the owner's state.
- **Each registration closes at most once**, so repeated calls cannot fire the same `onCancel` twice — even before React has flushed the first close. An overlay re-registers when it re-opens.
- **Tooltips are included by default** (they are popovers). Pass `kinds` to leave them alone.
- **A throwing or rejecting handler is contained** and does not stop the remaining overlays from closing.
- **`ds-select` skips its `clearQuery()`.** Escape clears a Select's search query; a registry close only closes the dropdown.
- **The registry is a module-scoped singleton**, so it relies on there being one copy of `@synerise/ds-core` at runtime. That is what the universal `peerDependencies: { "@synerise/ds-core": "*" }` guarantees — do not convert it to a hard dependency.

---

## Overlay z-index

Stacks nested overlays automatically. Before this existed, every `ds-modal` / `ds-drawer`
took the flat `zindex-modal` token (991000) and relied on DOM order — which breaks the
moment an ancestor raises itself with an explicit `zIndex`, and breaks anyway for nested
modals because React commits the **innermost** portal first, putting a child *before* its
parent in the document.

`ds-modal` and `ds-drawer` publish their own resolved z-index to their subtree; an overlay
rendered inside them derives one step above it. Read through the **React** tree, not the DOM
tree — every overlay portals to `document.body`, so a nested modal is a DOM sibling of its
parent while still being a React descendant. That is what makes this work.

### `useResolvedOverlayZIndex(zIndex?): number`

Resolves the z-index an overlay should render at:

1. an explicit `zIndex` prop always wins — the escape hatch for consumers positioning
   themselves against something outside the DS stack;
2. otherwise `OVERLAY_Z_INDEX_STEP` above the enclosing overlay;
3. otherwise the `zindex-modal` token.

### `useOverlayZIndex(): number | undefined`

The enclosing overlay's z-index, or `undefined` at the top level.

### `OverlayZIndexProvider`

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number` | The resolved z-index of the overlay owning this subtree |

### `OVERLAY_Z_INDEX_STEP`

`2`. Deliberately small, and derived values are **clamped at `zindex-dropdown - STEP`
(991048)**.

The reason is that the popover family uses **flat** tokens, entirely above the modal scale:
every `PopoverContent` (popover, dropdown, select, cascader, date picker) sits at
`zindex-dropdown` **991050**, `Popconfirm` at **991055**, `Tooltip` / `HoverTooltip` /
`Tray` / menu-item tooltips at **991060**. A modal that climbed past 991050 would paint over
its own dropdowns and selects. `zindex-popover` (991030), `zindex-picker`,
`zindex-notification`, `zindex-message` and `zindex-popper` are declared in the theme but
unused in DS — 991050 is the real floor. The clamp allows 24 levels of nesting.

### Behaviour worth knowing

- **The popover family does not consume this context**, by design. Its flat tokens are
  already above the clamped modal ceiling, so an overlay opened inside a modal is always
  above it. What is *not* solved: an overlay left open in modal N floats above modal N+1.
  That predates this mechanism. Closing it means adopting antd v5's `useZIndex` model —
  raise the step to 100 and have the popover family derive `enclosingOverlayZ + itsOffset`
  from this same context (the tokens are already antd-shaped: `+0` modal, `+30` popover,
  `+50` dropdown, `+55` popconfirm, `+60` tooltip off a 991000 base). **Until then the step
  must stay small** — a step of 100 puts a two-deep modal above `zindex-dropdown`.
- **`showModal()` has no enclosing overlay.** It renders through `setPortalContent` into the
  `DSProvider`-level `PortalRenderer`, outside any modal's React subtree, so it always gets
  the flat token. Pass `zIndex` explicitly if such a modal must stack.
- **Hidden modals still provide context.** With `destroyOnClose: false` a closed modal stays
  mounted (`display: none`); nothing is counted, values are derived, so this is harmless.
- Reaching the ceiling logs one dev-only warning and ties with the parent, so deep overlays
  fall back to DOM order rather than silently inverting.

---

## Testing utilities

### `renderWithProvider`

RTL `render()` wrapped in `DSProvider` with sensible test defaults. Use in component tests that need i18n or theme.

### `sleep`

`(ms: number) => Promise<void>` — Promise-based delay for async tests.

---

## Key dependencies

- `react-intl` — i18n; `LocaleProvider` wraps `IntlProvider`
- `styled-components` — theming via `ThemeProvider`
- `react-hot-toast` — toast notifications (`Toaster` is a thin wrapper)
- `dayjs`, `moment` — date value detection in `useDataFormat`
- `@date-fns/tz` — `TZDate` + `tzOffset` for the timezone utilities. Standalone: no `date-fns` dependency and no peers, so ds-core takes no position on the consumer's `date-fns` major

## Implementation notes

- **`toasterProps` must be explicitly set** to enable the `<Toaster>` DOM element inside `DSProvider`; passing `false` (the default) skips rendering `<Toaster>` while still mounting `ToasterProvider`.
- **`ThemeProvider` merges with defaults**: `{ ..dsTheme, ..theme }` — partial overrides are safe; you cannot remove keys from the theme object.
- **`breakpoints.xxlarge.max = 0`** — intentionally 0; `MEDIA_FROM.xxlarge` produces an unbounded min-width query.
- **Nested i18n messages** are flattened by `LocaleProvider.utils.ts` before passing to `IntlProvider`; keys use dot-notation after flattening.
- **`useDataFormat` uses `eslint-disable @typescript-eslint/no-explicit-any`** in `formatValue` and `formatMultipleValues` to handle the overload dispatch pattern.
- **Data format contexts are split**: `DataFormatConfigContext` holds the raw config; `DataFormatIntlsContext` holds three `IntlShape` instances (number/date/time) derived from that config. Splitting them avoids re-creating all intl instances when only one notation changes.
- **`timeZone.utils.ts` — wall clock vs instant.** A "wall clock" is a `Date` whose *local* fields carry a reading in some other timezone; an "instant" is a real point in time. `toIsoString` encodes a wall clock into an offset-carrying ISO string, `getLocalDateInTimeZone` decodes such a string back into a wall clock, and the two are inverses. Mixing the two representations shifts a value by the browser-to-target timezone delta.
  - Both directions go through local wrappers — `getOffsetAtWallClock` and `getWallClockAtInstant`. Use them rather than reaching for `@date-fns/tz` directly, and see `utils/__specs__/timeZone.utils.spec.ts` for the transition-day coverage.
    - `asInstantInTimeZone` builds a `TZDate` from a wall clock's components, which `TZDate` reads as a reading *in* the zone — so it resolves which side of a DST transition the wall clock falls on by itself. This replaced the `asUtcFields` re-basing that `date-fns-tz@1` needed, whose `getTimezoneOffset(tz, date)` read `date`'s **UTC** fields as the wall clock to look up.
    - `tzOffset` returns **minutes** ahead of UTC, where `date-fns-tz@1`'s `getTimezoneOffset` returned **milliseconds**. Everything in the module is minutes now.
    - `tzOffset` cannot parse the `'Z'` designator and returns `NaN` for it, where `getTimezoneOffset` read it as zero. `extractTimeZoneOffset` reports a UTC-terminated string as `'Z'`, and `value.toISOString()` is the most common input to `getLocalDateInTimeZone` — so that case is normalised explicitly (`UTC_DESIGNATOR`) and pinned by a spec.
    - `dateToIsoWithOffset` delegates to `toIsoString`. It must keep the date's own fields and only stamp the zone's offset, which is what `date-fns-tz@1`'s `format({ timeZone })` did; wrapping the value in a `TZDate` instead re-reads it as an instant and shifts it by the browser-to-zone delta.
  - **A `TZDate` is not interchangeable with a wall-clock carrier.** Its getters report the same reading, but `toISOString()` emits an offset-carrying string rather than a `Z` one, and its instant is the real one rather than the re-based value callers observe today. `getLocalDateInTimeZone` therefore still returns a plain `Date`; switching that return type is a deliberate follow-up, not a drop-in.
  - `toIsoString(date, timeZone)` defaults `timeZone` to `'UTC'`, so passing `undefined` does **not** mean "leave this date alone" — it stamps `+00:00` onto the local fields. Callers that mean that must skip the call.
- **`applyTimeZoneOffset` is opt-in** (`DataFormatConfig`, default `false`) and gates the projection of an instant into the provider timezone inside `getFormattedDate`. A component that deliberately hands `formatValue` an instant should request the flag per call (`options.applyTimeZoneOffset`, which takes precedence over the config) rather than inheriting it — otherwise its output silently depends on how the consuming app is configured.
- **Uses Vitest** for testing.
