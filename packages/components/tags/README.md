---
id: tags
title: Tags
---

Tags UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-tags--default"></iframe>

## Tag API

| Property  | Description                              | Type                              | Default                |
| --------- | ---------------------------------------- | --------------------------------- | ---------------------- |
| className | tag container class                      | string                            | -                      |
| color     | primary color (background/border) of tag | string                            | -                      |
| disabled  | whether tag should be disabled           | boolean                           | -                      |
| id        | id of tag (necessary if using Tags)      | string / number                   | -                      |
| name      | title of tag                             | string                            | -                      |
| onClick   | onClick event on tag body                | () => void                        | -                      |
| onRemove  | callback when tag is removed             | (tagKey: string / number) => void | -                      |
| removable | show remove button                       | boolean                           | -                      |
| shape     | shape of the tag                         | TagShape                          | TagShape.DEFAULT_ROUND |
| textColor | color of tag name label                  | string                            | -                      |

## Tags API (Group of <Tag />)

| Property         | Description                                                         | Type                                            | Default |
| ---------------- | ------------------------------------------------------------------- | ----------------------------------------------- | ------- |
| addable          | Allow adding tags from `data` (which are not present in `selected`) | boolean                                         | -       |
| className        | Tag Group container class                                           | string                                          | -       |
| creatable        | Allow creating new tags                                             | boolean                                         | -       |
| data             | All available tags                                                  | Tag[]                                           | []      |
| disabled         | Disable entire group (all tags)                                     | boolean                                         | -       |
| manageLink       | optional link visible in add tag dropdown                           | string                                          | -       |
| onCreate         | fired whenever a new tag has been created                           | (tagName: string) => void                       | -       |
| onSelectedChange | fired whenever the list of selected tags changes                    | (tags: Tag[], actionTaken: ActionTaken) => void | -       |
| removable        | Allow removing tags from `selected`                                 | boolean                                         | -       |
| style            | Tag Group container styles                                          | React.CSSProperties                             | -       |
| selected         | Selected tags                                                       | Tag[]                                           | []      |
| tagShape         | Shape of tags                                                       | TagShape                                        | -       |
| texts            | necessary texts to render tags group                                | TagsTexts                                       | {}      |

## ActionTaken

| Property | Description                                                    | Type             |
| -------- | -------------------------------------------------------------- | ---------------- |
| tag      | Affected tag                                                   | Tag              |
| type     | Type of action taken that caused onSelectedChange to be called | 'ADD' / 'REMOVE' |

## TagsTexts

| Property             | Description                                                   | Type                     | Default |
| -------------------- | ------------------------------------------------------------- | ------------------------ | ------- |
| addButtonLabel       | Label for add tag button                                      | string / React.ReactNode |         |
| searchPlaceholder    | Search input placeholder for add tag dropdown                 | string                   |         |
| manageLinkLabel      | Label for manage link for add tag dropdown                    | string / React.ReactNode |         |
| createTagButtonLabel | Label for create tag button for add tag dropdown              | string / React.ReactNode |         |
| dropdownNoTags       | Text for a label displayed when no tags are found to be added | string / React.ReactNode |         |

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
