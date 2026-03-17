---
id: menu
title: Menu
---

Menu UI Component

## Installation

```
npm i @synerise/ds-menu
or
yarn add @synerise/ds-menu
```

## Usage

```
import Menu from '@synerise/ds-menu'

const items = [
  {
    text: 'Item 1',
    copyable: true,
    copyHint: 'Copy to clipboard',
    copyValue: 'Item 1',
    copyTooltip: 'Copied Item 1!'
  },
 {
    text: 'Item 2',
    copyable: true,
    copyHint: 'Copy to clipboard',
    copyValue: 'Item 2',
    copyTooltip: 'Copied Item 2!'
  },
];

// Render using dataSource passed as prop
<Menu  dataSource={items} />

// Render using dataSource mapping to Menu.Item
<Menu>
    {items.map(item => <Menu.Item {...item}/>}
</Menu>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-menu--default"></iframe>

## Menu

| Property        | Description                                                                  | Type            | Default |
| --------------- | ---------------------------------------------------------------------------- | --------------- | ------- |
| asDropdownMenu  | Add additional styles for dropdown menu                                      | boolean         | `false` |
| dataSource      | Array of items to display in menu                                            | MenuItemProps[] | -       |
| ordered         | Determines if items should be displayed with index prefix (starting from 01) | boolean         | `false` |
| maxToShowItems  | limits the number of items rendered. remaining are shown after button click  | number          | -       |
| texts           | custom translations                                                          | MenuTexts       | -       |

### MenuItemProps

| Property                | Description                                                    | Type                                                    | Default   |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------- | --------- |
| children                | Children of the item                                           | React.ReactNode                                         |           |
| copyable                | Enables copy-to-clipboard; pass `Copyable` object for full control | `boolean` (deprecated) \| `Copyable`            | -         |
| copyValue               | **@deprecated** — use `copyable: Copyable` instead             | string                                                  |           |
| copyHint                | **@deprecated** — no longer shown                              | string                                                  |           |
| copyTooltip             | **@deprecated** — no longer shown                              | string \| React.ReactNode                               |           |
| disabled                | Disable an item element                                        | boolean                                                 | `false`   |
| description             | Additional description displayed inside the item               | string / React.ReactNode                                |           |
| highlight               | Text to be highlighted inside the item                         | string                                                  |           |
| indentLevel             | Indent level of the text inside the item.                      | Number                                                  | 0         |
| parent                  | Boolean to display arrow for parent item                       | boolean                                                 | `false`   |
| prefixel                | Prefix element node or a function to render it.                | (hovered: boolean) => React.ReactNode / React.ReactNode | -         |
| prefixVisibilityTrigger | Trigger for displaying the prefix element                      | `default` / `hover`                                     | `default` |
| size                    | Size of the item. Affects the maximum and minimum height.      | `default` / `large`                                     | `default` |
| suffixel                | Suffix element node or a function to render it.                | (hovered: boolean) => React.ReactNode / React.ReactNode | -         |
| suffixVisibilityTrigger | Trigger for displaying the suffix element                      | `default` / `hover`                                     | `default` |
| subMenu                 | Array of nested items                                          | MenuItemProps[]                                         |           |
| text                    | Text displayed inside the item                                 | string / React.ReactNode                                | -         |
| type                    | Type of the item                                               | `default` / `select` / `danger`                         | `default` |

### MenuTexts

| Property | Description         | Type      | Default |
| -------- | ------------------- | --------- | ------- |
| showLess | toggle button label | ReactNode | -       |
| showMore | toggle button label | ReactNode | -       |
