---
id: factors
title: Factors
---

Factors UI Component

## Installation
```
npm i @synerise/ds-factors
or
yarn add @synerise/ds-factors
```

## Usage
```
import Factors from '@synerise/ds-factors'

<Factors
    selectedFactorType='text'
    setSelectedFactorType={(type) => {} }
    value='Value'
    onChangeValue={(value) => {}}
    textType='default'
    defaultFactorType='text'
    autocompleteText={{
      options: ['First name', 'Last name', 'City', 'Age', 'Points']
    }}
    unavailableFactorTypes={['number', 'formula']}
    parameters={{
      buttonLabel: 'Parameter',
      buttonIcon: <VarTypeStringM />,
      groups: [{
                  name: 'Recent',
                  id: 1,
                  defaultGroup: true,
                },{
                  name: 'All',
                  id: 2,
                  subGroups: [{
                    name: 'Attributes',
                    id: 3,
                    icon: <FolderM />
                  }],
      items: [{
                  id: 0,
                  name: 'First name',
                  groupId: 1,
                  icon: <VarTypeStringM />,
                },
                {
                  id: 1,
                  name: 'Last name',
                  groupId: 1,
                  icon: <VarTypeStringM />,
                },
                {
                  id: 2,
                  name: 'City',
                  groupId: 1,
                  icon: <VarTypeStringM />,
                },]
    }}
    withoutTypeSelector={false}
    formulaEditor={<div>Formula editor</div>}
    texts={{
        datePicker: {
            apply: 'Apply',
            clearTooltip: 'Clear',
            inputPlaceholder: 'Select date',
            now: 'Now',
          },
        dynamicKey: {
            keyPlaceholder: 'Key',
            valuePlaceholder: 'Value',
          },
        formula: {
            buttonPlaceholder: 'Define formula',
            defaultName: 'Formula'
          },
        parameter: {
            searchPlaceholder: 'Search',
            noResults: 'No results',
          },
        valuePlaceholder: 'Value',
        modalApply: 'Apply',
        modalCancel: 'Cancel',
        modalTitle: 'Value'
    }}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-factors--default"></iframe>

## API

| Property               | Description                                                                               | Type                             | Default   | 
| ---                    | ---                                                                                       | ---                              | ---       | 
| autocompleteText       | Array of available autocomplete suggestions (only if textType is equal to `autocomplete`) | {options: string[]}              | -         | 
| defaultFactorType      | Default factor type                                                                       | FactorType                       | -         | 
| formulaEditor          | Formula editor render in modal when factory type is equal to `formula`                    | React.ReactNode                  | -         | 
| onChangeValue          | Callback called when user change value                                                    | (value: FactorValueType) => void | -         | 
| opened                 | Whether if dropdown should opens from outside of component                                | boolean                          | false     | 
| parameters             | Options for parameters list                                                               | ParameterOptions                  | -         | 
| selectedFactorType     | Selected factor type                                                                      | FactorType                       | -         | 
| setSelectedFactorType  | Callback called when user selects factor type                                             | (factor: FactorType) => void     | -         | 
| texts                  | Translations object                                                                       | FactorsTexts                     | -         | 
| textType               | Variant of text type input (`autocomplete` \ `expansible` \ `default` )                   | string                           | `default` | 
| unavailableFactorTypes | Array of excluded factor types                                                            | FactorType[]                     | -         | 
| value                  | Value                                                                                     | FactorValueType                  | -         | 
| withoutTypeSelector    | Whether if hide factor type selector                                                      | boolean                          | -         | 

### FactorType

All available factor types: `text`, `number`, `parameter`, `contextParameter`, `dynamicKey`, `formula`, `array`, `date`,

### FactorValueType

Type of value depends on current factor type and can contain values: `string` \ `number` \ `Date` \ `undefined` \ `DynamicKeyValueType` \ `FormulaValueType` \ `ParameterValueType`;

### DynamicKeyValueType

`{ 
    key: React.ReactText; 
    value: React.ReactText 
}`

### FormulaValueType

`{ 
    name: string; 
    value: string 
}`

### ParameterValueType

`{
  type: string;
  icon: string;
  name: string;
  id: React.ReactText;
}`

### ParameterOptions

| Property     | Description                | Type                     | Default | 
| ---          | ---                        | ---                      | ---     | 
| buttonIcon   | Icon in button             | React.ReactNode          | -       | 
| buttonLabel  | Label of button            | string \ React.ReactNode | -       | 
| groups       | Array of parameter groups  | ParameterGroup[]         | -       | 
| items        | Array of parameters        | ParameterItem[]          | -       | 
| showAllGroup | Whether to show all groups | boolean                  | false   | 
