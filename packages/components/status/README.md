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

| Property  | Description            | Type                                                      | Default   |
| --------- | ---------------------- | --------------------------------------------------------- | --------- |
| type      | type of status         | `primary` / `success` / `warning` / `danger` / `disabled` | `primary` |
| label     | text inside the status | string                                                    | -         |
| className | wrapper class name     | string                                                    | -         |
| onClick   | onClick event          | () => void                                                | -         |
