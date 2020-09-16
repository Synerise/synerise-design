---
id: folders
title: Folders
---

Folders UI Component

## Installation

```
npm i @synerise/ds-folders
or
yarn add @synerise/ds-folders
```

## Usage

```
import Folders from '@synerise/ds-folders'

<Folders />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-Folders--default"></iframe>

## API

| Property          | Description                                                             | Type                                                                                     | Default  |
| ----------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| addButtonDisabled | Defines if add button is disabled                                       | boolean                                                                                  | `false`  |
| actionsDisplay    | The way of displaying actions menu                                      | `inline` / `dropdown`                                                                    | `inline` |
| dataSource        | Array of items which should be displayed as folders                     | FolderItem[]                                                                             | []       |
| folderFilter      | Filter function which may be applied to the data source                 | (item: FolderItem)=>boolean                                                              | -        |
| maxItemsVisible   | The maximum amount of items which will be visible on the initial render | number                                                                                   | 5        |
| onAdd             | Callback executed when new folder is added                              | (added: FolderItem) => void                                                              | -        |
| onDelete          | Callback executed when a folder is deleted                              | (deleted: FolderItem, options: `{ mode: DeleteMode; destination?: FolderItem }`) => void | -        |
| onEdit            | Callback executed when a folder is edited                               | (edited: FolderItem) => void                                                             | -        |
| onFavourite       | Callback executed when a folder is added or removed from favourites     | (favourite: FolderItem) => void                                                          | -        |
| onSelect          | Callback executed when a folder is selected                             | (selected: FolderItem) => void                                                           | -        |
| onSettings        | Callback executed when user enters settings panel for a folder          | (selected: FolderItem) => void                                                           | -        |
| showHideStep      | Number of items shown after clicking "show more" button                 | number                                                                                   | 5        |
| texts             | Translation texts passed to the component                               | FolderTexts                                                                              | -        |

### FolderItem

| Property         | Description                                  | Type    | Default |
| ---------------- | -------------------------------------------- | ------- | ------- |
| id               | Unique id of the folder item                 | string  | -       |
| name             | Name of the folder                           | string  | -       |
| favourite        | Whether item is added to favourites          | boolean | `false` |
| canUpdate        | Whether item is editable                     | boolean | `false` |
| canDelete        | Whether item is removable                    | boolean | `false` |
| canEnterSettings | Whether user can enter settings for the item | boolean | `false` |

### FolderTexts

| Property                        | Description                                                                                | Type                     | Default |
| ------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------ | ------- |
| add                             | "Add" text                                                                                 | string / React.ReactNode | -       |
| addItemLabel                    | A label of the add form                                                                    | string / React.ReactNode | -       |
| addToFavourite                  | A tooltip used for adding to the favourites                                                | string / React.ReactNode | -       |
| chooseDestinationFolder         | A message asking users where should removed folder's content go to                         | string / React.ReactNode | -       |
| delete                          | "Delete" text                                                                              | string / React.ReactNode | -       |
| deleteFolderLabel               | A label of the removal form                                                                | string / React.ReactNode | -       |
| deleteFolderConfirmationMessage | A message asking users to confirm folder's removal                                         | string / React.ReactNode | -       |
| deleteFolderDescription         | Description of the removal form                                                            | string / React.ReactNode | -       |
| deleteFromFavourites            | A tooltip used for removing from favourites                                                | string / React.ReactNode | -       |
| deleteAllContent                | A message displayed when user wants to delete all the content of the folder                | string / React.ReactNode | -       |
| edit                            | "Edit" text - displayed in actions menu                                                    | string / React.ReactNode | -       |
| enterSettings                   | "Settings" text - displayed in actions menu                                                | string / React.ReactNode | -       |
| folderNamePlaceholder           | Placeholder of the input in the add folder form                                            | string                   | -       |
| invalidNameError                | Error displayed when user provides invalid folder name                                     | string / React.ReactNode | -       |
| less                            | "Less" text - displayed in the footer                                                      | string / React.ReactNode | -       |
| more                            | "More" text - displayed in the footer                                                      | string / React.ReactNode | -       |
| moveToDefault                   | A message displayed when user wants to all the content of the folder to the default folder | string / React.ReactNode | -       |
| moveToOtherFolder               | A message displayed when user wants to all the content of the folder to the other folder   | string / React.ReactNode | -       |
| showLessLabel                   | Additional label of the "show less" button in the footer                                   | string / React.ReactNode | -       |
| showMoreLabel                   | Additional label of the "show more" button in the footer                                   | string / React.ReactNode | -       |
