---
id: panels-resizer
title: PanelResizer
---

The `PanelsResizer` component allows you to create a layout with two resizable panels separated by a draggable resizer. Panels can be arranged side-by-side (default) or stacked top-and-bottom via the `isHorizontal` prop.

Users can adjust the size of the panels by dragging the resizer, providing a flexible and customizable interface.

## Installation

```
npm i @synerise/ds-panels-resizer
or
yarn add @synerise/ds-panels-resizer
```

## Usage

```
import { PanelsResizer } from '@synerise/ds-panels-resizer';

const App = () => (
  <div style={{ width: '100%', height: '680px' }}>
    <PanelsResizer
      leftPanel={<div>Left Panel Content</div>}
      rightPanel={<div>Right Panel Content</div>}
    />
  </div>
);

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-panels-resizer--default"></iframe>

## API

| Property     | Description                                                                                                      | Type                                            | Default |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------- |
| leftPanel    | The content to display in the left (or top, when `isHorizontal`) panel.                                          | React.ReactNode                                 | ---     |
| rightPanel   | The content to display in the right (or bottom, when `isHorizontal`) panel.                                      | React.ReactNode                                 | ---     |
| initial      | Initial size of one panel in pixels. Converted to an offset from 50% at mount time.                             | { leftPanel: number } \| { rightPanel: number } | ---     |
| scrollable   | Whether the panels should be scrollable when their content overflows.                                            | boolean                                         | ---     |
| isHorizontal | When `true`, panels are stacked top-and-bottom with a horizontal divider instead of the default side-by-side layout. | boolean                                         | false   |
