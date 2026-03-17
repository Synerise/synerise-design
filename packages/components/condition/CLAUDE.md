# Condition (`@synerise/ds-condition`)

> Multi-step condition builder that composes Subject/Context selectors, parameter/operator/factor selectors, and drag-and-drop step reordering into a single controlled component.

## Package structure

```
src/
  Condition.tsx           — main component, manages active-field state machine
  Condition.types.ts      — all prop interfaces and shared types
  Condition.style.ts      — styled-components for the whole tree
  Condition.spec.tsx      — unit tests (in __specs__/)
  constants.ts            — field-type string constants and DEFAULT_INPUT_PROPS
  index.ts                — public exports
  hooks/
    useTranslations.ts    — react-intl hook, merges defaults with texts prop
  ConditionStep/
    ConditionStep.tsx     — per-step wrapper (subject/context, header, rows)
    ConditionStep.types.ts
    StepHeader/           — drag handle + inline-edit step name + CRUD actions
    StepName/             — read-only "Step N · name" label (used in drag overlay)
    ConditionRow/         — single parameter → operator → factor row
    AddCondition/         — "Add condition" button with disabled/error state
    EmptyCondition/       — placeholder shown before subject/context is selected
```

## Public exports

### `Condition` (default export)

Primary component. No `forwardRef`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `ConditionStep[]` | — | **Required.** Array of step data. |
| `minConditionsLength` | `number` | `1` | **Required.** Minimum conditions per step (hides remove button at this count). |
| `onChangeContext` | `(stepId, value) => void` | — | **Required.** Called when context selector changes. |
| `onChangeSubject` | `(stepId, value) => void` | — | **Required.** Called when subject selector changes. |
| `onChangeParameter` | `(stepId, conditionId, value) => void` | — | **Required.** |
| `onChangeOperator` | `(stepId, conditionId, value) => void` | — | **Required.** |
| `onChangeFactorValue` | `(stepId, conditionId, value) => void` | — | **Required.** |
| `onChangeFactorType` | `(stepId, conditionId, value) => void` | — | **Required.** |
| `maxConditionsLength` | `number \| undefined` | `undefined` | Hides "Add condition" button when reached. |
| `addCondition` | `(stepId) => string \| void` | — | Returns new condition id; used to auto-focus it. |
| `removeCondition` | `(stepId, conditionRowId) => void` | — | |
| `addStep` | `() => ReactText \| void` | — | Returns new step id; used to auto-focus it. |
| `renderAddStep` | `() => ReactNode` | — | Replaces the default "Add step" button. Hidden in `readOnly` mode. |
| `removeStep` | `(stepId) => void` | — | |
| `duplicateStep` | `(stepId) => void` | — | |
| `onChangeOrder` | `(newOrder: ConditionStep[]) => void` | — | Enables drag-to-reorder when provided AND `steps.length > 1`. |
| `onUpdateStepName` | `(stepId, value) => void` | — | Shows editable step name header when provided. |
| `onChangeActionAttribute` | `(stepId, value) => void` | — | |
| `onDeactivate` | `(stepId, conditionId) => void` | — | Fires when active field is blurred/cleared. |
| `texts` | `Partial<ConditionTexts>` | see `useTranslations` | Override any label. Uses `react-intl` defaults. |
| `autoClearCondition` | `boolean` | `false` | When `true`, changing subject/context/parameter clears downstream values. |
| `readOnly` | `boolean` | `false` | Disables all editing; hides add/remove/duplicate controls. |
| `singleStepCondition` | `boolean` | — | Hides step CRUD and drag handle (single-step mode). |
| `showActionAttribute` | `boolean` | — | Renders action-attribute selector after subject/context selection. |
| `showEmptyConditionPlaceholder` | `boolean` | `false` | Shows `EmptyCondition` placeholder when no subject/context chosen. |
| `showSuffix` | `boolean` | — | Renders `conditionSuffix` text ("and") between condition rows. |
| `hoverDisabled` | `boolean` | — | Disables hover highlight on steps. Also set automatically on non-active steps. |
| `autoOpenedComponent` | `'subject' \| 'operator' \| 'factor' \| 'parameter' \| 'context'` | `''` | Which selector to auto-open on mount (only if operator has no value). |
| `type` | `'attribute' \| 'event'` | — | Passed through to sub-components. |
| `inputProps` | `Partial<InputProps>` | `{ autoResize: { minWidth: '173px', stretchToFit: true } }` | Merged with `DEFAULT_INPUT_PROPS` for factor text inputs. |
| `factorValueExtraProps` | `FactorsProps['factorValueExtraProps']` | — | Extra props forwarded to all factor value components. |
| `getPopupContainerOverride` | `(trigger) => HTMLElement` | — | Overrides popup container for all nested dropdowns/tooltips. |
| `contextSelectorComponent` | `ComponentType<CustomContextSelectorProps>` | — | Replaces default context selector. |
| `parameterSelectorComponent` | `ComponentType<FactorValueComponentProps>` | — | Replaces default parameter value component. |
| `factorParameterSelectorComponent` | `ComponentType<FactorValueComponentProps>` | — | Replaces default factor parameter selector. |
| `actionAttributeParameterSelectorComponent` | `ComponentType<FactorValueComponentProps>` | — | Replaces default action-attribute parameter selector. |

### `ConditionStep` (type)

