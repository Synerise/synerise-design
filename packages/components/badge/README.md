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
  status="processing"
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
| status             | Status that drives the dot/count colour                            | `active` / `inactive` / `blocked` / `processing` / `warning`                                         | -       |
| customColor        | Override the badge colour — palette token or any raw CSS colour    | `BadgeColor` / `DefaultColor` / CSS colour (e.g. `'blue-600'`, `'#FF0000'`)                          | -       |
| count              | Number to show in the badge counter (hidden when `0`)              | ReactNode                                                                                            | -       |
| dot                | Display a dot instead of a counter (auto-enabled by `status`)      | boolean                                                                                              | `false` |
| flag               | Show the badge as a flag (halo rings)                              | boolean                                                                                              | `false` |
| offset             | The offset of the badge in [x, y] format                           | [number, number]                                                                                     | -       |
| outlined           | Add a white outline to the badge counter                           | boolean                                                                                              | `false` |
| overflowCount      | Maximum number to show in the counter                              | number                                                                                               | 99      |
| pulsing            | Enable pulsing animation                                           | boolean                                                                                              | `false` |
| data-\* / aria-\*  | Forwarded to the outermost wrapper element                         | string / number / boolean                                                                            | -       |

> **Removed in the antd-free version:** `backgroundColor`, `backgroundColorHue`, `textColor`, `textColorHue` (count colour is now driven by `status`), `text` (use the `BadgeWithLabel` export instead), `showZero`, `title`. The component no longer extends antd's Badge props.

### `BadgeWithLabel`

A status dot aligned next to a text label — the replacement for the old `text` prop. Owns the dot↔label alignment so consumers don't.

```
import { BadgeWithLabel } from '@synerise/ds-badge'

<BadgeWithLabel status="warning">Needs review</BadgeWithLabel>
```

### Color

| Values                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `green` / `grey` / `yellow` / `blue` / `pink`/ `mars`/ `orange`/ `fern`/ `cyan`/ `purple` / `violet` / `blue-600` / `green-600` / `mars-600` / `purple-600` / `cyan-600` / `yellow-600` / `violet-600` / `blue-700` / `green-700` / `mars-700` / `purple-700` / `cyan-700` / `yellow-700` / `violet-700` / `blue-500` / `green-500` / `mars-500` / `purple-500` / `cyan-500` / `yellow-500` / `violet-500` |
