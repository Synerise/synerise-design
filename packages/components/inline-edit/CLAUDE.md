# InlineEdit (`@synerise/ds-inline-edit`)

> Two related components: `InlineEdit` — an autosizing text input that looks like plain text with a dashed underline on hover/focus, and an edit icon; `InlineSelect` — a read-only autosized trigger that opens a dropdown list for selection.

## Package structure

```
src/
  InlineEdit.tsx                     — main text-input component
  InlineEdit.types.ts                — InlineEditProps, InputProps
  InlineEdit.styles.ts               — styled-components for InlineEdit
  index.ts                           — public exports
  InlineSelect/
    InlineSelect.tsx                 — select-trigger component
    InlineSelect.types.ts            — InlineSelectProps
    InlineSelect.style.ts            — styled-components for InlineSelect
    SelectDropdown/
      SelectDropdown.tsx             — virtualised dropdown menu (internal)
      SelectDropdown.types.ts        — SelectDropdownProps
      SelectDropdown.style.ts        — dropdown styled-components
  __specs__/
    InlineEdit.spec.tsx              — Jest tests
```

## Public exports

### `InlineEdit` (default export)

Functional component. Not forwardRef.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `input` | `InputProps` | — | **Required.** Value, event handlers, and native input attributes |
| `size` | `'large' \| 'normal' \| 'small'` | `'normal'` | Controls font size via `@synerise/ds-typography` macros |
| `disabled` | `boolean` | `undefined` | Disables input and hides the icon via `pointer-events: none` |
| `error` | `boolean` | `undefined` | Switches underline/text colour to `red-600` |
| `hideIcon` | `boolean` | `undefined` | Hides the edit icon entirely |
| `customIcon` | `ReactNode` | `undefined` | Replaces the default `EditS` icon |
| `tooltipTitle` | `string` | `undefined` | Tooltip shown on hover over the icon |
| `autoFocus` | `boolean` | `undefined` | Focuses the input after mount via `useEffect` |
| `className` | `string` | `undefined` | Appended to `.ds-inline-edit` |
| `style` | `CSSProperties` | `undefined` | Applied to the root container |

### `InputProps`

Passed as the `input` prop to both `InlineEdit` and `InlineSelect`.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string \| number` | yes | Controlled value |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | yes | Change handler (not called in `InlineSelect` — use `onValueChange`) |
| `name` | `string` | no | Used to derive the input `id` via `toCamelCase(name)` |
| `disabled` | `boolean` | no | Native input disabled |
| `onBlur` | `FocusEventHandler<HTMLInputElement>` | no | Called on blur |
| `onEnterPress` | `KeyboardEventHandler<HTMLInputElement>` | no | Called on Enter key; also triggers `blur()` |
| `placeholder` | `string` | no | Placeholder text |
| `maxLength` | `number` | no | Maximum character count |
| `readOnly` | `boolean` | no | Native input readOnly |
| `autoComplete` | `InputHTMLAttributes<HTMLInputElement>['autoComplete']` | no | Native autocomplete attribute |

### `InlineSelect`

Generic component: `InlineSelect<ItemType extends ListItemProps>`. Functional, not forwardRef.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `ItemType[]` | — | **Required.** Array of `ListItemProps` items to show in dropdown |
| `input` | `Partial<Omit<InputProps, 'placeholder'>>` | — | **Required.** `value` syncs the displayed text; `onChange` is replaced with `NOOP` — use `onValueChange` instead |
| `onValueChange` | `(item: ItemType) => void` | `undefined` | Called when a dropdown item is selected |
| `initialValue` | `string` | `undefined` | Initial displayed text (overrides `placeholder`) |
| `placeholder` | `string` | `undefined` | Text shown when no value is selected |
| `size` | `'normal' \| 'small'` | `'normal'` | Font size via typography macros (no `'large'` unlike `InlineEdit`) |
| `expanded` | `boolean` | `undefined` | Sets initial open state of the dropdown |
| `disabled` | `boolean` | `undefined` | Disables interaction; adds 0.4 opacity |
| `error` | `boolean` | `undefined` | Switches underline/text colour to `red-600` |
| `hideIcon` | `boolean` | `undefined` | Hides the `AngleDownS` chevron icon |
| `dropdownProps` | `Partial<Omit<DropdownSharedProps, 'open' \| 'onOpenChange' \| 'children' \| 'overlay' \| 'disabled'>>` | `{}` | Extra props forwarded to `@synerise/ds-dropdown` |
| `dropdownOverlayStyle` | `CSSProperties` | `{}` | Style applied to the dropdown overlay wrapper |
| `inputStyle` | `CSSProperties` | `undefined` | Style applied to the inner `<input>` element |
| `autoFocus` | `boolean` | `undefined` | Focuses the input after mount |
| `className` | `string` | `undefined` | Appended to `.ds-inline-edit` |
| `style` | `CSSProperties` | `undefined` | Applied to root container |

> **`tooltipTitle`** is declared in `InlineSelectProps` but is **not used** in `InlineSelect.tsx`.

### Types exported

| Type | Description |
|------|-------------|
| `InlineEditProps` | Props for `InlineEdit` |
| `InputProps` | Props for the `input` object passed to both components |
| `InlineSelectProps<ItemType>` | Props for `InlineSelect` |

## Usage patterns

```tsx
import InlineEdit, { InlineSelect } from '@synerise/ds-inline-edit';

