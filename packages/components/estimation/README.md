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

| Property          | Description                                                                                                                                             | Type                                                    | Default |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|---------|
| value             | Main estimation value                                                                                                                                   | `ReactNode`                                             | -       |
| label             | Label above the field                                                                                                                                   | `ReactNode`                                             | -       |
| tooltip           | Label tooltip content                                                                                                                                   | `ReactNode`                                             | -       |
| tooltipConfig     | Configuration for tooltip, see ds-tooltip                                                                                                               | `TooltipConfig`                                         | -       |
| total             | Top right corner value (preformatted content)                                                                                                           | `ReactNode`                                             | -       |
| isLoading         | Renders loading state. `true` = full skeleton; object with `total`/`progressBar` flags for granular control                                             | `boolean \| { total?: boolean; progressBar?: boolean }` | -       |
| errorMessage      | Renders an inline alert in footer with this message                                                                                                     | `ReactNode`                                             | -       |
| footerButtons     | Custom buttons to render in footer right side                                                                                                           | `ReactNode`                                             | -       |
| texts             | Translations to overwrite DS defaults (`calculated`, `loading`)                                                                                         | `Partial<EstimationTexts>`                              | -       |
| calculatedDate    | `Date` → rendered as relative time; any other `ReactNode` → rendered as-is                                                                              | `Date \| ReactNode`                                     | -       |
| progressBarValues | Render multivalue progressbar. Provide `label` for each entry to render a colour-dot legend below the bar                                               | `EstimationProgressValue[]`                             | -       |
