---
id: operators
title: Operators
---

Operators UI Component

## Installation

```
npm i @synerise/ds-operators
or
yarn add @synerise/ds-operators
```

## Usage

```
import Operators from '@synerise/ds-operators'

<Operators
    texts={{
      buttonLabel: 'Choose',
      searchPlaceholder: 'Search',
      noResults: 'No results',
    }}
    onChange={(item) => {}}
    value={{
      'id': 'NUMBER_ONEEQUAL',
      'value': 'NUMBER_ONEEQUAL',
      'logic': 'EQUAL',
      'name': 'Equal',
      'groupId': 'NUMBER_ONE',
      'group': 'NUMBER_ONE',
      'icon': <HashM />,
    }}
    items={[ {
      'id': 'NUMBER_ONEEQUAL',
      'value': 'NUMBER_ONEEQUAL',
      'logic': 'EQUAL',
      'name': 'Equal',
      'groupId': 'NUMBER_ONE',
      'group': 'NUMBER_ONE',
      'icon': <HashM />,
    },
      {
        'id': 'DATE_ONEMORE',
        'value': 'DATE_ONEMORE',
        'logic': 'MORE',
        'name': 'More than',
        'groupId': 'DATE_ONE',
        'group': 'DATE_ONE',
        'icon': <CalendarM />,
        'groupName': 'Date',
      }]}
    groups={[{
      'id': 'DATE_ONE',
      'name': 'Date',
      'itemsType': null,
      'tooltip': 'Date',
      'icon': <CalendarM />,
      'defaultGroup': true,
    }, {
      'id': 'NUMBER_ONE',
      'name': 'Number',
      'itemsType': null,
      'tooltip': 'Number',
      'icon': <HashM />,
      'defaultGroup': false,
    }]}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-operators--default"></iframe>

## API

| Property                  | Description                                                | Type                                                       | Default   |
| ------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | --------- |
| error                     | error validation                                           | boolean                                                    | -         |
| getPopupContainerOverride | Popup container function for child tooltips and dropdowns  | (trigger: HTMLElement \ null) => HTMLElement;              | -         |
| groups                    | Groups of operators                                        | OperatorsGroup[]                                           | []        |
| items                     | Array of operators                                         | OperatorsItem[]                                            | []        |
| onActivate                | Callback called when user opens dropdown                   | (fieldType: string) => void                                | -         |
| onChange                  | Callback called when user selects operator                 | (item: OperatorsItem \ OperatorsGroup \ undefined) => void | -         |
| onDeactivate              | Callback called when user closes dropdown                  | () => void                                                 | -         |
| opened                    | Whether if dropdown should opens from outside of component | boolean                                                    | false     |
| texts                     | Translations object                                        | OperatorTexts                                              | -         |
| value                     | Selected operator                                          | OperatorsItem \ undefined                                  | undefined |

### OperatorsGroup

| Property     | Description                      | Type             | Default |
| ------------ | -------------------------------- | ---------------- | ------- |
| defaultGroup | Whether if this group is default | boolean          | false   |
| icon         | Icon of group                    | React.ReactNode  | -       |
| id           | Id of group                      | React.ReactText  | -       |
| itemType     | Type of items                    | string           | -       |
| name         | Name of group                    | string           | -       |
| subGroups    | Subgroups of groups              | OperatorsGroup[] | -       |
| tooltip      | Tooltip text                     | string           | -       |

### OperatorsItem

| Property  | Description           | Type             | Default |
| --------- | --------------------- | ---------------- | ------- |
| group     | Group of item         | string           | -       |
| groupId   | Id of group           | React.ReactText  | -       |
| groupName | Name of group         | string           | -       |
| icon      | Icon of operator      | React.ReactNode  | -       |
| id        | Id of item            | React.ReactText  | -       |
| logic     | Logic of operator     | string           | -       |
| name      | Name of operator      | string           | -       |
| subGroups | Subgroups of operator | OperatorsGroup[] | -       |
| value?    | Value of operator     | string           | -       |

### OperatorTexts

| Property          | Description            | Type         | Default |
| ----------------- | ---------------------- | ------------ | ------- |
| buttonLabel       | Button label           | 'Choose'     |
| noResults         | No results info        | 'No results' |
| searchPlaceholder | Search box placeholder | 'Search'     |
