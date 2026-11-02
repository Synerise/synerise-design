---
id: item-picker
title: ItemPicker
---

ItemPicker UI Component

## Installation

```
npm i @synerise/ds-item-picker
or
yarn add @synerise/ds-item-picker
```

## Usage

The current API is `isNewVersion` — see `CLAUDE.md` in this package for every prop.

```tsx
import ItemPicker from '@synerise/ds-item-picker'

<ItemPicker
  isNewVersion
  items={items} // an array, { items, limitPerSection }, { loadItems } or { loadLevel }
  placeholder="Set customer"
  selectedItem={selected}
  onChange={setSelected}
  onClear={() => setSelected(undefined)}
/>
```

### Mixed list

Pass a `MixedLoaderConfig` as `items` for a mixed list: folders and items side by side on the same level,
one level at a time (folders first), and a folder opens the next level. `loadLevel` returns one page of a level (or of a search, which covers
the level and every level below it) and the level's path:

```tsx
<ItemPicker
  isNewVersion
  items={{
    loadLevel: async ({ folderId, searchQuery, searchKey, page, limit, abortController }) => ({
      entries: [
        { type: 'folder', folder: { id: 'f1', text: 'Folder 1' } },
        { type: 'item', item: { id: 'i1', text: 'Item 1' } },
      ],
      total: 2,
      path: [{ id: null, text: 'All' }],
    }),
  }}
  onChange={setSelected}
/>
```

Search in is not supported in this mode. Actions take `showInList: false` to be offered only under `/`.

### Legacy API (deprecated)

```
import ItemPicker from '@synerise/ds-item-picker'

<ItemPicker
  dataSource={[]}
  searchPlaceholder={'Search'}
  label={'Label'}
  description={'Description'}
  tooltip={'Tooltip'}
  placeholder={'Set customer'}
  placeholderIcon={<Icon component={<UserM/>}/>}
  selectedItem={null}
  onChange={() => {})}
  clear={'Remove selection'}
  onClear={() => {}}
  disabled={false}
  error={false}
  errorMessage={''}
  size={'small'}
  changeButtonLabel={'Change'}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-item-picker--default"></iframe>

## API

| Property                    | Description                                              | Type                                                                                            | Default                                  |
| --------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------- |
| dataSource                  | Array of items to display in menu                        | [ListItemProps[]](https://design.synerise.com/docs/components/list-item#listitemprops)          | -                                        |
| dropdownVisibleRows         | Visible rows count displayed in the dropdown             | number                                                                                          | 10                                       |
| dropdownProps               | Antd dropdown props                                      | [DropdownProps](https://design.synerise.com/docs/components/dropdown#dropdown)                  | {}                                       |
| dropdownRowHeight           | Height of the row displayed in the dropdown              | number                                                                                          | 32                                       |
| dropdownBottomAction?       | Dropdown bottom action                                   | React.ReactNode                                                                                 | -                                        |
| closeOnBottomAction?        | Close dropdown when bottom action has been clicked       | boolean                                                                                         | false                                    |
| placeholder                 | Placeholder text                                         | string, React.ReactNode                                                                         | -                                        |
| clear                       | Clear button tooltip                                     | string, React.ReactNode                                                                         | 'Clear'                                  |
| searchPlaceholder           | Placeholder of SearchBar in dropdown                     | string                                                                                          | 'Search'                                 |
| onClear                     | Callback executed when clear icon is clicked             | () => void                                                                                      | -                                        |
| onChange                    | Callback executed when item from dropdown is clicked     | (item: [ListItemProps](https://design.synerise.com/docs/components/list-item#listitemprops)) => void | -                                   |
| selectedItem?               | Selected item data                                       | [ListItemProps](https://design.synerise.com/docs/components/list-item#listitemprops)            | -                                        |
| searchBarProps?             | Additional props passed to the SearchBar component       | [SearchBarProps](https://design.synerise.com/docs/components/search-bar#api)                    | -                                        |
| hideSearchBar?              | Hides searchBar                                          | boolean                                                                                         | -                                        |
| size?                       | Size of ItemPicker component                             | 'small', 'large'                                                                                | -                                        |
| label?                      | Label of component                                       | string, React.ReactNode                                                                         | -                                        |
| description?                | Description of component                                 | string, React.ReactNode                                                                         | -                                        |
| placeholderIcon?            | Icon visible with placeholder                            | React.ReactNode                                                                                 | -                                        |
| error?                      | Whether the component has error state                    | boolean                                                                                         | -                                        |
| errorMessage?               | Error message                                            | string, React.ReactNode                                                                         | -                                        |
| isObjectDeleted?            | Styles the selected value as deleted (red text)          | boolean                                                                                         | -                                        |
| tooltip?                    | Tooltip text                                             | string, React.ReactNode                                                                         | -                                        |
| disabled?                   | Whether the component is disabled                        | boolean                                                                                         | -                                        |
| changeButtonLabel?          | Label of change button, available only when size='large' | string, React.ReactNode                                                                         | 'Change'                                 |
| withClearConfirmation       | Shows Popconfirm on the clear icon click                 | boolean                                                                                         | -                                        |
| clearConfirmTitle           | Title of Popconfirm                                      | string                                                                                          | 'Please confirm'                         |
| yesText                     | Label of confirm button                                  | string                                                                                          | 'Yes'                                    |
| noText                      | Label of cancel button                                   | string                                                                                          | 'No'                                     |
| noResults                   | No search results info                                   | string                                                                                          | 'No results'                             |
| scrollbarProps              | Object with scrollbar configturaion                      | ScrollbarAdditionalProps                                                                        | -                                        |
| informationCardTooltipProps | Trigger info card config                                 | InformationCardTooltipProps see ds-information-card                                             |                                          |
