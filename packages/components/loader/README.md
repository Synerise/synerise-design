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
| color            | Changing color of Loader     | 'grey' / 'blue' / 'red' / 'green' / 'yellow' / 'pink' / 'mars' / 'orange' / 'fern' / 'cyan' / 'purple' / 'violet' / string | `grey`  |
| text             | Bold header text above label | React.ReactNode          | -       |
| fontSize         | Font size of text header     | 'small' / 'medium'       | -       |
| percent          | Value passed to percentFormatter | React.ReactNode      | -       |
| percentFormatter | Renders formatted percent beside label | (percent?: React.ReactNode) => React.ReactNode | -       |
| mode             | prop to set loader in center | absolute / undefined     | -       |
| className        | css class name               | string                   | -       |

## Class names

Style the loader's parts through these classes rather than importing its styled components from `dist/Loader.styles`.

| Class                     | Element                                              |
| ------------------------- | ---------------------------------------------------- |
| ds-loader                 | Root element, plus any `className` passed in         |
| ds-loader-spinner-wrapper | Margin box around the spinner                        |
| ds-loader-spinner         | The spinning circle                                  |
| ds-loader-header          | Header rendered from `text` (only when set)          |
| ds-loader-label           | Label container                                      |
| ds-loader-percent         | Formatted percent (only when `percentFormatter` set) |
