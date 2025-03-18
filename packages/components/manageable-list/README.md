---
id: manageable-list
title: ManageableList
---

ManageableList UI Component

## Example

```
<ManageableList
    addItemLabel="Add folder"
    showMoreLabel="show all"
    showLessLabel="show less"
    more="more"
    less="less"
    maxToShowItems={5}
    onItemAdd={addItem}
    onItemRemove={removeItem}
    onItemEdit={editItem}
    onItemSelect={action('onItemSelect')}
    onChangeOrder=(action('onChangeOrder'))
    items={[]}
    loading={false}
    listType={ListType.default}
/>
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-manageable-list--default"></iframe>

## API

| Property                 | Description                                                                                          | Type                                                                                                | Default   |
|--------------------------|------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|-----------|
| maxToShowItems           | Shows x first items, rest are hidden under `show more` button                                        | number                                                                                              | 5         |
| onItemAdd                | Callback triggered when user hits `enter` key in the new item input field.                           | ({ name: string }) => void                                                                          | -         |
| onItemRemove             | Callback triggered when user clicks on the remove item button.                                       | ({ id: string }) => void                                                                            | -         |
| onItemEdit               | Callback triggered then user hits `enter` key in the edit item name input field.                     | ({ id: string; name: string }) => void                                                              | -         |
| onItemSelect             | Callback triggered when user clicks on list item.                                                    | ({ id: string }) => void                                                                            | -         |
| onChangeOrder            | Callback triggered when user changes order of items                                                  | (Item[]) => void                                                                                    | -         |
| changeOrderByButtons     | Allows to change order of items by dedicated buttons in item suffix, requires onChangeOrder property | boolean                                                                                             | -         |
| items                    | Array of list items                                                                                  | Item[]                                                                                              | -         |
| loading                  | Loading state                                                                                        | boolean                                                                                             | -         |
| type                     | Type of list                                                                                         | `default` / `content` / `filter`                                                                    | `default` |
| addButtonDisabled        | Disable add item button                                                                              | boolean                                                                                             | `false`   |
| changeOrderDisabled      | Disable change of order                                                                              | boolean                                                                                             | `false`   |
| greyBackground           | Change background color of list and list items                                                       | boolean                                                                                             | `false`   |
| texts                    | Texts on buttons, confirms and popups                                                                | Texts                                                                                               | -         |
| searchQuery              | Search query used to highlight list item name                                                        | string                                                                                              | -         |
| additionalActions        | Additional actions for single list item                                                              | AdditionalAction[]                                                                                  | -         |
| renderCustomToggleButton | Customise the show more / show less button                                                           | (props: {onClick: () => void; total: number, limit: number, allItemsVisible: boolean}) => ReactNode | -         |
| styles                   | Additional styles for ManageableList wrapper                                                         | React.CSSProperties                                                                                 | -         |
| expandedIds (deprecated) | Array of item ids that should be rendered open                                                       | React.Key[]                                                                                         | -         |


### Texts

| Property                | Description                                   | Type                     | Default |
| ----------------------- | --------------------------------------------- | ------------------------ | ------- |
| addItemLabel            | Label of add item button                      | string / React.ReactNode | -       |
| showMoreLabel           | Label of show more items button               | string / React.ReactNode | -       |
| showLessLabel           | Label of show less items button               | string / React.ReactNode | -       |
| more                    | Translation of 'more'                         | string / React.ReactNode | -       |
| less                    | Translation of 'less'                         | string / React.ReactNode | -       |
| activateItem            | Activate item confirm title                   | string / React.ReactNode | -       |
| activate                | Label of confirm activation button            | string / React.ReactNode | -       |
| cancel                  | Label of cancel button                        | string / React.ReactNode | -       |
| deleteConfirmationTitle | Title of delete item confirmation popup       | string / React.ReactNode | -       |
| deleteConfirmationTitle | Description of delete item confirmation popup | string / React.ReactNode | -       |
| deleteConfirmationYes   | Label of delete confirmation button           | string / React.ReactNode | -       |
| deleteConfirmationNo    | Label of delete cancellation button           | string / React.ReactNode | -       |
| itemActionRename        | Label of rename item action                   | string / React.ReactNode | -       |
| itemActionDuplicate     | Label of duplicate item action                | string / React.ReactNode | -       |
| itemActionDelete        | Label of delete item action                   | string / React.ReactNode | -       |

#### Item

| Property                | Description                                                   | Type            | Default |
| ----------------------- | ------------------------------------------------------------- | --------------- | ------- |
| id                      | Identifier of item                                            | string          | -       |
| name                    | Name of item (visible on list)                                | string          | -       |
| canUpdate               | Flag which allows to update item name                         | boolean         | -       |
| canDelete               | Flag which allows to remove item                              | boolean         | -       |
| canDuplicate            | Flag which allows to duplicate item                           | boolean         | -       |
| tag                     | Tag (ds-tag), available only for content list type            | Tag             | -       |
| icon                    | Icon (ds-icon)                                                | Icon            | -       |
| content                 | Content rendered in content type list                         | React.ReactNode | -       |
| headerSuffix            | Component that will be rendered on the start of the item      | React.ReactNode | -       |
| hideHeaderSuffixOnHover | Whether to hide suffixHeader on hover                         | boolean         | -       |
| expanded                | Render opened                                                 | boolean         | -       |
| additionalSuffix        | Component that will be rendered on the end of the item suffix | React.ReactNode | -       |

#### AdditionalAction

| Property | Description                                 | Type                      | Default  |
| -------- | ------------------------------------------- | ------------------------- | -------- |
| tooltip  | Name of action visible on tooltip           | string                    | -        |
| icon     | ds-icon component visible on item           | React.ReactNode           | -        |
| onClick  | Callback triggered when user clicks on icon | (item: ItemProps) => void | -        |
| color    | color of icon                               | string                    | grey-500 |
