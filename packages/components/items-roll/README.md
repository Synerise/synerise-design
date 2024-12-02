---
id: items-roll
title: ItemsRoll
---

ItemsRoll UI Component

## Installation

```
npm i @synerise/ds-items-roll
or
yarn add @synerise/ds-items-roll
```

## Usage

```jsx
import ItemsRoll from '@synerise/ds-items-roll';

<ItemsRoll
  items={items}
  onSearch={onSearch}
  onSearchClear={onSearchClear}
  searchValue={searchValue}
  searchPlaceholder={searchPlaceholder}
/>;
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-items-roll--default"></iframe>

## API

| Property                     | Description                                                                                                       | Type                                                    | Default |
|------------------------------|-------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|---------|
| actions                      | ItemRollElement array with configuration for action dropdown menu                                                 | ItemRollElement[]                                       | -       |
| changeSelectionIcon          | The custom changeSelection icon                                                                                   | `(props: React.SVGProps<SVGSVGElement>) => JSX.Element` | EditM   |
| changeSelectionDropdownProps | Object with ds-dropdown props                                                                                     | DropdownProps                                           |         |
| className                    | Additional class for ItemsRoll wrapper                                                                            | string                                                  | -       |
| customSidebarActions         | Allow put developer sidebar actions that are not defined                                                          | React.ReactNode                                         | -       |
| groups                       | Array of strings where each one corresponds to a group prop in ItemRollElement                                    | string[]                                                | -       |
| hideSearch                   | Hide search component in itemsroll                                                                                | booleam                                                 | -       |
| isDisabled                   | prevents rendering 'remove' / 'clear all' buttons                                                                 | booleam                                                 | -       |
| items                        | ItemRollElement array for list                                                                                    | ItemRollElement[]                                       | -       |
| maxToShowItems               | Amount of initial ItemsRollElement to render. Note that if number is greater than 20, list will becoma scrollable | number                                                  | 10      |
| onClearAll                   | Callback function that is fired when click on clearAll button                                                     | () => void                                              | -       |
| onChangeSelection            | Callback function that is fired when click on changeSelection button                                              | () => void                                              | -       |
| onItemClick                  | Callback function that is fired when list element is clicked                                                      | (id: string, group?: string) => void                    | -       |
| onItemRemove                 | Callback function that is fired when list element remove icon is clicked                                          | (id: string, group?: string) => void                    | -       |
| onSearch                     | Callback function that is fired when input changed                                                                | (value: string) => void                                 | -       |
| onSearchClear                | Callback function that is fired when input is cleared                                                             | () => void                                              | -       |
| searchPlaceholder            | Placeholder for search input component                                                                            | string                                                  | -       |
| searchValue                  | Value of search input component                                                                                   | string                                                  | -       |
| showMoreStep                 | Amount of items to load on show more button click                                                                 | number                                                  | 10      |
| style                        | Object with CSS properties                                                                                        | React.CSSProperties                                     | -       |
| renderCount                  | Custom items count renderer                                                                                       | (count: number) => ReactNode                            | -       |
| texts                        | Object contains texts for buttons, title etc.                                                                     | Texts                                                   | -       |
| useFooter                    | Whether the footer is visibile                                                                                    | boolean                                                 | -       |
| useVirtualizedList           | Whether to use react-virtualized for list                                                                         | boolean                                                 | `false` |
| virtualizedRowHeight         | Height of virtualizedlist row                                                                                     | number                                                  | 32px    |
| virtualizedRowWidth          | Width of virtualized list                                                                                         | number                                                  | -       |


#### ItemRollElement

| Property | Description                                                                         | Type   | Default |
| -------- | ----------------------------------------------------------------------------------- | ------ | ------- |
| group    | Define affiliation to a specific group in groups Array passed as props to ItemsRoll | string | -       |
| id       | Unique identifier for element. Used as a key in map                                 | string | -       |

Rest of the `ItemRollElement` props is inherited from [MenuItemProps](https://design.synerise.com/docs/components/menu#menuitemprops)

#### Texts

| Property                | Description                   | Type                     | Default            |
| ----------------------- | ----------------------------- | ------------------------ | ------------------ |
| changeSelectionLabel    | Change selection button label | string / React.ReactNode | 'Change selection' |
| clearAllLabel           | Clear all button label        | string / React.ReactNode | 'Clear all'        |
| itemsLabel              | Items label                   | string / React.ReactNode | 'Items'            |
| moreLabel               | Show more second part label   | string / React.ReactNode | 'more'             |
| noResultsLabel          | No results label              | string / React.ReactNode | 'No results'       |
| removeTooltipLabel      | Tooltip for item remove icon  | string / React.ReactNode | 'Remove'           |
| searchClearTooltipLabel | Input clear tooltip label     | string / React.ReactNode | 'clear'            |
| showLabel               | Show more first part label    | string / React.ReactNode | 'Show'             |
| showLessLabel           | Show less button label        | string / React.ReactNode | 'Show less'        |
