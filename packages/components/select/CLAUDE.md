# Select (`@synerise/ds-select`)

> A DS-styled select dropdown wrapping Ant Design's Select with FormField integration, prefix/suffix addon support, `readOnly` mode, and a `raw` render variant.

## Package structure

```
src/
  Select.tsx          — main component (forwardRef, compound with .Option and .OptGroup)
  Select.types.ts     — Props type (extends Antd SelectProps + FormFieldCommonProps)
  Select.styles.ts    — styled-components: SelectContainer, AntdSelect, SelectWrapper, PrefixWrapper, SuffixWrapper
  index.ts            — default export, SelectProps type, SelectStyles namespace
  modules.d.ts        — imports @testing-library/jest-dom
  style/
    index.less        — imports antd select LESS + ds-core variables + select.mixin.less
    select.mixin.less — DS overrides for all antd select class variants (dropdown, items, states)
  __specs__/
    Select.spec.tsx   — Jest + React Testing Library tests
```

## Public exports

```ts
export default SelectWithComponents; // compound: Select + .Option + .OptGroup
export type { Props as SelectProps } from './Select.types';
export * as SelectStyles from './Select.styles';
```

### `Select` (default)

The default export is a compound component. Sub-components come from Antd directly:
- `Select.Option` — `AntdSelect.Option`
- `Select.OptGroup` — `AntdSelect.OptGroup`

The component is wrapped in `forwardRef<HTMLDivElement, Props>`.

#### DS-specific props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | `undefined` | Label above the field (via `FormField`). |
| `tooltip` | `ReactNode` | `undefined` | Info tooltip next to the label (renders InfoFillS icon trigger). |
| `tooltipConfig` | `TooltipProps` | `undefined` | Extra config merged into the label Tooltip. |
| `description` | `ReactNode` | `undefined` | Helper text below the field. |
| `errorText` | `ReactNode` | `undefined` | Error message below the field; also activates error visual state. |
| `error` | `boolean` | `undefined` | Activates error visual state without showing a message. |
| `clearTooltip` | `string` | `undefined` | Tooltip text shown on hover of the clear (×) button. |
| `prefixel` | `ReactNode` | `undefined` | Addon element attached to the left of the selector (shares border). |
| `suffixel` | `ReactNode` | `undefined` | Addon element attached to the right of the selector (shares border). |
| `grey` | `boolean` | `undefined` | Gives the selector a `grey-050` background when not in error state. |
| `asFormElement` | `boolean` | `undefined` | Forces a 16 px bottom margin even when `errorText` and `description` are absent. |
| `raw` | `boolean` | `undefined` | Skips the `FormField` wrapper entirely — renders only the selector. `forwardedRef` attaches to `SelectWrapper` instead of `SelectContainer`. |
| `readOnly` | `boolean` | `undefined` | Disables the antd select while styling it as readable (white bg, `default` cursor, `grey-600` text) instead of the standard disabled look. |
| `disabled` | `boolean` | `undefined` | Standard disabled state; merged with `readOnly` — either flag disables the underlying Antd select. |
| `listHeight` | `ReactText` | `256` (Antd default) | Max height of the dropdown list in px. Type is widened to `ReactText` (string or number), overriding Antd's `number`-only constraint. |
| `selectorStyle` | `CSSObject` | `undefined` | Inline styled-components `css` applied to `.ant-select-selector`. Useful for custom widths or padding. |
| `style` | `React.CSSProperties` | `undefined` | Applied to `SelectWrapper` (the flex row containing selector + addons). |
| `className` | `string` | `undefined` | Added to `SelectWrapper`. |
| `getPopupContainer` | `(triggerNode) => HTMLElement` | `defaultGetPopupContainer` from `@synerise/ds-utils` | Where the dropdown is rendered. |

All Antd `SelectProps<T>` are also accepted and forwarded (mode, value, defaultValue, onChange, onSearch, filterOption, showSearch, allowClear, open, etc.).

## Usage patterns

