# Stepper (`@synerise/ds-stepper`)

> A horizontal or vertical step indicator with collapsible step content, status states (active/done/warning/validated), and animated height transitions.

## Package structure

```
src/
  Stepper.tsx          — main component; clones children to inject size/orientation; renders StepDividers between horizontal steps
  Stepper.types.ts     — StepperProps, StepperOrientation, StepperSize, ORIENTATIONS constant
  Stepper.styles.ts    — StepperWrapper, StepDivider
  index.ts             — public exports (Stepper default + StepperProps type)
  Step/
    Step.tsx           — step item; handles active/done/warning/validated states, AnimateHeight, tooltip icon
    Step.types.ts      — StepProps
    Step.styles.ts     — Step, StepWrapper, StepPrefix, StepNumber, StepName, StepLabel, StepContent
```

## Public exports

### `Stepper` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical' \| string` | `'horizontal'` | Layout direction |
| `size` | `'small' \| 'default' \| string` | `'default'` | Passed to each Step via `cloneElement` |
| `style` | `CSSProperties` | — | Inline styles on the root wrapper |
| `children` | `ReactNode` | — | `Stepper.Step` children |

Has static property:
- `Stepper.Step` — the step sub-component (see below)

### `Stepper.Step`

Not separately exported from `index.ts`; access via `Stepper.Step`. `StepProps` is also not exported.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string \| ReactNode` | — (required) | Step label text |
| `stepNumber` | `number` | — (required) | Displayed inside the step circle (unless `done && !validated`) |
| `active` | `boolean` | — | Current active step; expands content and changes circle style |
| `done` | `boolean` | — | Completed state; shows green checkmark |
| `warning` | `boolean` | — | Warning state; yellow circle + overrides `done` checkmark to yellow |
| `validated` | `boolean` | — | Error/invalid state; red circle (highest visual priority) |
| `tooltip` | `string \| ReactNode` | — | Warning icon with tooltip shown only when `active` |
| `onClick` | `() => void` | — | Makes step clickable; shows pointer cursor |
| `children` | `ReactNode` | — | Content shown when step is active (animated height) |
| `size` | `StepperSize` | `'default'` | Injected by parent via `cloneElement` — do not pass manually |
| `orientation` | `StepperOrientation` | `'horizontal'` | Injected by parent via `cloneElement` — do not pass manually |

### `StepperProps`

Type re-export.

## Usage patterns

```tsx
import Stepper from '@synerise/ds-stepper';

// Horizontal (default)
<Stepper>
  <Stepper.Step stepNumber={1} label="Details" done />
  <Stepper.Step stepNumber={2} label="Settings" active>
    <p>Step content here</p>
  </Stepper.Step>
  <Stepper.Step stepNumber={3} label="Review" />
</Stepper>

// Vertical with click handlers
<Stepper orientation="vertical">
  <Stepper.Step stepNumber={1} label="Step A" active={step === 0} done={step > 0} onClick={() => setStep(0)}>
    ...
  </Stepper.Step>
</Stepper>
```

## Styling

`Stepper.styles.ts` and `Step/Step.styles.ts`. All colours come from `theme.palette`. Status colours: `validated` → `red-600`, `warning` → `yellow-600`, `done` → `green-600`, `active` → `grey-700`. Priority order (highest wins visually): `validated > warning > done > active`.

`size='small'` with `orientation='horizontal'`: step labels have `max-width: 0; opacity: 0` (hidden) except for the active step, which reveals to `max-width: 100px`. Useful for compact nav bars.

## Key dependencies

- `react-animate-height` — animates `height: 0 ↔ auto` for step content collapse/expand
- `@synerise/ds-icon` — `CheckS` (done state), `WarningFillS` (tooltip icon)
- `@synerise/ds-tooltip` — label tooltip (always present, triggers on hover) and warning tooltip

## Implementation notes

- **`cloneElement` injects `size` and `orientation`** — the parent `Stepper` maps over `children` and calls `cloneElement(child, { size, orientation })`. Users should not pass these props to `Stepper.Step` directly.
- **`StepDivider` is horizontal-only** — dividers between steps are rendered only when `orientation === 'horizontal'`. There is a `@ts-expect-error` in `Stepper.tsx` for accessing `children.length`.
- **`wasActive` state** — `Step` tracks whether it was recently active to control `transition-delay` direction (expand vs collapse).
- **Active step label uses `::before` pseudo-element** — the bold active label is implemented via `data-label` attribute + CSS `content: attr(data-label)` on `::before`, making the actual `<span>` invisible. This prevents layout shifts when the font-weight changes.
- **`StepProps` not exported** — `StepProps` is not in `index.ts`; consumers cannot type-check `Stepper.Step` props without a deep import.
- **Test runner is Jest** (not Vitest).
