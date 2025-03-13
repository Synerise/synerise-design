---
id: mapping
title: Mapping
---

Mapping UI Component

## Installation

```
npm i @synerise/ds-mapping
or
yarn add @synerise/ds-mapping
```

## Usage

```
import Mapping from '@synerise/ds-mapping'

<Mapping />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-mapping--default"></iframe>

## API

| Property          | Description                                              | Type                                                         | Default |
| ----------------- | -------------------------------------------------------- | ------------------------------------------------------------ | ------- |
| batchSelection    | batch selection configuration                            | BatchSelectionType                                           | -       |
| dataSource        | Data to be rendered in the mapping                       | Array<T extends BaseItemType>                                | -       |
| leftTitle         | Left column title                                        | ReactNode                                                    | -       |
| leftTitleTooltip  | Tooltip for left column title                            | TooltipProps see ds-tooltip                                  | -       |
| rightTitle        | Right column title                                       | ReactNode                                                    | -       |
| rightTitleTooltip | Tooltip for right column title                           | TooltipProps see ds-tooltip                                  | -       |
| leftComponent     | Component to be rendered in the left column              | ({item: T extends BaseItemType, index: number}) => ReactNode | -       |
| rightComponent    | Component to be rendered in the right column             | ({item: T extends BaseItemType, index: number}) => ReactNode | -       |
| centerComponent   | Component to be rendered in the center column (optional) | ({item: T extends BaseItemType, index: number}) => ReactNode | -       |

### BaseItemType

| Property | Description            | Type            | Default |
| -------- | ---------------------- | --------------- | ------- |
| id       | Unique item identifier | number / string | -       |

### BatchSelectionType

| Property          | Description                                        | Type                                                | Default |
| ----------------- | -------------------------------------------------- | --------------------------------------------------- | ------- |
| actionButtons     | Buttons to display when any items are selected     | ReactNode                                           | -       |
| onSelectionChange | handler fired when items are selected / deselected | (selected: ItemType['id'][]) => void                | -       |
| renderCounter     | custom counter renderer                            | (selectedCount: number, total: number) => ReactNode | -       |
