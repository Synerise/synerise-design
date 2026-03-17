# SubtleForm (`@synerise/ds-subtle-form`)

> A compound form component providing 5 inline-edit sub-components (TextArea, Input, Select, DatePicker, Field) that toggle between a static display state and an active edit state on click/hover.

## Package structure

```
src/
  SubtleForm.tsx                          — namespace component (returns null); attaches sub-components as static properties
  SubtleForm.types.ts                     — SubtleFieldProps (shared base type)
  SubtleForm.styles.ts                    — shared styled components: Inactive, MainContent, Suffix, Container, Subtle, SubtleFormField, ValueArea; animation keyframes
  index.ts                                — default export only (no type re-exports)
  Elements/
    TextArea/TextArea.tsx                 — textarea with dynamic row height calculation
    TextArea/TextArea.types.ts            — SubtleTextAreaProps, TextareaAutosize
    Input/Input.tsx                       — single-line text input
    Input/Input.types.ts                  — SubtleInputProps
    Select/Select.tsx                     — Ant Design select dropdown
    Select/Select.types.ts                — SubtleSelectProps
    Select/Select.styles.ts               — SelectContainer (handles active margin offset)
    DatePicker/DatePicker.tsx             — date picker with formatted value display and mask placeholder
    DatePicker/DatePicker.types.ts        — SubtleDatePickerProps
    DatePicker/DatePicker.styles.ts       — SelectContainer, MaskedDatePlaceholder
    DatePicker/utils.ts                   — getFormattingString, replaceLettersWithUnderscore
    Field/Field.tsx                       — generic field: renders activeElement() / inactiveElement(); uses useOnClickOutside
  __specs__/
    TextArea.spec.tsx                     — Jest tests (TextArea only)
```

## Public exports

### `SubtleForm` (default export)

The component itself returns `null`. It is used only as a namespace:

- `SubtleForm.TextArea`
- `SubtleForm.Input`
- `SubtleForm.Select`
- `SubtleForm.DatePicker`
- `SubtleForm.Field`

No type exports from `index.ts`.

---

### Shared `SubtleFieldProps` (base for all sub-components)

| Prop | Type | Description |
|------|------|-------------|
| `label` | `FormFieldCommonProps['label']` | Label above the field |
| `labelTooltip` | `FormFieldCommonProps['tooltip']` | Tooltip on the label |
| `errorText` | `FormFieldCommonProps['errorText']` | Error message; forces active/edit state |
| `disabled` | `boolean` | Disables interactions, 0.5 opacity |
| `suffix` | `ReactNode` | Custom suffix icon in inactive state (replaces default edit icon) |
| `suffixTooltip` | `ReactNode` | Tooltip on the suffix icon |
| `active` | `boolean` | Controlled active state (`Field` only) |
| `activeElement` | `() => ReactElement` | Render function for edit state (`Field` only) |
| `inactiveElement` | `() => ReactElement` | Render function for display state (`Field` only) |
| `mask` | `string` | Mask string shown below inactive content (`Field` only) |
| `maskVisible` | `boolean` | Whether to show the mask (`Field` only) |

---

### `SubtleForm.TextArea`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Current value |
| `onChange` | `(value: string) => void` | — | Called on input change |
| `placeholder` | `string` | — | Shown when no value |
| `minRows` | `number` | `1` | Minimum textarea rows |
| `maxRows` | `number` | — | Maximum textarea rows (clamps auto-height) |
| `error` | `boolean` | — | Error state; forces edit mode |
| `textAreaProps` | `TextAreaProps` | — | Props forwarded to `@synerise/ds-input` TextArea |
| + all `SubtleFieldProps` | | | |

### `SubtleForm.Input`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Current value |
| `onChange` | `(value: string) => void` | — | Called on input change |
| `placeholder` | `string` | — | Shown when no value |
| `error` | `boolean` | — | Error state; forces edit mode |
| `inputProps` | `InputProps` | — (**required**) | Props forwarded to Ant Design `Input` |
| + all `SubtleFieldProps` | | | |

