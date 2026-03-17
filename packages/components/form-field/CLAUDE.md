# FormField (`@synerise/ds-form-field`)

> A form field wrapper that composes a label/right-side header bar above any input element, plus optional description and error text below.

## Package structure

```
src/
  FormField.tsx              — root component; composes ContentAboveElement + children + ContentBelowElement
  FormField.types.ts         — all types; exported from index
  FormField.styles.ts        — styled-components (note: .ts not .tsx)
  index.ts                   — default export + named component + type exports
  components/
    FormFieldLabel.tsx       — <label> with optional tooltip icon (InfoFillS)
    ContentAboveElement.tsx  — label + rightSide row; renders nothing when both are absent
    ContentBelowElement.tsx  — errorText + description column; renders null when both absent
    index.ts                 — re-exports the three sub-components
  __specs__/
    FormField.spec.tsx       — render + interaction tests (Jest)
```

## Public exports

### `FormField` (default)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | `undefined` | Label text/node above the field. |
| `tooltip` | `ReactNode` | `undefined` | Info tooltip content shown next to the label (renders `InfoFillS` icon trigger). |
| `tooltipConfig` | `TooltipProps` | `undefined` | Extra config merged into the Tooltip (overrides `title`, `placement`, `trigger`, etc.). |
| `id` | `string` | auto (`useId()`) | `htmlFor` of the label. Auto-generated via `useId()` when omitted. |
| `rightSide` | `ReactNode` | `undefined` | Content rendered at the far right of the label row (e.g. character counter, link). |
| `description` | `ReactNode` | `undefined` | Helper text below the field. |
| `errorText` | `ReactNode` | `undefined` | Error message below the field. Shown above `description` when both are present. |
| `children` | `ReactNode` | `undefined` | The actual form control (input, select, etc.). |

All standard `HTMLDivElement` attributes are accepted and spread onto the root wrapper via `WithHTMLAttributes<HTMLDivElement, ...>`.

### `FormFieldLabel`

Standalone `<label>` component with optional tooltip icon. Can be used independently when the full `FormField` wrapper isn't needed.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | `undefined` | Label content. Takes priority over `children`. |
| `children` | `ReactNode` | `undefined` | Fallback label content when `label` is not provided. |
| `tooltip` | `ReactNode` | `undefined` | Tooltip content (triggers `InfoFillS` icon). |
| `tooltipConfig` | `TooltipProps` | `undefined` | Extra Tooltip props (merges with defaults: `placement="top"`, `trigger="hover"`). |
| `id` | `string` | `undefined` | Passed to `htmlFor` on the `<label>`. |

Accepts all `HTMLLabelElement` attributes via `WithHTMLAttributes<HTMLLabelElement, ...>`.

Renders nothing if neither `label` nor `children` is provided.

### `ContentAboveElement`

Renders the label + right-side row. Exported for cases where you need just the header bar without the full `FormField` wrapper.

Props: `ContentAboveProps` = `BaseLabelProps` + `{ rightSide?: ReactNode }`.

Renders an empty fragment when both `label` and `rightSide` are falsy.

### `ContentBelowElement`

Renders error text and/or description. Exported for standalone use.

Props: `ContentBelowProps` = `{ errorText?: ReactNode; description?: ReactNode }`.

Returns `null` when both props are absent.

### Exported types

| Type | Description |
|------|-------------|
| `FormFieldProps` | Full props for `FormField` (div attributes + all field props) |
| `FormFieldLabelProps` | Props for `FormFieldLabel` (label attributes + label/tooltip props) |
| `FormFieldCommonProps` | `label?`, `tooltip?`, `tooltipConfig?`, `description?`, `errorText?` — useful for composing other components that embed a FormField-style header+footer |
| `ContentAboveProps` | `BaseLabelProps` + `rightSide?` |
| `ContentBelowProps` | `errorText?` + `description?` |
| `BaseLabelProps` | `label?`, `tooltip?`, `tooltipConfig?`, `id?` |

## Usage patterns

```tsx
import FormField from '@synerise/ds-form-field';

// Minimal — just wraps a child input
<FormField label="Email">
  <Input />
</FormField>

// Full usage
<FormField
  label="Email"
  tooltip="We'll use this for account recovery"
  rightSide="Optional"
  description="Use your work email"
  errorText="Invalid email format"
>
  <Input status="error" />
</FormField>

// Custom id (links label to input)
<FormField label="Username" id="username-input">
  <input id="username-input" />
</FormField>

// Standalone label with tooltip
import { FormFieldLabel } from '@synerise/ds-form-field';
<FormFieldLabel label="Name" tooltip="Your full name" id="name" />

// Just the below-field section
import { ContentBelowElement } from '@synerise/ds-form-field';
<ContentBelowElement errorText="Required" description="Min 8 chars" />
```

## Styling

Styles live in `FormField.styles.ts` (note: `.ts`, not `.tsx`). Uses `@synerise/ds-typography` styled components:
- `FormFieldWrapper` only adds `display: flex; flex-direction: column; gap: 8px` when `hasContent` is `true` (`label || rightSide || description || errorText` is truthy). A field with only `children` has no extra wrapper styles.
- `FormFieldLabelWrapper` extends `Label` from ds-typography and applies `macro.heading` typography.
- `RightSide` is right-aligned, `font-weight: 500`, `color: grey-500`.
- `ErrorText` extends `BaseErrorText` with `margin: 0` override.

## Key dependencies

- `@synerise/ds-tooltip` — wraps the info icon next to the label
- `@synerise/ds-typography` — `Label`, `Description`, `ErrorText`, `macro.heading` used in styles
- `@synerise/ds-icon` — `InfoFillS` icon in the tooltip trigger
- `@synerise/ds-utils` — `WithHTMLAttributes` utility type

## Implementation notes

- **Auto-generated `id`** — `useId()` creates a stable `id` when none is provided; this is passed to `FormFieldLabel` as `htmlFor` so the label always associates with its input. Pass an explicit `id` only when you need it to match an existing element's `id`.
- **`label` vs `children` in `FormFieldLabel`** — `label` takes priority: the component renders `{label || children}`. Both are provided as tooltip content via `ellipsis={{ tooltip: label || children }}`.
- **`ContentAboveElement` renders `<S.RightSide>` unconditionally** — when `rightSide` is `undefined` the `RightSide` div is still in the DOM (empty). This is harmless but adds an empty element.
- **`errorText` renders before `description`** — in `ContentBelowElement`, error always appears above the description.
- **`tooltipConfig` spread** — props are applied as `{title: tooltip, placement: "top", trigger: "hover", ...tooltipConfig}`, so `tooltipConfig` can override defaults including `title`.
- **Uses Jest** (not Vitest) — `package.json` has `"test": "jest"`.
