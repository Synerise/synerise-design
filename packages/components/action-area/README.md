---
id: action-area
title: ActionArea
---

ActionArea UI Component

## Installation

```
npm i @synerise/ds-action-area
or
yarn add @synerise/ds-action-area
```

## Usage

```
import ActionArea from '@synerise/ds-action-area'

<ActionArea description="Description" label="Label" actionLabel="Define" action={() => {}} />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-action-area--default"></iframe>

## API

Either both `action` & `actionLabel` OR `customAction` is required.

| Property     | Description                                      | Type                  | Default |
| ------------ | ------------------------------------------------ | --------------------- | ------- |
| action       | Function called when user clicks on ActionButton | `Function`            | -       |
| actionLabel  | Label of action button                           | `React.ReactNode`     | -       |
| customAction | content to render below description              | `React.ReactNode`     | -       |
| description  | Description of ActionArea                        | `React.ReactNode`     | -       |
| label        | Label of ActionArea                              | `React.ReactNode`     | -       |
| buttonProps  | optional additional button props                 | see ds-button         | -       |
| isFullWidth  | Set component width to 100% available space      | `boolean`             | false   |
| isError      | Set component state to invalid                   | `boolean`             | false   |
| errorText    | Text to display when is invalid state            | `React.ReactNode`     | -       |
| className    | custom class name                                | `string`              | -       |
| style        | custom CSS style                                 | `React.CSSProperties` | -       |
