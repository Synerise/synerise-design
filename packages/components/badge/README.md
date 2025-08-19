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

| Property           | Description                                                        | Type                                                                                                 | Default |
| ------------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ------- |
| backgroundColor    | Customize the badge color                                          | Color                                                                                                | -       |
| backgroundColorHue | Customize brightness of color                                      | `900` / `800` / `700` / `600` / `500` / `400` / `300` / `200` / `100` / `050`                        | -       |
| customColor        | Customize the badge dot color                                      | `red`                                                                                                | -       |
| count              | Number to show in the badge counter                                | ReactNode                                                                                            |         |
| dot                | Display a red dot instead of a counter                             | boolean                                                                                              | `false` |
| flag               | Show the badge as a flag                                           | boolean                                                                                              | `false` |
| offset             | The offset of the badge dot in [x, y] format                       | [number, number]                                                                                     | -       |
| outlined           | Add outline to the badge counter                                   | boolean                                                                                              | `false` |
| overflowCount      | Maximum number to show in the counter                              | number                                                                                               | 99      |
| pulsing            | Enable pulsing animation                                           | boolean                                                                                              | `false` |
| showZero           | Show the badge when the counter is zero                            | boolean                                                                                              | `false` |
| status             | Set badge as a status dot                                          | `active` / `inactive` / `blocked` / `processing` / `warning`                                         | -       |
| text               | If `status` is set, `text` sets the display text of the status dot | string                                                                                               | ''      |
| textColor          | Customize text color in badge                                      | `green` / `grey` / `yellow` / `blue` / `pink`/ `mars`/ `orange`/ `fern`/ `cyan`/ `purple` / `violet` | -       |
| textColorHue       | Customize brightness of color                                      | `900` / `800` / `700` / `600` / `500` / `400` / `300` / `200` / `100` / `050`                        | -       |
| title              | Text shown when a cursor is hovered over the badge                 | string                                                                                               | count   |

### Color

| Values                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `green` / `grey` / `yellow` / `blue` / `pink`/ `mars`/ `orange`/ `fern`/ `cyan`/ `purple` / `violet` / `blue-600` / `green-600` / `mars-600` / `purple-600` / `cyan-600` / `yellow-600` / `violet-600` / `blue-700` / `green-700` / `mars-700` / `purple-700` / `cyan-700` / `yellow-700` / `violet-700` / `blue-500` / `green-500` / `mars-500` / `purple-500` / `cyan-500` / `yellow-500` / `violet-500` |

