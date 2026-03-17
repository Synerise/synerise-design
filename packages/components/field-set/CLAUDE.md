# FieldSet (`@synerise/ds-field-set`)

> A labelled section wrapper with an optional header (title + description + prefix/trigger), divider, and a collapsible content area that animates open/closed.

## Package structure

```
src/
  FieldSet.tsx          — main component
  FieldSet.types.ts     — FieldSetProps, TriggerType
  FieldSet.styles.ts    — all styled-components
  index.ts              — public exports (default only)
  FieldSet.spec.tsx     — Jest tests
```

## Public exports

### `FieldSet` (default export)

`FieldSetProps = WithHTMLAttributes<HTMLDivElement, { … }>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | Header title text/node |
| `description` | `ReactNode` | — | Subtitle rendered below `title`; when both are set the header aligns to `flex-start` (top) |
| `component` | `ReactNode` | — | Main content rendered inside the collapsible area |
| `button` | `ReactNode` | — | Action node rendered at the bottom of the collapsible area (padded `8px`) |
| `prefix` | `ReactNode` | — | Custom prefix shown in the header; **ignored** when `expandable` is `true` (replaced by expander/switch) |
| `divider` | `boolean` | `true` | Renders a full-width `Divider` between the header and content |
| `expandable` | `boolean` | — | Enables expand/collapse of `component` and `button`; replaces `prefix` with the trigger |
| `triggerType` | `'expander' \| 'switch'` | `'expander'` | Which trigger to show when `expandable` is `true` |
| `defaultExpanded` | `boolean` | — | Initial expanded state; also syncs if the prop changes externally |
| `onExpandChange` | `(expanded: boolean) => void` | — | Callback fired after expand/collapse toggle |
| `onTitleClick` | `(ev: MouseEvent<HTMLElement>) => void` | — | Click handler for the title; also triggers expand when `expandable` is `true` |
| `className` | `string` | — | Appended to the root element alongside `ds-field-set` |

No `forwardRef`.

> **Note:** `FieldSetProps` and `TriggerType` are **not exported** from `index.ts`. To use the type, import directly from the internal path or derive it: `React.ComponentProps<typeof FieldSet>`.

## Usage patterns

```tsx
import FieldSet from '@synerise/ds-field-set';

// Static section with divider
<FieldSet title="Advanced option" description="For advanced users only" />

// Collapsible with expander trigger (default)
<FieldSet
  title="Advanced option"
  expandable
  defaultExpanded
  component={<MyFormFields />}
  onExpandChange={(isExpanded) => console.log(isExpanded)}
/>

// Collapsible with switch trigger
<FieldSet
  title="Enable feature"
  expandable
  triggerType="switch"
  component={<FeatureOptions />}
/>

// Static with custom prefix and action button
<FieldSet
  title="Section"
  prefix={<MyIcon />}
  component={<Content />}
  button={<Button>Add item</Button>}
  divider={false}
/>
```

## Styling

All styles are in `FieldSet.styles.ts`. Notable patterns:

- `ContainerWrapper`: `flex-column; gap: 16px` — overall layout
- `CollapsibleContent`: when `expandable`, uses `max-height` CSS transition (`0.7s ease-in-out`) between `0` and the measured natural height. Transition only fires when `shouldAnimate` is `true` (set on click, cleared on `transitionend`) to avoid animating on initial render.
- `Title`: `font-size: 16px; font-weight: 500; grey-800`; `cursor: pointer` when `isClickable`
- `Description`: `font-size: 13px`
- No theme variant pattern — sizing and colours are hardcoded or use `theme.palette` tokens directly.

## Key dependencies

- `@synerise/ds-button` — `Expander` (expander trigger)
- `@synerise/ds-switch` — `RawSwitch` (switch trigger)
- `@synerise/ds-divider` — `Divider` used for the section divider
- `@synerise/ds-utils` — `useResizeObserver` (measures collapsible content height), `WithHTMLAttributes`

## Implementation notes

- **Expand animation** — `useResizeObserver` watches the inner `CollapsibleContentInner` div and updates `maxHeight` state with its current pixel height. `CollapsibleContent` then sets `max-height` CSS property to that value when expanded (or `0` when collapsed). If `maxHeight` hasn't been measured yet, it falls back to `9999px`.
- **`defaultExpanded` sync** — a `useEffect` re-syncs local `expanded` state whenever the `defaultExpanded` prop changes. This is intentional: the prop acts as a controlled default that can be updated externally.
- **`prefix` is replaced when `expandable`** — passing both `prefix` and `expandable` will silently discard `prefix`.
- **CSS class** — root element always has `ds-field-set` plus any `className` passed via props.
- **Collapsible visibility** — `aria-hidden` is set to `"true"` when collapsed and `"false"` when expanded; `data-testid="field-set-collapsible"` is on the `CollapsibleContent` div.
- **Test runner is Jest** (not Vitest) — `"test": "jest"` in `package.json`.
- **Storybook deep-imports** `ExpanderWrapper` from `@synerise/ds-field-set/dist/FieldSet.styles` — this is a fragile internal import and should not be replicated in consumer code.
