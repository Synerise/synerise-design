---
id: condition
title: Condition
---

Condition UI Component

## Installation

```
npm i @synerise/ds-condition
or
yarn add @synerise/ds-condition
```

## Usage

```
import Condition from '@synerise/ds-condition'

<Condition
    texts={{
      stepNamePlaceholder: 'Step name',
      removeConditionRowTooltip: 'Remove',
      addConditionRowButton: 'and where',
    }}
    addCondition={() => {}}
    removeCondition={(stepId, conditionId) => {}}
    updateStepName={(stepId, name) => {}}
    minConditionsLength={1}
    maxConditionsLength={1}
    onChangeContext={(stepId, contextItem) => {}}
    onChangeSubject={(stepId, subjectItem) => {}}
    onChangeParameter={(stepId, conditionId, value) => {}}
    onChangeOperator={(stepId, conditionId, operator) => {}}
    onChangeFactorValue={(stepId, conditionId, factorValue) => {}
    onChangeFactorType={(stepId, conditionId, factorType) => {}
    steps={
      [{
        id: 1,
        stepName: 'Step #1',
        subject: {
          type: 'event',
          placeholder: 'Choose event',
          showPreview: false,
          iconPlaceholder: <NotificationsM />,
          selectedItem: undefined,
          items: SUBJECT_ITEMS,
          texts: SUBJECT_TEXTS,
        },
        context: {
          texts: CONTEXT_TEXTS,
          selectedItem: step.subject.selectedItem,
          items: CONTEXT_ITEMS,
          groups: CONTEXT_GROUPS,
        }
        conditions: [{
          id: 0,
          parameter: {
            availableFactorTypes: ['parameter'],
            selectedFactorType: 'parameter',
            defaultFactorType: 'parameter',
            setSelectedFactorType: () => {},
            value: undefined,
            parameters: {
              buttonLabel: 'Parameter',
              buttonIcon: <VarTypeStringM />,
              groups: PARAMETER_GROUPS,
              items: PARAMETER_ITEMS
            },
            withoutTypeSelector: true,
            texts: FACTORS_TEXTS,
          },
          operator: {
            value: value,
            items: OPERATORS_ITEMS,
            groups: OPERATORS_GROUPS,
            texts: OPERATORS_TEXTS,
          },
          factor: {
            selectedFactorType: 'text',
            defaultFactorType: 'text',
            textType: 'default',
            value: condition.factor.value,
            formulaEditor: <div>Formula editor</div>,
            parameters: {
              buttonLabel: 'Parameter',
              buttonIcon: <VarTypeStringM />,
              groups: PARAMETER_GROUPS,
              items: PARAMETER_ITEMS
            },
            texts: FACTORS_TEXTS,
          },
        }))
      }))
    } />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-condition--default"></iframe>

## API

| Property                  | Description                                                   | Type                                                                                              | Default               |
| ------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------- | --- |
| addCondition              | Callback called when user adds new row of conditions          | (stepId: React.ReactText) => void                                                                 | -                     |
| removeCondition           | Callback called when user clicks on remove row of condtions   | (stepId: React.ReactText, conditionRowId: React.ReactText) => void                                | -                     |
| steps                     | Array contains all steps of condition                         | ConditionStep[]                                                                                   | -                     |
| texts                     | Translations object                                           | Texts                                                                                             | -                     |
| updateStepName            | Callback called when user change the name of step             | (stepId: React.ReactText, value: string) => void                                                  | -                     |
| addStep                   | Callback called when user clicks on add step button           | () => void                                                                                        | -                     |
| duplicateStep             | Callback called when user clicks on duplicate step button     | (stepId: React.ReactText) => void                                                                 | -                     |
| removeStep                | Callback called when user clicks on remove step button        | (stepId: React.ReactText) => void                                                                 | -                     |
| onChangeOrder             | Callback called when user change order of steps               | (order: ConditionStep[]) => void                                                                  | -                     |
| autoClearCondition        | Automatically fires clearing values of dependent elements     | Boolean                                                                                           | false                 |
| minConditionsLength       | Minimal length of conditions in step                          | number                                                                                            | -                     |
| maxConditionsLength       | Maximal length of conditions in step                          | number \ undefined                                                                                | -                     |
| onChangeContext           | Callback called when user change value of step context        | (stepId: React.ReactText, value: ContextItem \ ContextGroup \ undefined) => void                  | -                     |
| onChangeSubject           | Callback called when user change value of step subject        | (stepId: React.ReactText, value: SubjectItem \ undefined) => void                                 | -                     |
| onChangeParameter         | Callback called when user change value of condition parameter | (stepId: React.ReactText, conditionId: React.ReactText, value: ParameterValue)                    | -                     |
| onChangeOperator          | Callback called when user change value of condition operator  | (stepId: React.ReactText, conditionId: React.ReactText, value: OperatorsItem \ undefined) => void | -                     |
| onChangeFactorValue       | Callback called when user change value of condition factor    | (stepId: React.ReactText, conditionId: React.ReactText, value: OperatorsType \ undefined) => void | -                     |
| onChangeFactorType        | Callback called when user change type of condition factor     | (stepId: React.ReactText, conditionId: React.ReactText, value: FactorType \ undefined) => void    | -                     |
| onUpdateStepName          | Callback called when user change the name of step condition   | (stepId: React.ReactText, value: string) => void                                                  | -                     |
| onDeactivate              | Callback called when user blur on of the condition inputs     | (stepId: React.ReactText, conditionId: string) => void                                            | -                     |
| getPopupContainerOverride | Popup container function for child tooltips and dropdowns     | (trigger: HTMLElement                                                                             | null) => HTMLElement; | -   |
| defaultOpenedComponent    | Component which should be opened after render                 | 'subject' \ 'operator' \ 'factor' \ 'parameter' \ 'context'                                       | -                     |
| inputProps                | group of props from ds-factors types                          | InputProps                                                                                        | -                     |

### ConditionStep

| Property                  | Description                                               | Type                                                      | Default               |
| ------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------- | --- |
| conditions                | Rows of conditions                                        | StepConditions[]                                          | -                     |
| id                        | Id of condition step                                      | React.ReactText                                           | -                     |
| stepName                  | The name of step                                          | string                                                    | -                     |
| subject                   | Subject options                                           | [SubjectProps](/docs/components/subject)                  | -                     |
| context                   | ContextSelector options                                   | [ContextSelectorProps](/docs/components/context-selector) | -                     |
| getPopupContainerOverride | Popup container function for child tooltips and dropdowns | (trigger: HTMLElement                                     | null) => HTMLElement; | -   |

### StepConditions

| Property   | Description                | Type                                         | Default |
| ---------- | -------------------------- | -------------------------------------------- | ------- |
| factor?    | Factors selector options   | [FactorsProps](/docs/components/factors)     | -       |
| id         | Id condition row           | React.ReactText                              | -       |
| operator?  | Operators selector options | [OperatorsProps](/docs/components/operators) | -       |
| parameter? | Parameter selector options | [FactorsProps](/docs/components/factors)     | -       |

#### Selectors appereance rules

- Parameter appers when `parameter` prop is provided
- Operator appears without Parameter when `operator` prop is provided and `parameter` prop is not provided
- Operator with Parameter appers when `operator` and `parameter` pros are provided and `parameter.value` is set
- Factor appears only when `operator` prop and `operator.value` are provided

See [Condition.spec.tsx](./src/__specs__/Condition.spec.tsx) for code examples

### Texts

| Property                  | Description                             | Type   | Default |
| ------------------------- | --------------------------------------- | ------ | ------- |
| addConditionRowButton     | Label of add conditions row button      | string | -       |
| removeConditionRowTooltip | Tooltip on remove conditions row button | string | -       |
| stepNamePlaceholder       | Placeholder of step name                | string | -       |
| addStep                   | Label of add step button                | string | -       |
| duplicateTooltip          | Tooltip on duplicate step button        | string | -       |
| moveTooltip               | Tooltip on move step button             | string | -       |
| removeTooltip             | Tooltip on remove step button           | string | -       |
| dropLabel                 | Label on drop zone                      | string | -       |
