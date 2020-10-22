---
id: cascader
title: Cascader
---

Cascader UI Component

## Installation

```
npm i @synerise/ds-cascader
or
yarn add @synerise/ds-cascader
```

## Usage

```
import Cascader from '@synerise/ds-cascader'
const rootCategory = {
  id: 0,
  name: 'Home',
  path: ['Home'],
  Phones: {
    path: ['Home','Phones'],
    id: 1,
    name: 'Phones',
  },
  Computers: {
    path: ['Home', 'Computers'],
    name: 'Computers',
    id: 2,
    Laptops: {
      path: ['Home', 'Computers', 'Laptops'],
      name: 'Laptops',
      id: 3,
    },
  },
}
<Cascader
  rootCategory={rootCategory}
  categorySuffix={<div>select category</div>}
  selectedCategoriesIds={[2]}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-cascader--default"></iframe>

## API

| Property               | Description                                                     | Type                                        | Default |
| ---------------------- | --------------------------------------------------------------- | ------------------------------------------- | ------- |
| categorySuffix         | Suffix element displayed when hovering on category              | string / React.ReactNode                    | -       |
| maxHeight              | Max height of the content in pixels (In order to enable scroll) | number /string                              | -       |
| contentStyles          | Additional styles applied to the content                        | React.CSSProperties                         | -       |
| onCategorySelect       | Callback executed when category is selected                     | (item: Category, selected: boolean) => void | -       |
| rootCategory           | Root (default) category displayed in dropdown                   | Category                                    | -       |
| searchClearTooltip     | Tooltip displayed when hovering on clear icon in search input   | string / React.ReactNode                    | -       |
| searchInputPlaceholder | Placeholder value of search bar input                           | string                                      | -       |
| selectedCategoriesIds  | Array containing ids of already selected categories             | React.ReactText[]                           | []      |

### Category

| Property | Description                                                                     | Type            | Default |
| -------- | ------------------------------------------------------------------------------- | --------------- | ------- |
| id       | Unique id of category                                                           | React.ReactText | -       |
| name     | Name of the category                                                            | number          | -       |
| path     | Path of the category. Each element of an array represents one level of nesting. | string[]        | -       |
