---
id: navbar
title: Navbar
---

Navbar UI Component

## Installation

```
npm i @synerise/ds-navbar
or
yarn add @synerise/ds-navbar
```

## Usage

```
import Navbar from '@synerise/ds-navbar'

<Navbar />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-navbar--default"></iframe>

## API

| Property          | Description                                 | Type            | Default |
| ----------------- | ------------------------------------------- | --------------- | ------- |
| description       | Module name / page title (required)         | ReactNode       | -       |
| logo              | String → renders `<img src>`; otherwise rendered as-is (required) | ReactNode | -       |
| actions           | Place for icon actions                      | ReactNode       | -       |
| additionalNodes   | Extra sections before the actions area; each separated by a divider | ReactNode[] | -       |
| alertNotification | React.Node element for IconAlert and Button | ReactNode       | -       |
| children          | Rendered inside the actions wrapper after `actions` | ReactNode | -       |
| className         | Class added to the component                | string          | -       |
| color             | Background colour (hex or palette value)    | string          | -       |
