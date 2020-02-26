---
id: add-button
title: AddButton
---

AddButton UI Component

## Installation

```
npm i @synerise/ds-add-button
or
yarn add @synerise/ds-add-button
```

## Usage

```
import AddButton from '@synerise/ds-add-button'

<AddButton />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-add-button--default"></iframe>

## API

| Property | Description                               | Type            | Default |
| -------- | ----------------------------------------- | --------------- | ------- |
| disabled | Defines if the button is disabled         | boolean         | `false` |
| onClick  | Sets the handler to handle `click` event  | (event) => void | -       |
| block    | Fits the button width to its parent width | boolean         | `false` |
| label    | Renders button with label                 | string          | null    |
