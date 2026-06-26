# Radio (`@synerise/ds-radio`)

> DS-native, antd-free radio: a `label` prop (renders via `FormFieldLabel`), a `description` below the radio, a context-based `Radio.Group`, a segmented `Radio.Button`, and group-level `fullWidth`/`big` layout variants.

## Package structure

```
src/
 Radio.tsx — assembles Radio (= RadioBase) + .Group + .Button
 Radio.types.ts — RadioProps, RadioGroupProps, RadioButtonProps, RadioChangeEvent, RadioValueType
 Radio.styles.tsx — styled-components (RadioLabel = radio-dot visual; RadioGroupWrapper = layout + segmented buttons)
 RadioGroup.tsx — DS-native Radio.Group (single-select context provider)
 RadioContext.ts — group context (value + onChange)
 components/
   RadioBase.tsx — the radio input (DOM + group consumption + event synthesis)
   RadioButton.tsx — segmented button-style radio
 index.ts — public exports
 __specs__/Radio.spec.tsx — Vitest tests
```

No LESS, no antd — antd's base + `radio.mixin.less` were inlined into `Radio.styles.tsx`.

## Public exports

### `Radio` (default export)

Compound component: `Radio` + `Radio.Group` + `Radio.Button`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | `undefined` | Renders label text via `FormFieldLabel`. Takes precedence over `children` |
| `description` | `ReactNode` | `undefined` | Additional text rendered below the radio in small grey text |
| `children` | `ReactNode` | `undefined` | **@deprecated** — use `label` instead. Only rendered when `label` is not provided |
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `undefined` | Initial uncontrolled checked state |
| `disabled` | `boolean` | `undefined` | Disables the radio; also dims `label` and `description` to 40% opacity |
| `value` | `any` | `undefined` | Value used by `Radio.Group` for comparison |
| `autoFocus` | `boolean` | `undefined` | Focuses the input on mount |
| `value`, `name`, `id`, `autoFocus`, `tabIndex`, `onChange` | — | — | DS-native props (no antd inheritance). `onChange` receives a `RadioChangeEvent` (`target.value`, `target.checked`). |

### `Radio.Group`

Wraps `AntdRadio.Group` with two additional layout props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fullWidth` | `boolean` | `undefined` | Makes the group `display: flex; width: 100%` — each radio button gets `flex: 1` |
| `big` | `boolean` | `undefined` | When combined with `fullWidth`, sets button height to `48px` instead of `32px` |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` | Segmented `Radio.Button` height: `small` 24px · `middle` 32px · `large` 40px |
| + DS `RadioGroupProps` | — | — | `value`, `defaultValue`, `onChange`, `options`, `optionType`, `buttonStyle`, `disabled`, `name` (DS-native, no antd inheritance) |

### `Radio.Button`

DS-native segmented button-style radio (replaces the former `AntdRadio.Button` re-export). Reads the `Radio.Group` context; styled by the group as a connected segment. Use for segmented/toggle-button radio groups (`optionType="button"` or explicit `<Radio.Button>` children).

### Types exported

| Type | Description |
|------|-------------|
| `RadioProps` | Props for `Radio` |
| `RadioGroupProps` | Props for `Radio.Group` |
| `Props` | **@deprecated** alias for `RadioProps` |

## Usage patterns

```tsx
import Radio from '@synerise/ds-radio';

// Basic radio with label and description
<Radio.Group value={selected} onChange={(e) => setSelected(e.target.value)}>
 <Radio value="a" label="Option A" description="Some extra context" />
 <Radio value="b" label="Option B" />
</Radio.Group>

// Full-width button group
<Radio.Group value={tab} onChange={(e) => setTab(e.target.value)} fullWidth big>
 <Radio.Button value="list">List</Radio.Button>
 <Radio.Button value="grid">Grid</Radio.Button>
</Radio.Group>

// Shorthand options
<Radio.Group options={['A', 'B', 'C']} value={val} onChange={handleChange} />
```

## Styling

Styles live in `Radio.styles.tsx`. **Each element is its own styled-component and owns its styles** — the `.ant-radio-*` / `ds-radio-*` class names are kept on the elements purely as hooks (ui-tests / interim external CSS), never used as styling selectors; state is passed in as transient `$`-props. Uses `@synerise/ds-core` theme tokens:
- `grey-600` — `Description` text colour; `opacity: 0.4` applied on `disabled` to `Label`/`Description`/`RadioText`
- `Label` extends `FormFieldLabel` from `@synerise/ds-form-field`
- radio dot: `RadioBox` / `RadioInput` / `RadioInner` / `RadioText`. `RadioInner` is the 16px circle (`grey-300` border, blue-600 dot scaled in on `$checked`, greyed on `$disabled`); `RadioLabel` holds the cross-element hover-preview + focus-ring rules (`${RadioInput}:focus + ${RadioInner}`, white centre once `$checked`).
- segmented button: `RadioButtonLabel` (+ `RadioButtonInput`) owns the full segment visual including the connected-border `:first-child`/`:last-child` rules and the `$solid`/`$checked`/`$disabled` variants — driven by `$`-props read from the group context, not by group-level `.ant-radio-button-*` selectors.
- `RadioGroupWrapper` is `inline-block` (vertical stacking) and, with `fullWidth`, switches to flex and stretches `${RadioLabel}`/`${RadioButtonLabel}` (`big` → 48px height).
- `AdditionalData` is the margin wrapper for `Description`

All styling is in `Radio.styles.tsx` (no LESS).

## Key dependencies

- DS-native (no antd) — radio + `Radio.Group` (context) + `Radio.Button` reimplemented in `src/`
- `@synerise/ds-form-field` — `FormFieldLabel` used for the `label` prop rendering
- `@synerise/ds-typography` — `macro.small` applied to `Description` font size

## Implementation notes

- **`label` vs `children`**: `label` takes precedence — if `label` is set, `children` is ignored entirely. `children` is marked `@deprecated` in the type file.
- **`Radio.Button` is DS-native**: reads `RadioContext` for checked state; the segment visual (connected borders, checked, focus, `buttonStyle` solid/outline) is styled by `RadioGroupWrapper`.
- **`RadioChangeEvent`** is synthesised from the native input change (`{ target: { value, checked, name }, stopPropagation, preventDefault, nativeEvent }`); `target.value` is `RadioValueType` (consumers needing a narrower type cast it — antd typed it `any`).
- **`AdditionalData` styled-component** is marked `@deprecated` in its source comment but is still the live wrapper div for `Description` — the comment is misleading.
- **Uses Vitest** for testing.
