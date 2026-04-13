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

### HoverableSuffix

A wrapper component that swaps suffix content based on hover state. Use it inside `suffixel` with the `AddonRenderer` pattern to show different content at rest vs on hover.

| Property       | Description                                 | Type        | Default   |
| -------------- | ------------------------------------------- | ----------- | --------- |
| hovered        | Whether the parent list item is hovered     | `boolean`   | -         |
| hoverContent   | Content displayed when hovered              | `ReactNode` | -         |
| defaultContent | Content displayed at rest (optional)        | `ReactNode` | -         |

```tsx
import ListItem, { HoverableSuffix } from '@synerise/ds-list-item';

<ListItem
  suffixel={(hovered) => (
    <HoverableSuffix
      hovered={hovered}
      defaultContent={<Icon component={<WarningFillM />} />}
      hoverContent={<Button>Delete</Button>}
    />
  )}
>
  Item with hoverable suffix
</ListItem>
```

### ListWrapper

Container that provides shared `ListContext` (including a shared `onClick` handler) to all descendant `ListItem` components.

| Property | Description                          | Type                 | Default |
| -------- | ------------------------------------ | -------------------- | ------- |
| onClick  | Shared click handler for all items   | `ListItemEventHandler` | -     |
| children | ListItem nodes                       | `ReactNode`          | -       |

```tsx
import ListItem, { ListWrapper } from '@synerise/ds-list-item';

<ListWrapper onClick={(itemData) => console.log(itemData)}>
  <ListItem itemKey="a">Option A</ListItem>
  <ListItem itemKey="b">Option B</ListItem>
</ListWrapper>
```

### GroupItem

Groups a title with a list of items.

| Property | Description         | Type              | Default |
| -------- | ------------------- | ----------------- | ------- |
| title    | Section label       | `ReactNode`       | -       |
| items    | Array of list items | `ListItemProps[]`  | -       |
| children | Additional content  | `ReactNode`       | -       |

```tsx
import ListItem, { GroupItem } from '@synerise/ds-list-item';

<GroupItem title="Section A" items={[
  { children: 'Item 1', itemKey: '1' },
  { children: 'Item 2', itemKey: '2' },
]} />
```

### ListContextProvider

Low-level provider for `ListContext`. Use when building custom list containers that need shared click handling or custom popover delay.

| Property     | Description                           | Type                 | Default                        |
| ------------ | ------------------------------------- | -------------------- | ------------------------------ |
| onClick      | Shared click handler                  | `ListItemEventHandler` | -                            |
| popoverDelay | Hover tooltip open/close delay config | `DelayConfig`        | `{ open: 100, close: 400 }`   |
| children     | Content                               | `ReactNode`          | -                              |

### useListContext

Hook to read `ListContext` values. Returns `undefined` when used outside a provider.

```tsx
import { useListContext } from '@synerise/ds-list-item';

const context = useListContext();
```
