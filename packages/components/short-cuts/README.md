---
id: short-cuts
title: ShortCuts
---

ShortCuts UI Component

## Installation

```
npm i @synerise/ds-short-cuts
or
yarn add @synerise/ds-short-cuts
```

## Usage

```
import ShortCuts from '@synerise/ds-short-cuts'

<ShortCuts />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-short-cuts--default"></iframe>

## API

| Property  | Description                                                | Type                   | Default |
| --------- | ---------------------------------------------------------- | ---------------------- | ------- |
| size      | Size of the shortcut badge                                 | `'S'` \| `'L'`        | `L`     |
| color     | Color variant                                              | `'light'` \| `'dark'` | -       |
| children  | Text label to display (mutually exclusive with `icon`)     | ReactNode              | -       |
| icon      | Icon to display (mutually exclusive with `children`)       | ReactNode              | -       |
| autoWidth | When true, width is `auto`; when false, width equals height | boolean               | `false` |
