---
id: progress-bar
title: Progress-Bar
---

Progress-Bar UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-progress-bar--solo-bar-with-label-and-description"></iframe>

## API

#### Props

| Property    | Description                                                           | Type                            | Default   |
| ----------- | --------------------------------------------------------------------- | ------------------------------- | --------- |
| amount      | Number visibile in progress bar label                                 | number                          | -         |
| description | Text of description under progress bar                                | string                          | -         |
| percent     | Value of progress bar, also visible in label                          | number                          | -         |
| showLabel   | Shows label above progress bar, label contains amount and percentage. | boolean                         | `false`   |
| type        | Type of progress bar                                                  | `line` / `circle` / `dashboard` | `line`    |
| strokeLine  | To set the style of the progress linecap                              | `round` / `square`              | `round`   |
| strokeColor | Color of progress bar                                                 | string                          | `#76dc25` |
