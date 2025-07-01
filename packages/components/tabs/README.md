---
id: tabs
title: Tabs
---

Tabs UI Component

## Installation

```
npm i @synerise/ds-tabs
or
yarn add @synerise/ds-tabs
```

## Usage

```
import Tabs from '@synerise/ds-tabs'

<Tabs tabs={[{label: 'Tab 1'}, {label: 'Tab 2}]]} activeTab={0} handleTabClick={() => {}} />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-tabs--default"></iframe>

## API

### Tabs

| Property       | Description                                | Type                    | Default |
| -------------- | ------------------------------------------ | ----------------------- | ------- |
| activeTab      | Active tab index                           | number                  | -       |
| configuration  | Shows additional position in tabs dropdown | Configuration           | -       |
| handleTabClick | Callback fired when user clicks on the tab | (index: number) => void | -       |
| tabs           | Array of tabs                              | Tab[]                   | []      |
| underscore     | Underscore active item                     | boolean                 | `true`  |

### Tab

| Property     | Description                    | Type         | Default |
| ------------ | ------------------------------ | ------------ | ------- |
| disabled     | Flag of disabled tabs          | boolean      | `false` |
| icon         | tab icon                       | Icon         | -       |
| label        | Label of tab                   | ReactNode    | -       |
| tooltip      | Tab tooltip text               | ReactNode    | -       |
| tooltipProps | Tooltip props (see ds-tooltip) | TooltipProps | -       |
| underscore   | Underscore active item         | boolean      | `true`  |

#### Configuration

| Property | Description                                                 | Type    | Default |
| -------- | ----------------------------------------------------------- | ------- | ------- |
| action   | Callback fired when user clicks on the configuration button | Icon    | -       |
| disabled | Flag of disabled configuration button                       | boolean | -       |
| label    | Label of configuration button                               | string  | -       |
