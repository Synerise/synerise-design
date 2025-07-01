---
id: avatar-group
title: AvatarGroup
---

AvatarGroup UI Component

## Installation

```
npm i @synerise/ds-avatar-group
or
yarn add @synerise/ds-avatar-group
```

## Usage

```
import AvatarGroup from '@synerise/ds-avatar-group'

<AvatarGroup />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-avatar-group--default"></iframe>

## API

| Property             | Description                                                     | Type                             | Default  |
| -------------------- | --------------------------------------------------------------- | -------------------------------- | -------- |
| numberOfVisibleUsers | Number of visible avatars                                       | number                           | 3        |
| hasStatus            | Aligns `badge` with the avatars                                 | boolean                          | `false`  |
| size                 | The size of the avatars                                         | string: `large` `small` `medium` | `medium` |
| avatars              | Array of avatars                                                | Avatar[]                         | -        |
| moreInfoTooltip      | Text on tooltip with information about number of hidden avatars | string                           | -        |

### Avatar

| Property    | Description                      | Type                                         | Default   |
| ----------- | -------------------------------- | -------------------------------------------- | --------- |
| initials    | Initials of user                 | string                                       | -         |
| status      | Status of user                   | 'active', 'inactive', 'blocked' of undefined | undefined |
| avatarProps | Props from `ds-avatar` component | object                                       | -         |
