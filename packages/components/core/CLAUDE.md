# Core (`@synerise/ds-core`)

> Foundation package for the Synerise Design System — provides the root `DSProvider` (locale + theme + data format + toaster), the styled-components theme object, media query helpers, data formatting hooks/components, a toast notification system, and shared dropdown context.

## Package structure

```
src/js/
  index.ts                              — public exports
  DSProvider/
    DSProvider.tsx                      — composite root provider
    LocaleProvider/                     — react-intl IntlProvider wrapper
      LocaleProvider.tsx
      LocaleProvider.types.ts           — LocaleProviderProps, IntlMessages, NestedMessages
      antLocales.ts                     — Ant Design locale mappings (locale string → antd locale object)
    ThemeProvider/
      ThemeProvider.tsx                 — styled-components ThemeProvider wrapper
      theme.ts                          — theme object, useTheme, defaultColorsOrder, themeVariables
      breakpoints.ts                    — breakpoint definitions (xsmall → xxlarge)
      variables.ts                      — CSS variables and colour palette values
  data-format/
    providers/DataFormatConfigProvider.tsx  — context provider for notation config
    components/                         — FormattedDate, FormattedDateTime, FormattedNumber, FormattedTime, FormattedRelativeDateTimeFrom/To
    hooks/
      useDataFormat.ts                  — main hook: formatValue, formatMultipleValues, getConstants, delimiters
      useDataFormatConfig.ts            — reads DataFormatConfigContext
      useDataFormatIntls.ts             — reads DataFormatIntlsContext
      useDataFormatUtils.ts             — locale/notation utilities
      useRelativeDateTimeUpdate.ts      — interval-based updater for relative timestamps
      useSingleIntl.ts                  — creates a standalone IntlShape from a locale string
    contexts/
      DataFormatConfigContext.tsx       — holds DataFormatConfig
      DataFormatIntlsContext.ts         — holds three IntlShape instances (number/date/time)
    hocs/withDataFormat.tsx             — HOC for class components (injects UseDataFormatProps)
    types/                              — DataFormatConfig, DataFormatNotationType, etc.
    constants/                          — DEFAULT_DATA_FORMAT_CONFIG, DATE_CONSTANTS_TARGET_FORMATS
  toaster/
    Toaster.tsx                         — thin wrapper around react-hot-toast <Toaster>
    contexts/ToasterContext.ts          — ToastContextType { options, setOptions }
    providers/ToasterProvider.tsx       — manages ToasterProps state
    hooks/useToaster.ts                 — reads ToasterContext
    constants.ts                        — TOASTER_DEFAULTS
  DropdownContext/
    DropdownContext.tsx                 — DropdownContextProps { isOpen, activeIndex, setIsOpen, hideOnItemClick }
    DropdownContextProvider.tsx         — thin Provider wrapper
    useDropdown.ts                      — reads DropdownContext
  mediaQuery/
    mediaQuery.ts                       — MEDIA_FROM, MEDIA_TO, MEDIA_ONLY tagged-template helpers
  testing/
    renderWithProvider/renderWithProvider.tsx  — RTL render() wrapped in DSProvider
    sleep.ts                            — Promise-based sleep utility
  style.ts                              — Less import entry point
src/i18n/
  en.json, es.json, pl.json, pt.json   — bundled translation strings
src/style/
  core.less, colors.less, variables.less  — global styles and CSS custom properties
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
theme.palette['blue-600']        // '#0064D6'
theme.variables['--ds-color-...'] // CSS variable value
theme.space                       // [0, 8, 12, 16, 24, 32, 48, 64]
theme.breakpoints                 // ['768px', '960px', '1280px']
theme.colorsOrder                 // array of 21 colour hex values in display order
theme.variable('--ds-name')       // looks up variables by CSS var name
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

## Testing utilities

### `renderWithProvider`

RTL `render()` wrapped in `DSProvider` with sensible test defaults. Use in component tests that need i18n or theme.

### `sleep`

`(ms: number) => Promise<void>` — Promise-based delay for async tests.

---

## Key dependencies

- `react-intl` — i18n; `LocaleProvider` wraps `IntlProvider`
- `styled-components` — theming via `ThemeProvider`
- `antd` — locale objects mapped from BCP 47 strings in `antLocales.ts`
- `react-hot-toast` — toast notifications (`Toaster` is a thin wrapper)
- `dayjs`, `moment`, `date-fns-tz` — date value detection and formatting in `useDataFormat`

## Implementation notes

- **`toasterProps` must be explicitly set** to enable the `<Toaster>` DOM element inside `DSProvider`; passing `false` (the default) skips rendering `<Toaster>` while still mounting `ToasterProvider`.
- **`ThemeProvider` merges with defaults**: `{ ...dsTheme, ...theme }` — partial overrides are safe; you cannot remove keys from the theme object.
- **`breakpoints.xxlarge.max = 0`** — intentionally 0; `MEDIA_FROM.xxlarge` produces an unbounded min-width query.
- **Nested i18n messages** are flattened by `LocaleProvider.utils.ts` before passing to `IntlProvider`; keys use dot-notation after flattening.
- **`useDataFormat` uses `eslint-disable @typescript-eslint/no-explicit-any`** in `formatValue` and `formatMultipleValues` to handle the overload dispatch pattern.
- **Data format contexts are split**: `DataFormatConfigContext` holds the raw config; `DataFormatIntlsContext` holds three `IntlShape` instances (number/date/time) derived from that config. Splitting them avoids re-creating all intl instances when only one notation changes.
- **Uses Jest** (`jest.config.js`) — not yet migrated to Vitest.
