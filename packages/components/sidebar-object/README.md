---
id: sidebar-object
title: SidebarObject
---

SidebarObject UI Component

## Installation

```
npm i @synerise/ds-sidebar-object
or
yarn add @synerise/ds-sidebar-object
```

## Usage

```
import SidebarObject from '@synerise/ds-sidebar-object'

<SidebarObject />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-sidebar-object--default"></iframe>

## API

| Property             | Description                                                                                | Type                            | Default      |
| -------------------- | ------------------------------------------------------------------------------------------ | ------------------------------- | ------------ |
| headerTabs           | Tab definitions; `content` is the tab body rendered in the scrollable area                 | TabItem[]                       | -            |
| inputObject          | Object whose keys are displayed in ObjectSummary                                           | object                          | -            |
| texts                | Header labels (button texts, icon tooltips, etc.)                                          | Partial\<HeaderTexts\>          | -            |
| name                 | Object name shown in the title                                                             | string                          | -            |
| activeTab            | Index of the active tab                                                                    | number                          | `0`          |
| headerType           | `’editable’` renders InlineEdit for title; `’readonly’` renders plain text                 | ‘readonly’ / ‘editable’         | `’readonly’` |
| typeButtons          | `’withNavigation’`: up/down + options + close. `’twoButtons’`: cancel + apply              | ‘twoButtons’ / ‘withNavigation’ | -            |
| avatar               | Avatar element of the sidebar                                                              | React.ReactNode                 | -            |
| headerPreffix        | Element rendered on the left side of the header                                            | React.ReactNode                 | -            |
| additionalNode       | Extra content rendered below the title bar but above tabs                                  | React.ReactNode                 | -            |
| inlineEditInputProps | Extra props for the InlineEdit input (only when `headerType=’editable’`)                   | Partial\<InputProps\>           | -            |
| inputObjectIdKey     | Key in `inputObject` used as the "Copy ID" value                                           | string                          | `’id’`       |
| onEdit               | Shows "Edit" in options dropdown; called with `inputObject`                                | (inputObject: object) => void   | -            |
| onDuplicate          | Shows "Duplicate" in options dropdown; called with `inputObject`                           | (inputObject: object) => void   | -            |
| onMove               | Shows "Move" in options dropdown; called with `inputObject`                                | (inputObject: object) => void   | -            |
| onDelete             | Shows "Delete" in options dropdown; called with `inputObject`                              | (inputObject: object) => void   | -            |
| onId                 | Shows "Copy ID" in options dropdown; called with `inputObject`                             | (inputObject: object) => void   | -            |
| onRename             | Called when inline edit value changes (only when `headerType=’editable’`)                  | (name: string) => void          | -            |
| onCloseClick         | Close button handler (shown in `withNavigation` mode)                                      | () => void                      | -            |
| onCancelClick        | Cancel button handler (shown in `twoButtons` mode)                                         | () => void                      | -            |
| onApplyClick         | Apply button handler (shown in `twoButtons` mode)                                          | () => void                      | -            |
| onArrowUp            | Up navigation button handler (shown in `withNavigation` mode when provided)                | () => void                      | -            |
| onArrowDown          | Down navigation button handler (shown in `withNavigation` mode when provided)              | () => void                      | -            |
| withScrollbar        | Enables vertical scroll on content area                                                    | boolean                         | -            |
| handleTabClick       | Called when a tab is clicked                                                               | (index: number) => void         | -            |
| footer               | Footer rendered at the bottom outside the scroll area                                      | React.ReactNode                 | -            |
