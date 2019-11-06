---
id: page-header
title: Page Header
---

Page Header UI Component

This component could be used as header of page with main title and navigation

## Demo

<iframe src="/storybook-static/iframe.html?id=components-page-header--default"></iframe>

## API

| Property    | Description                              | Type                        | Default |
| ----------- | ---------------------------------------- | --------------------------- | ------- |
| rightSide   | Place for optional node on right side    | React.ReactNode             | -       |
| bar         | Place for optional node below header     | React.ReactNode             | -       |
| tabs        | Place for optional tabs component        | React.ReactNode             | -       |
| avatar      | Place for optional avatar component      | React.ReactNode             | -       |
| more        | Place for more detail button             | React.ReactNode             | -       |
| title       | Title of header                          | React.ReactNode `or` string | -       |
| description | Description of header                    | React.ReactNode `or` string | -       |
| onGoBack    | Callback to previous state               | function                    | -       |
| onClose     | Callback to close layer                  | function                    | -       |
| isolated    | Add horizontal line to separate content  | boolean                     | `false` |
| inlineEdit  | Object with InlineEdit component options | Object                      | `false` |
