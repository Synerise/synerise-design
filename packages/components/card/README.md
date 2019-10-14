---
id: card
title: Card
---

Card UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-card--default"></iframe>

## API

### Props

| Property           | Description                                                        | Type                                        | Default |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------- | ------- |
| title              | title of the card (in header)                                      | string                                      | -       |
| description        | description of the card (in header)                                | React.ReactNode                             | string  | - |
| withHeader         | whether to show the header                                         | boolean                                     | -       |
| compactHeader      | display compact header                                             | boolean                                     | -       |
| icon               | display given icon                                                 | string                                      | -       |
| iconSize           | size of the icon                                                   | number                                      | 36      |
| className          | className of container                                             | string                                      | -       |
| style              | direction type of divider                                          | React.CSSProperties                         | -       |
| raised             | whether component should be raised                                 | boolean                                     | -       |
| disabled           | disabled state                                                     | boolean                                     | -       |
| lively             | show shadow on hover                                               | boolean                                     | -       |
| headerSideChildren | render node on the side (in header)                                | React.ReactNode                             | -       |
| children           | show shadow on hover                                               | React.ReactNode                             | -       |
| size               | use a predefined width (not passing this prop means width of 100%) | 'small' / 'medium' / 'large' / 'extraLarge' | -       |
