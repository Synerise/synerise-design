---
id: tags
title: Tags
---

Tags UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-tags--default"></iframe>

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

| Property             | Description                                                   | Type                     | Default      |
| -------------------- | ------------------------------------------------------------- | ------------------------ | ------------ |
| addButtonLabel       | Label for add tag button                                      | string / React.ReactNode |              |
| clearTooltip         | Tooltip text displayed on search clear icon hover             | string / React.ReactNode |              |
| deleteTooltip        | Tooltip text displayed on remove icon hover                   | string / React.ReactNode | `Delete`     |
| searchPlaceholder    | Search input placeholder for add tag dropdown                 | string                   |              |
| manageLinkLabel      | Label for manage link for add tag dropdown                    | string / React.ReactNode |              |
| createTagButtonLabel | Label for create tag button for add tag dropdown              | string / React.ReactNode |              |
| noResultsLabel       | Label displayed when filtering tags returns an empty array    | string / React.ReactNode | `No results` |
| dropdownNoTags       | Text for a label displayed when no tags are found to be added | string / React.ReactNode |              |
