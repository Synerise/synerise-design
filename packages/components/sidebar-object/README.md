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

| Property             | Description                                         | Type                            | Default |
| -------------------- | --------------------------------------------------- | ------------------------------- | ------- |
| avatar               | Avatar element of the sidebar                       | React.ReactNode                 | -       |
| headerPreffix        | Element rendered on the left side of the header     | React.ReactNode                 | -       |
| headerTabs           | Tabs component to switch between content            | TabItem                         | -       |
| inputObject          | Object to be displayed in the sidebar               | object                          | -       |
| inlineEditInputProps | Props passed to the input of InlineEdit component   | InlineEdit.InputProps           | -       |
| onArrowUp            | Callback executed when arrowUp icon is clicked      | void                            | -       |
| onArrowDown          | Callback executed when arrowDown icon is clicked    | void                            | -       |
| onEdit               | Callback executed when clicked on edit icon         | (inputObject:object) => void    | -       |
| onDuplicate          | Callback executed when clicked on duplicate icon    | (inputObject:object) => void    | -       |
| onMove               | Callback executed when clicked on move icon         | (inputObject:object) => void    | -       |
| onDelete             | Callback executed when clicked on delete icon       | (inputObject:object) => void    | -       |
| onId                 | Callback executed after clicking on the object's ID | (inputObject:object) => void    | -       |
| onScrollbar          | Callback executed when scroll                       | boolean                         | -       |
| texts                | Group of texts                                      | HeaderTexts                     | -       |
| onCloseClick         | Prop to close Drawer                                | void                            | -       |
| inputObjectId        | Unique id of the object passed as string            | string                          | -       |
| handleTabClick       | Callback executed when you click on Tab             | (index: number) => void         | -       |
| footer               | Callback executed to show footer                    | React.ReactNode                 | -       |
| additionalNode       | Callback executed to show additional element        | React.ReactNode                 | -       |
| headerType           | Prop to choose editable title                       | ‘readonly’ , ‘editable’         | -       |
| typeButtons          | Prop to choose type of buttons                      | ‘twoButtons’ , ‘withNavigation’ | -       |
