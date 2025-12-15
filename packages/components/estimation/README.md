---
id: estimation
title: Estimation
---

Estimation UI Component

## Installation
```
npm i @synerise/ds-estimation
or
yarn add @synerise/ds-estimation
```

## Usage
```
import Estimation from '@synerise/ds-estimation'

<Estimation />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-estimation--default"></iframe>

## API
| Property          | Description                                                                                                                                                | Type                                                                    | Default |   |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|---------|---|
| value             | Main estimation value                                                                                                                                      | `ReactNode`                                                             | -       |   |
| label             | Label above the field field                                                                                                                                | `ReactNode`                                                             | -       |   |
| tooltip           | Label tooltip content                                                                                                                                      | `ReactNode`                                                             | -       |   |
| tooltipConfig     | Configuration for tooltip, see ds-tooltip                                                                                                                  | `TooltipConfig`                                                         | -       |   |
| total             | Top right corner value (number or formatted content).                                                                                                      | `number`                                                                | -       |   |
| isLoading         | Renders loading state (skeletons). Can be boolean or object with `total` and `progressBar` flags in order to render skeletons in place of those components | `boolean \                  { total?: boolean; progressBar?: boolean }` | -       |   |
| errorMessage      | Renders an inline alert in footer with this message                                                                                                        | `ReactNode`                                                             | -       |   |
| footerButtons     | Custom buttons to render in footer right side                                                                                                              | `ReactNode`                                                             | -       |   |
| texts             | Translations to overwrite DS defaults (`calculated`, `loading`)                                                                                            | `Partial<EstimationTexts>`                                              | -       |   |
| calculatedDate    | Renders "calculated date" as relative (if recent) or absolute date using FormattedDate. Alternatively provide any ReactNode to render as calculated date   | `Date \   ReactNode`                                                    | -       |   |
| progressBarValues | Render multivalue progressbar. Provide label for each entry to render a legend below multivalue bar                                                        | `EstimationProgressValue[]`                                             | -       |   |
