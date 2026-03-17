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
| hasStatus            | Aligns `badge` with the avatars                                 | boolean                          | -        |
| size                 | The size of the avatars                                         | `small` / `medium` / `large`     | `medium` |
| dataSource           | Array of avatar records                                         | DataSource[]                     | -        |
| moreInfoTooltip      | Suffix text for the +N overflow tooltip                         | string                           | -        |
| groupModal           | If provided, +N counter opens a modal with the full member list | GroupModalSettings               | -        |

### DataSource

| Property    | Description                          | Type                                     | Default |
| ----------- | ------------------------------------ | ---------------------------------------- | ------- |
| id          | Unique identifier                    | string / number                          | -       |
| initials    | Initials displayed in the avatar     | string                                   | -       |
| firstname   | First name (shown in modal)          | string                                   | -       |
| lastname    | Last name (shown in modal)           | string                                   | -       |
| email       | Email (shown in modal)               | string                                   | -       |
| status      | Badge status                         | `'active'` / `'inactive'` / `'blocked'` | -       |
| avatarProps | Props spread onto the Avatar element | AvatarProps (from `@synerise/ds-avatar`) | -       |
