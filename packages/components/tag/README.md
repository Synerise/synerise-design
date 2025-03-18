---
id: tag
title: Tag
---

Tag UI Component

## Installation
```
npm i @synerise/ds-tag
or
yarn add @synerise/ds-tag
```

## Usage
```
import Tag from '@synerise/ds-tag'

<Tag />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-tag--default"></iframe>

## API

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
| dashed    | make border dashed                       | boolean                           | -                      |

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
