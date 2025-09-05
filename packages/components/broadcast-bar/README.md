---
id: broadcast-bar
title: BroadcastBar
---

BroadcastBar UI Component

## Installation
```
npm i @synerise/ds-broadcast-bar
or
yarn add @synerise/ds-broadcast-bar
```

## Usage
```
import BroadcastBar from '@synerise/ds-broadcast-bar'

<BroadcastBar />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-broadcast-bar--default"></iframe>

## API

| Property        | Description                                                             | Type                        | Default    | 
| ----            | ---                                                                     | ---                         | ---        | 
| type            | Type of Broadcast-bar styles, options: `success`, `warning`, `negative` | `string`                    | `warning`  | 
| onCloseClick    | callback fired when close icon clicked                                  | `void`                      | -          |
| withClose       | prop to set closeIcon                                                   | `boolean`                   | -          |
| button          | prop to set button                                                      | `React.ReactNode`           | -          |
| customIcon      | prop to set icon                                                        | `React.ReactNode`           | -          |
| description     | prop to set description                                                 | `React.ReactNode`           | -          |

