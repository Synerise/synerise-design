---
id: card-select
title: Card Select
---

Card-Select UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-card-select--default"></iframe>

## API

### Props

| Property                   | Description                           | Type               | Default |
| -------------------------- | ------------------------------------- | ------------------ | ------- |
| className                  | className of container                | string             | -       |
| size                       | direction type of divider             | enum: small medium | medium  |
| raised                     | whether component should be raised    | boolean            | -       |
| icon                       | display given icon                    | string             | -       |
| iconSize                   | size of the icon                      | number             | -       |
| title                      | title of the card                     | string             | -       |
| description                | description of the card               | string             | -       |
| value                      | whether the card is selected          | boolean            | false   |
| tickVisible                | whether or not to display a tick      | boolean            | true    |
| disabled                   | disabled state (onChange still fires) | boolean            | -       |
| customTickVisible          | whether to render a custom tick       | boolean            | -       |
| customTickVisibleComponent | custom tick component                 | ReactNode          | -       |

### Methods

| Property | Description              | Type                     | Default |
| -------- | ------------------------ | ------------------------ | ------- |
| onChange | handler for state change | (state: boolean) => void | -       |
