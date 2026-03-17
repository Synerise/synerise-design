# Checkbox (`@synerise/ds-checkbox`)

> Ant Design Checkbox wrapper that adds DS-specific extras (description, error text, error styling, padding control) and a three-state mode (unchecked → checked → indeterminate → unchecked) via the `tristate` prop.

## Package structure

```
src/
  Checkbox.tsx              — router: delegates to CheckboxBase or CheckboxTristate
  Checkbox.types.ts         — CheckboxProps union, BaseCheckboxProps, CheckboxBaseProps, CheckboxTristateProps, event types
  Checkbox.styles.ts        — AntdCheckbox styled wrapper, CheckboxWrapper, AdditionalData
  index.ts                  — public exports
  components/
    CheckboxBase.tsx        — DS-extended Ant Design Checkbox
    CheckboxTristate.tsx    — three-state stateful layer on top of CheckboxBase
  utils/
    isTristateCheckbox.ts   — type guard: checks props.tristate === true
    nextCheckedValues.ts    — state machine: (checked, indeterminate) → [nextChecked, nextIndeterminate]
    checkedValue.ts         — maps (checked, indeterminate) → boolean | undefined for event payload
  style/
    index.less              — Ant Design checkbox LESS overrides
```

## Public exports

### `Checkbox` (default)

Smart router component. If `tristate={true}`, renders `CheckboxTristate`; otherwise renders `CheckboxBase`. Attaches `Checkbox.Group` as a static property.

#### DS-specific props (from `BaseCheckboxProps`)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `ReactNode` | `undefined` | Helper text rendered below the checkbox with `ds-typography` `Description`. Respects `disabled` state (greyed out). |
| `errorText` | `string` | `undefined` | Error message rendered below. Also triggers the error visual on the checkbox box. |
| `hasError` | `boolean` | `undefined` | Error visual (red border) without an error text message. |
| `withoutPadding` | `boolean` | `undefined` | Removes the default `4px 12px 8px 8px` padding from the wrapper div. |

#### Mode-selector prop

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tristate` | `true` | `undefined` | Switches to tristate mode. Changes the `onChange` event signature (see below). Cannot be `false` — omit the prop entirely for standard mode. |

All Ant Design `CheckboxProps` are forwarded (e.g. `checked`, `defaultChecked`, `disabled`, `indeterminate`, `autoFocus`, `onChange`, `children`, `value`, `name`).

#### `onChange` event in tristate mode

When `tristate={true}`, `onChange` receives a `CheckboxTristateChangeEvent` instead of the standard Ant Design `CheckboxChangeEvent`. The key difference: `event.target.checked` is `boolean | undefined` — `undefined` means the indeterminate state.

#### `Checkbox.Group`

Directly re-exports Ant Design's `Checkbox.Group` — no DS customisation. Props are standard Ant Design `CheckboxGroupProps`.

### Utility functions (exported)

| Export | Signature | Description |
|--------|-----------|-------------|
| `isTristateCheckbox` | `(props) => props is CheckboxTristateProps` | Type guard: returns `true` when `props.tristate === true`. |
| `nextCheckedValues` | `(checked, indeterminate) => [boolean, boolean]` | Computes the next `[checked, indeterminate]` state in the tristate cycle. |
| `checkedValue` | `(checked, indeterminate) => boolean \| undefined` | Converts internal state to the external checked value (`undefined` = indeterminate). |

### Types (exported)

| Export | Description |
|--------|-------------|
| `CheckboxProps` | `CheckboxBaseProps \| CheckboxTristateProps` — main union |
| `CheckboxBaseProps` | Ant `CheckboxProps` + `BaseCheckboxProps`, with standard `onChange` |
| `CheckboxTristateProps` | Ant `CheckboxProps` + `BaseCheckboxProps`, with `tristate: true` and tristate `onChange` |
| `BaseCheckboxProps` | DS-only additions: `description`, `errorText`, `hasError`, `withoutPadding` |
| `CheckboxTristateChangeEvent` | Tristate event type: `target.checked` is `boolean \| undefined` |
| `CheckboxTristateChangeEventTarget` | The `target` shape inside `CheckboxTristateChangeEvent` |

## Usage patterns

```tsx
import Checkbox from '@synerise/ds-checkbox';

// Standard checkbox
<Checkbox onChange={handleChange}>Label</Checkbox>

// With error and description
<Checkbox
  hasError
  errorText="This field is required"
  description="Choose at least one option"
>
  Accept terms
</Checkbox>

// Tristate (uncontrolled — cycles false → true → indeterminate)
<Checkbox
  tristate
  onChange={(e) => {
    // e.target.checked: true | false | undefined (undefined = indeterminate)
    console.log(e.target.checked);
  }}
>
  Select all
</Checkbox>

// Tristate (controlled)
<Checkbox
  tristate
  checked={someState} // boolean | undefined
  onChange={(e) => setSomeState(e.target.checked)}
>
  Select all
</Checkbox>

// Group (Ant Design pass-through)
<Checkbox.Group options={['A', 'B', 'C']} onChange={handleGroupChange} />
```

## Styling

`Checkbox.styles.ts` wraps Ant Design's `Checkbox` with styled-components using `@synerise/ds-core` theme tokens:
- `CheckboxWrapper` — flex column container; `withoutPadding` removes default spacing.
- `AntdCheckbox` — overrides Ant Design's check icon with an inline SVG data URL using the theme's `white` / `grey-400` palette colours. Error state is applied via an `.error` CSS class.
- `AdditionalData` — left-aligns `errorText` and `description` below the checkbox box (28px left indent to align with label text).
- Indeterminate visual: blue-600 background with a 2px white horizontal bar (overrides Ant Design default).
- Hover preview: shows a blue-600 check icon outline on unchecked boxes before the click is committed.

## Implementation notes

- **Tristate state machine** — the cycle is: `false` (unchecked) → `true` (checked) → `indeterminate` (represented as `undefined` to consumers) → `false`. Implemented in `nextCheckedValues`:
  - `checked=false` → `[true, false]`
  - `checked=true, !indeterminate` → `[true, true]`
  - anything else → `[false, false]`
- **`tristate` as discriminated union discriminant** — `tristate?: never | false | undefined` in `OnChangeBaseProps` vs `tristate: true` in `OnChangeTristateProps`. This means TypeScript narrows `onChange` type correctly, but `tristate={false}` is technically forbidden by the type (use omission instead).
- **Controlled tristate** — the `useEffect` in `CheckboxTristate` syncs external `checked` to internal state. If `checked === undefined` externally, sets `indeterminate=true` and internal `checked=false`. If `checked` is boolean, sets `indeterminate=false`.
- **`CheckboxBase` and `CheckboxTristate` are NOT re-exported** from the main `index.ts` — they are internal components. Import `Checkbox` and use the `tristate` prop instead.
- **`$solo` transient prop** — `AntdCheckbox` receives `$solo={!children && !errorText && !description}`. When true, adds `padding: 4px` to keep the bare checkbox box from being flush against its container.
- **`Checkbox.Group`** is Ant Design's `Group` re-exposed unchanged. There is no DS-customised group component.
