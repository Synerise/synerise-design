---
id: tagslist
title: TagsList
---

TagsList UI Component

## Installation

```bash
npm i @synerise/ds-tagslist
# or
yarn add @synerise/ds-tagslist
```

## Usage

```tsx
import TagsList from '@synerise/ds-tagslist'

const items = [
    { id: 1, name: 'Tag 1' },
    { id: 2, name: 'Tag 2' }
];

const onChange = (
    action: TagsListActions, 
    newItems: TagsListItem[],
    newTargetItem: TagsListItem,   
    originItems: TagsListItem[], 
    originTargetItem: TagsListItem
) => {
    console.log(
        action,             // action string that was triggered
        newItems,           // new items object with changed data
        newTargetItem:      // new item object with changed data
        originItems,        // basically previous items
        originTargetItem,   // previous item
    );
};

<TagsList 
    items={items}
    onChange={onChange}
/>
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-TagsList--default"></iframe>

## API

| Property          | Description                                                               | Type                                                                                                                                                  | Default |
|-------------------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| addButtonDisabled | Defines if add button is disabled                                         | boolean                                                                                                                                               | `false` |
| items             | Array of items which should be displayed as tags for controlled state     | TagsListItem[]                                                                                                                                        |         |
| onChange          | Event function triggered when items change                                | (action: TagsListActions, newItems: TagsListItem[], newTargetItem: TagsListItem, originItems: TagsListItem[], originTargetItem: TagsListItem) => void |         |
| defaultItems      | Array of items for no controlled state                                    | TagsListItem[]                                                                                                                                        |         |
| maxItemsVisible   | The maximum amount of items which will be visible on the initial render   | number                                                                                                                                                | 10      |
| showHideStep      | Number of items shown after clicking "show more" button                   | number                                                                                                                                                | 10      |
| texts             | Override translation texts passed to the component                        | TagsListTexts                                                                                                                                         | -       |
| onAddDropdown     | Event function triggered on "Add tag" visibility change                   | (visible: boolean) => void                                                                                                                            |         |
| onSearch          | Event function triggered on search input change                           | (query: string) => void                                                                                                                               |         |
| onManageTags      | Triggered when Manage tags buttons are clicked                            | (event: React.MouseEvent<HTMLElement, MouseEvent>) => void                                                                                            |         |
| onItemsAdd        | Event triggered when "Apply" button is clicked inside "Add tag" dropdown. | (items: TagsListItem[]) => void                                                                                                                       |         |
| withCheckbox      | Show checkboxes on items hover                                            | boolean                                                                                                                                               | `true`  |

### TagsListItem

`TagsListItem` object contains information about specific tag.

| Property         | Description                                             | Type    | Default |
|------------------|---------------------------------------------------------|---------|---------|
| name             | Name of the tag                                         | string  | -       |
| description      | Description info, if set it will be shown in AddModal   | string  | -       |
| favourite        | Whether item is added to favourites                     | boolean | `false` |
| checked          | Whether item is checked/selected (for controlled state) | boolean | `false` |
| canUpdate        | Whether item is editable                                | boolean | `false` |
| canDelete        | Whether item is removable                               | boolean | `false` |
| canEnterSettings | Whether user can enter settings for the item            | boolean | `false` |
| id               | Unique id of the tag item                               | string  | -       |

### TagsListTexts

| Property             | Description                                                                                | Type      | Default |
|----------------------|--------------------------------------------------------------------------------------------|-----------|---------|
| add                  | "Add" text                                                                                 | ReactNode | -       |
| addItemLabel         | A label of the add form                                                                    | ReactNode | -       |
| addToFavourite       | A tooltip used for adding to the favourites                                                | ReactNode | -       |
| delete               | "Delete" text                                                                              | ReactNode | -       |
| deleteFromFavourites | A tooltip used for removing from favourites                                                | ReactNode | -       |
| deleteAllContent     | A message displayed when user wants to delete all the content of the folder                | ReactNode | -       |
| edit                 | "Edit" text - displayed in actions menu                                                    | ReactNode | -       |
| enterSettings        | "Settings" text - displayed in actions menu                                                | ReactNode | -       |
| invalidNameError     | Error displayed when user provides invalid folder name                                     | ReactNode | -       |
| less                 | "Less" text - displayed in the footer                                                      | ReactNode | -       |
| more                 | "More" text - displayed in the footer                                                      | ReactNode | -       |
| moveToDefault        | A message displayed when user wants to all the content of the folder to the default folder | ReactNode | -       |
| moveToOtherFolder    | A message displayed when user wants to all the content of the folder to the other folder   | ReactNode | -       |
| showLessLabel        | Additional label of the "show less" button in the footer                                   | ReactNode | -       |
| showMoreLabel        | Additional label of the "show more" button in the footer                                   | ReactNode | -       |

### AddModal

| Property        | Description                                               | Type                                                       | Default |
|-----------------|-----------------------------------------------------------|------------------------------------------------------------|---------|
| disabled        | Should the trigger be disabled                            | boolean                                                    | `false` |
| items           | List of items                                             | TagsListItem[]                                             |         |
| loading         | Show loading                                              | boolean                                                    | `false` |
| tristate        | Use `<CheckboxTristate>` for tags                         | boolean                                                    | `false` |
| trigger         | Replace default trigger button                            | ReactNode                                                  |         |
| searchAddTag    | Ability to add new tags with search input                 | boolean                                                    | `true`  |
| texts           | Override translation texts passed to the component        | TagsListTexts                                              |         |
| onItemsAdd      | Event function triggered when hit Apply button            | (items: TagsListItem[]) => void                            |         |
| onVisibleChange | Event function triggered when dropdown visibility changes | (visible: boolean) => void                                 |         |
| onManageTags    | Function triggered when "Manage tags" button is clicked   | (event: React.MouseEvent<HTMLElement, MouseEvent>) => void |         |
