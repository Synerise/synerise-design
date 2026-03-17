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
or
pnpm add @synerise/ds-list-item
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
| copyable                | Allow copying value by clicking. Prefer object form `{ copyValue, copiedLabel?, timeToReset?, delayClickEvent? }` | `boolean` &#124; `Copyable`                   | -         |
| copyHint                | **Deprecated** — no longer rendered                                                               | `ReactNode`                                                        | -         |
| copyValue               | **Deprecated** — use `copyable: { copyValue }` instead                                            | `string`                                                           | -         |
| copyTooltip             | **Deprecated** — no longer rendered                                                               | `ReactNode`                                                        | -         |
| description             | 2nd line of content in item                                                                       | `ReactNode`                                                        | -         |
| disabled                | renders disabled / unclickable item                                                               | `boolean`                                                          | -         |
| higher                  | Applies to `type "divider"` only                                                                  | `boolean`                                                          | -         |
| highlight               | string to highlight in items                                                                      | `string`                                                           | -         |
| popoverProps            | Options for the hover tooltip popover (used with `renderHoverTooltip`)                            | `{ placement?, getPopupContainer?, offsetConfig?, flipConfig?, shiftConfig?, initialOpen? }` | - |
| key                     | unique key                                                                                        | `string / number`                                                  | -         |
| level                   | Applies to `type "divider"` only                                                                  | `number`                                                           | -         |
| onItemHover             | hoverHandler                                                                                      | `(item: ItemData<MouseEvent<HTMLDivElement>>) => void`             | -         |
| onClick                 | onClick/onKeyDown handler                                                                         | `(item: ItemData<MouseEvent<HTMLDivElement> \| KeyboardEvent<HTMLDivElement>>) => void` | - |
| ordered                 | renders ordinal numbers in items                                                                  | `boolean`                                                          | -         |
| parent                  | if true will display an arrow icon next to label                                                  | `boolean`                                                          | -         |
| prefixel                | prefix element                                                                                    | `ReactNode` &#124; `AddonRenderer`                                 | -         |
| prefixVisibilityTrigger | drives prefix visibility                                                                          | `'hover'` &#124; `'default'`                                       | -         |
| renderHoverTooltip      | Tooltip to display on item hover                                                                  | `() => JSX.Element`                                                | -         |
| size                    | height of the item                                                                                | `'default'` &#124; `'large'`                                       | 'default' |
| suffixel                | suffix element. Item with type="select" and checked also displays a check icon                    | `ReactNode` &#124; `AddonRenderer`                                 | -         |
| suffixVisibilityTrigger | drives suffix visibility                                                                          | `'hover'` &#124; `'default'`                                       | -         |
| text                    | prop alternative to `children`                                                                    | `ReactNode`                                                        | -         |
| timeToHideTooltip       | **Deprecated** — no longer rendered                                                               | `number`                                                           | -         |
| title                   | title attribute (a11y prop)                                                                       | `string`                                                           | -         |
| tooltipProps            | **Deprecated** — no longer rendered                                                               | `TooltipProps`                                                     | -         |
| type                    | Type of the list item                                                                             | `"default"` &#124; `"danger"` &#124; `"divider"` &#124; `"select"` &#124; `"header"` | - |
| featured                | featured item will have a blue label and blue prefixel / suffixel icons                           | `boolean`                                                          | -         |
| selected                | additional selected state                                                                         | `boolean`                                                          | -         |
| itemKey                 | stable key used in `ItemData` callback payload; falls back to a stable UUID                       | `string \| number`                                                 | -         |
| subMenu                 | inline collapsible sub-list; clicking the item toggles it open/closed                             | `ListItemProps[]`                                                  | -         |
| indentLevel             | left indent depth; each level adds 20px                                                           | `number`                                                           | -         |
| direction               | text direction                                                                                    | `'ltr'` &#124; `'rtl'`                                             | -         |


### Copyable

```typescript
type Copyable = {
  copyValue: string;
  copiedLabel?: ReactNode;       // label shown temporarily after copy
  timeToReset?: number;          // ms to show copiedLabel (default 1000)
  delayClickEvent?: number | false; // ms to delay onClick after copy (default 700)
};
```

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
