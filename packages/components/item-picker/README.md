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

| Property             | Description                                              | Type                                                                                              | Default | 
| ---                  | ---                                                      | ---                                                                                               | ---     | 
| dataSource           | Array of items to display in menu                        | [MenuItemProps[]](https://design.synerise.com/docs/components/menu#menuitemprops)                 | -       | 
| placeholder          | Placeholder text                                         | string                                                                                            | -       | 
| clear                | Clear button tooltip                                     | string                                                                                            | -       | 
| searchPlaceholder    | Placeholder of SearchBar in dropdown                     | string                                                                                            | -       | 
| onClear              | Callback executed when clear icon is clicked             | () => void                                                                                        | -       | 
| onChange             | Callback executed when item from dropdown is clicked     | (item: [MenuItemProps](https://design.synerise.com/docs/components/menu#menuitemprops)) => void   | -       | 
| selectedItem?        | Selected item data                                       | [MenuItemProps](https://design.synerise.com/docs/components/menu#menuitemprops), undefined        | -       | 
| size?                | Size of ItemPicker component                             | 'small', 'large'                                                                                  | -       | 
| label?               | Label of component                                       | string, React.ReactNode                                                                           | -       | 
| description?         | Description of component                                 | string, React.ReactNode                                                                           | -       | 
| placeholderIcon?     | Icon visible with placeholder                            | React.ReactNode                                                                                   | -       | 
| error?               | Whether the component has error state                    | boolean                                                                                           | -       | 
| errorMessage?        | Error message                                            | string                                                                                            | -       | 
| tooltip?             | Tooltip text                                             | string                                                                                            | -       | 
| disabled?            | Whether the component is disabled                        | boolean                                                                                           | -       | 
| changeButtonLabel?   | Label of change button, available only when size='large' | string                                                                                            | -       | 
| onChangeButtonClick? | Callback executed when change button is clicked          | () => void                                                                                        | -       |  
