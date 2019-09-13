---
id: avatar
title: Avatar
---

Avatar UI Component

This component can be used to represent people

Based on [Ant Design Avatar](https://ant.design/components/avatar/)

## Demo

<iframe src="/storybook-static/iframe.html?id=components-avatar--default"></iframe>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| icon | the `Icon` type for an icon avatar, see `Icon` Component | string | - |
| shape | the shape of avatar | `circle` \ `square` | `circle` |
| size | the size of the avatar | number \ string: `large` `small` `default` | `default` |
| src | the address of the image for an image avatar | string | - |
| srcSet | a list of sources to use for different screen resolutions | string | - |
| alt | This attribute defines the alternative text describing the image | string | - |
| onError | handler when img load error, return false to prevent default fallback behavior | () => boolean | - |
