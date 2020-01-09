---
id: app-header
title: AppHeader
---

AppHeader UI Component

## Installation

```
npm i @synerise/ds-app-header
or
yarn add @synerise/ds-app-header
```

## Usage

```
import AppHeader from '@synerise/ds-app-header'

<AppHeader />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-appheader--default"></iframe>

## Props

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| logo     | logo source to display | string | - |
| className | container class | string | - |
| title | current page title to display | string | - |
| backgroundColor | background color of header | 'red' / 'blue' / 'green' / 'grey' / 'yellow' / 'pink' / 'mars' / 'orange' / 'fern' / 'cyan' / 'purple' / 'violet' | 'blue' |
| sideNodes | additional nodes to render on right side | SideNode[] | - |

## SideNode

| Property | Type |
| -------- | ---- |
| id       | string / number |
| render   | React.ReactNode |