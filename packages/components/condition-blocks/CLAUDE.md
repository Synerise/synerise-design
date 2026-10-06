# ConditionBlocks (`@synerise/ds-condition-blocks`)

> Presentational, composable building blocks for filtering-condition layouts — a layout skeleton
> (group / rows / row / slot / connector) plus leaf primitives (entity / text / add / remove). All
> state and behaviour live in the consuming app; these blocks carry only the design-system look and
> ds-condition's grow/shrink-within-bounds sizing.

## Package structure

```
src/
  index.ts                 — public barrel (named exports only, no default export)
  constants.ts             — CONDITION_REMOVE_CLASS, CONDITION_ROWS_GAP
  errorMessage.styles.ts   — shared ErrorMessage = styled(ErrorText) from ds-typography
  components/
    ConditionGroup/        — outer wrapper: entity | rows
    ConditionRows/         — vertical stack of rows + add button
    ConditionRow/          — one horizontal row; renders its own connector + error
    ConditionSlot/         — sizing wrapper for one control (the grow/shrink primitive)
    ConditionConnector/    — tree-line connector cell (::before stub, ::after line)
    ConditionEntity/       — flex wrapper for the entity/context chip(s)
    ConditionTextSlot/     — inline text between controls
    ConditionAddButton/    — "and where" / "Add another" action row
    ConditionRemove/       — hover/focus-revealed ✕ for a row
  __specs__/ConditionBlocks.spec.tsx
```

## Public exports

All named exports (no default). Each block also re-exports its `*Props` type. Every block is a
`forwardRef` and forwards native attributes (`data-*` / `aria-*` / `className` / `style`) via
`WithHTMLAttributes`.

### `ConditionGroup`
Outermost wrapper — entity on the left, `ConditionRows` on the right. Forward the ref and pass the
node as `getPopupContainer` to enclosed dropdowns so their popovers share one stacking context.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Entity wrapper + `ConditionRows` |
| `gap` | `number \| string` | `12` | Gap between entity and rows |

### `ConditionRows`
Vertical container for the rows and the add button; fills the remaining width, stays shrinkable.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | `ConditionRow`s + `ConditionAddButton` |
| `gap` | `number \| string` | `16` (`CONDITION_ROWS_GAP`) | Vertical gap between rows |

### `ConditionRow`
A single horizontal row of slots/text. **Renders its own leading connector** (from `connector`) and
its own error below the slots; reveals a descendant `ConditionRemove` on hover.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | The slots / text |
| `gap` | `number \| string` | `12` | Gap between children |
| `align` | `'start' \| 'center' \| 'baseline'` | `'start'` | Cross-axis alignment (`center`/`baseline` for text-interleaved rows) |
| `errorMessage` | `ReactNode` | — | Rendered below the slots, aligned with the first slot |
| `connector` | `ConditionConnectorProps` | — | When set, renders a leading `ConditionConnector` with these props |

### `ConditionSlot`
The sizing primitive — wraps one control, controls its grow/shrink within bounds, and cascades
`min-width: 0`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | The control |
| `variant` | `'rigid' \| 'fill' \| 'shrink'` | `'rigid'` | Preset flex budget (rigid=operator, fill=factor, shrink=parameter) |
| `grow` | `number` | — | Explicit `flex-grow` (overrides `variant`) |
| `shrink` | `number` | — | Explicit `flex-shrink` |
| `basis` | `string` | `'auto'` | Explicit `flex-basis` |
| `minWidth` | `number \| string` | — | Floor (pair with `shrink`) |
| `maxWidth` | `number \| string` | — | Cap |
| `errorMessage` | `ReactNode` | — | Rendered below the control |

### `ConditionConnector`
The tree-line connector cell. Usually rendered by `ConditionRow` / `ConditionAddButton` via their
`connector` / `connectorProps`, not composed directly.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `first` | `boolean` | — | First row — full-width horizontal stub |
| `last` | `boolean` | — | Last row — stops the vertical line at the stub |
| `readOnly` | `boolean` | — | Hides the trailing line on the last row |

### `ConditionEntity`
Flex-row wrapper for the entity/context chip(s) at the start of a group (≥1 slot).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | The chip(s) — a `ds-button` custom-color / `ds-context-selector` |
| `gap` | `number \| string` | `12` | Gap between multiple slots |
| `errorMessage` | `ReactNode` | — | Rendered below the entity |

### `ConditionTextSlot`
Inline, non-interactive text between controls.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | The label |
| `muted` | `boolean` | `false` | Lighter secondary colour |

### `ConditionAddButton`
The add-condition action row; renders the consumer's control and an optional leading connector.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | The add control (e.g. a ghost `ds-button`) |
| `withConnector` | `boolean` | `false` | Draw a `ConditionConnector` before the control |
| `connectorProps` | `Pick<ConditionConnectorProps, 'first' \| 'last' \| 'readOnly'>` | — | Props for that connector |

