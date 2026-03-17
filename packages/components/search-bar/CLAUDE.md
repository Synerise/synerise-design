# SearchBar (`@synerise/ds-search-bar`)

> Controlled search input with optional left icon, value prefix, and clear button.

## Package structure

```
src/
  SearchBar.tsx           — main component (forwardRef to HTMLDivElement)
  SearchBar.types.ts      — SearchBarProps, StyledSearchBar types
  SearchBar.styles.tsx    — all styled-components (SearchBarWrapper, SearchBar, etc.)
  SearchBar.constants.ts  — pixel layout constants
  ValuePrefix.tsx         — internal sub-component for the prefix label
  index.ts                — public exports
  modules.d.ts            — @testing-library/jest-dom ambient import
  __specs__/
    SearchBar.spec.tsx    — Jest tests
```

## Public exports

```ts
export default SearchBar;                         // default export
export type { SearchBarProps, StyledSearchBar };  // named type exports
```

### `SearchBar`

`forwardRef<HTMLDivElement, SearchBarProps>` — spreads remaining HTML attributes onto the outer wrapper div.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Controlled input value. |
| `onSearchChange` | `(value: string) => void` | — | **Required.** Called on every keystroke with the current input string. |
| `placeholder` | `ReactNode` | — | **Required.** Rendered via a custom overlay div (native input placeholder is kept transparent). String value is also forwarded to the native `<input>` as a fallback for a11y. |
| `onClearInput` | `() => void` | — | When provided, a clear button appears whenever `value` is non-empty **or** `valuePrefix` is set. |
| `clearTooltip` | `ReactNode` | `<FormattedMessage id="DS.SEARCH-BAR.CLEAR-TOOLTIP" defaultMessage="Clear" />` | Tooltip content for the clear icon. |
| `clearTooltipProps` | `Partial<TooltipProps>` | — | Extra props forwarded to the `<Tooltip>` wrapping the clear icon. |
| `iconLeft` | `ReactNode` | — | Element rendered in the absolute left slot (24 px reserved, 12 px gap). |
| `valuePrefix` | `ReactNode` | — | Label rendered between the left icon and the input. Its width is measured via `ResizeObserver` and the input padding adjusts dynamically. |
| `autofocus` | `boolean` | — | If `true`, focuses the `<input>` on mount (uses `preventScroll`). |
| `autofocusDelay` | `number` | — | Milliseconds to wait before focusing when `autofocus` is `true`. |
| `disabled` | `boolean` | — | Disables pointer-events and user-select on the wrapper; propagates `disabled` to the inner `<Input>`. |
| `borderRadius` | `boolean` | — | Adds `border-radius: 3px` to the wrapper (off by default — wrapper has no radius). |
| `handleInputRef` | `(ref: MutableRefObject<HTMLInputElement \| null>) => void` | — | Callback to access the inner `<input>` element. Inherited from `InputProps`. |
| `className` | `string` | — | Merged with `is-focused` class when the input has focus. |

### `SearchBarProps`

Full prop type — `WithHTMLAttributes<HTMLDivElement, …>` so all standard div attributes are accepted and forwarded.

### `StyledSearchBar`

Utility type for extending `SearchBar` with additional styled-component props:
```ts
type StyledSearchBar<CustomProps extends object = object> = StyledComponent<
  ForwardRefExoticComponent<SearchBarProps & RefAttributes<HTMLDivElement>>,
  object,
  CustomProps,
  never
>;
```

## Usage patterns

```tsx
import SearchBar from '@synerise/ds-search-bar';
import { SearchM } from '@synerise/ds-icon';

// Minimal controlled usage
const [query, setQuery] = React.useState('');

<SearchBar
  value={query}
  placeholder="Search"
  onSearchChange={setQuery}
/>

// With left icon, clear button, and prefix
<SearchBar
  value={query}
  placeholder="Search"
  onSearchChange={setQuery}
  onClearInput={() => setQuery('')}
  iconLeft={<SearchM />}
  valuePrefix="Name:"
  autofocus
/>
```

## Styling

- Fixed height of **52 px** for the inner `<input>` element and placeholder overlay.
- Bottom border: `1px solid grey-100`. No border-radius unless `borderRadius` prop is set.
- Input padding is computed dynamically from constants in `SearchBar.constants.ts` based on whether `iconLeft` and `valuePrefix` are present.
- Placeholder is a custom absolutely-positioned `<div>` — native placeholder is hidden via transparent color across all vendor prefixes. This is intentional to allow `ReactNode` placeholders.
- On hover and when focused (`.is-focused`), `IconLeftWrapper` SVG and `ValuePrefixTitle` turn `blue-600`; `ClearInputWrapper` SVG turns `red-600`.
- `disabled` state: SVGs fill `grey-400`; `pointer-events: none`.
- Minimum wrapper width: `150px`.

## Key dependencies

- `@synerise/ds-input` — inner `<Input>` component; `StyledInput` type used for the `SearchBar` styled component
- `@synerise/ds-icon` — renders the clear (`Close3M`) and left icons
- `@synerise/ds-tooltip` — wraps the clear icon
- `@synerise/ds-typography` — `Title` (level 6) used to render `valuePrefix`
- `@synerise/ds-utils` — `useResizeObserver` (measures `valuePrefix` width), `WithHTMLAttributes` type
- `@synerise/ds-core` — `useTheme` for palette access; `renderWithProvider` in tests
- `classnames` — merges `className` with `is-focused` state class
- `react-intl` — default `clearTooltip` message (`DS.SEARCH-BAR.CLEAR-TOOLTIP`)

## Implementation notes

- The component is a **controlled input** — there is no internal value state; `value` must be managed by the parent.
- The clear button only appears when `onClearInput` is provided **and** either `value` or `valuePrefix` is non-empty. Callers must reset `valuePrefix` themselves if needed.
- `ValuePrefix` is an internal-only component (not exported). It uses `useResizeObserver` to track its rendered width and notifies the parent via `setValuePrefixWidth`; on unmount it resets the width to `0`.
- `autofocusDelay` only takes effect when `autofocus` is also `true`; the timeout is cleaned up on unmount/dependency change.
- The `forwardedRef` is attached to the outer `SearchBarWrapper` div, not the `<input>`. Use `handleInputRef` to get the inner `<input>` element.
- `VALUE_PREFIX_WRAPPER_LEFT_VALUE` is fixed at `16 + 24 + 12 = 52 px` — this always reserves space for a left icon, even when no `iconLeft` is provided. This means the prefix will appear offset from the left edge even without an icon.
- Tests use Jest (not Vitest) — `jest.config.js` present; the package has not been migrated to Vitest.
