---
id: filter
title: Filter
---

Filter UI Component

## Installation

```
npm i @synerise/ds-filter
or
yarn add @synerise/ds-filter
```

## Usage

```
import Filter from '@synerise/ds-filter'

<Filter
  expressions={[]}
  addFilterComponent={({ isLimitExceeded }) => <button disabled={isLimitExceeded}>Add filter</button>}
  onChangeLogic={(stepId, logicValue) => {}}
  onChangeOrder={(expressions) => {}}
  onChangeStepMatching={(stepId, matchingValue) => {}}
  onChangeStepName={(stepId, name) => {}}
  onDeleteStep={(stepId) => {}}
  onDuplicateStep={(stepId) => {}}
  renderStepFooter={(expression) => <span>Footer</span>}
  renderStepContent={(expression) => <span>Content</span>}
  matching={{
    onChange: (matchingValue) => {},
    matching: false,
  }}
  texts={{
    step: {
      matching: 'Matching',
      notMatching: 'Not matching',
      namePlaceholder: 'name',
      moveTooltip: 'Move',
      deleteTooltip: 'Delete',
      duplicateTooltip: 'Duplicate',
    },
    matching: {
      matching: 'matching',
      notMatching: 'not matching',
    },
    addFilter: 'Add filter',
    dropMeHere: 'Drop me here',
  }}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-filter--default"></iframe>

## API

| Property                  | Description                                                                                             | Type                                                                                            | Default                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------- |
| expressions               | Array of expressions                                                                                    | Expression[]                                                                                    | -                                   |
| matching                  | Main matching configuration                                                                             | MatchingProps                                                                                   | -                                   |
| onChangeOrder             | Called when user changes order; also enables drag mode when 2+ expressions                              | (newOrder: Expression[]) => void                                                                | -                                   |
| onChangeLogic             | Called when user changes value of Logic                                                                 | (id: string, logic: LogicOperatorValue) => void                                                 | -                                   |
| onChangeStepMatching      | Called when user changes value of StepCard matching                                                     | (id: string, matching: boolean) => void                                                         | -                                   |
| onChangeStepName          | Called when user changes name of StepCard                                                               | (id: string, name: string) => void                                                              | -                                   |
| onDeleteStep              | Called when user clicks delete StepCard icon                                                            | (id: string) => void                                                                            | -                                   |
| onDuplicateStep           | Called when user clicks duplicate; hidden when maxConditionsLimit exceeded                              | (id: string) => void                                                                            | -                                   |
| addFilterComponent        | Add filter button area; hidden in readOnly; function form receives { isLimitExceeded }                  | ReactNode or ((arg: { isLimitExceeded: boolean }) => ReactNode)                                 | -                                   |
| renderHeaderRightSide     | Renders filter header right side slot                                                                   | (expressions: Expression[]) => React.ReactNode                                                  | -                                   |
| renderStepFooter          | Renders footer of each StepCard                                                                         | (expression: Expression) => React.ReactNode                                                     | -                                   |
| renderStepContent         | Renders content of each StepCard; hoverDisabled is true when another step is active                     | (expression: Expression, hoverDisabled?: boolean) => React.ReactNode                            | -                                   |
| renderStepHeaderRightSide | Renders right side slot in each StepCard header                                                         | (expression: Expression, index: number, options?: { placeholder?: boolean }) => React.ReactNode | -                                   |
| logicOptions              | Available logic operator choices                                                                        | LogicOperator[]                                                                                 | -                                   |
| maxConditionsLimit        | Shows count/limit in header; disables duplicate when reached                                            | number                                                                                          | -                                   |
| readOnly                  | Disables all editing interactions                                                                       | boolean                                                                                         | false                               |
| singleStepCondition       | Passes single-condition variant flag to StepCard                                                        | boolean                                                                                         | false                               |
| visibilityConfig          | Controls StepCard header visibility                                                                     | { isStepCardHeaderVisible?: boolean }                                                           | { isStepCardHeaderVisible: true }   |
| getMoveByLabel            | Returns accessible aria label for keyboard-move buttons                                                 | (moveByOffset: number) => string                                                                | -                                   |
| texts                     | Object with translations (deep partial — any subset can be overridden)                                  | DeepPartial<FilterTexts>                                                                        | -                                   |

### Expression

| Property       | Description                                            | Type                                              | Default |
| -------------- | ------------------------------------------------------ | ------------------------------------------------- | ------- |
| type           | Type of expression: STEP or LOGIC                      | 'STEP' or 'LOGIC'                                 | -       |
| id             | Id of expression                                       | string                                            | -       |
| data           | Object with props of expression, based on type         | Partial<StepCardProps> or Partial<LogicProps>      | -       |
| logic          | Logic operator before this step (STEP only)            | LogicType                                         | -       |
| expressionType | Controls matching text variant (STEP only)             | 'attribute' or 'event'                            | -       |

### FilterTexts

| Property    | Description                                     | Type          | Default        |
| ----------- | ----------------------------------------------- | ------------- | -------------- |
| matching    | Object with translations for Matching component | MatchingTexts | -              |
| step        | Object with translations for StepCard component | object        | -              |
| addFilter   | Label of AddFilter button                       | string        | 'Add filter'   |
| dropMeHere  | Label of drop area                              | string        | 'Drop me here' |
| placeholder | Object with placeholder translations            | object        | -              |
| overwritten | Object for header overrides (filterTitle)       | object        | -              |
