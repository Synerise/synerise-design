---
id: tooltip
title: Tooltip
---

Tooltip UI Component

## Tooltip

<iframe src="/storybook-static/iframe.html?id=components-tooltip--tooltip"></iframe>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| arrowPointAtCenter | Whether the arrow is pointed at the center of target, supported after `antd@1.11+` | boolean | `false` |
| autoAdjustOverflow | Whether to adjust popup placement automatically when popup is off screen | boolean | `true` |
| defaultVisible | Whether the floating tooltip card is visible by default | boolean | `false` |
| getPopupContainer | The DOM container of the tip, the default behavior is to create a `div` element in `body` | Function(triggerNode) | () => document.body	 |
| mouseEnterDelay | Delay in seconds, before tooltip is shown on mouse enter | number | `0.1` |
| mouseLeaveDelay | Delay in seconds, before tooltip is hidden on mouse leave | number | `0.1` |
| overlayClassName | Class name of the tooltip card	| string | - |
| overlayStyle | Style of the tooltip card | object | - |
| placement | The position of the tooltip relative to the target, which can be one of `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string | `top` |
| trigger | Tooltip trigger mode | `hover`, `focus`, `click`, `contextMenu` | `hover` |
| visible | Whether the floating tooltip card is visible or not	| boolean | `false` |
| onVisibleChange | Callback executed when visibility of the tooltip card is changed | (visible) => void | - |
| align | this value will be merged into placement's config, please refer to the settings rc-tooltip | Object | -|