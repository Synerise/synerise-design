# Slider (`@synerise/ds-slider`)

> A polymorphic slider component that renders a default single-value slider, a range (dual-thumb) slider, or an allocation slider based on discriminated union props. Built on `@tanstack/react-ranger` — **not** Ant Design Slider.

## Package structure

```
src/
  Slider.tsx              — dispatcher; picks DefaultSlider / RangeSlider / AllocationSlider
  Slider.types.ts         — all types (SliderProps union, AllocationConfig, etc.)
  Slider.styles.ts        — shared styled-components
  Slider.spec.tsx         — Vitest tests
  context/
    SliderContext.tsx     — SliderContext providing rangerInstance + rangerHandles
  components/
    DefaultSlider.tsx     — single-value slider
    RangeSlider.tsx       — dual-thumb range slider
    AllocationSlider.tsx  — allocation/percentage slider
    SliderLine.tsx        — track line
    SliderAbove.tsx       — label + description above the slider
    SliderHandles.tsx     — thumb handles with tooltips
    SliderDots.tsx        — step dots
    SliderMarks.tsx       — mark labels
    SliderSections.tsx    — coloured track sections
    AllocationMarks.tsx   — allocation variant marks
  hooks/
    useColorMap.ts        — derives track colour from tracksColorMap
    useInvertedColors.ts  — computes inverted colour state
  utils/
    Slider.utils.ts
    Slider.interpolators.ts
    allocation.utils.tsx
    allocationHandlers.utils.ts
  index.ts                — public exports (re-exports all from Slider.types)
```

## Public exports

### `Slider` (default export)

Discriminated union dispatcher. Choose mode by props:

| Mode | Discriminant | Props type |
|------|-------------|-----------|
| Default (single value) | neither `range` nor `type="allocation"` | `DefaultSliderProps` |
| Range (dual thumb) | `range: true` | `RangeSliderProps` |
| Allocation | `type: 'allocation'` | `AllocationSliderProps` |

#### Shared props (`SharedSliderProps`)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | Label above the slider |
| `description` | `ReactNode` | — | Description text |
| `disabled` | `boolean` | — | Disables interaction |
| `step` | `number` | — | Step increment |
| `dots` | `boolean` | — | Show dots at step positions (not recommended for small step values) |
| `thick` | `boolean` | — | Thicker track variant |
| `autoFocus` | `boolean` | — | Focus on mount |
| `tracksColorMap` | `ColorMap` (`Record<number, string>`) | — | Custom colour map for track sections |

#### Base props (`BaseSliderProps`) — for Default and Range modes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min` | `number` | — | Minimum value |
| `max` | `number` | — | Maximum value |
| `marks` | `SliderMarks` | — | Tick marks: `Record<string \| number, ReactNode \| MarkObj>` |
| `inverted` | `boolean` | — | Invert track fill direction |
| `reverse` | `boolean` | — | Render right-to-left |
| `tipFormatter` | `((value?: number) => ReactNode) \| false` | — | Custom tooltip formatter; `false` hides tooltip |

#### Default slider additional props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number` | Controlled value |
| `onChange` | `(value: number) => void` | Called on change |
| `onAfterChange` | `(value: number) => void` | Called on mouse/touch up |

#### Range slider additional props (requires `range: true`)

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number[]` | Controlled range `[min, max]` |
| `onChange` | `(value: number[]) => void` | Called on change |
| `onAfterChange` | `(value: number[]) => void` | Called on mouse/touch up |
| `range` | `true` | **Required** discriminant |

#### Allocation slider props (requires `type: 'allocation'`)

| Prop | Type | Description |
|------|------|-------------|
| `type` | `'allocation'` | **Required** discriminant |
| `allocationConfig` | `AllocationConfig` | **Required** allocation configuration |
| `handlers` | `HandlerConfig` | Per-handle block config (`Record<number, { blocked, blockedTooltipProps? }>`) |

#### `AllocationConfig`

| Field | Type | Description |
|-------|------|-------------|
| `variants` | `AllocationVariant[]` | Allocation variants with `name`, `percentage`, `tabId`, `tabLetter`, `minPercentage?` |
| `onAllocationChange` | `(variants?: AllocationVariant[]) => void` | Called when percentages change |
| `controlGroupEnabled` | `boolean` | Treat remaining range as control group |
| `controlGroupLabel` | `ReactNode` | Label for control group |
| `controlGroupTooltip` | `ReactNode` | Tooltip for control group |

### Types exported

All types from `Slider.types.ts` are re-exported via `export * from './Slider.types'`:
`SliderProps`, `DefaultSliderProps`, `RangeSliderProps`, `AllocationSliderProps`, `BaseSliderProps`, `SharedSliderProps`, `AllocationConfig`, `AllocationVariant`, `ColorMap`, `ColorsOrder`, `HandlerConfig`, `SliderMarks`, `MarkObj`, `SliderType`, etc.

## Usage patterns

```tsx
import Slider from '@synerise/ds-slider';

// Default single-value
<Slider label="Volume" min={0} max={100} value={50} onChange={v => setValue(v)} />

// Range slider
<Slider range min={0} max={100} value={[20, 80]} onChange={v => setRange(v)} />

// Allocation slider
<Slider
  type="allocation"
  allocationConfig={{
    variants: [
      { name: 'A', percentage: 50, tabId: 1, tabLetter: 'A' },
      { name: 'B', percentage: 50, tabId: 2, tabLetter: 'B' },
    ],
    onAllocationChange: setVariants,
  }}
/>
```

## Context / Provider

`SliderContext` provides `rangerInstance` (from `@tanstack/react-ranger`) and `rangerHandles` (ref map from index to DOM element) to child components (`SliderHandles`, `SliderSections`, etc.). The context is set up internally by each slider variant — no external Provider is needed.

## Key dependencies

- `@tanstack/react-ranger` — core ranger/slider logic (replaces Ant Design Slider)
- `@synerise/ds-form-field` — label/description wrapper
- `@synerise/ds-tooltip` — handle tooltips and blocked-handler tooltips
- `@synerise/ds-typography` — description text
- `@synerise/ds-utils` — resize observer utilities

## Implementation notes

- **Dispatch is by discriminated union**, not a `type` prop on a single component. TypeScript narrows the props type at the call site based on `range: true` or `type: 'allocation'`.
- **Not based on Ant Design Slider** — README references are outdated; the actual implementation uses `@tanstack/react-ranger`.
- **Uses Vitest** (`vitest.config.ts`) — migrated from Jest.
- `tracksColorMap` keys are numeric percentages/values; the hook `useColorMap` interpolates the colour for the current value.
- `inverted` only applies to `DefaultSliderProps` and `RangeSliderProps` (not allocation).
- `HandlerConfig` handler index starts at **1** (not 0).
