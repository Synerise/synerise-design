# Select (`@synerise/ds-select`)

> A DS-native select dropdown (no Ant Design): a selector trigger + floating options dropdown built
> on `@synerise/ds-dropdown` (floating-ui) and `@synerise/ds-list-item`, wrapped in `FormField`.
> Supports single-select, `multiple` (chips), `tags` (free-text) and in-selector search, with full
> keyboard navigation, combobox/listbox ARIA, prefix/suffix addons, `readOnly`, and a `raw` variant.

## Package structure

```
src/
 Select.tsx — main component (forwardRef, compound with .Option); composes the sub-components below
 Select.types.ts — SelectProps, SelectValue, SelectOption, SelectMode, SelectHandler, RawValueType, FilterOptionFn
 Select.styles.ts — styled-components (Selector = the .ds-select box, SelectWrapper, chips, dropdown, …)
 Option.tsx — declarative <Select.Option> marker (renders null) + OptionProps
 index.ts — default export + types + SelectStyles namespace + getOptionsFromChildren/findOption
 Select.figma.tsx — Figma Code Connect mapping
 modules.d.ts — imports @testing-library/jest-dom
 hooks/
  useSelectOptions.ts — resolve options (prop → children), client filtering, tags create-row
  useResponsiveTagCount.ts — maxTagCount="responsive": fit-to-width chip count (ResizeObserver)
 components/
  OptionList.tsx — dropdown overlay: loading / empty / windowed (react-window) listbox of options
  SelectorContent.tsx — selector inner content: chips / selected label / placeholder + search input
 utils/
  getOptionsFromChildren.ts — read <Select.Option> children into SelectOption[]; findOption()
  areOptionChildrenEqual.ts — structural compare of <Select.Option> children (memo guard)
  helpers.ts — cx(), toArray(), defaultFilter(), DEFAULT_LIST_HEIGHT, DEFAULT_LIST_ITEM_HEIGHT, OVERSCAN_COUNT, MAX_MEASURED_ROWS
 __specs__/
  Select.spec.tsx — Vitest + React Testing Library tests
```

> No `style/` dir and no `antd` peerDep — the component is styled purely with styled-components. The
> old antd-era LESS (`select.mixin.less`, `.ant-select-*` overrides) was relocated to `ds-table`
> (`table/src/style/`), the only consumer that still renders antd selects.

## Public exports

```ts
export { default } from './Select';                 // compound: Select + .Option
export { Option, type OptionProps } from './Option';
export type {
  Props, SelectProps, SelectValue, SelectOption, SelectMode,
  SelectHandler, RawValueType, FilterOptionFn,
} from './Select.types';
export * as SelectStyles from './Select.styles';
export { getOptionsFromChildren, findOption } from './utils/getOptionsFromChildren';
```

### `Select` (default)

`forwardRef<HTMLDivElement, SelectProps>`, augmented into a compound component with a single
sub-component: **`Select.Option`** (the DS `Option` marker). `Select.OptGroup` is intentionally
**not** reimplemented (zero real usage).

`SelectValue = string | number | (string | number)[] | undefined` — antd-free (no `LabeledValue`).

#### DS-specific props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` / `description` / `tooltip` / `tooltipConfig` | `ReactNode` / `TooltipProps` | `undefined` | `FormField` chrome (from `FormFieldCommonProps`). |
| `errorText` | `ReactNode` | `undefined` | Error message below the field; also activates the error visual state. |
| `error` | `boolean` | `undefined` | Error visual state without a message. |
| `clearTooltip` | `string` | `undefined` | Tooltip on hover of the clear (×) control. |
| `prefixel` / `suffixel` | `ReactNode` | `undefined` | Addon nodes attached left/right of the selector (shared border). |
| `grey` | `boolean` | `undefined` | `grey-050` selector background when not in error state. |
| `asFormElement` | `boolean` | `undefined` | Forces a 16 px bottom margin even without `errorText`/`description`. |
| `raw` | `boolean` | `undefined` | Skips the `FormField` wrapper — renders only the selector; `ref` attaches to `SelectWrapper`. |
| `readOnly` | `boolean` | `undefined` | Non-interactive with readable styling (white bg, `default` cursor, `grey-600` text). |
| `disabled` | `boolean` | `undefined` | Standard disabled state; ORed with `readOnly` to block interaction. |
| `selectorStyle` | `CSSObject` | `undefined` | Inline style object applied to the `Selector` box. |
| `listHeight` | `number \| string` | `256` | Max dropdown list height (px); also the windowed viewport height. |
| `listItemHeight` | `number` | `32` | Height per option row the window is sized from; taller rows are measured. |
| `style` | `CSSProperties` | `undefined` | Applied to `SelectWrapper` (the flex row: selector + addons). |
| `className` | `string` | `undefined` | Added to the outer `SelectContainer`. |
| `getPopupContainer` | `(node) => HTMLElement \| ParentNode \| null` | `defaultGetPopupContainer` (`@synerise/ds-utils`) | Container the dropdown mounts into. |
| `size` | `'default' \| 'middle' \| 'large'` | `'default'` | Selector height (`middle` maps to `default`). |

