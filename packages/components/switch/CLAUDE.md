# Switch (`@synerise/ds-switch`)

> A DS-native toggle switch (label, description, error state, tooltip). **antd-free** — `RawSwitch` is
> a DS `<button role="switch">` (formerly a re-export of antd's Switch).

## Package structure

```
src/
 Switch.tsx          — DS wrapper (Switch + re-exports RawSwitch); label/description/error/tooltip
 RawSwitch.tsx       — DS-native bare toggle (<button role="switch">), controlled/uncontrolled
 RawSwitch.styles.ts — styled track (Toggle) + Handle + loading Spinner
 Switch.types.ts     — RawSwitchProps, Props (SwitchProps), SwitchSize
 Switch.styles.ts    — wrapper/label/texts + switch↔label state styling
 Switch.figma.tsx    — Figma Code Connect mappings
 index.ts            — public exports
```

> No `style/` LESS — the antd switch LESS base + mixin were reimplemented in `RawSwitch.styles.ts`.

## Public exports

```ts
export { default, RawSwitch } from './Switch';
export type { Props as SwitchProps, RawSwitchProps } from './Switch.types';
```

- `Switch` — default export, `forwardRef<HTMLDivElement, Props>`, the full wrapped component.
- `RawSwitch` — DS-native bare toggle (`forwardRef<HTMLButtonElement, RawSwitchProps>`); use when you
  need just the toggle without the DS label/description markup. Back-compatible with the antd-Switch
  surface that was actually used.
- `SwitchProps`, `RawSwitchProps` — type exports.

### `Switch`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | **Required.** Label next to the toggle; the accessible label (via `id` linkage). |
| `description` | `ReactNode` | — | Secondary text below the label. |
| `errorText` | `ReactNode` | — | Error message; adds the `"error"` class to the toggle (turns it red). |
| `tooltip` / `tooltipIcon` / `tooltipConfig` | — | — | Tooltip via `FormFieldLabel`; `tooltip={null}` suppresses the trigger. |
| `withFormElementMargin` | `boolean` | `false` | Adds `margin: 0 0 16px` to the wrapper. |
| `className` | `string` | — | Appended to the outer wrapper (always gets `"ds-switch"`). |
| _(all `RawSwitchProps`)_ | — | — | Forwarded to the toggle; `size` is forced to `"small"`. |

### `RawSwitch` (`RawSwitchProps`)

DS-native `<button role="switch">`. Keyboard (space/enter) toggling works natively.

| Prop | Type | Description |
|------|------|-------------|
| `checked` | `boolean` | Controlled checked state. |
| `defaultChecked` | `boolean` | Initial state when uncontrolled. |
| `disabled` | `boolean` | Disables interaction. |
| `loading` | `boolean` | Shows a spinner in the handle and blocks interaction. |
| `size` | `'small' \| 'default'` | Accepted for compatibility; the DS toggle is a single fixed size (28×16). |
| `onChange` / `onClick` | `(checked: boolean, event) => void` | Fired with the **next** checked value. |
| _(native `<button>` attrs)_ | — | `id`, `name`, `onBlur`, `onFocus`, `style`, `title`, `tabIndex`, `data-*`, … are forwarded (so React-Final-Form `{...input}` spreads keep working). |

> Dropped from the antd surface (zero usage across puib/portal-next/universal-list): `checkedChildren`,
> `unCheckedChildren`, `autoFocus`.

## Styling

- Toggle: 28×16 track, 8px radius, 12×12 white handle. Unchecked `grey-400` (hover `grey-500`), checked
  `green-600` (hover `green-500`), error `red-600`, focus-visible border `blue-600`, disabled `opacity 0.4`.
  Driven by transient `$checked` / `$error` / `$loading` props (no class selectors).
- Class hooks kept on the toggle for the interim: `ant-switch` / `ant-switch-checked` / `ant-switch-disabled`
  / `ant-switch-loading` **and** `ds-switch-toggle` / `ds-switch-checked` / … (the `ant-*` ones removed later).
- Label (`S.Label`, `FormFieldLabel` + `macro.heading`) is `grey-700`, `grey-800` on toggle hover, faded
  when disabled (sibling selectors on the styled `Toggle`).

## Key dependencies

- `@synerise/ds-form-field` (`FormFieldLabel`), `@synerise/ds-typography` (`macro.heading`),
  `@synerise/ds-utils` (`DataAttributes`), `@synerise/ds-tooltip` (dev — `TooltipProps`), `classnames`.

## Implementation notes

- **No antd.** `RawSwitch` is a DS `<button role="switch" aria-checked>`; controlled when `checked` is
  passed, otherwise internal state seeded by `defaultChecked`.
- `size="small"` is always passed by `Switch`; `size` does not change the toggle dimensions (fixed 28×16).
- Error: `Switch` adds the `error` class; `RawSwitch` derives its red `$error` styling from that class.
- After `onChange`, `Switch` blurs the toggle after a 300ms `setTimeout`.
- `Switch`'s `forwardRef` points at the outer wrapper `<div>`; the internal toggle ref is an
  `HTMLButtonElement`.
- Tests: Vitest (`src/__specs__/Switch.spec.tsx`).
