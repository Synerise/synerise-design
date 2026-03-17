# ActionArea (`@synerise/ds-action-area`)

> A centered call-to-action panel with a dashed border, optional title/description, and either a standard button or fully custom action content. Supports an error/validation state.

## Package structure

```
src/
  ActionArea.tsx        — main component
  ActionArea.types.ts   — prop interfaces (discriminated union)
  ActionArea.styles.ts  — styled-components
  ActionArea.utils.tsx  — renderAction() helper
  index.ts              — public exports
  __specs__/            — Vitest tests
```

## Public exports

### `ActionArea` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `description` | `ReactNode` | **required** | Body text inside the panel |
| `label` | `ReactNode` | `undefined` | Optional title rendered above description (`Title` level 6) |
| `isFullWidth` | `boolean` | `false` | Expands width to 100%; default caps at 588px |
| `isError` | `boolean` | `false` | Switches to error visual state (red border + background) |
| `errorText` | `ReactNode` | `undefined` | Shown below the panel when `isError` is true |
| `className` | `string` | `undefined` | Extra CSS class on the outer wrapper |
| `style` | `CSSProperties` | `undefined` | Inline style on the outer wrapper |
| *(standard)* `action` | `() => void` | — | Click handler for the generated primary button |
| *(standard)* `actionLabel` | `ReactNode` | — | Label for the generated primary button |
| *(standard)* `buttonProps` | `Partial<ButtonProps>` | `undefined` | Overrides for the generated button (e.g. `type="secondary"`) |
| *(custom)* `customAction` | `ReactNode` | — | Replaces the generated button entirely |

No `forwardRef`. No imperative handle.

### Exported types

- `ActionAreaProps` — full union type
- `ActionAreaWithStandardActionProps` — `{ action, actionLabel, buttonProps? }`
- `ActionAreaWithCustomActionProps` — `{ customAction }`

### Attached styled-component refs

`ActionArea.ActionAreaWrapper`, `ActionArea.ActionAreaContent`, `ActionArea.ErrorText` are attached directly to the component for use as styled-component targets in consuming packages.

## Usage patterns

```tsx
import ActionArea from '@synerise/ds-action-area';

// Standard button
<ActionArea
  label="No results"
  description="Add your first item to get started."
  action={() => handleAdd()}
  actionLabel="Add item"
/>

// Override button style
<ActionArea
  description="Upload a file to continue."
  action={() => handleUpload()}
  actionLabel="Upload"
  buttonProps={{ type: 'secondary' }}
/>

// Custom action (e.g. multiple buttons)
<ActionArea
  description="Choose an option below."
  customAction={<><Button>A</Button><Button>B</Button></>}
/>

// Error state
<ActionArea
  description="Something went wrong."
  action={() => retry()}
  actionLabel="Retry"
  isError
  errorText="Connection failed."
/>
```

## Discriminated union — action vs customAction

`ActionAreaProps` is a discriminated union: you must provide **either** `customAction` **or** both `action` + `actionLabel`. The `renderAction()` utility in `ActionArea.utils.tsx` checks for the `customAction` key via `'customAction' in props` to branch between the two variants. TypeScript enforces this at the call site.

## Styling

Styles live in `ActionArea.styles.ts`. Uses `@synerise/ds-core` theme palette tokens:

- Error background: `theme.palette['red-050']`
- Error border / error text: `theme.palette['red-600']`
- Normal border: `theme.palette['grey-300']`

Default width is `588px` (not `100%`) — the `isFullWidth` prop switches to `100%`. This is a common source of surprise in layouts that expect full-width behavior by default.

## Key dependencies

- `@synerise/ds-button` — renders the standard action button (`type="primary"` by default)
- `@synerise/ds-typography` — `Title` (level 6) for `label`, `Description` for `description`
- `classnames` — merges `ds-action-area` with any consumer `className`

## Implementation notes

- `description` is **required** in the type; `label` is optional and only renders when truthy.
- `errorText` only renders if **both** `isError` is `true` and `errorText` is non-empty (`Boolean(errorText)`).
- The outer `ActionAreaWrapper` caps width at `588px` unless `isFullWidth` is set — not `max-width` only; the `width` property is set directly.
- The component adds `ds-action-area` as a fixed CSS class alongside any consumer `className`.
