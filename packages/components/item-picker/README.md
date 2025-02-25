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
  onChangeButtonClick={() => {}}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-item-picker--default"></iframe>

## API

| Property                    | Description                                              | Type                                                                                            | Default                                  |
| --------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------- |
| dataSource                  | Array of items to display in menu                        | [MenuItemProps[]](https://design.synerise.com/docs/components/menu#menuitemprops)               | -                                        |
| dropdownVisibleRows         | Visible rows count displayed in the dropdown             | number                                                                                          | 10                                       |
| dropdownProps               | Antd dropdown props                                      | [DropdownProps](https://design.synerise.com/docs/components/dropdown#dropdown)                  | {}                                       |
| dropdownRowHeight           | Height of the row displayed in the dropdown              | number                                                                                          | 32                                       |
| dropdownBottomAction?       | Dropdown bottom action                                   | React.ReactNode                                                                                 | -                                        |
| closeOnBottomAction?        | Close dropdown when bottom action has been clicked       | boolean                                                                                         | false                                    |
| placeholder                 | Placeholder text                                         | string, React.ReactNode                                                                         | -                                        |
| clear                       | Clear button tooltip                                     | string, React.ReactNode                                                                         | 'Remove'                                 |
| searchPlaceholder           | Placeholder of SearchBar in dropdown                     | string                                                                                          | 'Search'                                 |
| onClear                     | Callback executed when clear icon is clicked             | () => void                                                                                      | -                                        |
| onChange                    | Callback executed when item from dropdown is clicked     | (item: [MenuItemProps](https://design.synerise.com/docs/components/menu#menuitemprops)) => void | -                                        |
| selectedItem?               | Selected item data                                       | [MenuItemProps](https://design.synerise.com/docs/components/menu#menuitemprops)                 | -                                        |
| searchBarProps?             | Additional props passed to the SearchBar component       | [SearchBarProps](https://design.synerise.com/docs/components/search-bar#api)                    | -                                        |
| hideSearchBar?              | Hides searchBar                                          | boolean                                                                                         | -                                        |
| size?                       | Size of ItemPicker component                             | 'small', 'large'                                                                                | -                                        |
| label?                      | Label of component                                       | string, React.ReactNode                                                                         | -                                        |
| description?                | Description of component                                 | string, React.ReactNode                                                                         | -                                        |
| placeholderIcon?            | Icon visible with placeholder                            | React.ReactNode                                                                                 | -                                        |
| error?                      | Whether the component has error state                    | boolean                                                                                         | -                                        |
| errorMessage?               | Error message                                            | string, React.ReactNode                                                                         | -                                        |
| tooltip?                    | Tooltip text                                             | string, React.ReactNode                                                                         | -                                        |
| disabled?                   | Whether the component is disabled                        | boolean                                                                                         | -                                        |
| changeButtonLabel?          | Label of change button, available only when size='large' | string, React.ReactNode                                                                         | 'Change'                                 |
| withClearConfirmation       | Shows Popconfirm on the clear icon click                 | boolean                                                                                         | -                                        |
| clearConfirmTitle           | Title of Popconfirm                                      | string                                                                                          | 'Are you sure to remove this selection?' |
| yesText                     | Label of confirm button                                  | string                                                                                          | 'Yes'                                    |
| noText                      | Label of cancel button                                   | string                                                                                          | 'No'                                     |
| noResults                   | No search results info                                   | string                                                                                          | 'No results'                             |
| scrollbarProps              | Object with scrollbar configturaion                      | ScrollbarAdditionalProps                                                                        | -                                        |
| informationCardTooltipProps | Trigger info card config                                 | InformationCardTooltipProps see ds-information-card                                             |                                          |
