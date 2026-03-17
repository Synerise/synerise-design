# StepCard (`@synerise/ds-step-card`)

> A filter/condition step card component with a header (matching toggle, cruds: move up/down/delete/duplicate), a body for condition content, optional additional fields, and a footer. Supports drag-and-drop via props from `@synerise/ds-sortable`.

## Package structure

```
src/
  StepCard.tsx          — main component; forwardRef; REORDER_THROTTLE=1000ms exported
  StepCard.types.ts     — StepCardProps, StepCardTexts
  StepCard.styles.ts    — all styled-components (Container, Header, Body, Footer, etc.)
  hooks/
    useDefaultTexts.ts  — merges user texts with react-intl defaults
  __specs__/
    StepCard.spec.tsx   — Jest tests
  index.ts              — public exports
```

## Public exports

### `StepCard` (default export)

`forwardRef<HTMLDivElement, StepCardProps>` — ref targets the root container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `matching` | `boolean` | — | **Required.** Current matching state; shown via `Matching` toggle |
| `onMove` | `(index: number, offset: number) => void` | — | **Required.** Called after `REORDER_THROTTLE` (1000ms) debounce with current index and cumulative offset |
| `expressionIndex` | `number` | — | **Required.** Current position in the list |
| `expressionCount` | `number` | — | **Required.** Total number of steps; used to disable move up/down at boundaries |
| `name` | `string` | — | Step name (currently not rendered in header — unused display) |
| `children` | `ReactNode` | — | Condition content rendered in the body |
| `footer` | `ReactNode` | — | Content rendered in the footer section |
| `onChangeMatching` | `(matching: boolean) => void` | — | Called when the matching toggle is clicked |
| `onDelete` | `() => void` | — | Called when delete icon is clicked |
| `onDuplicate` | `() => void` | — | Called when duplicate icon is clicked |
| `texts` | `Partial<StepCardTexts>` | — | Override any subset of i18n strings |
| `isHeaderVisible` | `boolean` | `true` | Whether to render the header section |
| `isDraggable` | `boolean` | `true` | Shows drag handle icon and enables drag cursor |
| `readOnly` | `boolean` | `false` | Hides cruds, drag handle, and disables matching toggle |
| `singleStepCondition` | `boolean` | `false` | Removes bottom padding from body |
| `headerRightSide` | `ReactNode` | — | Static content in the header right slot |
| `renderHeaderRightSide` | `(index: number, options?: { placeholder?: boolean }) => ReactNode` | — | Dynamic right-side renderer; also called in drag placeholder with `placeholder: true` |
| `getMoveByLabel` | `(moveByOffset: number) => string` | — | Custom accessible label for the pending move |
| `dropLabel` | `ReactNode` | — | Content shown in the drag placeholder (blue dashed area) |
| `additionalFields` | `JSX.Element` | — | Extra content rendered between body and footer, separated by a border |
| `expressionMoved` | `boolean` | — | Set `true` to show a success "Moved" alert for 2000ms |
| `dragHandleProps` | `DragHandlePropType` | — | dnd-kit drag handle attributes/listeners (from `@synerise/ds-sortable`) |
| `isDragged` | `boolean` | — | When `true`, hides body content and shows the blue dashed placeholder |
| `isDragOverlay` | `boolean` | — | When `true`, renders a compact preview (76px, no footer, no right side) |
| `dragIndex` | `number` | — | Index passed to `renderHeaderRightSide` during drag overlay rendering |

### `REORDER_THROTTLE`

Exported constant (`1000` ms) — the debounce delay before `onMove` fires after keyboard move clicks.

### `StepCardTexts`

| Key | Default |
|-----|---------|
| `matching` | `'Performed'` |
| `notMatching` | `'Not performed'` |
| `conditionType` | `'event'` |
| `notConditionType` | `'event'` |
| `namePlaceholder` | `'Name'` |
| `moveTooltip` | `'Move'` |
| `moveUpTooltip` | `'Move Up'` |
| `moveDownTooltip` | `'Move Down'` |
| `deleteTooltip` | `'Delete'` |
| `duplicateTooltip` | `'Duplicate'` |

### `StepCardProps`

Full props type, re-exported as a named type.

## Usage patterns

```tsx
import StepCard from '@synerise/ds-step-card';

<StepCard
  matching={true}
  onChangeMatching={setMatching}
  name="Step 1"
  onMove={(index, offset) => reorder(index, offset)}
  expressionIndex={0}
  expressionCount={3}
  onDuplicate={() => duplicate()}
  onDelete={() => remove()}
  texts={{ matching: 'Matching', notMatching: 'Not matching' }}
  footer={<Button>Add condition</Button>}
>
  <ConditionContent />
</StepCard>
```

## Custom hooks

### `useDefaultTexts`

Merges user-provided `Partial<StepCardTexts>` with `react-intl` defaults via `useMemo`. Returns a complete `StepCardTexts`. Requires an `IntlProvider` ancestor.

## Styling

Styles in `StepCard.styles.ts`. Key states:
- `isDragged`: body hidden (`visibility: hidden`), placeholder shown with blue dashed overlay (`border: 1px dashed blue-300; background: blue-050`). Height collapses to 100px.
- `isDragOverlay`: content height fixed at 76px, body/footer hidden, cursor `grabbing`.
- Cruds (delete/duplicate) are hidden by default (`opacity: 0; visibility: hidden`) and revealed on header hover.

## Key dependencies

- `@synerise/ds-logic` — `Matching` toggle component
- `@synerise/ds-cruds` — move up/down, delete, duplicate icons with tooltips
- `@synerise/ds-alert` — `InlineAlert` for "Moved" success feedback
- `@synerise/ds-icon` — `DragHandleM`
- `@synerise/ds-typography` — `Title` for condition type label
- `@synerise/ds-sortable` — `DragHandlePropType` (dev dependency only)
- `react-intl` — i18n defaults in `useDefaultTexts` (peer dependency)

## Implementation notes

- **`onMove` is debounced at 1000ms**: clicks on move up/down accumulate `moveByOffset`; after 1s the single `onMove(expressionIndex, moveByOffset)` fires. A countdown SVG spinner animates the delay. Mouse-over the header cancels the pending move feedback display (`resetMoveSuccess`).
- **`name` prop is accepted but not rendered** in the current header — it was presumably planned for a name input but `onChangeName` is absent from the current types.
- **`react-intl` is a peer dependency** — component throws at runtime without an `IntlProvider` ancestor.
- **README prop table has multiple errors**: `matching` type shown as `MatchingProps` (should be `boolean`), `readonly` (should be `readOnly`); many props missing entirely.
- **Uses Jest** (`jest.config.js`) — not yet migrated to Vitest.
