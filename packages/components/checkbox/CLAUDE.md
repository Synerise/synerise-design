# Checkbox (`@synerise/ds-checkbox`)

> DS-native, antd-free checkbox with DS-specific extras (description, error text, error styling, padding control), a `Checkbox.Group`, and a three-state mode (unchecked → checked → indeterminate → unchecked) via the `tristate` prop.

## Package structure

```
src/
  Checkbox.tsx              — router: delegates to CheckboxBase or CheckboxTristate; attaches .Group
  Checkbox.types.ts         — CheckboxProps union, CheckboxGroupProps, event types, CheckboxValueType
  Checkbox.styles.ts        — CheckboxLabel (full visual), CheckboxWrapper, AdditionalData
  CheckboxGroup.tsx         — DS-native Checkbox.Group (context provider)
  CheckboxContext.ts        — group context (value + toggle + register)
  index.ts                  — public exports
  components/
    CheckboxBase.tsx        — DS-native checkbox input (DOM + group consumption + event synthesis)
    CheckboxTristate.tsx    — three-state stateful layer on top of CheckboxBase
  utils/
    isTristateCheckbox.ts   — type guard: checks props.tristate === true
    nextCheckedValues.ts    — state machine: (checked, indeterminate) → [nextChecked, nextIndeterminate]
    checkedValue.ts         — maps (checked, indeterminate) → boolean | undefined for event payload
```

No LESS, no antd — the antd base + `checkbox.mixin.less` + styled overrides were inlined into `Checkbox.styles.ts`.

## Public exports

### `Checkbox` (default)

Smart router component. If `tristate={true}`, renders `CheckboxTristate`; otherwise renders `CheckboxBase`. Attaches `Checkbox.Group` as a static property.

#### DS-specific props (from `BaseCheckboxProps`)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `ReactNode` | `undefined` | Helper text rendered below the checkbox with `ds-typography` `Description`. Respects `disabled` state (greyed out). |
| `errorText` | `ReactNode` | `undefined` | Error message rendered below. Also triggers the error visual on the checkbox box. |
| `hasError` | `boolean` | `undefined` | Error visual (red border) without an error text message. |
| `withoutPadding` | `boolean` | `undefined` | Removes the default `4px 12px 8px 8px` padding from the wrapper div. |

#### Mode-selector prop

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tristate` | `true` | `undefined` | Switches to tristate mode. Changes the `onChange` event signature (see below). Cannot be `false` — omit the prop entirely for standard mode. |

Standard checkbox props are supported: `checked`, `defaultChecked`, `disabled`, `indeterminate`, `autoFocus`, `onChange`, `children`, `value`, `name`, `id`, `tabIndex`. (DS-native types — no antd inheritance.)

#### `onChange` event in tristate mode

When `tristate={true}`, `onChange` receives a `CheckboxTristateChangeEvent` instead of the standard Ant Design `CheckboxChangeEvent`. The key difference: `event.target.checked` is `boolean | undefined` — `undefined` means the indeterminate state.

#### `Checkbox.Group`

DS-native group (`CheckboxGroup`) — a context provider that child `Checkbox`es read for their checked state and toggle through. Supports `value`/`defaultValue` (controlled/uncontrolled), `onChange(checkedValues)` (ordered by child mount order, or `options` order), `options`, `disabled`, `name`. Replaces the former antd `Checkbox.Group` re-export.

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

`Checkbox.styles.ts` is pure styled-components (the shared `--ds-form-control-*` checkbox/radio tokens plus `--ds-form-label-text-color` / `--ds-form-description-text-color` / `--ds-form-error-text-color`). **Each element is its own styled-component and owns its styles** — the `.ant-checkbox-*` / `ds-checkbox-*` class names are kept on the elements purely as hooks (ui-tests / interim external CSS), never used as styling selectors. State is passed in as transient `$`-props by `CheckboxBase`:
- `CheckboxWrapper` — flex column container; `withoutPadding` removes default spacing.
- `CheckboxBox` — the `.ant-checkbox` span (positioning).
- `CheckboxInput` — the visually-hidden `<input>` overlaying the box.
- `CheckboxInner` — the visible box: `--ds-form-control-bg-default` fill and `--ds-form-control-border-default` border; when `$checked` it reveals the tick, an inline `<svg>` child (`CheckIcon`, rendered by `CheckboxBase`) coloured via `currentColor` from `--ds-form-control-icon-selected` on `--ds-form-control-bg-selected`; a 2px bar when `$indeterminate`, `--ds-form-control-border-error` border on `$error`. `$disabled` has no colours of its own: the box keeps its resting or selected look and fades to `--ds-opacity-disabled`.
- `CheckboxText` — the label text, `--ds-form-label-text-color` in every state (no hover or selected colour); `$disabled` fades it to `--ds-opacity-disabled`.
- `CheckboxLabel` — the `<label>`; layout + the **cross-element** rules (hover border, indeterminate hover, focus ring, disabled cursor) that reference the child styled-components (`&:hover ${CheckboxInner}`, `${CheckboxInput}:focus + ${CheckboxInner}`). Hovering an unchecked, enabled box only changes its border to `--ds-form-control-border-hover` — there is no tick preview; the rule is only emitted when `!$checked && !$indeterminate && !$disabled`. The focus ring is `--ds-form-control-border-focus`.
- `AdditionalData` — left-aligns `errorText` and `description` below the checkbox box (28px left indent to align with label text).
- `ErrorText` / `Description` — the typography elements recoloured onto `--ds-form-error-text-color` / `--ds-form-description-text-color`.

## Implementation notes

- **Tristate state machine** — the cycle is: `false` (unchecked) → `true` (checked) → `indeterminate` (represented as `undefined` to consumers) → `false`. Implemented in `nextCheckedValues`:
  - `checked=false` → `[true, false]`
  - `checked=true, !indeterminate` → `[true, true]`
  - anything else → `[false, false]`
- **`tristate` as discriminated union discriminant** — `tristate?: never | false | undefined` in `OnChangeBaseProps` vs `tristate: true` in `OnChangeTristateProps`. This means TypeScript narrows `onChange` type correctly, but `tristate={false}` is technically forbidden by the type (use omission instead).
- **Controlled tristate** — the `useEffect` in `CheckboxTristate` syncs external `checked` to internal state. If `checked === undefined` externally, sets `indeterminate=true` and internal `checked=false`. If `checked` is boolean, sets `indeterminate=false`.
- **`CheckboxBase` and `CheckboxTristate` are NOT re-exported** from the main `index.ts` — they are internal components. Import `Checkbox` and use the `tristate` prop instead.
- **`$solo` transient prop** — `CheckboxLabel` receives `$solo={!children && !errorText && !description}`. When true, adds `padding: 4px` to keep the bare checkbox box from being flush against its container.
- **`Checkbox.Group`** is a DS-native context provider (`CheckboxGroup`). Child `Checkbox`es read the group's `value`/`toggleOption` from `CheckboxContext`; `options`-mode renders `CheckboxBase` directly (avoids a `Checkbox` ↔ `CheckboxGroup` import cycle).
- **`onChange` event is synthesised** in `CheckboxBase` from the native input change: `{ target: { value, name, checked }, stopPropagation, preventDefault, nativeEvent }` — antd-compatible shape.
