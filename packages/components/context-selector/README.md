---
id: context-selector
title: ContextSelector
---

ContextSelector UI Component

## Installation
```
npm i @synerise/ds-context-selector
or
yarn add @synerise/ds-context-selector
```

## Usage
```
import ContextSelector from '@synerise/ds-context-selector'

<ContextSelector
    texts={{
     buttonLabel: 'Choose',
     searchPlaceholder: 'Search',
     noResults: 'No results',
   }}
    onSelectItem={(item) => {}}
    selectedItem={{
       name: 'Transaction charge',
       id: 6,
       icon: <NotificationsM />,
       groupId: 'RECENT',
       groupName: 'Activity',
     }}
    items={[
        {
            name: 'Pricelist 02',
            id: 0,
            icon: <SegmentM />,
            groupId: 'RECENT',
            groupName: 'Parameters',
        },
        {
            name: 'Transaction charge',
            id: 6,
            icon: <NotificationsM />,
            groupId: 'RECENT',
            groupName: 'Activity',
        },
        {
          name: 'Segmentation 1',
          id: 'segmentation_1',
          icon: <SegmentM />,
          groupId: 'SEGMENTATIONS',
        }
    ]}
    groups={[
        {
            id: 'RECENT',
            name: 'Recent',
            defaultGroup: true,
          },
          {
            id: 'ALL',
            name: 'All',
            defaultGroup: false,
            subGroups: [
            {
                name: 'Segmentations',
                id: 'SEGMENTATIONS',
                icon: <FolderM />,
                groupName: 'Parameters',
            },
            ]
        }]}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-context-selector--default"></iframe>

## API


## API

| Property     | Description                                                | Type                                                   | Default   |
| ---          | ---                                                        | ---                                                    | ---       |
| groups       | Groups of items                                            | ContextGroup[]                                         | []        |
| items        | Array of items                                             | ContextItem[]                                          | []        |
| onSelectItem | Callback called when user selects item                     | (item: ContextItem \ ContextGroup \ undefined) => void | -         |
| opened       | Whether if dropdown should opens from outside of component | boolean                                                | false     |
| texts        | Translations object                                        | ContextSelectorTexts                                   | -         |
| selectedItem | Selected item                                              | ContextItem \ undefined                                | undefined |
| addMode      | If true trigger doesn't change style when value is set     | ContextItem \ undefined                                | undefined |
| customTriggerComponent | Add custom trigger                                | React.ReactNode                                        | undefined |
| trigger      | Add custom trigger to modal                                | 'click' \ 'hover' \ 'contextMenu'                      | 'click    |
### ContextGroup

| Property     | Description                      | Type            | Default |
| ---          | ---                              | ---             | ---     |
| defaultGroup | Whether if this group is default | boolean         | false   |
| icon         | Icon of group                    | React.ReactNode | -       |
| id           | Id of group                      | React.ReactText | -       |
| itemType     | Type of items                    | string          | -       |
| name         | Name of group                    | string          | -       |
| subGroups    | Subgroups of groups              | ContextGroup[]  | -       |
| tooltip      | Tooltip text                     | string          | -       |


### ContextItem

| Property  | Description       | Type            | Default |
| ---       | ---               | ---             | ---     |
| groupId   | Id of group       | React.ReactText | -       |
| groupName | Name of group     | string          | -       |
| icon      | Icon of item      | React.ReactNode | -       |
| id        | Id of item        | React.ReactText | -       |
| name      | Name of item      | string          | -       |
| subGroups | Subgroups of item | ContextGroup[]  | -       |


### ContextSelectorTexts

| Property          | Description            | Type                     | Default      | 
| ---               | ---                    | ---                      | ---          | 
| buttonLabel       | Button label           | string \ React.ReactNode | 'Choose'     | 
| noResults         | No results info        | string \ React.ReactNode | 'No results' | 
| searchPlaceholder | Search box placeholder | string                   | 'Search'     | 
 
