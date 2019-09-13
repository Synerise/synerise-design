---
id: dropdown
title: Dropdown
---

Dropdown UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-dropdown--default"></iframe>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| disabled | whether the dropdown menu is disabled | boolean | - |
| getPopupContainer | to set the container of the dropdown menu. The default is to create a `div` element in `body`, you can reset it to the scrolling area and make a relative reposition. | Function(triggerNode) | `() => document.body` |
| overlay | the dropdown menu | [Menu](/docs/components/menu) \| () => Menu | - |
| overlayClassName | Class name of the dropdown root element | string | - |
| overlayStyle | Style of the dropdown root element | object | - |
| placement | placement of pop menu: `bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight` | String | `bottomLeft` |
| trigger | the trigger mode which executes the drop-down action, hover doesn't work on mobile device | Array&lt;`click`\|`hover`\|`contextMenu`> | `['hover']` |
| visible | whether the dropdown menu is visible | boolean | - |
| onVisibleChange | a callback function takes an argument: `visible`, is executed when the visible state is changed | Function(visible) | - |

