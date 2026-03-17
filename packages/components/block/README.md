---
id: block
title: Block
---

> **DEPRECATED.** This component will receive no further updates and will be removed from a future DS version. Do not use in new code.

Block UI Component

## Installation

```
npm i @synerise/ds-block
or
yarn add @synerise/ds-block
```

## Usage

```
import Block from '@synerise/ds-block'

<Block />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-block--default"></iframe>

## API

| Property   | Description                            | Type                     | Default |
| ---------- | -------------------------------------- | ------------------------ | ------- |
| children   | Header name                            | React.ReactNode / string | -       |
| isDragging | Return `true`if Block is being dragged | boolean                  | -       |
| icon       | Block icon component                   | React.ReactNode          | -       |
| className  | Extra CSS class on the wrapper element | string                   | -       |
