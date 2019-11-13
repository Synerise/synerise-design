---
id: avatar
title: Avatar
---

Avatar is an icon that represents a particular person. But, the avatar has more applications in the Synerise platform.
It is used as:

1. Human-related icon
1. Object icon

Inspired by [Ant Design Avatar](https://ant.design/components/avatar/)

## When to use it

---

- To represent a platform user (for example, to indicate the author of the campaign).
- To represent a customer (for example, on a list of customers, on a customer card).
- To represent the type of item on a list (for example, a campaign, an analysis).

## Component anatomy

---

This is a complex component which means it consist of more components:

- [badge](/docs/components/badge/)

## Installation

---

```
npm i @synerise/ds-avatar
or
yarn add @synerise/ds-avatar
```

## Usage

---

```
import Avatar from '@synerise/ds-avatar'

<Avatar
  shape={circle}
  backgroundColor={grey}
  size={20}
/>

```

## Badge sizes

<iframe src="/storybook-static/iframe.html?id=components-avatar--sizes"></iframe>

## Avatar types

<iframe src="/storybook-static/iframe.html?id=components-avatar--types"></iframe>

## Avatar statuses

<iframe src="/storybook-static/iframe.html?id=components-avatar--statuses"></iframe>

## API

| Property        | Description                                                                                           | Type                                       | Default   |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------- |
| icon            | The `Icon` type for an icon avatar, see `Icon` Component                                              | string                                     | -         |
| shape           | The shape of the avatar                                                                               | `circle` \ `square`                        | `circle`  |
| size            | The size of the avatar                                                                                | number \ string: `large` `small` `default` | `default` |
| src             | The URL of the image for the avatar                                                                   | string                                     | -         |
| srcSet          | The list of sources to use for different screen resolutions                                           | string                                     | -         |
| alt             | The alternate text for the image                                                                      | string                                     | -         |
| onError         | Handler for image load errors, return `false` to prevent a default fallback behavior                  | () => boolean                              | -         |
| hasStatus       | Aligns `badge` with the avatar                                                                        | boolean                                    | `false`   |
| iconComponent   | Allows to provide a custom component as a child. The prop icon has greater priority if both provided  | ReactNode                                  |           |
| backgroundColor | Background color of the avatar: `red/green/grey/yellow/blue/pink/mars/orange/fern/cyan/purple/violet` | string                                     |           |
| disabled        | Disabled state of the avatar                                                                          | boolean                                    | `false`   |