### `SubtleForm.Select`

Extends `SubtleFieldProps` + `@synerise/ds-select` props. Additional:

| Prop | Type | Description |
|------|------|-------------|
| `placeholder` | `string` | Shown when no value |
| `dropdownAlign` | `object` | Ant Design `dropdownAlign`; defaults to `{}` (offset `[0, 8]` applied) |
| `children` | `ReactNode` | `Select.Option` children |

### `SubtleForm.DatePicker`

Extends `SubtleFieldProps` + `@synerise/ds-date-picker` props. Additional:

| Prop | Type | Description |
|------|------|-------------|
| `value` | `Date` | Selected date |
| `onApply` | `(date: Date) => void` | Called when date is confirmed; also deactivates the field |
| `onClear` | `() => void` | Called on clear; also deactivates |
| `format` | `string` | Date format string (default: `'dd-MM-yyyy'`, or `'dd-MM-yyyy, HH:mm'` when `showTime`) |
| `placeholder` | `string` | Shown when no value |
| `activeProp` | `boolean` | External control of active state |

### `SubtleForm.Field`

Generic field using `SubtleFieldProps` props only (no additional props). Uses `activeElement()` and `inactiveElement()` callbacks to render edit/display states.

## Usage patterns

```tsx
import SubtleForm from '@synerise/ds-subtle-form';

// TextArea
const [value, setValue] = React.useState('');
<SubtleForm.TextArea
  value={value}
  onChange={setValue}
  placeholder="Description"
  label="Label"
  labelTooltip="Tooltip"
  suffixTooltip="Edit"
  minRows={3}
/>

// Input
<SubtleForm.Input
  value={name}
  onChange={setName}
  placeholder="Name"
  label="Name"
  inputProps={{}}
/>

// Custom Field
<SubtleForm.Field
  active={active}
  activeElement={() => <InputNumber value={val} onBlur={() => setActive(false)} />}
  inactiveElement={() => <>{val ?? 'placeholder'}</>}
  label="Number"
/>
```

## Styling

`SubtleForm.styles.ts`. Key pattern: `Inactive` div has `padding: 7px 40px 7px 0` at rest, animates to `padding: 7px 28px 7px 12px` on hover. The `Suffix` icon uses `opacity: 0` → `1` transition on hover. A `blurAnimation` keyframe plays once after blur to reverse the padding. `SubtleFormField` (extends `FormField`) uses `gap: 10px` when active, `8px` at rest.

## Key dependencies

- `@synerise/ds-input` — `Input` and `TextArea` for edit state
- `@synerise/ds-select` — `Select` for edit state
- `@synerise/ds-date-picker` — `DatePicker` for edit state
- `@synerise/ds-form-field` — `FormField` wrapper for label + error
- `@synerise/ds-utils` — `useOnClickOutside` (Field only)
- `calculate-size` — measures text pixel width to compute visible rows in TextArea
- `@synerise/ds-tooltip` — suffix tooltip in inactive state

## Implementation notes

- **Active/inactive toggle** — all sub-components maintain local `active` and `blurred` state. `errorText || error` forces the active/edit view.
- **`SubtleForm()` returns `null`** — the main component is a namespace-only wrapper; calling it renders nothing.
- **`inputProps` is required on `SubtleForm.Input`** — not optional in `SubtleInputProps`; pass `inputProps={{}}` if you have no extra props.
- **`activeProp` on DatePicker is unused in logic** — the prop is declared but not wired into the state machine (only `error` triggers the forced active path).
- **Deep import in Storybook** — stories import `@synerise/ds-subtle-form/dist/Elements/DatePicker/utils` directly. This is a fragile deep path not covered by public exports.
- **Only TextArea has tests** — Input, Select, DatePicker, and Field have no spec files.
- **Test runner is Jest** (not Vitest).