### `ConditionRemove`
Hover/focus-revealed ✕ that removes a row. Carries `CONDITION_REMOVE_CLASS` so an enclosing
`ConditionRow` toggles it via `:hover` / `:focus-within`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `(event) => void` | — | Remove handler |
| `revealOnRowHover` | `boolean` | `true` | Hidden until the row is hovered or focused; `false` = always visible |
| `disabled` | `boolean` | `false` | |
| `aria-label` | `string` | `DS.CONDITION-BLOCKS.REMOVE` (`'Remove'`) | Accessible label; overrides the translated default |

## Usage pattern

```tsx
import {
  ConditionGroup,
  ConditionRows,
  ConditionRow,
  ConditionSlot,
  ConditionEntity,
  ConditionAddButton,
  ConditionRemove,
} from '@synerise/ds-condition-blocks';

<ConditionGroup>
  <ConditionEntity>{/* entity chip */}</ConditionEntity>
  <ConditionRows>
    <ConditionRow connector={{ first: true, last: true }} errorMessage={error}>
      <ConditionSlot variant="shrink" minWidth={120}>{/* parameter */}</ConditionSlot>
      <ConditionSlot variant="rigid">{/* operator */}</ConditionSlot>
      <ConditionSlot variant="fill">
        {/* value control — ds-input with autoResize.stretchToFit */}
        <ConditionRemove />
      </ConditionSlot>
    </ConditionRow>
    <ConditionAddButton withConnector>{/* ghost button */}</ConditionAddButton>
  </ConditionRows>
</ConditionGroup>;
```

## Styling

Each block has a co-located `*.styles.ts` using `@synerise/ds-core` theme tokens. The shared
`ErrorMessage` (`errorMessage.styles.ts`) is `styled(ErrorText)` from `@synerise/ds-typography`
(red-600) with its default bottom margin replaced by an 8px top margin.

## The sizing guarantee (grow/shrink within bounds)

1. **`ConditionSlot` flex budgets** — `rigid` = `flex: 0 0`, `fill` = `flex: 30 1`,
   `shrink` = `flex: 0 400` (+ a `minWidth` floor).
2. **A `min-width: 0` cascade** — `ConditionRows` → `ConditionRow` → `ConditionSlot` → `& > *`, so
   children can shrink below their intrinsic width and the row never overflows its parent.
3. **A stretch-to-fit input** — the value control the consumer passes (`@synerise/ds-input` with
   `autoResize.stretchToFit`) pins its `max-width` to the measured parent width.

Put shrinkable controls inside a `ConditionSlot`, never as a bare child of `ConditionRow`.

## Key dependencies

Only what the package actually imports. The controls a consumer places inside the slots
(`ds-button`, `ds-input`, `ds-tooltip`, `ds-context-selector`, …) are the *consumer's* dependencies,
not this package's — do not add them here.

- `@synerise/ds-icon` — `CloseS` in `ConditionRemove`
- `@synerise/ds-typography` — `ErrorText` behind the shared error label
- `@synerise/ds-utils` — `WithHTMLAttributes`, `toCssSize`
- `react-intl` (peer) — the translated `aria-label` on `ConditionRemove`

## Implementation notes

- **`ConditionRow` owns the connector** — pass `connector={{ first, last }}`; do not compose a
  `<ConditionConnector>` child. The row lays out `[connector | content-column]`, where the content
  column holds the slots and the error, so the error aligns with the first slot (not the connector).
- **The connector line is content-independent** — the connector cell `align-self: stretch`es to the
  row's full height and its `::after` fills the cell + bridges the fixed `CONDITION_ROWS_GAP`, so a
  multi-line or custom `errorMessage` stays connected to the next row (no per-error-height guess).
- **`ConditionRemove` reveal is CSS-only, and visual only** — the button is hidden with
  `opacity: 0` + `pointer-events: none`, never `visibility`/`display`, so it stays in the
  accessibility tree and the tab order. The enclosing `ConditionRow` reveals it via
  `:hover` **and `:focus-within`**, and the button reveals itself on `:focus-visible` so keyboard
  focus never lands on something invisible. Hiding it with `visibility: hidden` (as an earlier
  revision did) removed it from the focus order entirely and left keyboard and screen-reader users
  unable to remove a row — WCAG 2.1 AA 2.1.1. In tests query it normally
  (`getByRole('button', { name: 'Remove' })`); no `hidden: true` is needed.
- **`ConditionRemove` carries no margin** — the container owns its spacing. Nested in the last
  `ConditionSlot` (the usual placement) the slot's `SlotContent` offsets it by 8px; placed straight
  in a `ConditionRow` it is spaced by that row's `gap`. A margin on the button itself stacked on top
  of the row gap and left the ✕ too far from its control.
- No default exports; `src/index.ts` is the only barrel.
