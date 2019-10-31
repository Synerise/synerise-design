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

| Property    | Description                        | Type                        | Default |
| ----------- | ---------------------------------- | --------------------------- | ------- |
| color       | Color code                         | string                      | -       |
| description | Description of navbar              | string                      | -       |
| logo        | Src to image or React.Node element | React.ReactNode `or` string | -       |
| avatar      | Place for avatar component         | React.ReactNode             | -       |
| dropdown    | Place for dropdown component       | React.ReactNode             | -       |
| actions     | Place for icon actions             | React.ReactNode             | -       |