```tsx
import Select from '@synerise/ds-select';

const { Option, OptGroup } = Select;

// Basic with FormField label / description
<Select label="Platform" description="Choose your platform" defaultValue="insta">
  <OptGroup label="Social">
    <Option value="insta">Instagram</Option>
    <Option value="fb">Facebook</Option>
  </OptGroup>
</Select>

// Multiple mode
<Select mode="multiple" placeholder="Select tags" allowClear>
  <Option value="a">Alpha</Option>
  <Option value="b">Beta</Option>
</Select>

// Error state with message
<Select errorText="This field is required" value={undefined} />

// Error state without message (e.g. inline in a form row)
<Select error />

// readOnly (looks like a regular input, not grayed out)
<Select readOnly value="locked-value" />

// Grey background variant
<Select grey placeholder="Search..." showSearch />

// Raw (no FormField wrapper, ref goes to SelectWrapper)
<Select raw ref={myRef} placeholder="Compact" />

// Prefix / suffix addons
<Select prefixel={<span>$</span>} suffixel={<span>USD</span>} />

// Clear button tooltip
<Select allowClear clearTooltip="Clear selection" />
```

## Styling

Two-layer styling approach:

1. **LESS** (`style/index.less` + `style/select.mixin.less`) — overrides all Antd `.ant-select-*` class rules: dropdown shadows, item hover colors, selected-item checkmark (base64 SVG), arrow icon (base64 SVG), tag/multiple chip styles, focus ring (`blue-600` inset shadow, `blue-050` bg), disabled state.

2. **styled-components** (`Select.styles.ts`) — handles DS-specific structural and state variants:
   - `SelectContainer` — `flex-direction: column`; adds `16px` bottom margin when `hasBottomMargin` is true.
   - `SelectWrapper` — `display: flex` row; applies `grey-050` background via `grey` prop (only when not in error state).
   - `AntdSelect` — extends Antd Select; handles `large` size height/line-height overrides, `withPrefixel`/`withSuffixel` border-radius removal, error border/shadow/background (`red-600`/`red-050`), and `readOnly` vs `disabled` visual differentiation.
   - `PrefixWrapper` / `SuffixWrapper` — `grey-050` background, `grey-300` inset box-shadow, rounded outer corners only; negative margin/padding creates flush border join with selector.

The dropdown offset is hard-coded to `[0, 8]` px via `dropdownAlign` (STOR-588).

The search icon in the selector is replaced with an inline SVG data-URL using the theme's `grey-400` color.

## Key dependencies

- `antd/lib/select` — base Select, Option, OptGroup
- `@synerise/ds-form-field` — wraps label / description / error layout (skipped when `raw` is true)
- `@synerise/ds-icon` — `Close3M` for clear button, `CloseS` for tag remove icon
- `@synerise/ds-tooltip` — wraps the clear button icon to show `clearTooltip`
- `@synerise/ds-utils` — `getPopupContainer` default (renders dropdown in nearest scroll parent)
- `@synerise/ds-core` — theme tokens used in styled-components; LESS variables imported in Less styles

## Implementation notes

- **`readOnly` is implemented via `disabled`** — both `readOnly` and `disabled` flags are ORed before passing to Antd's `disabled` prop. The visual distinction is achieved only through styled-components CSS on the `readOnly` transient prop.
- **`it.only` in tests** — the `'should be empty'` test case uses `it.only`, which means the other tests in the file are skipped when running in isolation. This is likely unintentional.
- **`listHeight` type widening** — Antd types `listHeight` as `number`, but DS overrides it to `ReactText` (`string | number`) to allow string values like `"auto"`.
- **`selectorStyle` is not in README** — the prop exists in `Select.types.ts` and is wired in `AntdSelect` styled component but is not documented in the README.
- **`clearIcon` is always overridden** — even if `clearIcon` is passed via `antdProps`, it is re-set internally. Any consumer-provided `clearIcon` will be ignored.
- **`removeIcon` is always overridden** — same as `clearIcon`; custom `removeIcon` from consumer props is ignored.
- **Compound component typing** — `SelectWithComponents` is typed as `SelectCompoundComponent = typeof Select & { Option, OptGroup }` using `Object.assign`, so `.Option` and `.OptGroup` are fully typed.
- **Uses Jest** (not Vitest) — `package.json` has `"test": "jest"`.
