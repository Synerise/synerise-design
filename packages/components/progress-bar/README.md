---
id: progress-bar
title: Progress-Bar
---

Progress-Bar UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-progress-bar--default"></iframe>

## API

#### Props

| Property    | Description                                                           | Type                                                            | Default |
| ----------- | --------------------------------------------------------------------- | --------------------------------------------------------------- | ------- |
| amount      | Number visibile in progress bar label                                 | number                                                          | -       |
| percent     | Value of progress bar, also visible in label                          | number                                                          | -       |
| showLabel   | Shows label above progress bar, label contains amount and percentage. | boolean                                                         | false   |
| description | Text of description under progress bar                                | string                                                          | -       |
| type        | Type of progress bar                                                  | Enum: LINE CIRLCE DASHBOARD                                     | LINE    |
| strokeLine  | To set the style of the progress linecap                              | Enum: ROUND SQUARE                                              | ROUND   |
| strokeColor | Color of progress bar                                                 | Enum: CYAN FERN GREEN MARS ORANGE PINK PURPLE RED VIOLET YELLOW | GREEN   |
