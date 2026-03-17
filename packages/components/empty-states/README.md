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

| Property      | Description                                               | Type                                    | Default  |
| ------------- | --------------------------------------------------------- | --------------------------------------- | -------- |
| size          | Icon size                                                 | `small` / `medium`                      | `small`  |
| label         | Secondary label text                                      | string / React.ReactNode                | -        |
| labelPosition | **@deprecated** — has no effect on rendering              | `right` / `bottom`                      | -        |
| text          | Header / primary text                                     | string / React.ReactNode                | -        |
| button        | Action button rendered below label                        | React.ReactNode                         | -        |
| fontSize      | Header font size (`small` = 14px, `medium` = 18px)        | `small` / `medium`                      | `small`  |
| customIcon    | Icon element rendered via `@synerise/ds-icon`             | React.ReactElement                      | -        |
| iconPosition  | Position of icon relative to content                      | `top` / `left` / `right`               | `top`    |
| textAlign     | Text alignment of the content area                        | `left` / `center` / `right` / `justify` | `center` |
| mode          | `absolute` positions wrapper at top:50% left:50%          | `absolute`                              | -        |
| className     | Additional CSS class (merged with `ds-empty-states`)      | string                                  | -        |
