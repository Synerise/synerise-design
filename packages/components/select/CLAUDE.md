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
 components/
  OptionList.tsx — dropdown overlay: loading / empty / scrollable listbox of options
  SelectorContent.tsx — selector inner content: chips / selected label / placeholder + search input
 utils/
  getOptionsFromChildren.ts — read <Select.Option> children into SelectOption[]; findOption()
  helpers.ts — cx(), toArray(), defaultFilter(), DEFAULT_LIST_HEIGHT
 style/
  index.less, select.mixin.less — LEGACY antd-era LESS; NOT removable standalone (see Implementation notes)
 __specs__/
  Select.spec.tsx — Vitest + React Testing Library tests
```

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
| `listHeight` | `number \| string` | `256` | Max dropdown list height (px). |
| `style` | `CSSProperties` | `undefined` | Applied to `SelectWrapper` (the flex row: selector + addons). |
| `className` | `string` | `undefined` | Added to the outer `SelectContainer`. |
| `getPopupContainer` | `(node) => HTMLElement \| ParentNode \| null` | `defaultGetPopupContainer` (`@synerise/ds-utils`) | Container the dropdown mounts into. |
| `size` | `'default' \| 'middle' \| 'large'` | `'default'` | Selector height (`middle` maps to `default`). |

Native `data-*` / `aria-*` attributes are forwarded onto the select root (`.ds-select-wrapper`).

#### antd-parity props (additive back-compat)

Kept so antd-era consumers need no change: `searchValue`, `onClear`, `onClick`, `onInputKeyDown`,
`onKeyDown`, `suffixIcon`, `clearIcon`, `maxLength`, `maxTagCount`, `maxTagTextLength`,
`maxTagPlaceholder`, `listItemHeight`, `popupClassName` (alias of `dropdownClassName`),
`dropdownAlign`, `dropdownMatchSelectWidth` (`boolean | number`), `dropdownRender`, `showArrow`,
`defaultActiveFirstOption`, `autoFocus`, `tabIndex`, `rowKey`, plus the standard
`mode`/`options`/`showSearch`/`filterOption`/`allowClear`/`open`/`onChange`/`onSearch`/… surface.
`SelectHandler` type and the `SelectStyles.Selector` styled export are re-exported for parity.

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
- `@synerise/ds-core` — theme tokens (peerDep). **`antd` (peerDep) is not imported by the component
  JS, but backs the LESS layer (`~antd/lib/select/style`) which `ds-table` still consumes — so it
  must stay until that LESS is removed (see below).**

## Implementation notes

- **Option resolution** — `useSelectOptions` returns `resolvedOptions` (from `options` prop, else
  `getOptionsFromChildren(children)`) and `displayedOptions` (after client filtering and, in `tags`
  mode, a create-row prepended for the typed text). `filterOption={false}` disables local filtering.
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
- **Controlled/uncontrolled** — `value`/`open`/`searchValue` are controlled when defined, else backed
  by internal state; `onSearch` still fires when `searchValue` is controlled.
- **Legacy LESS (NOT removable standalone)** — `style/index.less` (antd select LESS + ds-core vars +
  `select.mixin.less`, 307 lines of `.ant-select-*` overrides) is vestigial for *this* component (it
  renders `.ds-select-*` via styled-components), BUT is still `@import`ed by `ds-table`
  (`table/src/style/index.less` — out of scope, stays on antd). (`ds-autocomplete` imported it too
  until it was de-antd'd in Tier 2.5, merged — so `ds-table` is now the only consumer.) Deleting it
  breaks ds-table's LESS compile (only the full 118-project `build_packages` catches it). Removal is a
  cross-package effort — delete + drop ds-table's `@import` + retarget its `.ant-select-*` rules —
  blocked by `ds-table`; leave in place for now.
- **Tests** — Vitest + React Testing Library (`src/__specs__/Select.spec.tsx`): render/parity,
  keyboard + ARIA, and focus/blur (autofocus, onBlur on leave / not on internal move, onFocus).
```
