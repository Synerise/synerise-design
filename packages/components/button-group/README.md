---
id: button-group
title: Button-Group
---

A group of buttons is used to wrap a series of buttons.

## When to use it

---

- To combine primary and secondary buttons.
- To allow users to navigate between several separate tabs with options in a main screen.

## Component anatomy

---

This is a complex component, which means that it may consist of other components:

- [icon](/docs/components/icon/)
- [button](/docs/components/button/)
- [utils](/docs/components/utils/)

## Installation

---

```
npm i @synerise/ds-button-group
```

or

```
yarn add @synerise/ds-button-group
```

## Usage

---

```
import ButtonGroup from '@synerise/ds-button-group'


<ButtonGroup
  title={'Some title'}
  size={'large'}
  description={'Some description'}
>
  <Button onClick={() => alert('Clicked!')}>Click me!</Button>
  <Button onClick={() => alert('Clicked!')}>Click me!</Button>
  <Button onClick={() => alert('Clicked!')}>Click me!</Button>
</ButtonGroup>

```

## Demo

---

<iframe src="/storybook-static/iframe.html?id=components-buttongroup--default"></iframe>

## API

---

| Property    | Description                                      | Type            | Default |
| ----------- | ------------------------------------------------ | --------------- | ------- |
| title       | The title of the group                           | string          | -       |
| description | The description of the group                     | string          | -       |
| size        | Defines the size of the button: `small`, `large` | string          | -       |
| children    | Buttons used in the group                        | React.ReactNode | -       |
