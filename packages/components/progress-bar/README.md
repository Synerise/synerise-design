---
id: progress-bar
title: Progress-Bar
---

Progress-Bar UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-progress-bar--default"></iframe>

## API

#### Props

| Property    | Description                                                             | Type               | Default |
| ----------- | ----------------------------------------------------------------------- | ------------------ | ------- |
| values      | Array with with values                                                  | ProgressBarValue[] | -       |
| showLabel   | Shows label above progressbar, label contains max value and percentage. | boolean            | false   |
| description | Text of description under progressbar                                   | string             | -       |
| total       | Custom total amount                                                     | number             | 100     |

#### ProgressBarValue

| Property | Description         | Type                                                            | Default |
| -------- | ------------------- | --------------------------------------------------------------- | ------- |
| amount   | Value of single bar | number                                                          | -       |
| color    | Color of single bar | enum: CYAN FERN GREEN MARS ORANGE PINK PURPLE RED VIOLET YELLOW | GREEN   |
