---
id: panels-resizer
title: PanelResizer
---

The `PanelsResizer` component allows you to create a layout with resizable left and right panels, separated by a draggable resizer.

Users can adjust the width of the panels by dragging the resizer, providing a flexible and customizable interface.

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

| Property   | Description                                                                        | Type                                            | Default |
| ---------- | ---------------------------------------------------------------------------------- | ----------------------------------------------- | ------- |
| leftPanel  | The content to display in the left panel.                                          | React.ReactNode                                 | ---     |
| rightPanel | The content to display in the right panel.                                         | React.ReactNode                                 | ---     |
| initial    | Initial widths of the panels. Can specify leftPanel or rightPanel width in pixels. | { leftPanel: number } \| { rightPanel: number } | ---     |
| scrollable | Whether the panels should be scrollable when their content overflows.              | boolean                                         | false   |
