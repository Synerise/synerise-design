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

### Skeleton

| Property          | Description                                                       | Type            | Default |
| ----------------- | ----------------------------------------------------------------- | --------------- | ------- |
| size              | Height of each bar                                                | 'S' / 'M' / 'L' | 'M'     |
| width             | Fixed bar width; omit to fill container                           | 'M' / 'L'       | -       |
| height            | Override bar height in px (takes precedence over `size`)          | number          | -       |
| numberOfSkeletons | Number of skeleton bars to render                                 | number          | 2       |
| className         | Applied to the container                                          | string          | -       |

### CheckboxSkeleton

| Property          | Description                             | Type            | Default |
| ----------------- | --------------------------------------- | --------------- | ------- |
| size              | Bar height                              | 'S' / 'M' / 'L' | 'M'     |
| numberOfSkeletons | Number of skeleton bars                 | number          | 2       |
| className         | Applied to the container                | string          | -       |

### DropdownSkeleton

| Property          | Description                             | Type            | Default |
| ----------------- | --------------------------------------- | --------------- | ------- |
| size              | Bar height                              | 'S' / 'M' / 'L' | 'M'     |
| numberOfSkeletons | Number of skeleton rows                 | number          | 3       |
| className         | Applied to the container                | string          | -       |

### OrderedListSkeleton

| Property          | Description                             | Type            | Default |
| ----------------- | --------------------------------------- | --------------- | ------- |
| size              | Bar height                              | 'S' / 'M' / 'L' | 'M'     |
| numberOfSkeletons | Number of skeleton rows                 | number          | 4       |
| className         | Applied to the container                | string          | -       |

### SkeletonAvatar

| Property  | Description                                         | Type                    | Default |
| --------- | --------------------------------------------------- | ----------------------- | ------- |
| size      | Avatar diameter (S=24px, M=40px, L=84px, XL=120px) | 'S' / 'M' / 'L' / 'XL' | 'M'     |
| shape     | Square uses 6px border-radius; circle uses 48%      | 'square' / 'circle'     | -       |
| className | Applied to the container                            | string                  | -       |
