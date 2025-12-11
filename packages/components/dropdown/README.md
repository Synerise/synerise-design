---
id: dropdown
title: Dropdown
---

Dropdown UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-dropdown--default"></iframe>

## API

### Dropdown

| Property          | Description                                                                                                                                                                              | Type                                                                                                | Default               |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------- |
| disabled          | Whether the dropdown menu is disabled                                                                                                                                                    | boolean                                                                                             | -                     |
| getPopupContainer | Function used to set the container of the dropdown menu. The default is to create a `div` element in `body`, you can reset it to the scrolling area and make a relative reposition.      | Function(triggerNode)                                                                               | `() => document.body` |
| overlay           | Dropdown menu                                                                                                                                                                            | [Menu](/docs/components/menu) \ () => Menu                                                          | -                     |
| overlayClassName  | Class name of the dropdown root element                                                                                                                                                  | string                                                                                              | -                     |
| overlayStyle      | Style of the dropdown root element                                                                                                                                                       | object                                                                                              | -                     |
| placement         | Placement of pop menu.                                                                                                                                                                   | `bottomLeft` / `bottomCenter` / `bottomRight` / `topLeft` / `topCenter` / `topRight` / `bottomLeft` | -                     |
| trigger           | Trigger mode which executes the drop-down action (hover doesn't work on mobile device)                                                                                                   | `['hover', 'click']`                                                                 | `['hover']`           |
| visible           | Whether the dropdown menu is visible                                                                                                                                                     | boolean                                                                                             | -                     |
| onVisibleChange   | A callback executed on visibility changes.                                                                                                                                               | (visible: boolean)=>void                                                                            | -                     |
| hideOnItemClick   | Will hide dropdown on click of an item inside the dropdown changes. Provide a CSS selector of element that should trigger dropdown closing or `true` to use `[role="menuitem"]` selector | boolean / string                                                                                    | -                     |

### Dropdown.SearchInput

| Property       | Description                         | Type                    | Default |
| -------------- | ----------------------------------- | ----------------------- | ------- |
| onSearchChange | Action triggered after input change | (value: string) => void | -       |
| placeholder    | Input placeholder                   | string                  | -       |
| autofocus      | Autofocus input                     | boolean                 | -       |

### Dropdown.BottomAction

| Property      | Description                            | Type          | Default |
| ------------- | -------------------------------------- | ------------- | ------- |
| onClickAction | Action triggered on click              | () => void    | -       |
| icon          | Icon component to show before the text | React.Element | -       |

### Dropdown.BackAction

| Property | Description               | Type          | Default |
| -------- | ------------------------- | ------------- | ------- |
| onClick  | Action triggered on click | () => void    | -       |
| label    | Label of the button       | React.Element | -       |