// InlineEdit
<InlineEdit
  input={{
    name: 'title',
    value: title,
    placeholder: 'Enter title',
    onChange: (e) => setTitle(e.target.value),
    onEnterPress: () => handleSave(),
  }}
  size="normal"
  tooltipTitle="Edit"
/>

// InlineSelect
<InlineSelect
  dataSource={[
    { text: 'Option A' },
    { text: 'Option B' },
  ]}
  input={{ value: selectedText }}
  onValueChange={(item) => setSelected(item.text as string)}
  placeholder="Select..."
/>
```

## Styling

**`InlineEdit`** styles in `InlineEdit.styles.ts`:
- No visible border; uses a CSS dashed `background-image` gradient as an underline
- On hover/focus: `grey-400` dots underline (or `red-600` if `error`)
- On focus: `blue-600` dots underline (or `red-600` if `error`)
- Font size driven by `size` prop: `large` → `macro.h600`, `normal` → `macro.h400`, `small` → `macro.small`
- Disabled: `pointer-events: none` + icon hidden via `display: none`

**`InlineSelect`** styles in `InlineSelect.style.ts`:
- Text colour rendered via CSS `text-shadow` trick: input `color: transparent`, shadow is `blue-600`/`red-600`
- Icon animates 180° rotation when dropdown is open
- Disabled: 0.4 opacity + `pointer-events: none`
- Has a `// todo: set type` comment next to font size for `normal`/`small` sizes

## Key dependencies

- `@synerise/ds-input` — `AutosizeInput` wrapper that grows the input with content
- `@synerise/ds-icon` — `EditS` (InlineEdit) and `AngleDownS` (InlineSelect) icons
- `@synerise/ds-dropdown` — dropdown trigger wrapper for `InlineSelect`
- `@synerise/ds-search` — `SearchItems` for virtualised list rendering in `SelectDropdown`
- `@synerise/ds-list-item` — `ListItemProps` item type constraint
- `@synerise/ds-tooltip` — wraps the edit icon in `InlineEdit`
- `@synerise/ds-typography` — `macro` font-size helpers
- `@synerise/ds-utils` — `toCamelCase` (for input `id`), `NOOP`

## Implementation notes

- **`input.onChange` is NOOP in `InlineSelect`**: The inner `<input>` gets `onChange={NOOP}`. Consumer `onChange` from `input` is destructured but discarded. Only `onValueChange` is called on item selection.
- **Input `id` fallback**: When `input.name` is not provided, both components use the literal string `'id'` as the input element's `id`. Multiple instances without `name` will all have `id="id"` — potential accessibility/form collision.
- **`customIcon` uses deprecated `component` prop**: `InlineEdit` passes `customIcon` to `<Icon component={customIcon || <EditS />} />` — the deprecated `component` prop pattern.
- **`scrolled` state**: `focused` state in `InlineEdit` is named misleadingly. It is set to `false` on focus (to enable `text-overflow: ellipsis`) and `true` on blur (switching to `text-overflow: initial` so text isn't clipped when scrolled). On blur, `inputRef.current.scrollTo({ left: 0 })` resets scroll.
- **`InlineSelect` `size` is narrower**: Only `'normal' | 'small'` — no `'large'` (unlike `InlineEdit` which supports `'large'`).
- **`tooltipTitle` in `InlineSelect`**: Declared in `InlineSelectProps` but never rendered — passing it has no effect.
- **`SelectDropdown`** is internal (not exported). Its `Props` alias is marked `@deprecated` in `SelectDropdown.types.ts` but the file is not in the public exports.
- **Tests use Jest** (`jest.config.js`) — not yet migrated to Vitest.
