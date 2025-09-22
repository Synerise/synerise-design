---
id: insight
title: Insight
---

Insight UI Component

## Installation

```
npm i @synerise/ds-insight
or
yarn add @synerise/ds-insight
```

## Usage

```
import Insight from '@synerise/ds-insight'

<Insight />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-insight--default"></iframe>

## API

| Property        | Description                                                         | Type                           | Default |
| --------------- | ------------------------------------------------------------------- | ------------------------------ | ------- |
| avatar          | avatar component                                                    | ReactNode                      | -       |
| subTitle        | text under title of Insight                                         | ReactNode                      | -       |
| title           | title of Insight                                                    | ReactNode                      | -       |
| headerRightSide | component on right side of Insight                                  | ReactNode                      | -       |
| footer          | render components in footer                                         | ReactNode                      | -       |
| onClick         | The callback function that is triggered when click on outer wrapper | function                       | -       |
| content         | render components inside Insight                                    | ReactNode / InlineAlertProps[] | -       |
| className       | Insight className                                                   | string                         | -       |
