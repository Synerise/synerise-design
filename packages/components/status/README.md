---
id: status
title: Status
---

Status UI Component

## Installation

```
npm i @synerise/ds-status
or
yarn add @synerise/ds-status
```

## Usage

```
import Status from '@synerise/ds-status'

<Status type="primary" label="This is a status" />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-status--default"></iframe>

## API

| Property  | Description                              | Type                                                                           | Default              |
| --------- | ---------------------------------------- | ------------------------------------------------------------------------------ | -------------------- |
| type      | type of status                           | `primary` / `success` / `warning` / `danger` / `info` / `disabled` / `default` | `primary` / `custom` |
| label     | text inside the status                   | string                                                                         | -                    |
| className | wrapper class name                       | string                                                                         | -                    |
| onClick   | onClick event                            | () => void                                                                     | -                    |
| color     | type of color (works with type="custom") | string                                                                         | -                    |
| dashed    | make dashed border                       | boolean                                                                        | -                    |
