# Search (`@synerise/ds-search`)

> Expandable search input with a virtualized dropdown that supports recent items, filterable parameters (facets), and contextual suggestions.

## Package structure

```
src/
  Search.tsx                          — main component (generic over T, U, S)
  Search.types.tsx                    — SearchProps, SearchLookupConfig, DataSetProps, AnyObject, SelectResultDataKeys
  Search.styles.tsx                   — styled-components for wrapper, dropdown, input, filter label, clear button
  const.ts                            — numeric constants (offsets, animation durations)
  index.ts                            — public exports
  modules.d.ts                        — .less module declaration
  style/
    index.less                        — component base styles
    input.mixin.less                  — input mixin
  Elements/
    index.ts                          — re-exports sub-components
    SearchInput/
      SearchInput.tsx                 — collapsible input with filter label, clear button, search button
      SearchInput.types.tsx           — SearchInputProps
    SearchButton/
      SearchButton.tsx                — ghost icon button (SearchM icon) that toggles the input
      SearchButton.types.ts           — SearchButtonProps
    SearchHeader/
      SearchHeader.tsx                — section header row with optional info-icon tooltip
      SearchHeader.types.ts           — SearchHeaderProps
    SearchItems/
      SearchItems.tsx                 — react-window FixedSizeList renderer, exported as SearchItems / SearchItemList
      SearchItems.types.ts            — SearchItemListProps
    SearchRenderer/
      SearchRenderer.tsx              — composes SearchHeader + SearchItems; internal to Search, not re-exported
      SearchRenderer.types.ts         — SearchRendererProps
    utils/
      searchUtils.tsx                 — getAllElementsFiltered, hasSomeElementFiltered, hasSomeElement, getParametersScrollTop
  __specs__/
    Search.spec.tsx
    SearchInput.spec.tsx
```

## Public exports

```ts
// default
export { default } from './Search';               // Search<T, U, S>

// sub-components
export { SearchInput }                            // from Elements
export { SearchHeader }                           // from Elements
export { SearchItems, SearchItemList, renderSearchList } // from Elements (SearchItems and SearchItemList are the same default export)
export { SearchButton }                           // from Elements

// types
export type { SearchProps, SearchLookupConfig }   // from Search.types
export type { SearchInputProps }                  // from Elements/SearchInput/SearchInput.types
```

### `Search<T, U, S>`

Generic component. `T` = recent item shape, `U` = parameter item shape, `S` = suggestion item shape.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `clearTooltip` | `string` | — | Tooltip text on the clear (×) button |
| `divider` | `ReactNode` | — | Node rendered between recent and parameters sections |
| `dropdownMaxHeight` | `number` | — | Max height (px) of the dropdown content area |
| `filterLookupKey` | `string` | — | Key on a parameter item used as display label in the input; when set, clicking the parameter also populates the text input with that key's value and calls `onParameterValueChange` with the item's `filterLookupKey` value instead of the text key |
| `inputProps` | `Partial<InputProps>` (antd) | — | Extra props forwarded to the underlying antd `Input` |
| `onClear` | `() => void` | — | Called when clear button is clicked; caller must reset `value` and `parameterValue` |
| `onParameterValueChange` | `(parameterValue: string, parameter: U \| null) => void` | — | Called when a parameter item is selected or when Backspace clears the current parameter |
| `onValueChange` | `(value: string) => void` | — | Called on every input change and when an item is selected |
| `parameters` | `U[]` | — | Parameter (filter/facet) items for the dropdown |
| `parametersDisplayProps` | `DataSetProps` | — | Render config for the parameters section |
| `parameterValue` | `string` | — | Currently active parameter value; when non-empty, switches dropdown to suggestions mode |
| `placeholder` | `string` | — | Input placeholder text |
| `recent` | `T[]` | — | Recent-search items for the dropdown |
| `recentDisplayProps` | `DataSetProps` | — | Render config for the recent section |
| `searchWidth` | `number` | — | Width (px) of the expanded input; preferred over `width` |
| `dropdownWidth` | `number` | — | Width (px) of the dropdown; defaults to match input width |
| `width` | `number` | — | **Deprecated** — use `searchWidth` instead |
| `suggestions` | `S[] \| null` | `null` | Suggestion items shown after a parameter is chosen |
| `suggestionsDisplayProps` | `DataSetProps \| null` | — | Render config for the suggestions section; required for suggestions to display |
| `textLookupConfig` | `SearchLookupConfig<T,U,S>` | — | Maps each dataset to the key used for text matching and display |
| `value` | `string` | — | Controlled input value |
| `hideLabel` | `boolean` | — | When `true`, clears the active filter label from the input |
| `disableInput` | `boolean` | — | Disables the text input while keeping the button clickable |
| `alwaysExpanded` | `boolean` | — | Keeps the input expanded at all times; disables toggle behaviour |
| `searchTooltipProps` | `TooltipProps` | — | Props forwarded to the `@synerise/ds-tooltip` wrapping the input |
| `style` | `React.CSSProperties` | — | Inline style on the outermost wrapper |

