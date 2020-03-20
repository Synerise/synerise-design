---
id: scrollbar
title: Scrollbar
---

Scrollbar UI Component

## Installation
```
npm i @synerise/ds-scrollbar
or
yarn add @synerise/ds-scrollbar
```

## Usage
```
import Scrollbar from '@synerise/ds-scrollbar'

<Scrollbar />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-scrollbar--default"></iframe>

## API

| Property  | Description                                 | Type                        | Default |
| --------- | ------------------------------------------- | --------------------------- | ------- |
| children  | Scrolled component                          | React.ReactNode `or` string | -       |
| classes   | String with optional classes                | string                      | -       |
| maxHeight | Optional max-height value                   | string `or` number          | -       |
| absolute  | Whether the scrollbar is over content       | boolean                     | true    |