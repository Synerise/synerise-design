---
id: inline-alert
title: InlineAlert
---

InlineAlert UI Component

## Installation

```
npm i @synerise/ds-inline-alert
or
yarn add @synerise/ds-inline-alert
```

## Usage

```
import InlineAlert from '@synerise/ds-inline-alert'

<InlineAlert />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-inline-alert--default"></iframe>

## API

| Property     | Description                                                              | Type                                           | Default     |
| ------------ | ------------------------------------------------------------------------ | ---------------------------------------------- | ----------- |
| type         | Visual style variant                                                     | `'success' \| 'alert' \| 'warning' \| 'info'` | `'warning'` |
| message      | Message of Inline Alert                                                  | `ReactNode`                                    | -           |
| disabled     | Disables interaction and reduces opacity to 0.4                          | `boolean`                                      | -           |
| withEmphasis | Bold text appended to message (ignored when `withLink` is also set)      | `ReactNode`                                    | -           |
| withLink     | Underlined text appended to message (takes priority over `withEmphasis`) | `ReactNode`                                    | -           |
| hoverButton  | Adds pointer cursor and darker hover colour                              | `boolean`                                      | -           |
| customIcon   | Replaces the default type icon                                           | `ReactNode`                                    | -           |
| iconAlert    | **Deprecated** — has no effect                                           | `boolean`                                      | -           |
