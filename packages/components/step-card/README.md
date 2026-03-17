---
id: step-card
title: StepCard
---

StepCard UI Component

## Installation

```
npm i @synerise/ds-step-card
or
yarn add @synerise/ds-step-card
```

## Usage

```jsx
import StepCard from '@synerise/ds-step-card'

<StepCard
  matching={true}
  onChangeMatching={(matchingValue) => {}}
  name={'funnel'}
  onMove={(index, offset) => reorder(index, offset)}
  expressionIndex={0}
  expressionCount={3}
  onDuplicate={() => {}}
  onDelete={() => {}}
  texts={{
    matching: 'Matching',
    notMatching: 'Not matching',
    namePlaceholder: 'Placeholder',
    moveTooltip: 'Move',
    deleteTooltip: 'Delete',
    duplicateTooltip: 'Duplicate',
  }}
  footer={<span>Footer</span>}
>
  <span>Content</span>
</StepCard>
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-step-card--default"></iframe>

## API

| Property                | Description                                                                                             | Type                                                                  | Default |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------- |
| matching                | Current matching state; shown via Matching toggle                                                       | boolean                                                               | -       |
| onMove                  | Called after 1000ms debounce with current index and cumulative offset                                   | (index: number, offset: number) => void                               | -       |
| expressionIndex         | Current position in the list                                                                            | number                                                                | -       |
| expressionCount         | Total number of steps; used to disable move up/down at boundaries                                       | number                                                                | -       |
| name                    | Step name                                                                                               | string                                                                | -       |
| children                | Condition content rendered in the body                                                                  | React.ReactNode                                                       | -       |
| footer                  | Content rendered in the footer section                                                                  | React.ReactNode                                                       | -       |
| onChangeMatching        | Called when the matching toggle is clicked                                                              | (matching: boolean) => void                                           | -       |
| onDelete                | Called when delete icon is clicked                                                                      | () => void                                                            | -       |
| onDuplicate             | Called when duplicate icon is clicked                                                                   | () => void                                                            | -       |
| texts                   | Object with translations                                                                                | Partial\<StepCardTexts\>                                              | -       |
| isHeaderVisible         | Whether to render the header section                                                                    | boolean                                                               | `true`  |
| isDraggable             | Shows drag handle icon and enables drag cursor                                                          | boolean                                                               | `true`  |
| readOnly                | Hides cruds, drag handle, and disables matching toggle                                                  | boolean                                                               | `false` |
| singleStepCondition     | Removes bottom padding from body                                                                        | boolean                                                               | `false` |
| headerRightSide         | Static content in the header right slot                                                                 | React.ReactNode                                                       | -       |
| renderHeaderRightSide   | Dynamic right-side renderer; also called in drag placeholder with `placeholder: true`                   | (index: number, options?: { placeholder?: boolean }) => React.ReactNode | -     |
| getMoveByLabel          | Custom accessible label for the pending move                                                            | (moveByOffset: number) => string                                      | -       |
| dropLabel               | Content shown in the drag placeholder (blue dashed area)                                               | React.ReactNode                                                       | -       |
| additionalFields        | Extra content rendered between body and footer, separated by a border                                   | JSX.Element                                                           | -       |
| expressionMoved         | Set `true` to show a success "Moved" alert for 2000ms                                                  | boolean                                                               | -       |
| dragHandleProps         | dnd-kit drag handle attributes/listeners (from `@synerise/ds-sortable`)                                | DragHandlePropType                                                    | -       |
| isDragged               | When `true`, hides body content and shows the blue dashed placeholder                                  | boolean                                                               | -       |
| isDragOverlay           | When `true`, renders a compact preview (76px, no footer, no right side)                                | boolean                                                               | -       |
| dragIndex               | Index passed to `renderHeaderRightSide` during drag overlay rendering                                  | number                                                                | -       |

### StepCardTexts

| Property         | Description                                               | Type   | Default          |
| ---------------- | --------------------------------------------------------- | ------ | ---------------- |
| matching         | Label of Toggle component, visible when matching is true  | string | `'Performed'`    |
| notMatching      | Label of Toggle component, visible when matching is false | string | `'Not performed'`|
| conditionType    | Condition type label when matching                        | string | `'event'`        |
| notConditionType | Condition type label when not matching                    | string | `'event'`        |
| namePlaceholder  | Placeholder of step name                                  | string | `'Name'`         |
| moveTooltip      | Tooltip on move icon                                      | string | `'Move'`         |
| moveUpTooltip    | Tooltip on move up icon                                   | string | `'Move Up'`      |
| moveDownTooltip  | Tooltip on move down icon                                 | string | `'Move Down'`    |
| deleteTooltip    | Tooltip on delete icon                                    | string | `'Delete'`       |
| duplicateTooltip | Tooltip on duplicate icon                                 | string | `'Duplicate'`    |
