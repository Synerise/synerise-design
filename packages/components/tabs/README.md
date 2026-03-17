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

| Property       | Description                                                   | Type                    | Default |
| -------------- | ------------------------------------------------------------- | ----------------------- | ------- |
| activeTab      | Active tab index                                              | number                  | -       |
| block          | Stretch tabs to fill the container width (disables overflow)  | boolean                 | -       |
| configuration  | Appends a configurable action item to the overflow dropdown   | TabsConfiguration       | -       |
| handleTabClick | Callback fired when user clicks on the tab                    | (index: number) => void | -       |
| tabs           | Array of tabs                                                 | TabItem[]               | -       |
| underscore     | Show active-indicator line below the active tab               | boolean                 | `true`  |

### Tab (TabItem)

| Property     | Description                                              | Type         | Default |
| ------------ | -------------------------------------------------------- | ------------ | ------- |
| disabled     | Disables pointer events and reduces opacity              | boolean      | -       |
| icon         | Icon rendered before the label (sized 24 px)             | ReactNode    | -       |
| label        | Label of tab                                             | ReactNode    | -       |
| suffixel     | Element rendered after the label (supports Badge nodes)  | ReactNode    | -       |
| tooltip      | Tab tooltip content                                      | ReactNode    | -       |
| tooltipProps | Additional props forwarded to ds-tooltip                 | TooltipProps | -       |

#### TabsConfiguration

| Property | Description                                                   | Type        | Default |
| -------- | ------------------------------------------------------------- | ----------- | ------- |
| action   | Callback fired when user clicks on the configuration button   | () => void  | -       |
| disabled | Disables the dropdown trigger when no tabs are hidden         | boolean     | -       |
| label    | Label of configuration button                                 | string      | -       |
