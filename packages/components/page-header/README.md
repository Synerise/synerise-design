---
id: page-header
title: Page Header
---

Page Header UI Component

This component could be used as header of page with main title and navigation

## Demo

<iframe src="/storybook-static/iframe.html?id=components-page-header--default"></iframe>

## API

| Property           | Description                              | Type                                                                    | Default |
| ------------------ | ---------------------------------------- | ----------------------------------------------------------------------- | ------- |
| avatar             | Place for optional avatar component      | React.ReactNode                                                         | -       |
| bar                | Place for optional node below header     | React.ReactNode                                                         | -       |
| className          | Class added to the component             | string                                                                  | -       |
| children           | The content of the component             | React.ReactNode                                                         | -       |
| description        | Description of header                    | React.ReactNode / string                                                | -       |
| goBackIcon         | Custom icon for "go back" button         | React.ReactNode                                                         | -       |
| isolated           | Add horizontal line to separate content  | boolean                                                                 | `false` |
| inlineEdit         | Object with InlineEdit component options | Object                                                                  | -       |
| more               | Place for more detail button             | React.ReactNode                                                         | -       |
| onGoBack           | Callback to previous state               | () => void                                                              | -       |
| onClose            | Callback to close layer                  | () => void                                                              | -       |
| rightSide          | Place for optional node on right side    | React.ReactNode                                                         | -       |
| tabs               | Place for optional tabs component        | React.ReactNode                                                         | -       |
| title              | Title of header                          | React.ReactNode / string                                                | -       |
| tooltip            | Tooltip props                            | [TooltipProps](https://design.synerise.com/docs/components/tooltip#api) | -       |
| tooltipIcon        | Icon component                           | React.ReactNode                                                         | -       |
| handleTooltipClick | Function called on tooltipIcon click     | () => void                                                              | -       |
