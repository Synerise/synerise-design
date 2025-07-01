---
id: skeleton
title: Skeleton
---

Skeleton UI Component

## Installation

```
npm i @synerise/ds-skeleton
or
yarn add @synerise/ds-skeleton
```

## Usage

```
import Skeleton from '@synerise/ds-skeleton'

<Skeleton />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-skeleton--default"></iframe>

## API

| Property          | Description                                                        | Type            | Default  |
| ----------------- | ------------------------------------------------------------------ | --------------- | -------- | -------- |
| size              | Changing size of Skeleton                                          | 'S' / 'M' / 'L' | M        |
| width             | Changing width of Skeleton                                         | 'M' / 'L'       | M        |
| height            | Set height of Skeleton                                             | number          |          |
| inline            | Removes additional margin around skeleton if inteded to use inline | boolean         |          |
| numberOfSkeletons | Add more Skeletons                                                 | number          | 2        |
| shape             | Change shape of Skeletons                                          | `circle`        | `square` | `circle` |
