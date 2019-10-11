---
id: avatar
title: Avatar
---

Avatar UI Component

This component can be used to represent people

Based on [Ant Design Avatar](https://ant.design/components/avatar/)

## Installation

```
npm i @synerise/ds-avatar
or
yarn add @synerise/ds-avatar
```

## Usage

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

| Property        | Description                                                                                              | Type                                       | Default   |
| --------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------- |
| icon            | the `Icon` type for an icon avatar, see `Icon` Component                                                 | string                                     | -         |
| shape           | the shape of avatar                                                                                      | `circle` \ `square`                        | `circle`  |
| size            | the size of the avatar                                                                                   | number \ string: `large` `small` `default` | `default` |
| src             | the address of the image for an image avatar                                                             | string                                     | -         |
| srcSet          | a list of sources to use for different screen resolutions                                                | string                                     | -         |
| alt             | This attribute defines the alternative text describing the image                                         | string                                     | -         |
| onError         | handler when img load error, return false to prevent default fallback behavior                           | () => boolean                              | -         |
| hasStatus       | align badge with avatar                                                                                  | boolean                                    | false     |
| iconComponent   | Allow to provider custom component as child. Prop icon has greater priority if both provided             | ReactNode                                  |           |
| backgroundColor | Background color of Avatar, one of `red/green/grey/yellow/blue/pink/mars/orange/fern/cyan/purple/violet` | string                                     |           |
| disabled        | disabled state of Avatar                                                                                 | boolean                                    | false     |
