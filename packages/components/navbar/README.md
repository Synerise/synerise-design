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

| Property          | Description                                 | Type                     | Default |
| ----------------- | ------------------------------------------- | ------------------------ | ------- |
| actions           | Place for icon actions                      | React.ReactNode          | -       |
| additionalNodes   | Additional nodes rendered in the navbar     | React.ReactNode          | -       |
| className         | Class added to the component                | string                   | -       |
| color             | Color code                                  | string                   | -       |
| description       | Description of navbar                       | string                   | -       |
| logo              | Src to image or React.Node element          | React.ReactNode / string | -       |
| alertNotification | React.Node element for IconAlert and Button | React.ReactNode          | -       |
