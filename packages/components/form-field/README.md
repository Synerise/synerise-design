---
id: form-field
title: FormField
---

FormField UI Component

## Installation

```
npm i @synerise/ds-form-field
or
yarn add @synerise/ds-form-field
```

## Usage

```
import FormField from '@synerise/ds-form-field'

<FormField />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-form-field--default"></iframe>

## API

| Property      | Description                                     | Type         | Default |
| ------------- | ----------------------------------------------- | ------------ | ------- |
| id            | Element id to match label for attribute         | string       | -       |
| label         | Element label                                   | ReactNode    | -       |
| tooltip       | Label tooltip text                              | ReactNode    | -       |
| tooltipConfig | Label tooltip extra config                      | TooltipProps | -       |
| rightSide     | Content rendered to the right side of the label | ReactNode    | -       |
| description   | Element description                             | ReactNode    | -       |
| errorText     | Error message                                   | ReactNode    | -       |
