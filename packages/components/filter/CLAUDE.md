# Filter (`@synerise/ds-filter`)

> A container component that renders and manages a list of filter expressions (step cards with optional logic operators between them), supporting drag-and-drop reordering, per-step actions, a conditions limit, and a fully render-prop-based content API.

## Package structure

```
src/
  Filter.tsx                            — main component
  Filter.types.ts                       — FilterProps and all data-model types
  Filter.styles.ts                      — styled-components
  index.ts                              — public exports
  utils.ts                              — isStepType() type guard
  components/
    ExpressionItem/
      index.ts                          — re-exports ExpressionItem, DraggableExpressionItem, ExpressionItemProps
      ExpressionItem.tsx                — renders a single StepCard + optional Logic between items
      ExpressionItem.types.ts           — ExpressionItemProps, SortableItemProps
      DraggableExpressionItem.tsx       — wraps ExpressionItem with useDndMonitor for drag support
  __specs__/
    Filter.spec.tsx                     — Jest tests (not Vitest)
```

## Public exports

### `Filter` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `expressions` | `Expression[]` | — | **Required.** The ordered list of STEP and LOGIC expressions to render |
| `matching` | `MatchingProps` | — | Top-level matching toggle props (from `@synerise/ds-logic`) |
| `onChangeOrder` | `(newOrder: Expression[]) => void` | — | Order-change callback; also activates drag mode when `expressions.length > 1` |
| `onChangeLogic` | `(id: string, logic: LogicOperatorValue) => void` | — | Called when the Logic operator between steps changes |
| `onChangeStepMatching` | `(id: string, matching: boolean) => void` | — | Called when a step's matching toggle changes |
| `onChangeStepName` | `(id: string, name: string) => void` | — | Called when a step's name input changes |
| `onDeleteStep` | `(id: string) => void` | — | Called when a step's delete button is clicked |
| `onDuplicateStep` | `(id: string) => void` | — | Called on duplicate; silently disabled (button hidden) if `maxConditionsLimit` is exceeded |
| `renderStepFooter` | `(expression: Expression) => ReactNode` | — | Render prop for the footer slot of each StepCard |
| `renderStepContent` | `(expression: Expression, hoverDisabled?: boolean) => ReactNode` | — | Render prop for the body of each StepCard; `hoverDisabled` is `true` when another step is active |
| `renderStepHeaderRightSide` | `(expression: Expression, index: number, options?: { placeholder?: boolean }) => ReactNode` | — | Render prop for the right side of each StepCard header |
| `renderHeaderRightSide` | `(expressions: Expression[]) => ReactNode` | — | Render prop for the right side of the Filter header bar |
| `addFilterComponent` | `ReactNode \| ((arg: { isLimitExceeded: boolean }) => ReactNode)` | — | "Add filter" button area; hidden in `readOnly` mode; function form receives limit state |
| `logicOptions` | `LogicOperator[]` | — | Available logic operator choices for Logic components |
| `maxConditionsLimit` | `number` | — | When set, shows `count/limit` in header and disables duplicate once reached |
| `readOnly` | `boolean` | `false` | Disables all editing interactions |
| `singleStepCondition` | `boolean` | `false` | Passed through to StepCard to render single-condition UI variant |
| `visibilityConfig` | `{ isStepCardHeaderVisible?: boolean }` | `{ isStepCardHeaderVisible: true }` | Controls StepCard header visibility |
| `getMoveByLabel` | `(moveByOffset: number) => string` | — | Produces accessible aria label for keyboard-move buttons |
| `texts` | `DeepPartial<FilterTexts>` | — | Overrides any subset of i18n strings (merged with react-intl defaults) |

No `forwardRef`.

### `Expression`

Union type: `StepType | LogicType`

### `StepType`

| Field | Type | Description |
|-------|------|-------------|
| `type` | `'STEP'` | Discriminant |
| `id` | `string` | Unique identifier |
| `data` | `Partial<StepCardProps>` | Props passed to the StepCard |
| `logic` | `LogicType` (optional) | Logic operator displayed before this step |
| `expressionType` | `'attribute' \| 'event'` (optional) | Controls matching text variants shown in the step header |

### `LogicType`

| Field | Type | Description |
|-------|------|-------------|
| `type` | `'LOGIC'` | Discriminant |
| `id` | `string` | Unique identifier |
| `data` | `Partial<LogicProps>` | Props passed to the Logic component |

### `FilterProps`

TypeScript type re-exported for consumers.

## Usage patterns

```tsx
import Filter from '@synerise/ds-filter';
import type { Expression } from '@synerise/ds-filter';

const [expressions, setExpressions] = useState<Expression[]>([]);

<Filter
  expressions={expressions}
  matching={{ matching: true, onChange: (v) => setMatching(v) }}
  onChangeOrder={setExpressions}
  onDeleteStep={(id) => setExpressions(prev => prev.filter(e => e.id !== id))}
  onDuplicateStep={(id) => { /* clone and append */ }}
  onChangeStepName={(id, name) => { /* update */ }}
  onChangeLogic={(id, logic) => { /* update */ }}
  maxConditionsLimit={5}
  addFilterComponent={({ isLimitExceeded }) => (
    <Button disabled={isLimitExceeded} onClick={handleAdd}>Add filter</Button>
  )}
  renderStepContent={(expression) => <MyConditionEditor expression={expression} />}
  renderStepFooter={(expression) => <MyFooter expression={expression} />}
/>
```

## Styling

Styles in `Filter.styles.ts` use `@synerise/ds-core` theme palette tokens. `placeholderCss` is passed to `@synerise/ds-sortable` to style the drag-and-drop placeholder. No hardcoded values.

## Key dependencies

- `@synerise/ds-logic` — `Matching`, `Placeholder`, `Logic` components and related types
- `@synerise/ds-step-card` — `StepCard` rendered for each STEP expression
- `@synerise/ds-sortable` — drag-and-drop container used when `isDraggable` is true
- `@synerise/ds-utils` — `usePrevious`, `NOOP`, `DeepPartial`
- `react-intl` — i18n for all default text strings

## Implementation notes

- **Drag mode is automatic**: `isDraggable = Boolean(onChangeOrder && expressions.length > 1)`. With only 1 expression, static rendering is used. Drag wraps expressions in `Sortable`; without it, `ExpressionItem` is rendered directly.
- **CSS reorder animation**: On order change, the component calculates translateY offsets via DOM `getBoundingClientRect`, sets them synchronously, then clears them in a `requestAnimationFrame` to trigger CSS transitions. `z-index` is cleaned up on `transitionend`.
- **Active expression tracking**: The last-added expression becomes active (highlighted); clicking any expression activates it. Active state passes `hoverDisabled=true` to other steps' `renderStepContent`.
- **`addFilterComponent` function form**: Pass a function `(arg) => ReactNode` to receive `{ isLimitExceeded }` — useful for disabling the add button when the limit is hit. The `readOnly` prop hides the add area entirely.
- **`texts.overwritten.filterTitle`**: When set, replaces the entire matching + conditions-limit header row with a plain text title.
- **`logic` is on StepType, not separate**: The LOGIC operator before a step is embedded as `step.logic` — it is not a standalone sibling item in the `expressions` array. The `ExpressionItem` renders it conditionally (not shown for the last item or during drag).
- **`// @ts-expect-error` in ExpressionItem.tsx**: Type mismatches between `StepCardProps` and `LogicProps` are suppressed — this is a known issue.
- **Tests use Jest** (not Vitest): `jest.config.js` present — not yet migrated.
- **`react-intl` is a peer dependency** — component throws at runtime without an `IntlProvider` ancestor.
