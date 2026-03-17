---
id: popover
title: Popover
---

Popover UI Component

## Installation
```
npm i @synerise/ds-popover
or
pnpm add @synerise/ds-popover
or
yarn add @synerise/ds-popover
```

## Usage
```jsx
import Popover, { PopoverTrigger, PopoverContent } from '@synerise/ds-popover'

<Popover>
  <PopoverTrigger><button>Open</button></PopoverTrigger>
  <PopoverContent>Content</PopoverContent>
</Popover>
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-popover--default"></iframe>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| placement | Floating-ui placement | `Placement` | `'bottom'` |
| trigger | Interaction type to open popover | `'click' \| 'hover' \| ('click' \| 'hover')[]` | `'click'` |
| open | Controlled open state | `boolean` | - |
| onOpenChange | Controlled open/close handler | `(open: boolean, event?: Event, reason?: OpenChangeReason) => void` | - |
| onDismiss | Called on escape-key or outside-press dismiss | `(event?: Event, reason?: OpenChangeReason) => void` | - |
| modal | Trap focus inside popover | `boolean` | `false` |
| initialOpen | Uncontrolled initial open state | `boolean` | `false` |
| returnFocus | Return focus to trigger on close | `boolean` | `true` |
| testId | Sets data-testid on trigger and content | `string` | `'noTestId'` |
| componentId | Sets data-popover-{id} attribute on content | `string` | - |
| zIndex | CSS z-index of floating panel | `number` | `theme.variables['zindex-dropdown']` |
| autoUpdate | Reposition while both elements are mounted | `boolean \| AutoUpdateOptions` | - |
| offsetConfig | floating-ui offset middleware options (add `enabled: false` to disable) | `OffsetConfig` | `{ enabled: true }` |
| flipConfig | floating-ui flip middleware options | `FlipConfig` | `{ enabled: true }` |
| shiftConfig | floating-ui shift middleware options | `ShiftConfig` | `{ enabled: true }` |
| arrowConfig | floating-ui arrow middleware options (element managed by PopoverArrow) | `Omit<ArrowOptions, 'element'>` | `{}` |
| hoverConfig | Extra options for useHover (e.g. restMs, move) | `HoverConfig` | `{}` |
| dismissConfig | Extra options for useDismiss | `UseDismissProps` | `{}` |
| listNavigationConfig | Keyboard list navigation config | `UseListNavigationProps` | `{ enabled: false }` |
| transitionDuration | Transition duration in ms (enables CSS transitions) | `number` | - |
| getTransitionConfig | Custom transition styles factory | `({ placement }) => Partial<UseTransitionStylesProps>` | opacity fade |
| getPopupContainer | Custom portal root container | `(element: HTMLElement) => HTMLElement` | - |
