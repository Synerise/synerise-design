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
    steps={
      [{
        id: 1,
        stepName: 'Step #1',
        subject: {
          selectItem: (item) => setStepSubject(step.id, item),
          type: 'event',
          placeholder: 'Choose event',
          showPreview: false,
          iconPlaceholder: <NotificationsM />,
          selectedItem: undefined,
          items: SUBJECT_ITEMS,
          texts: SUBJECT_TEXTS,
        },
        conditions: [{
          id: 0,
          parameter: {
            availableFactorTypes: ['parameter'],
            selectedFactorType: 'parameter',
            defaultFactorType: 'parameter',
            setSelectedFactorType: () => {},
            onChangeValue: (value) => {},
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
            onChange: (value) => {},
            value: value,
            items: OPERATORS_ITEMS,
            groups: OPERATORS_GROUPS,
            texts: OPERATORS_TEXTS,
          },
          factor: {
            selectedFactorType: 'text',
            defaultFactorType: 'text',
            setSelectedFactorType: (factorType) => {},
            onChangeValue: (value) => {},
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

| Property        | Description                                                 | Type                                                               | Default | 
| ---             | ---                                                         | ---                                                                | ---     | 
| addCondition    | Callback called when user adds new row of conditions        | (stepId: React.ReactText) => void                                  | -       | 
| removeCondition | Callback called when user clicks on remove row of condtions | (stepId: React.ReactText, conditionRowId: React.ReactText) => void | -       | 
| steps           | Array contains all steps of condition                       | ConditionStep[]                                                    | -       |
| texts           | Translations object                                         | Texts                                                              | -       |
| updateStepName  | Callback called when user change the name of step           | (stepId: React.ReactText, value: string) => void                   | -       |  

### ConditionStep

| Property   | Description          | Type                                     | Default | 
| ---        | ---                  | ---                                      | ---     | 
| conditions | Rows of conditions   | StepConditions[]                         | -       |
| id         | Id of condition step | React.ReactText                          | -       | 
| stepName   | The name of step     | string                                   | -       | 
| subject    | Subject options      | [SubjectProps](/docs/components/subject) | -       |  
 
### StepConditions

| Property   | Description                | Type                                         | Default | 
| ---        | ---                        | ---                                          | ---     | 
| factor?    | Factors selector options   | [FactorsProps](/docs/components/factors)     | -       |
| id         | Id condition row           | React.ReactText                              | -       | 
| operator?  | Operators selector options | [OperatorsProps](/docs/components/operators) | -       | 
| parameter? | Parameter selector options | [FactorsProps](/docs/components/factors)     | -       |  



### Texts

| Property                  | Description                             | Type   | Default | 
| ---                       | ---                                     | ---    | ---     | 
| addConditionRowButton     | Label of add conditions row button      | string | -       |
| removeConditionRowTooltip | Tooltip on remove conditions row button | string | -       | 
| stepNamePlaceholder       | Placeholder of step name                | string | -       |  

