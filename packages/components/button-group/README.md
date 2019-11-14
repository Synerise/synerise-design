---
id: button-group
title: Button-Group
---

A group of buttons is used to wrap a series of buttons.

## Installation

```
npm i @synerise/ds-button-group
or
yarn add @synerise/ds-button-group
```

## Usage

```
import ButtonGroup from '@synerise/ds-button-group'


<ButtonGroup
  title={'Some title'}
  description={'Some description'}
>
  <Button {...buttonProps}>{buttonProps.content}</Button>
  <Button {...buttonProps}>{buttonProps.content}</Button>
  <Button {...buttonProps}>{buttonProps.content}</Button>
</ButtonGroup>

```

## When to use it

---

- To combine primary and secondary buttons.
- To allow users navigate between several separate tabs with options in a main screen.

## Component anatomy

---

This is a complex component which means that it may consist of other components:

- [icon](/docs/components/icon/)
- [button](/docs/components/button/)
- [utils](/docs/components/utils/)

## Demo

---

<iframe src="/storybook-static/iframe.html?id=components-buttongroup--default"></iframe>

## API

---

| Property    | Description                  | Type            | Default |
| ----------- | ---------------------------- | --------------- | ------- |
| title       | The title of the group       | string          | -       |
| description | The description of the group | string          | -       |
| children    | Buttons used in the group    | React.ReactNode | -       |
