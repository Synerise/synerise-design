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

| Property                  | Description                                                     | Type                                                                                     | Default          |
| ------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------- |
| groups                    | Groups of items                                                 | ContextGroup[]                                                                           | []               |
| items                     | Array of items                                                  | ContextItem[]                                                                            | []               |
| menuItemHeight            | Size of single menu item                                        | ItemSize.LARGE \ ItemSize.DEFAULT                                                        | ItemSize.DEFAULT |
| onSelectItem              | Callback called when user selects item                          | (item: ContextItem \ ContextGroup \ undefined) => void                                   | -                |
| defaultDropdownVisibility | default visibility of dropdown                                  | boolean                                                                                  | false            |
| opened                    | Whether if dropdown should opens from outside of component      | boolean                                                                                  | false            |
| texts                     | Translations object                                             | ContextTexts                                                                             | -                |
| selectedItem              | Selected item                                                   | ContextItem \ undefined                                                                  | undefined        |
| addMode                   | If true trigger doesn't change style when value is set          | ContextItem \ undefined                                                                  | undefined        |
| customTriggerComponent    | Add custom trigger                                              | React.ReactNode                                                                          | undefined        |
| trigger                   | Add custom trigger to modal                                     | 'click' \ 'hover' \ 'contextMenu'                                                        | 'click           |
| getMenuEntryProps         | Configure tooltip (information-card by default)                 | (arg: ParameterValueType) => MenuItemProps \ undefined                                   | undefined        |
| dropdownWrapperStyles     | Apply custom styles to dropdown wrapper                         | CSSProperties \ undefined                                                                | -                |
| onClickOutsideEvents      | Overwrite default events for document listener                  | HandledEventsType[] \ undefined                                                          | -                |
| onClickOutside            | Callback called when user click outside dropdown                | () => void \ undefined                                                                   | -                |
| onSearch                  | Callback called when user enter any char in search input        | (query: string) => void                                                                  | -                |
| hideSearchField           | Whether to hide the search field in the dropdown                | boolean                                                                                  | false            |
| onFetchData               | Callback called when user scrolls to the end of dropdown list   | () => void                                                                               | -                |
| onActivate                | Callback called when user opens dropdown                        | (fieldType: string) => void                                                              | -                |
| onDeactivate              | Callback called when user closes dropdown                       | () => void                                                                               | -                |
| hasMoreItems              | Whether if onFetchData should be called                         | boolean                                                                                  | -                |
| getPopupContainerOverride | Popup container function for child tooltips and dropdowns       | (trigger: HTMLElement \ null) => HTMLElement;                                            |                  |
| dropdownProps             | Limited part of props for dropdown on ContextSelector component | Omit<DropdownProps, 'trigger' 'getPopupContainer' 'onVisibleChange' 'visible' 'overlay'> | -                |
| errorText                 | Error message to display below component                        | ReactNode                                                                                | -                |
| isError                   | Render trigger with error styles, even if errorText is empty    | boolean                                                                                  | -                |

### ContextGroup

| Property      | Description                                                      | Type            | Default |
| ------------- | ---------------------------------------------------------------- | --------------- | ------- |
| defaultGroup  | Whether if this group is default                                 | boolean         | false   |
| icon          | Icon of group                                                    | React.ReactNode | -       |
| id            | Id of group                                                      | React.ReactText | -       |
| itemType      | Type of items                                                    | string          | -       |
| name          | Name of group                                                    | string          | -       |
| subGroups     | Subgroups of groups                                              | ContextGroup[]  | -       |
| tooltip       | Tooltip text                                                     | string          | -       |
| useCustomIcon | Use custom icon instead of wrapping it inside Icon component     | boolean         | false   |
| description   | Set menu item description ( recommended to use with 'large' size | React.ReactNode | -       |
| customSuffix  | Use custom suffix instead of default 'check' icon                | React.ReactNode | -       |

### ContextItem

| Property      | Description                                                      | Type            | Default |
| ------------- | ---------------------------------------------------------------- | --------------- | ------- |
| groupId       | Id of group                                                      | React.ReactText | -       |
| groupName     | Name of group                                                    | string          | -       |
| icon          | Icon of item                                                     | React.ReactNode | -       |
| id            | Id of item                                                       | React.ReactText | -       |
| name          | Name of item                                                     | string          | -       |
| subGroups     | Subgroups of item                                                | ContextGroup[]  | -       |
| useCustomIcon | Use custom icon instead of wrapping it inside Icon component     | boolean         | false   |
| description   | Set menu item description ( recommended to use with 'large' size | React.ReactNode | -       |
| customSuffix  | Use custom suffix instead of default 'check' icon                | React.ReactNode | -       |

### ContextTexts

| Property             | Description                               | Type      | Default      |
| -------------------- | ----------------------------------------- | --------- | ------------ |
| buttonLabel          | Button label                              | ReactNode | 'Choose'     |
| noResults            | No results info                           | ReactNode | 'No results' |
| searchPlaceholder    | Search box placeholder                    | string    | 'Search'     |
| showMore             | Show more button label                    | ReactNode | 'Show more'  |
| recentItemsGroupName | Dropdown section title for recent results | string    | 'Recent'     |
| allItemsGroupName    | Dropdown section title for all results    | string    | 'All'        |
