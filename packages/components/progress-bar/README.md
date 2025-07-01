---
id: progress-bar
title: Progress-Bar
---

Progress-Bar UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-progress-bar--solo-bar-with-label-and-description"></iframe>

## API

### ProgressBar

| Property    | Description                                                           | Type                            | Default   |
| ----------- | --------------------------------------------------------------------- | ------------------------------- | --------- |
| amount      | Number visibile in progress bar label                                 | number                          | -         |
| description | Text of description under progress bar                                | string                          | -         |
| percent     | Value of progress bar, also visible in label                          | number                          | -         |
| thin        | Displays a thinner line                                               | boolean                         | -         |
| showLabel   | Shows label above progress bar, label contains amount and percentage. | boolean                         | `false`   |
| type        | Type of progress bar                                                  | `line` / `circle` / `dashboard` | `line`    |
| strokeLine  | To set the style of the progress linecap                              | `round` / `square`              | `round`   |
| strokeColor | Color of progress bar                                                 | string                          | `#76dc25` |

### ProgressTiles

| Property  | Description                                             | Type      | Default |
| --------- | ------------------------------------------------------- | --------- | ------- |
| tileWidth | width of each tile (with unit)                          | string    | -       |
| colors    | Array of colors for each tile - defines number of tiles | string[]  | -       |
| percent   | Value of progress to display colored                    | number    | -       |
| label     | Optional label above progress bar                       | ReactNode | -       |

### Multivalue

| Property    | Description                                                                 | Type            | Default |
| ----------- | --------------------------------------------------------------------------- | --------------- | ------- |
| values      | Values for each bar                                                         | ProgressValue[] | -       |
| stackedBars | Drives how bars are rendered - side by side or stacked on top of each other | boolean         | true    |

### ProgressValue

| Property | Description                      | Type   | Default |
| -------- | -------------------------------- | ------ | ------- |
| percent  | Value to display (length of bar) | number | -       |
| color    | Bar color                        | string | -       |