Native `data-*` / `aria-*` attributes are forwarded onto the select root (`.ds-select-wrapper`).

#### antd-parity props (additive back-compat)

Kept so antd-era consumers need no change: `searchValue`, `onClear`, `onClick`, `onInputKeyDown`,
`onKeyDown`, `suffixIcon`, `clearIcon`, `maxLength`, `maxTagCount`, `maxTagTextLength`,
`maxTagPlaceholder`, `onPopupScroll`, `popupClassName` (alias of `dropdownClassName`),
`dropdownMatchSelectWidth` (`boolean | number`), `dropdownRender`, `showArrow`,
`autoFocus`, `tabIndex`, `rowKey`, plus the standard
`mode`/`options`/`showSearch`/`filterOption`/`allowClear`/`open`/`onChange`/`onSearch`/… surface.
`SelectHandler` type and the `SelectStyles.Selector` styled export are re-exported for parity.

`maxTagCount` (`number | 'responsive'` — collapse extra chips into a `+N` overflow chip, or fit them
to the selector width on one line), `maxTagTextLength`, `onPopupScroll` and `listItemHeight` (the row
height the windowed list is sized from) are fully implemented. `dropdownAlign` and
`defaultActiveFirstOption` are accepted for compatibility but have **no runtime effect**.

## Usage patterns

```tsx
import Select from '@synerise/ds-select';

const { Option } = Select;

// Options as data (preferred)
<Select label="Platform" options={[{ value: 'insta', label: 'Instagram' }]} defaultValue="insta" />

// Declarative children (read only when `options` is absent)
<Select label="Platform"><Option value="insta">Instagram</Option></Select>

// Multiple (removable chips) / tags (free-text) / search
<Select mode="multiple" placeholder="Select tags" allowClear options={opts} />
<Select mode="tags" tokenSeparators={[',']} />
<Select showSearch filterOption optionFilterProp="label" options={opts} />

// Remote search: filter server-side, feed options from onSearch
<Select showSearch filterOption={false} onSearch={fetchOptions} options={opts} />

// readOnly / raw / prefix-suffix
<Select readOnly value="locked" />
<Select raw ref={myRef} placeholder="Compact" />
<Select prefixel={<span>$</span>} suffixel={<span>USD</span>} />
```

## Styling

**styled-components (`Select.styles.ts`) is the source of truth.** Key styled parts:
- `SelectContainer` — column flex; adds a 16 px bottom margin when `hasBottomMargin`.
- `SelectWrapper` (`.ds-select-wrapper`) — the flex row (selector + addons); carries the root
  `onFocus`/`onBlur`/`onClick` and `data-*`/`aria-*` passthrough.
- `Selector` (`.ds-select`) — the trigger box; `large` height, `withPrefixel`/`withSuffixel`
  border-radius removal, open/focus ring (`blue-600`/`blue-050`), error (`red-600`/`red-050`),
  `readOnly` vs `disabled` differentiation, and the `selectorStyle` interpolation.
- `PrefixWrapper` / `SuffixWrapper` — `grey-050` addons with flush border join.
- Dropdown / options: `DropdownWrapper`, `ScrollList`, `Inner` (`role="listbox"`), `OptionItem`
  (styled `ds-list-item`), `NotFound`, `Loading`. Selector content: `SelectionItem`, `Placeholder`,
  `MultiValueArea`, `Chip`/`ChipLabel`/`ChipRemove`, `Arrow`, `ClearWrapper`, `SearchInputEl`.

Class hooks are `ds-select-*` (`.ds-select`, `.ds-select-selection-item`, `.ds-select-dropdown`,
`.ds-select-arrow`, `.ds-select-clear`, `.ds-select-search`, …).

## Key dependencies

- `@synerise/ds-dropdown` — floating-ui popover positioning + overlay (the `Selector` is the `asChild` trigger).
- `@synerise/ds-list-item` — the option row (`OptionItem`) and list wrapper (`ScrollList`).
- `@synerise/ds-scrollbar` / `@synerise/ds-loader` — dropdown scroll container / loading spinner.
- `@synerise/ds-form-field` — label / description / error layout (skipped when `raw`).
- `@synerise/ds-icon` — `AngleDownS` (arrow), `Close3M` (clear), `CloseS` (chip remove).
- `@synerise/ds-tooltip` — wraps the clear control for `clearTooltip`.
- `@synerise/ds-utils` — default `getPopupContainer`.
- `react-window` — `VariableSizeList`, the windowing engine behind `OptionList` (already a DS-wide
  dependency: `dropdown`, `context-selector`, `item-picker`, `table`, …).
- `@synerise/ds-core` — theme tokens (peerDep). **No `antd` peerDep** — the component imports zero
  antd; the LESS that pulled `~antd/lib/select/style` was relocated to `ds-table` (see below).

## Implementation notes

