---
id: metric-card
title: MetricCard
---

MetricCard UI Component

## Installation
```
npm i @synerise/ds-metric-card
or
yarn add @synerise/ds-metric-card
```

## Usage
```
import MetricCard from '@synerise/ds-metric-card'

<MetricCard />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-metric-card--default"></iframe>

## API

 Property          | Description                                            | Type                     | Default |
| ---------------- | ------------------------------------------------------ | ------------------------ | ------- |
| title            | title of metric                                        | ReactNode                | -       |
| headerRightSide  | custom component to render                             | ReactNode                | -       |
| hoverValue       | Value of the metric on hover                           | ReactNode                | -       |
| displayValue     | value of metric with display                           | ReactNode                | -       |
| tooltip          | render text of tooltip                                 | ReactNode                | -       |
| tooltipConfig    | all props for title tooltip                            | TooltipProps             | -       |
| greyBackground   | set with grey background                               | boolean                  | -       |
| isLoading        | render skeleton                                        | boolean                  | -       |
| errorMessage     | render inlineAlert with error text                     | ReactNode                | -       |
| copyValue        | Value to copy after click on icon                      | string                   | -       |
| texts            | Copy icon texts                                        | CopyTooltipTexts         | -       |
