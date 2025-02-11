---
id: divider
title: Divider
---

Divider UI Component

## Usage

```
import Divider from '@synerise/ds-divider';

<div>
  <span>Before Divider</span>
     <Divider dashed />
  <span>After Divider</span>
</div>
```
## Demo

<iframe src="/storybook-static/iframe.html?id=components-divider--default"></iframe>

## API

| Property     | Description                      | Type                      | Default    |
| ------------ | -------------------------------- | ------------------------- | ---------- |
| marginTop    | Value for top margin             | number                    | 0          |
| marginBottom | Value for bottom margin          | number                    | 0          |
| labelAbove   | Label to display above divider   | ReactNode                 |            |
| labelBelow   | Label to display below divider   | ReactNode                 |            |
| className    | ClassName of container           | string                    | -          |
| dashed       | Whether line is dashed           | boolean                   |`false`     |
| orientation  | Position of title inside divider | enum: left right center   | center     |
| style        | Style object of container        | React.CSSProperties       | -          |
| type         | Direction type of divider        | enum: horizontal vertical | horizontal |
| hiddenLine   | Posibility to show only headers  | boolean                   |`false`     |