- **Option resolution** — `useSelectOptions` returns `resolvedOptions` (from `options` prop, else
  `getOptionsFromChildren(children)`) and `displayedOptions` (after client filtering and, in `tags`
  mode, a create-row prepended for the typed text). `filterOption={false}` disables local filtering.
  The children path is cached against `areOptionChildrenEqual` rather than `useMemo([children])`:
  JSX hands over a fresh array of fresh elements on every parent render, so a reference-keyed memo
  would rebuild the options — and invalidate every memo below them — on renders that changed nothing.
- **Windowed option list** — `OptionList` renders `displayedOptions` through react-window's
  `VariableSizeList`, so only the visible rows plus `OVERSCAN_COUNT` are in the DOM. Following the
  DS idiom (`item-picker`, `context-selector`): the surrounding `Scrollbar` owns the scrolling
  (`overflow: unset` on the list, `onScroll` → `list.scrollTo`), which keeps `onPopupScroll` firing
  from the same element as before. `listItemHeight` (default 32) is the size estimate; each mounted
  row reports its real `offsetHeight` so rows with taller JSX (a flag + a wrapping label) lay out
  correctly. Keyboard navigation can target a row that is not mounted, so `OptionList` scrolls by
  computed offset instead of `scrollIntoView`, and a changed query resets the window to the top.
  Because only a slice of the options is ever in the DOM, each row states `aria-setsize` /
  `aria-posinset` — AT can no longer count the set for itself.
- **Row measurement invalidates through `resetAfterIndex`** — react-window memoises row offsets, so a
  measured height only takes effect once the list is told to drop that memo. Two consequences worth
  keeping in mind when touching `OptionList`: a row's own layout effect cannot reach `listRef` on the
  mount commit (rows are descendants of the list, so their effects run first), and a change to
  `listItemHeight` must invalidate *and* force a render — a passive `resetAfterIndex(index, false)`
  leaves the stale layout on screen until something else happens to re-render the list.
- **Row vs selector display (antd parity)** — the dropdown row renders `option.children ?? label ??
  value`, the selector renders the field named by `optionLabelProp` (`label`, `children`, `value`,
  `title`, …) and falls back to `label`. So `<Option label={compact}>{rich}</Option>` shows `rich` in
  the list and `compact` in the selector, while options-as-data (no children) uses `label` for both.
- **Filtering** — `defaultFilter` matches the field named by `optionFilterProp` (`title`, `children`,
  `value`, …), else `label` then `children`; non-string fields (JSX nodes) fall back to the value.
- **`Option.value` is optional** — falls back to the element's React `key` (antd parity); callbacks
  expose `option.key`.
- **Keyboard nav is hand-rolled (not ds-dropdown's)** — Select is a *combobox*: focus stays on the
  input/selector via `aria-activedescendant`, whereas ds-dropdown uses roving DOM focus. `activeIndex`
  + `moveActive` + three effects drive highlight; `handleKeyDown` handles Arrow/Home/End/Enter/Escape/
  Space and Backspace (drop last chip).
- **Focus / blur** — `onFocus`/`onBlur` fire on the root only when focus truly enters/leaves the
  select (relatedTarget guard ignores selector↔input moves). `autoFocus` focuses the `Selector` in
  select-only mode (no search input to receive it). The dropdown `onMouseDown` prevents focus loss so
  selecting an option / scrolling isn't treated as a blur (needed by `subtle-form`'s revert-on-blur).
- **`readOnly` is implemented via `disabled`** — both flags are ORed into `isDisabled`; the visual
  distinction comes from the `$readOnly` transient prop on `Selector`.
- **`maxTagCount="responsive"`** — `useResponsiveTagCount` measures an off-flow ghost row
  (`TagMeasureRow`, one hidden chip per value + a worst-case `+N` chip) rather than the visible
  chips: a hidden chip would measure 0, and the ghost's width never depends on the count derived
  from it, so the `ResizeObserver` (on the chip row *and* the ghosts, for font/label changes) can't
  feed itself. The row switches to `nowrap` and reserves 30 px of caret room unless disabled/readOnly.
  Unmeasurable layout (SSR, `display: none`, no `ResizeObserver` → `window.resize` fallback) degrades
  to showing every chip; a lone oversized chip ellipsis-clips instead of collapsing into `+ 1`.
- **Controlled/uncontrolled** — `value`/`open`/`searchValue` are controlled when defined, else backed
  by internal state; `onSearch` still fires when `searchValue` is controlled.
- **antd-free; no LESS** — styling is entirely styled-components. The old antd-era LESS
  (`style/index.less` + `select.mixin.less`, `.ant-select-*` overrides for antd selects) was
  **relocated to `ds-table`** (`table/src/style/select.mixin.less` + a direct
  `@import '~antd/lib/select/style'`), since `ds-table` (out of scope, stays on antd) was the only
  remaining consumer. ds-select ships no `dist/style` and no longer declares an `antd` peerDep.
- **Tests** — Vitest + React Testing Library (`src/__specs__/Select.spec.tsx`): render/parity,
  keyboard + ARIA, and focus/blur (autofocus, onBlur on leave / not on internal move, onFocus).
```
