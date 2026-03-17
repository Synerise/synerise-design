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
                  allowEmpty: true,
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

| Property                  | Description                                                                               | Type                                                                             | Default   |
| ------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------- |
| selectedFactorType        | Selected factor type                                                                      | FactorType                                                                       | -         |
| onChangeValue             | Callback called when user changes value                                                   | (value: FactorValueType) => void                                                 | -         |
| value                     | Value                                                                                     | FactorValueType                                                                  | -         |
| defaultFactorType         | Default factor type (fallback when selectedFactorType is unrecognised)                    | FactorType                                                                       | `'text'`  |
| setSelectedFactorType     | Callback called when user selects factor type                                             | (factor: FactorType) => void                                                     | -         |
| textType                  | Variant of text type input                                                                | `'autocomplete'` / `'expansible'` / `'default'`                                  | `default` |
| allowClear                | Shows clear button on inputs that support it                                              | boolean                                                                          | true      |
| withoutTypeSelector       | Whether to hide factor type selector                                                      | boolean                                                                          | false     |
| uncontrolledComponent     | Sub-components manage their own open/close state                                          | boolean                                                                          | false     |
| error                     | Shows error styling on the input                                                          | boolean                                                                          | -         |
| errorText                 | Error message text                                                                        | ReactNode                                                                        | -         |
| unavailableFactorTypes    | Array of excluded factor types                                                            | FactorType[]                                                                     | -         |
| availableFactorTypes      | Array of available factor types (allowlist)                                               | FactorType[]                                                                     | -         |
| customFactorValueComponents | Override component, name, or icon for any built-in factor type                          | Partial<FactorTypeMapping>                                                       | -         |
| factorValueExtraProps     | Pass extra icon/tooltip props to text or dynamicKey inputs                                | Partial<ExtraPropsMapping>                                                       | -         |
| autocompleteText          | Autocomplete suggestions (only when textType is `autocomplete`)                           | { options: string[] }                                                            | -         |
| formulaEditor             | Content rendered inside the formula editor modal                                          | React.ReactNode                                                                  | -         |
| getPopupContainerOverride | Popup container function for child tooltips and dropdowns                                 | (trigger: HTMLElement / null) => HTMLElement                                     | -         |
| onActivate                | Callback called when user opens dropdown                                                  | () => void                                                                       | -         |
| onDeactivate              | Callback called when user closes dropdown                                                 | () => void                                                                       | -         |
| opened                    | Externally controls whether the dropdown/modal is open                                    | boolean                                                                          | -         |
| loading                   | Shows loading state in the input                                                          | boolean                                                                          | -         |
| preventAutoloadData       | Prevents auto-fetching data in parameter input                                            | boolean                                                                          | -         |
| parameters                | Options for parameters list                                                               | ParameterOptions                                                                 | -         |
| onParamsClick             | Called when the parameter button is clicked                                               | () => void                                                                       | -         |
| arrayProps                | Options for array factor type                                                             | { itemType?: 'string' / 'number'; limit?: number; collectorSuggestions?: CollectorValue[] } | - |
| relativeDateProps         | Customise relative date display and available units                                       | { triggerValueFormatter?: (value) => string; availableUnits?: RelativeDateUnit[] } | -       |
| autoResize                | Auto-resize behaviour for text inputs                                                     | AutoResizeProp                                                                   | -         |
| inputProps                | Extra props forwarded to text inputs                                                      | Partial<InputProps>                                                              | -         |
| readOnly                  | Disables all interaction                                                                  | boolean                                                                          | -         |
| factorKey                 | Unique key for the factor instance; used to reset state on remount                        | ReactText                                                                        | -         |
| texts                     | Translations object (deep partial — any subset can be overridden)                         | DeepPartial<FactorsTexts>                                                        | -         |

### FactorType

All available factor types: `text`, `number`, `parameter`, `contextParameter`, `dynamicKey`, `formula`, `array`, `date`, `relativeDate`, `dateRange`

### FactorValueType

Type of value depends on current factor type and can contain values: `string` / `number` / `Array<string | number>` / `Date` / `undefined` / `DynamicKeyValueType` / `FormulaValueType` / `ParameterValueType` / `Partial<DateFilter>`

### DynamicKeyValueType

`{ key: React.ReactText; value: React.ReactText }`

### FormulaValueType

`{ name: string; value: string }`

### ParameterValueType

`{ type: string; icon: ReactNode; name: string; id: React.ReactText; groupId?: React.ReactText; description?: string; value?: React.ReactText | null }`

### ParameterOptions

| Property                | Description                                                | Type                     | Default |
| ----------------------- | ---------------------------------------------------------- | ------------------------ | ------- |
| buttonIcon              | Icon in button                                             | React.ReactNode          | -       |
| buttonLabel             | Label of button                                            | string / React.ReactNode | -       |
| items                   | Array of parameters                                        | ParameterItem[]          | -       |
| groups                  | Array of parameter groups                                  | ParameterGroup[]         | -       |
| recentItems             | Items shown at top as recently used                        | ParameterItem[]          | -       |
| selectedButtonColored   | Whether to use green custom color if parameter is selected | boolean                  | -       |
| renderEmptyGroups       | Show group headers even if group has no items              | boolean                  | -       |
| dropdownDimensionsConfig | Override dropdown height at different viewport sizes      | { defaultHeight?, lowerHeight?, threshold? } | - |
| showAllGroup            | **Deprecated**                                             | boolean                  | -       |
