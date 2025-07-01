---
id: field-set
title: FieldSet
---

FieldSet UI Component

## Installation

```
npm i @synerise/ds-field-set
or
yarn add @synerise/ds-field-set
```

## Usage

```
import FieldSet from '@synerise/ds-field-set'

<FieldSet />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-field-set--default"></iframe>

## API

| Property     | Description               | Type            | Default |
| ------------ | ------------------------- | --------------- | ------- |
| component    | prop to set component     | React.ReactNode | -       |
| title        | text of title             | string          | -       |
| onTitleClick | onclick handler for title | () => void      | -       |
| description  | text of the description   | string          | -       |
| prefix       | prop to set prefix item   | React.ReactNode | -       |
| button       | prop to set button        | React.ReactNode | -       |
