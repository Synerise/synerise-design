---
id: toolbar
title: Toolbar
---

Toolbar UI Component

## Installation

```
pnpm add @synerise/ds-toolbar
```

## Usage

```tsx
import Toolbar, { ToolbarGroup, ToolbarButton, ToolbarLabel, ToolbarDivider } from '@synerise/ds-toolbar';

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
| isCompact | compact ToolbarGroup has 0px gap between elements | boolean   | false   |

### ToolbarButton

see ds-button for more props

| Property     | Description    | Type                                             | Default |
| ------------ | -------------- | ------------------------------------------------ | ------- |
| type         | type of button | 'ghost-primary' / 'ghost' / 'custom-color-ghost' | -       |
| tooltipProps | Tooltip config | TooltipProps see ds-tooltip                      | -       |
| badgeProps   | Badge config   | BadgeProps see ds-badge                          | -       |

### ToolbarLabel

| Property | Description                        | Type      | Default |
| -------- | ---------------------------------- | --------- | ------- |
| children | label text rendered inside a group | ReactNode | -       |

### ToolbarDivider

A vertical 1px separator for use inside a `ToolbarGroup`. Accepts standard `HTMLDivElement` attributes. No additional props.
