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
  onAdd={() => {}}
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

| Property                  | Description                                                 | Type                                                       | Default |
| ------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------- | ------- |
| expressions               | Array of expressions                                        | Expression[]                                               | -       |
| matching                  | Main matching configuration                                 | : MatchingProps                                            | -       |
| onChangeOrder             | Function called when user change order of StepCards         | (newOrder: Expression[]) => void                           | -       |
| onChangeLogic             | Function called when user change value of Logic             | (id: string, logic: LogicOperatorValue) => void            | -       |
| onChangeStepMatching      | Function called when user change value of StepCard matching | (id: string, matching: boolean) => void                    | -       |
| onChangeStepName          | Function called when user change name of StepCard           | (id: string, name: string) => void                         | -       |
| onDeleteStep              | Function called when user click on delete StepCard icon     | (id: string) => void                                       | -       |
| onDuplicateStep           | Function called when user click on duplicate StepCard icon  | (id: string) => void                                       | -       |
| renderHeaderRightSide     | Renders filter header right side slot                       | (expressions: Expression[]) => React.ReactNode;            | -       |
| renderStepFooter          | Function which renders footer of StepCard                   | (expression: Expression) => React.ReactNode                | -       |
| renderStepContent         | Function which render content of StepCard                   | (expression: Expression) => React.ReactNode                | -       |
| renderStepHeaderRightSide | Function which renders right side slot in StepCard header   | (expression: Expression, index: number) => React.ReactNode | -       |
| onAdd                     | Function called when user click on AddFilter button         | () => void                                                 | -       |
| texts                     | Object with translations                                    | FilterTexts                                                | -       |

### Expression

| Property | Description                                         | Type                                             | Default |
| -------- | --------------------------------------------------- | ------------------------------------------------ | ------- |
| type     | Type of expression: `STEP` or `LOGIC`               | `STEP` \ `LOGIC`                                 | -       |
| id       | Id of expression                                    | string                                           | -       |
| data     | Object with props of expression, base of type value | `Partial<StepCardProps>` \ `Partial<LogicProps>` | -       |
| logic    | Logic component related to Step expression          | `Expression`                                     | -       |

### FilterTexts

| Property   | Description                                     | Type          | Default        |
| ---------- | ----------------------------------------------- | ------------- | -------------- |
| matching   | Object with translations for Matching component | MatchingTexts | -              |
| step       | Object with translations for StepCard component | StepCardTexts | -              |
| addFilter  | Label of AddFilter button                       | string        | 'Add filter'   |
| dropMeHere | Label of drop area                              | string        | 'Drop me here' |
