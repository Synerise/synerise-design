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
import ItemsRoll from '@synerise/ds-items-roll'

<ItemsRoll 
  items={items}
  onSearch={onSearch}
  onSearchClear={onSearchClear}
  searchValue={searchValue}
  searchPlaceholder={searchPlaceholder}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-items-roll--default"></iframe>

## API

|       Property       |                                                    Description                                                    |                         Type                          | Default |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------- |
| actions              | ItemRollElement array with configuration for action dropdown menu                                                 | ItemRollElement[]                                     | -       |
| changeSelectionIcon  | The custom changeSelection icon                                                                                   | (props: React.SVGProps<SVGSVGElement>) => JSX.Element | EditM   |
| className            | Additional class for ItemsRoll wrapper                                                                            | string                                                | -       |
| groups               | Array of strings where each one corresponds to a group prop in ItemRollElement                                    | string[]                                              | -       |
| items                | ItemRollElement array for list                                                                                    | ItemRollElement[]                                     | -       |
| maxToShowItems       | Amount of initial ItemsRollElement to render. Note that if number is greater than 20, list will becoma scrollable | number                                                | 10      |
| onClearAll           | Callback function that is fired when click on clearAll button                                                     | () => void                                            | -       |
| onChangeSelection    | Callback function that is fired when click on changeSelection button                                              | () => void                                            | -       |
| onItemClick          | Callback function that is fired when list element is clicked                                                      | (id: string) => void                                  | -       |
| onItemRemove         | Callback function that is fired when list element remove icon is clicked                                          | (id: string) => void                                  | -       |
| onSearch             | Callback function that is fired when input changed                                                                | (value: string) => void                               | -       |
| onSearchClear        | Callback function that is fired when input is cleared                                                             | () => void                                            | -       |
| searchPlaceholder    | Placeholder for search input component                                                                            | string                                                | -       |
| searchValue          | Value of search input component                                                                                   | string                                                | -       |
| showMoreStep          | Amount of items to load on show more button click                                                                                   | number                                                | 10       |
| style                | Object with CSS properties                                                                                        | React.CSSProperties                                   | -       |
| texts                | Object contains texts for buttons, title etc.                                                                     | Texts                                                 | -       |
| useFooter            | Whether the footer is visibile                                                                                    | boolean                                               | -       |
| useVirtualizedList   | Whether to use react-virtualized for list                                                                         | boolean                                               | false   |
| virtualizedRowHeight | Height of virtualizedlist row                                                                                     | number                                                | 32px    |
| virtualizedRowWidth  | Width of virtualized list                                                                                         | number                                                | -       |


#### ItemRollElement

|    Property     |                                     Description                                     |            Type            | Default |
| --------------- | ----------------------------------------------------------------------------------- | -------------------------- | ------- |
| copyable        | Whether item element could be copied on click                                       | boolean                    | -       |
| copyHint        | Label for copy text, showed on hover                                                | string                     | -       |
| copyValue       | Value of copied text                                                                | string                     | -       |
| danger          | Whether add styles custom styles to element (red color)                             | boolean                    | -       |
| description     | Description of the element                                                          | string or React.ReactNode  | -       |
| disabled        | Whether disabled element                                                            | boolean                    | -       |
| group           | Define affiliation to a specific group in groups Array passed as props to ItemsRoll | string                     | -       |
| highlight       | What part of the element text to highlight                                          | string                     | -       |
| id              | Unique identifier for element. Used as a key in map                                 | string                     | -       |
| index           | Test of the element                                                                | number                     | -       |
| nestedMenu      | Array of child elements or strings to nest inside element                           | SubMenuProps[] or string[] | -       |
| ordered         | Whether item elements are ordered                                                   | boolean                    | -       |
| parent          | ???                                                                                 | boolean                    | -       |
| prefixel        | Element to insert before text of the element                                        | React.ReactNode            | -       |
| subMenu         | Array of child elements or strings to add as sub menu to element                    | SubMenuProps[] or string[] | -       |
| text            | Label for the element                                                               | string or React.ReactNode  | -       |

#### Texts

|        Property         |          Description          |  Type  |      Default       |
| ----------------------- | ----------------------------- | ------ | ------------------ |
| changeSelectionLabel    | Change selection button label | string | 'Change selection' |
| clearAllLabel           | Clear all button label        | string | 'Clear all'        |
| itemsLabel              | Items label                   | string | 'Items'            |
| moreLabel               | Show more second part label   | string | 'more'             |
| noResultsLabel          | No results label              | string | 'No results'       |
| removeTooltipLabel      | Tooltip for item remove icon  | string | 'Remove'           |
| searchClearTooltipLabel | Input clear tooltip label     | string | 'clear'            |
| showLabel               | Show more first part label    | string | 'Show'             |
| showLessLabel           | Show less button label        | string | 'Show less'        |
