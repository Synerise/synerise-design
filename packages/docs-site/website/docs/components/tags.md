---
id: tags
title: Tags
---

Tags UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-tags--default"></iframe>

## Tag API

| Property  | Description                              | Type            | Default                |
| --------- | ---------------------------------------- | --------------- | ---------------------- |
| id        | id of tag (necessary if using Tags)      | string / number | -                      |
| name      | title of tag                             | string          | -                      |
| textColor | color of tag name label                  | string          | -                      |
| color     | primary color (background/border) of tag | string          | -                      |
| shape     | shape of the tag                         | TagShape        | TagShape.DEFAULT_ROUND |
| removable | show remove button                       | boolean         | -                      |
| className | tag container class                      | string          | -                      |
| disabled  | whether tag should be disabled           | boolean         | -                      |
| onClick   | onClick event on tag body                | () => void      | -                      |
| onRemove  | event for tag removal                    | (tagKey: string | number)                | - |

## Tags API (Group of <Tag />)

| Property         | Description                                                         | Type                                            | Default |
| ---------------- | ------------------------------------------------------------------- | ----------------------------------------------- | ------- |
| data             | All available tags                                                  | Tag[]                                           | []      |
| selected         | Selected tags                                                       | Tag[]                                           | []      |
| tagShape         | Shape of tags                                                       | TagShape                                        | -       |
| className        | Tag Group container class                                           | string                                          | -       |
| style            | Tag Group container styles                                          | React.CSSProperties                             | -       |
| addable          | Allow adding tags from `data` (which are not present in `selected`) | boolean                                         | -       |
| removable        | Allow removing tags from `selected`                                 | boolean                                         | -       |
| creatable        | Allow creating new tags                                             | boolean                                         | -       |
| disabled         | Disable entire group (all tags)                                     | boolean                                         | -       |
| manageLink       | optional link visible in add tag dropdown                           | string                                          | -       |
| texts            | necessary texts to render tags group                                | TagsTexts                                       | {}      |
| onCreate         | fired whenever a new tag has been created                           | (tagName: string) -> void                       | -       |
| onSelectedChange | fired whenever the list of selected tags changes                    | (tags: Tag[], actionTaken: ActionTaken) -> void | -       |

## ActionTaken

| Property | Description                                                    | Type             |
| -------- | -------------------------------------------------------------- | ---------------- |
| type     | Type of action taken that caused onSelectedChange to be called | 'ADD' / 'REMOVE' |
| tag      | Affected tag                                                   | Tag              |

## TagsTexts

| Property             | Description                                                   | Default |
| -------------------- | ------------------------------------------------------------- | ------- |
| addButtonLabel       | Label for add tag button                                      | -       |
| searchPlaceholder    | Search input placeholder for add tag dropdown                 | -       |
| manageLinkLabel      | Label for manage link for add tag dropdown                    | -       |
| createTagButtonLabel | Label for create tag button for add tag dropdown              | -       |
| dropdownNoTags       | Text for a label displayed when no tags are found to be added | -       |

## TagShape Enum

| Property                         |
| -------------------------------- |
| TagShape.SINGLE_CHARACTER_ROUND  |
| TagShape.SINGLE_CHARACTER_SQUARE |
| TagShape.DEFAULT_ROUND           |
| TagShape.DEFAULT_SQUARE          |
| TagShape.SMALL_ROUND             |
| TagShape.SMALL_SQUARE            |
| TagShape.STATUS_NEUTRAL          |
| TagShape.STATUS_SUCCESS          |
| TagShape.STATUS_ERROR            |
| TagShape.STATUS_WARNING          |
