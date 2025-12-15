---
id: tags
title: Tags
---

Tags UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-tags--default"></iframe>

## Tags API (Group of <Tag />)

| Property         | Description                                                                                                             | Type                                                    | Default       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------- | ------------ |
| addable          | Allow adding tags from `data` (which are not present in `selected`)                                                     | boolean                                                 | -             |
| className        | Tag Group container class                                                                                               | string                                                  | -             |
| creatable        | Allow creating new tags                                                                                                 | boolean                                                 | -             |
| data             | All available tags                                                                                                      | (Tag & {informationCardProps?: InformationCardProps})[] | []            |
| disabled         | Disable entire group (all tags)                                                                                         | boolean                                                 | -             |
| onCreate         | fired whenever a new tag has been created                                                                               | (tagName: string) => void                               | -             |
| onSelectedChange | fired whenever the list of selected tags changes                                                                        | (tags: Tag[], actionTaken: ActionTaken) => void         | -             |
| removable        | Allow removing tags from `selected`                                                                                     | boolean                                                 | -             |
| style            | Tag Group container styles                                                                                              | React.CSSProperties                                     | -             |
| selected         | Selected tags                                                                                                           | (Tag & {informationCardProps?: InformationCardProps})[] | []            |
| tagShape         | Shape of tags                                                                                                           | TagShape                                                | -             |
| texts            | necessary texts to render tags group                                                                                    | TagsTexts                                               | {}            |
| dropdownFooter   | Allows adding custom content to the footer of the dropdown                                                              | ReactNode                                               | -             |
| maxVisibleTags   | Defines the max number of selected tags that are visible by default. Additional selected tags will appear in a dropdown | number                                                  | -             |
| addButtonType    | Defines the type of button used to add more tags. 'icon-label' by default                                               | 'icon-label'                                            | 'single-icon' | 'icon-label' |

## ActionTaken

| Property | Description                                                    | Type             |
| -------- | -------------------------------------------------------------- | ---------------- |
| tag      | Affected tag                                                   | Tag              |
| type     | Type of action taken that caused onSelectedChange to be called | 'ADD' / 'REMOVE' |

## TagsTexts

| Property             | Description                                                   | Type               | Default      |
| -------------------- | ------------------------------------------------------------- | ------------------ | ------------ |
| addButtonLabel       | Label for add tag button                                      | string / ReactNode |              |
| clearTooltip         | Tooltip text displayed on search clear icon hover             | string / ReactNode |              |
| deleteTooltip        | Tooltip text displayed on remove icon hover                   | string / ReactNode | `Delete`     |
| searchPlaceholder    | Search input placeholder for add tag dropdown                 | string             |              |
| manageLinkLabel      | Label for manage link for add tag dropdown                    | string / ReactNode |              |
| createTagButtonLabel | Label for create tag button for add tag dropdown              | string / ReactNode |              |
| noResultsLabel       | Label displayed when filtering tags returns an empty array    | string / ReactNode | `No results` |
| dropdownNoTags       | Text for a label displayed when no tags are found to be added | string / ReactNode |              |
| title                | Text for a tags group                                         | ReactNode          |              |
