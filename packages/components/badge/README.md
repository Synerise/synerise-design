---
id: badge
title: Badge
---

Badge UI Component

Based on [Ant Design Badge](https://ant.design/components/badge/)

## Installation

```
npm i @synerise/ds-badge
or
yarn add @synerise/ds-badge
```

## Usage

```
import Badge from '@synerise/ds-badge'

<Badge
  count={10}
  overflowCount={11}
  showZero={false}
/>

```

## Badge Standalone

<iframe src="/storybook-static/iframe.html?id=components-badge--standalone"></iframe>

## Badge Dot

<iframe src="/storybook-static/iframe.html?id=components-badge--dot"></iframe>

## Badge Count

<iframe src="/storybook-static/iframe.html?id=components-badge--count"></iframe>

## Badge Status

<iframe src="/storybook-static/iframe.html?id=components-badge--status"></iframe>

## API

| Property      | Description                                                    | Type                                               | Default |
| ------------- | -------------------------------------------------------------- | -------------------------------------------------- | ------- |
| color         | Customize Badge dot color                                      | string                                             | -       |
| count         | Number to show in badge                                        | ReactNode                                          |         |
| dot           | Whether to display a red dot instead of count                  | boolean                                            | false   |
| offset        | set offset of the badge dot, like[x, y]                        | [number, number]                                   | -       |
| overflowCount | Max count to show                                              | number                                             | 99      |
| showZero      | Whether to show badge when count is zero                       | boolean                                            | false   |
| status        | Set Badge as a status dot                                      | `success \ processing \ default \ error \ warning` | ''      |
| text          | If status is set, text sets the display text of the status dot | string                                             | ''      |
| title         | Text to show when hovering over the badge                      | string                                             | count   |
| flag          | Show badge as a flag                                           | boolean                                            | false   |
| outlined      | Add outline to counter badge                                   | boolean                                            | false   |