Shape of each element in `steps`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ReactText` | Unique step id. |
| `conditions` | `StepConditions[]` | At least one required. |
| `stepName` | `string?` | Display name; editable when `onUpdateStepName` is provided. |
| `subject` | `Omit<SubjectProps, 'onSelectItem'>?` | Renders a Subject selector if provided (mutually exclusive with `context`). |
| `context` | `Omit<ContextProps, 'onSelectItem'>?` | Renders a Context selector if provided. |
| `actionAttribute` | `Omit<FactorsProps, 'onChangeValue' \| 'selectedFactorType' \| 'defaultFactorType'>?` | Optional action-attribute selector; shown when `showActionAttribute` is true. |
| `addConditionErrorText` | `ReactNode?` | Error shown below the "Add condition" button. |

### `StepConditions` (type)

Shape of each element in `ConditionStep.conditions`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ReactText` | Unique condition id. |
| `parameter` | `Omit<FactorsProps, 'onChangeValue'>?` | Rendered when provided. |
| `operator` | `Omit<OperatorsProps, 'onChange'>?` | Rendered when `parameter.value` is set (or when `parameter` is absent). |
| `factor` | `Omit<FactorsProps, 'onChangeValue' \| 'setSelectedFactorType'> & { withCustomFactor?: ReactNode }?` | Rendered only when `operator.value` is set. |

### `ConditionTexts` (type)

All keys are `string | ReactNode`. Defaults provided via `react-intl`:

| Key | Default |
|-----|---------|
| `stepNamePrefix` | `'Step'` |
| `stepNamePlaceholder` | `'Step name'` |
| `emptyConditionLabel` | `'Choose event first'` |
| `removeConditionRowTooltip` | `'Delete'` |
| `addConditionRowButton` | `'Add condition'` |
| `addFirstConditionRowButton` | `'Add condition'` |
| `addStep` | `'Add step'` |
| `dropLabel` | `'Drop me here'` |
| `moveTooltip` | `'Move'` |
| `duplicateTooltip` | `'Duplicate'` |
| `removeTooltip` | `'Delete'` |
| `conditionSuffix` | `'and'` |

### `ConditionStepCrudActions` (type)

`{ removeStep?, duplicateStep? }` — intersected into `ConditionProps`.

## Usage patterns

```tsx
import Condition from '@synerise/ds-condition';

// Minimal controlled usage
<Condition
  steps={steps}
  minConditionsLength={1}
  onChangeSubject={(stepId, value) => {}}
  onChangeContext={(stepId, value) => {}}
  onChangeParameter={(stepId, conditionId, value) => {}}
  onChangeOperator={(stepId, conditionId, value) => {}}
  onChangeFactorValue={(stepId, conditionId, value) => {}}
  onChangeFactorType={(stepId, conditionId, value) => {}}
/>

// With full step management
<Condition
  {...baseProps}
  addStep={() => newId}
  removeStep={(id) => {}}
  duplicateStep={(id) => {}}
  addCondition={(stepId) => newConditionId}
  removeCondition={(stepId, condId) => {}}
  onChangeOrder={(ordered) => setSteps(ordered)}
  onUpdateStepName={(stepId, name) => {}}
  autoClearCondition
  texts={{ addStep: 'New step', addConditionRowButton: 'and where' }}
/>
```

## Selector appearance rules

Within each `ConditionRow`:
1. **Parameter** appears when `parameter` prop is provided.
2. **Operator** appears when `operator` is provided AND (`parameter` is absent OR `parameter.value` is set).
3. **Factor** appears only when `operator.value` is set.

## Custom hooks

### `useTranslations`

Merges the `texts` prop with react-intl defaults. Requires `IntlProvider` in the tree. Returns a complete `ConditionTexts` object — never partial.

## Key dependencies

- `@synerise/ds-sortable` — `SortableContainer` + `DragOverlay` for step reordering (dnd-kit based)
- `@synerise/ds-factors` — parameter and factor value selectors
- `@synerise/ds-operators` — operator dropdown
- `@synerise/ds-subject` — subject selector
- `@synerise/ds-context-selector` — context selector
- `@synerise/ds-cruds` — duplicate/delete action buttons in StepHeader
- `@synerise/ds-inline-edit` — editable step name with debounce
- `react-intl` — i18n for default labels

## Implementation notes

- **Controlled-only** — the component holds no data state. All step and condition data lives in the parent. The component only manages UI state: which step/condition/field is currently active (`currentStepId`, `currentConditionId`, `currentField`).
- **Active-field state machine** — selecting a subject auto-advances focus to `parameter` (or `actionAttribute` if `showActionAttribute`). Selecting a parameter advances to `operator`. Selecting an operator advances to `factor`. This is implemented via `setCurrentField` calls in `selectSubject`, `selectContext`, `selectParameter`, `selectOperator`.
- **Drag is only enabled** when both `onChangeOrder` is provided AND `steps.length > 1`. The drag handle and `SortableContainer` are always rendered; the handle just has no effect without these.
- **`autoClearCondition`** — when `true`, changing subject/context also fires `onChangeParameter`, `onChangeOperator`, `onChangeFactorValue` with `undefined` for all existing conditions, and removes all conditions beyond the first. This clears downstream values but the parent must still handle the callbacks to update its state.
- **`hoverDisabled`** is also set automatically on steps that are not the currently active step (`currentStepId !== step.id`), creating a "focus" effect.
- **`renderAddStep`** is hidden in `readOnly` mode; `addStep` button is also skipped when `addStep` prop is absent.
- **`data-popup-container`** attribute is on the root `S.Condition` element — used as the default popup container by nested dropdowns.
- **`IntlProvider` required** — `useTranslations` calls `useIntl()`. If the app does not wrap with `IntlProvider`, this will throw. Provide `texts` prop with all keys as a workaround if needed.