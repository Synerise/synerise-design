---
id: empty-states
title: EmptyStates
---

EmptyStates UI Component

## Installation

```
npm i @synerise/ds-empty-states
or
yarn add @synerise/ds-empty-states
```

## Usage

```
import EmptyStates from '@synerise/ds-empty-states'

<EmptyStates />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-empty-states--default"></iframe>

## API

| Property      | Description                        | Type                                    | Default |
| ------------- | ---------------------------------- | --------------------------------------- | ------- |
| size          | Changing size on Icon              | 'Xl' / 'L'                              | M       |
| label         | text of empty states               | string / React.ReactNode                | -       |
| labelPosition | Defines the position of text       | right / bottom                          | right   |
| text          | text of Header                     | string / React.ReactNode                | -       |
| type          | type of icon                       | `Add` / `NoResults` / `SearchNoResults` | -       |
| button        | render button                      | string / React.ReactNode                | -       |
| fontSize      | set size of Header                 | string / React.ReactNode                | -       |
| mode          | prop to set empty states in center | absolute / undefined                    | -       |
