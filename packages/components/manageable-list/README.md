---
id: Manageable list
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

| Property            | Description                                                                      | Type                                    | Default   |
| ------------------- | -------------------------------------------------------------------------------- | --------------------------------------- | --------- |
| maxToShowItems      | Shows x first items, rest are hidden under `show more` button                    | number                                  | 5         |
| onItemAdd           | Callback triggered when user hits `enter` key in the new item input field.       | Function({ name: string })              | -         |
| onItemRemove        | Callback triggered when user clicks on the remove item button.                   | Function({ id: string })                | -         |
| onItemEdit          | Callback triggered then user hits `enter` key in the edit item name input field. | Function({ id: string; name: string })  | -         |
| onItemSelect        | Callback triggered when user clicks on list item.                                | Function({ id: string })                | -         |
| onChangeOrder       | Callback triggered when user changes order of items                              | Function(Item[])                        | -         |
| items               | Array of list items                                                              | Item[]                                  | -         |
| loading             | Loading state                                                                    | boolean                                 | -         |
| type                | Type of list                                                                     | string `default`, `content` or `filter` | 'default' |
| addButtonDisabled   | Disable add item button                                                          | boolean                                 | false     |
| changeOrderDisabled | Disable change of order                                                          | boolean                                 | false     |
| greyBackground      | Change background color of list and list items                                   | boolean                                 | false     |
| texts               | Texts on buttons, confirms and popups                                            | Texts                                   | -         |

### Texts

| Property                | Description                                   | Type   | Default |
| ----------------------- | --------------------------------------------- | ------ | ------- |
| addItemLabel            | Label of add item button                      | string | -       |
| showMoreLabel           | Label of show more items button               | string | -       |
| showLessLabel           | Label of show less items button               | string | -       |
| more                    | Translation of 'more'                         | string | -       |
| less                    | Translation of 'less'                         | string | -       |
| activateItem            | Activate item confirm title                   | string | -       |
| activate                | Label of confirm activation button            | string | -       |
| cancel                  | Label of cancel button                        | string | -       |
| deleteConfirmationTitle | Title of delete item confirmation popup       | string | -       |
| deleteConfirmationTitle | Description of delete item confirmation popup | string | -       |
| deleteLabel             | Label of delete button                        | string | -       |

#### Item

| Property     | Description                                         | Type            | Default |
| ------------ | --------------------------------------------------- | --------------- | ------- |
| id           | Identifier of item                                  | string          | -       |
| name         | Name of item (visible on list)                      | string          | -       |
| canUpdate    | Flag which allows to update item name               | boolean         | -       |
| canDelete    | Flag which allows to remove item                    | boolean         | -       |
| canDuplicate | Flag which allows to duplicate item                 | boolean         | -       |
| tag          | Tag (ds-tags), available only for content list type | Tag             | -       |
| icon         | Icon (ds-icon)                                      | Icon            | -       |
| content      | Content rendered in content type list               | React.ReactNode | -       |
