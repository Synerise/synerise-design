---
id: toolbar
title: Toolbar
---

Toolbar UI Component

## Installation

```
npm i @synerise/ds-toolbar
or
yarn add @synerise/ds-toolbar
```

## Usage

```
import Toolbar from '@synerise/ds-toolbar'

<Toolbar>
  <ToolbarGroup>
    <ToolbarButton mode="single-icon">
      <Icon component={<StepBackM />} />
    </ToolbarButton>
    <ToolbarButton mode="single-icon">
      <Icon component={<StepForwardM />} />
    </ToolbarButton>
  </ToolbarGroup>
</Toolbar>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-toolbar--default"></iframe>

## API

### Toolbar

| Property | Description             | Type      | Default |
| -------- | ----------------------- | --------- | ------- |
| children | contents of the toolbar | ReactNode | -       |

### ToolbarGroup

| Property  | Description                                       | Type      | Default |
| --------- | ------------------------------------------------- | --------- | ------- |
| children  | contents of the toolbar                           | ReactNode | -       |
| isCompact | compact ToolbarGroup has 0px gap between elements | boolean   | -       |

### ToolbarButton

see ds-button for more props

| Property     | Description    | Type                                             | Default |
| ------------ | -------------- | ------------------------------------------------ | ------- |
| type         | type of button | 'ghost-primary' / 'ghost' / 'custom-color-ghost' | -       |
| tooltipProps | Tooltip config | TooltipProps see ds-tooltip                      | -       |
| badgeProps   | Badge config   | BadgeProps see ds-badge                          | -       |
