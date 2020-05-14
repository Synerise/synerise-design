---
id: badge
title: Badge
---

Badges are small status descriptors for UI elements such as avatar-like icons. A badge consists of a small circle, typically containing a number, and appears in proximity to another object. It can be used to add information to any content or highlight the status of an object.

Inspired by [Ant Design Badge](https://ant.design/components/badge/)

## When to use it

---

- To indicate the status of an object: active, inactive, error, success, in process.
- To draw attention to unread notifications.

## Component anatomy

---

This is a complex component, which means it consists of more components:

- [typography](/docs/components/typography/)

## Installation

---

```
npm i @synerise/ds-badge
or
yarn add @synerise/ds-badge
```

## Usage

---

```
import Badge from '@synerise/ds-badge'

<Badge
  count={10}
  overflowCount={11}
  showZero={false}
/>

```

## Badge Standalone

---

<iframe src="/storybook-static/iframe.html?id=components-badge--standalone"></iframe>

## Badge Dot

<iframe src="/storybook-static/iframe.html?id=components-badge--dot"></iframe>

## Badge Count

<iframe src="/storybook-static/iframe.html?id=components-badge--count"></iframe>

## Badge Status

<iframe src="/storybook-static/iframe.html?id=components-badge--status"></iframe>

## API

---

| Property      | Description                                                        | Type                                                                             | Default |
| ------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ------- |
| color         | Customize the badge dot color                                      | string                                                                           | -       |
| count         | Number to show in the badge counter                                | ReactNode                                                                        |         |
| dot           | Display a red dot instead of a counter                             | boolean                                                                          | false   |
| offset        | The offset of the badge dot in [x, y] format                       | [number, number]                                                                 | -       |
| overflowCount | Maximum number to show in the counter                              | number                                                                           | 99      |
| showZero      | Show the badge when the counter is zero                            | boolean                                                                          | false   |
| status        | Set badge as a status dot                                          | `success \ processing \ default \ error \ warning \ active \ inactive \ blocked` | ''      |
| text          | If `status` is set, `text` sets the display text of the status dot | string                                                                           | ''      |
| title         | Text shown when a cursor is hovered over the badge                 | string                                                                           | count   |
| flag          | Show the badge as a flag                                           | boolean                                                                          | false   |
| outlined      | Add outline to the badge counter                                   | boolean                                                                          | false   |