#### `SearchLookupConfig<T, U, S>`

```ts
{
  parameters: keyof U;
  recent: keyof T;
  suggestions: keyof S;
}
```

#### `DataSetProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `itemRender` | `(item: any) => JSX.Element` | — | Renders a single row |
| `rowHeight` | `number` | — | Height of each row in px (used by react-window) |
| `title` | `string` | — | Section header text |
| `tooltip` | `string` | — | Tooltip on the info icon next to the title |
| `visibleRows` | `number` | — | Caps the visible rows; list scrolls beyond this |
| `listProps` | `Partial<ListProps>` (react-window) | — | Extra props passed to the `FixedSizeList` |

---

### `SearchInput`

Standalone collapsible search input. Can be used independently of the full `Search` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value (required) |
| `onChange` | `(value: string) => void` | — | Called on input change (required) |
| `onClear` | `() => void` | — | Called when clear button is clicked (required) |
| `alwaysExpanded` | `boolean` | — | Keeps input permanently open |
| `alwaysHighlight` | `boolean` | — | Input always shown with blue border when open |
| `clearTooltip` | `ReactNode` | — | Tooltip text/node on the clear button |
| `closeOnClickOutside` | `boolean` | — | Collapses input when clicking outside |
| `disabled` | `boolean` | — | Disables the entire component including the button |
| `disableInput` | `boolean` | — | Disables only the text input; button remains active |
| `filterLabel` | `{ icon?: ReactNode; [key: string]: any } \| null` | — | Object whose key matches `textLookupKey`/`filterLookupKey`; rendered as a chip prefix inside the input |
| `filterLookupKey` | `string` | — | Key on `filterLabel` to display as chip text; falls back to `textLookupKey` |
| `focusTrigger` | `boolean` | — | Toggle this boolean to imperatively focus the input |
| `inputProps` | `Partial<InputProps>` | — | Extra props forwarded to antd `Input` |
| `moveCursorToEnd` | `boolean` | — | Moves caret to end of value when toggled |
| `onButtonClick` | `() => void` | — | Called when the search icon button is clicked |
| `onClick` | `() => void` | — | Called when the input area is clicked |
| `onKeyDown` | `(e: KeyboardEvent<HTMLInputElement>) => void` | — | Key-down handler on the input |
| `onToggle` | `(isOpen: boolean) => void` | — | Called when the expanded state changes |
| `placeholder` | `string` | — | Input placeholder |
| `searchTooltipProps` | `Partial<TooltipProps>` | `{}` | Tooltip wrapping the input |
| `textLookupKey` | `string` | — | Key on `filterLabel` used when `filterLookupKey` is absent |
| `toggleTrigger` | `boolean` | — | Toggle this boolean to imperatively expand/collapse the input |

---

### `SearchItems` / `SearchItemList`

Both names are the same default export from `SearchItems.tsx`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[] \| undefined` | — | Items to render |
| `itemRender` | `(item: T) => JSX.Element` | — | Row renderer |
| `rowHeight` | `number` | — | Row height in px |
| `width` | `number \| string` | — | List width |
| `height` | `number` | — | Max height in px; list scrolls beyond this |
| `highlight` | `string` | — | Text to highlight in rendered rows |
| `onItemClick` | `(e: T) => void` | — | Item click callback |
| `listProps` | `Partial<ListProps> & { scrollTop?: number }` | — | Extra react-window props; `scrollTop` is synced via `listRef.scrollTo` |
| `visibleRows` | `number` | — | Caps height to `visibleRows * rowHeight` |
| `renderInMenu` | `boolean` | `true` | Wraps list in `ds-menu`; **deprecated** — set to `false` and avoid `Menu.Item` in `itemRender` |

#### `renderSearchList`

```ts
function renderSearchList<V>(props: SearchItemListProps<V>, children?: ReactNode): ReactElement
```

Convenience wrapper that returns `<SearchItems {...props}>{children}</SearchItems>`.

---

### `SearchHeader`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headerText` | `string` | — | Section label (required) |
| `tooltip` | `string` | — | Info-icon tooltip text |

---

### `SearchButton`

Internal button used by `SearchInput`. Exported for advanced composition.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inputOpen` | `boolean` | — | Whether the input is currently expanded |
| `hidden` | `boolean` | — | Hides the button (value or filterLabel present) |
| `onClick` | `() => void` | — | Click handler |
| `clickable` | `boolean` | — | Enables pointer events |
| `disabled` | `boolean` | — | Renders the button as disabled |
| `inputFocused` | `boolean` | — | Changes icon fill to blue-600 when focused |

## Usage patterns

```tsx
import Search from '@synerise/ds-search';
import { SearchInput, SearchItems, SearchHeader } from '@synerise/ds-search';
import type { SearchProps, SearchLookupConfig, SearchInputProps } from '@synerise/ds-search';
```

Minimal controlled example:

```tsx
const [value, setValue] = React.useState('');
const [parameterValue, setParameterValue] = React.useState('');
const [suggestions, setSuggestions] = React.useState([]);

