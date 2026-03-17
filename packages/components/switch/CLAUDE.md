# Switch (`@synerise/ds-switch`)

> A toggle switch component wrapping Ant Design Switch with label, description, error state, and tooltip support.

## Package structure

```
src/
  Switch.tsx         — main component (Switch + RawSwitch exports)
  Switch.types.ts    — Props type definition
  Switch.styles.ts   — styled-components layout and text styles
  Switch.figma.tsx   — Figma Code Connect mappings
  index.ts           — public exports
  style/
    index.less        — Less entry that imports Ant Design switch styles
    switch.mixin.less — custom switch style overrides
```

## Public exports

```ts
export { default, RawSwitch } from './Switch';
export type { Props as SwitchProps } from './Switch.types';
```

- `Switch` — default export, `forwardRef<HTMLDivElement, Props>`, the full wrapped component
- `RawSwitch` — re-export of `antd/lib/switch` with `.less` side effects applied; use this when you need a bare Ant Design switch without DS wrapper markup
- `SwitchProps` — named type export

### `Switch`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | **Required.** Text/node rendered next to the toggle, doubles as the accessible label (via `htmlFor`/`id` linkage) |
| `description` | `ReactNode` | — | Secondary text rendered below the label area |
| `errorText` | `ReactNode` | — | Error message; when provided, adds `"error"` CSS class to the underlying switch button |
| `tooltip` | `ReactNode` | — | Tooltip content rendered via `FormFieldLabel`; pass `null` to suppress the tooltip trigger |
| `tooltipIcon` | `ReactNode` | — | Custom icon element for the tooltip trigger |
| `tooltipConfig` | `TooltipProps` (`@synerise/ds-tooltip`) | — | Full tooltip configuration object passed to `FormFieldLabel` |
| `withFormElementMargin` | `boolean` | `false` | Adds `margin: 0 0 16px` to the wrapper, matching the standard form-field bottom spacing |
| `className` | `string` | — | Extra class names appended to the outer wrapper (always gets `"ds-switch"`) |
| _(all other `AntdSwitchProps`)_ | — | — | Forwarded to the underlying Ant Design Switch; `size` is **omitted** — the component always renders at `"small"` size |

Inherited Ant Design props commonly used: `checked`, `defaultChecked`, `disabled`, `loading`, `onChange`, `onClick`, `checkedChildren`, `unCheckedChildren`, `autoFocus`.

### `RawSwitch`

Direct re-export of `antd/lib/switch`. Accepts all standard `AntdSwitchProps` including `size`. Useful for cases where only the toggle button is needed without DS label/description markup.

## Usage patterns

```tsx
import Switch, { RawSwitch } from '@synerise/ds-switch';
import type { SwitchProps } from '@synerise/ds-switch';

// Minimal — label is required
<Switch label="Enable notifications" />

// With description and error
<Switch
  label="Enable notifications"
  description="You will receive email alerts"
  errorText="This field is required"
  checked={checked}
  onChange={(checked) => setChecked(checked)}
/>

// With tooltip
<Switch
  label="Advanced mode"
  tooltip="Unlocks additional configuration options"
/>

// Inside a form — adds standard 16px bottom margin
<Switch label="Accept terms" withFormElementMargin />

// Raw Ant Design switch (no wrapper, no label)
<RawSwitch checked={checked} onChange={onChange} />
```

## Styling

- Outer wrapper: `S.SwitchWrapper` (flex column, optional 16px bottom margin via `formElementMargin` prop)
- Label row: `S.LabelSwitchWrapper` (flex row, items centered)
- Label text: `S.Label` extends `FormFieldLabel` from `@synerise/ds-form-field`, uses `macro.heading` from `@synerise/ds-typography`
- Description/error block: indented 28px left to align under the label (past the 28px toggle width)
- Error text color: `theme.palette['red-600']`
- Description text color: `theme.palette['grey-600']`
- Less styles in `src/style/` override Ant Design switch visuals

## Key dependencies

- `antd/lib/switch` — base toggle button
- `@synerise/ds-form-field` (`FormFieldLabel`) — renders label with optional tooltip trigger
- `@synerise/ds-typography` (`macro.heading`) — label typography
- `@synerise/ds-tooltip` (`TooltipProps`) — dev dependency; type used in `tooltipConfig`

## Implementation notes

- `size` is explicitly omitted from the public `Props` type via `Omit<AntdSwitchProps, 'size'>`. The component always passes `size="small"` to the underlying Ant Design Switch. Do not expose or attempt to override size.
- After `onChange` fires, the component calls `switchElement.current.blur()` inside a 300ms `setTimeout` to prevent the switch from retaining focus after interaction.
- The component auto-generates an `id` with `useId()` and shares it between the `<switch>` element and `<S.Label>` to create an accessible label association.
- The `ref` forwarded by `forwardRef` points to the outer `S.SwitchWrapper` `<div>`, not the underlying `<button>`.
- `RawSwitch` is exported from `Switch.tsx` (not `index.ts` directly) so that importing it also applies the `.less` style side effects.
- Tests use Jest (not Vitest) — see `jest.config.js`.
