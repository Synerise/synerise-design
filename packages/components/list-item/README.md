---
id: list-item
title: ListItem
---

ListItem UI Component

## Installation

```
npm i @synerise/ds-list-item
or
yarn add @synerise/ds-list-item
```

## Usage

```
import ListItem from '@synerise/ds-list-item'

<ListItem />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-list-item--default"></iframe>

## API

| Property                | Description                                                                                       | Type                                                               | Default   |
| ----------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------- |
| className               | Extra styles                                                                                      | string                                                             | -         |
| children                | ListItem content                                                                                  | React.ReactNode                                                    | -         |
| checked                 | for type="select" it renders a check icon as suffix, for other types only an additional classname | `boolean`                                                          | -         |
| copyable                | Allow copying value by clicking                                                                   | `boolean`                                                          | -         |
| copyHint                | Content that disaplys on hover if copyable                                                        | `ReactNode`                                                        | -         |
| copyValue               | Value that gets copied to clipboard                                                               | `string`                                                           | -         |
| copyTooltip             | Content displayed in tooltip after copying                                                        | `ReactNode`                                                        | -         |
| description             | 2nd line of content in item                                                                       | `ReactNode`                                                        | -         |
| disabled                | renders disabled / unclickable item                                                               | `boolean`                                                          | -         |
| higher                  | Applies to `type "divider"` only                                                                  | `boolean`                                                          | -         |
| highlight               | string to highlight in items                                                                      | `string`                                                           | -         |
| hoverTooltipProps       | Props for hover tooltip. see rc-trigger for details                                               | `TriggerProps & { ref?: React.LegacyRef<TriggerHandle> }`          | -         |
| key                     | unique key                                                                                        | `string / number`                                                  | -         |
| level                   | Applies to `type "divider"` only                                                                  | `number`                                                           | -         |
| onItemHover             | hoverHandler                                                                                      | `(item: ItemData<MouseEvent<HTMLDivElement>>) => void`             | -         |
| onClick                 | onClick handler                                                                                   | `(item: ItemData<MouseEvent<HTMLDivElement>>) => void`             | -         |
| ordered                 | renders ordinal numbers in items                                                                  | `boolean`                                                          | -         |
| parent                  | if true will display an arrow icon next to label                                                  | `boolean`                                                          | -         |
| prefixel                | prefix element                                                                                    | `ReactNode` &#124; `AddonRenderer`                                 | -         |
| prefixVisibilityTrigger | drives prefix visibility                                                                          | `'hover'` &#124; `'default'`                                       | -         |
| renderHoverTooltip      | Tooltip to display on item hover                                                                  | `() => JSX.Element`                                                | -         |
| size                    | height of the item                                                                                | `'default'` &#124; `'large'`                                       | 'default' |
| suffixel                | suffix element. Item with type="select" and checked also displays a check icon                    | `ReactNode` &#124; `AddonRenderer`                                 | -         |
| suffixVisibilityTrigger | drives suffix visibility                                                                          | `'hover'` &#124; `'default'`                                       | -         |
| text                    | prop alternative to `children`                                                                    | `ReactNode`                                                        | -         |
| timeToHideTooltip       | copy tooltip delay                                                                                | `number`                                                           | -         |
| title                   | title attribute (a11y prop)                                                                       | `string`                                                           | -         |
| tooltipProps            | Tooltip props for "copied" tooltip. See @synerise/ds-tooltip                                      | `TooltipProps`                                                     | -         |
| type                    | Type of the list item                                                                             | `"default"` &#124; `"danger"` &#124; `"divider"` &#124; `"select"` | -         |
| featured                | featured item will have a blue label and blue prefixel / suffixel icons                           | `boolean`                                                          | -         |


### AddonRenderer

```typescript
type AddonRenderer = (hovered: boolean) => ReactNode;
```

### ItemData

prop passed to onClick and onItemHover handlers

| Property | Description                 | Type                         |
| -------- | --------------------------- | ---------------------------- |
| key      | item key                    | string                       |
| item     | clicked / hovered item data | Partial<BasicItemProps>      |
| domEvent | Event triggered             | `MouseEvent<HTMLDivElement>` |