<Search
  clearTooltip="Clear"
  placeholder="Search"
  dropdownMaxHeight={400}
  value={value}
  parameterValue={parameterValue}
  parameters={[{ text: 'City', icon: <CityIcon /> }]}
  recent={[{ text: 'Bangkok', filter: 'City' }]}
  suggestions={suggestions}
  textLookupConfig={{ parameters: 'text', recent: 'text', suggestions: 'text' }}
  onValueChange={setValue}
  onParameterValueChange={(val, param) => {
    setParameterValue(val);
    setSuggestions(fetchSuggestions(val));
  }}
  onClear={() => { setValue(''); setParameterValue(''); setSuggestions([]); }}
  recentDisplayProps={{ title: 'Recent', rowHeight: 32, itemRender: (item) => <ListItem>{item.text}</ListItem> }}
  parametersDisplayProps={{ title: 'Parameters', rowHeight: 32, itemRender: (item) => <ListItem>{item.text}</ListItem> }}
  suggestionsDisplayProps={{ title: 'Suggestions', rowHeight: 32, itemRender: (item) => <ListItem>{item.text}</ListItem> }}
/>
```

Standalone input only:

```tsx
import { SearchInput } from '@synerise/ds-search';

<SearchInput
  value={value}
  onChange={setValue}
  onClear={() => setValue('')}
  clearTooltip="Clear"
  placeholder="Search"
  closeOnClickOutside
/>
```

## Styling

- `Search.styles.tsx` contains all styled-components; no CSS Modules.
- `SearchWrapper` receives `$width` (px) and `inputOpen` to toggle `width: 32px` vs full width.
- `SearchInputContent` transitions `width: 0 → 100%` over `ANIMATION_DURATION` (0.1s) using `direction: rtl` for right-to-left expansion animation.
- `SearchInner` applies blue border (`palette['blue-600']`) and blue background (`palette['blue-050']`) when `hasValue` or `alwaysHighlight`.
- `Filter` chip is capped at `MAX_FILTER_WIDTH = 120px` and uses `palette['blue-600']` color.
- `SearchDropdownWrapper` has `width: 0` by default; the child `.search-list-open` class makes it visible via `openDropdownAnimation` keyframe (fade in over 0.3s).
- Dropdown appears 40px below the input (`top: 40px` on `SearchDropdownContent`).
- `SCROLLBAR_HEIGHT_OFFSET = 28` is subtracted from `dropdownMaxHeight` before passing to `@synerise/ds-scrollbar`.

## Key dependencies

- `react-window` — `FixedSizeList` for virtualized dropdown rows
- `@synerise/ds-scrollbar` — custom scrollbar wrapping the dropdown
- `@synerise/ds-utils` (`focusWithArrowKeys`, `useOnClickOutside`, `usePrevious`) — keyboard navigation and outside-click handling
- `@synerise/ds-tooltip` — wraps the search input and provides section header tooltips
- `@synerise/ds-menu` — wraps items when `renderInMenu=true` (deprecated path)
- `@synerise/ds-list-item` (`ListContextProvider`) — wraps items when `renderInMenu=false`
- `antd/lib/input` — base `Input` component inside `SearchInput`

## Implementation notes

- The component is **fully controlled** — `value` and `parameterValue` must be managed by the caller. Selecting an item calls `onValueChange`/`onParameterValueChange`; the component does not update its own displayed value.
- **Parameter vs suggestions mode**: when `parameterValue` is non-empty, the dropdown switches to showing only `suggestions`. Recent items and parameters are hidden.
- **`filterLookupKey` special behaviour**: when a parameter item has a truthy value at `filterLookupKey`, clicking it immediately sets `isResultChosen = true`, populates the text input with the parameter text key value, and calls `onParameterValueChange` with the `filterLookupKey` value — effectively treating the parameter as a direct result rather than a filter.
- **Arrow-key navigation**: `focusWithArrowKeys` from `ds-utils` moves focus across `.ds-search-item` elements; pressing Up when at the top returns focus to the input via `setFocusInputTrigger`.
- **`toggleTrigger` / `focusTrigger`** on `SearchInput` are boolean flip-flops — the component reacts to a change in value (via `usePrevious`), not to the value itself.
- **`width` prop is deprecated** — `searchWidth` is the current prop; both set the same `mergedWidth` internal variable.
- `AnyObject = Record<string, any>` is used throughout for item shapes; TypeScript generics at the `Search` level provide partial type safety but `itemRender` and internal utilities rely on `any`.
- Tests use **Jest** (not Vitest) — `jest.config.js` is present, and test files use `jest.fn()`.
- `SearchHeader` imports `Tooltip` from `@synerise/ds-tooltip/dist/Tooltip` (deep import, not the package root).
- The README documents `onValueChange` on `SearchInput` but the actual prop is `onChange`.
