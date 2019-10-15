---
id: card-select
title: Card Select
---

Card-Select UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-cardselect--default"></iframe>

## API

### Props

| Property                   | Description                                   | Type               | Default |
| -------------------------- | --------------------------------------------- | ------------------ | ------- |
| className                  | className of container                        | string             | -       |
| size                       | direction type of divider                     | enum: small medium | medium  |
| raised                     | whether component should be raised            | boolean            | -       |
| icon                       | display given icon                            | string             | -       |
| iconSize                   | size of the icon                              | number             | 82      |
| title                      | title of the card                             | string             | -       |
| description                | description of the card                       | string             | -       |
| value                      | whether the card is selected                  | boolean            | false   |
| tickVisible                | whether or not to display a tick              | boolean            | true    |
| disabled                   | disabled state (onChange still fires)         | boolean            | -       |
| customTickVisible          | whether to render a custom tick               | boolean            | -       |
| customTickVisibleComponent | custom tick component                         | ReactNode          | -       |
| stretchToFit               | stretch height to 100% so all cards are level | boolean            | -       |

### Methods

| Property | Description                                                       | Type                     | Default |
| -------- | ----------------------------------------------------------------- | ------------------------ | ------- |
| onChange | handler for state change                                          | (state: boolean) => void | -       |
| onClick  | handler for click (onChange will not fire if onClick is provided) | () => void               | -       |
