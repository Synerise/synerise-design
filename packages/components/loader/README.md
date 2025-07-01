---
id: loader
title: Loader
---

Loader UI Component

## Installation

```
npm i @synerise/ds-loader
or
yarn add @synerise/ds-loader
```

## Usage

```
import Loader from '@synerise/ds-loader'

<Loader />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-loader--default"></iframe>

## API

| Property         | Description                  | Type                     | Default |
| ---------------- | ---------------------------- | ------------------------ | ------- |
| size             | Changing size on Loader      | 'S' / 'M' / 'L'          | M       |
| label            | text of loader               | string / React.ReactNode | -       |
| labelPosition    | Defines the position of text | right / bottom           | right   |
| color            | Changing color of Loader     | string                   | `blue`  |
| percent          | percent number of loader     | number / React.ReactNode | -       |
| percentFormatter | prop to keep in order        | React.ReactNode          | -       |
| mode             | prop to set loader in center | absolute / undefined     | -       |
| className        | css class name               | string                   | -       |
