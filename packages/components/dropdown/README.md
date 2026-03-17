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
| overlay           | Dropdown panel content                                                                                                                                                                   | ReactNode                                                                                           | -                     |
| overlayClassName  | Class name of the dropdown root element                                                                                                                                                  | string                                                                                              | -                     |
| overlayStyle      | Style of the dropdown root element                                                                                                                                                       | object                                                                                              | -                     |
| placement         | Placement of pop menu.                                                                                                                                                                   | `bottomLeft` / `bottomCenter` / `bottomRight` / `topLeft` / `topCenter` / `topRight`               | -                     |
| trigger           | Trigger mode which executes the drop-down action                                                                                                                                         | `'click'` / `'hover'` / `'focus'` / array of these                                  | `'click'`             |
| open              | Controlled open state                                                                                                                                                                    | boolean                                                                                             | -                     |
| onOpenChange      | Callback executed on visibility changes                                                                                                                                                  | (isOpen: boolean) => void                                                                           | -                     |
| onDismiss         | Callback executed when closed by clicking outside                                                                                                                                        | (event?: Event, reason?: OpenChangeReason) => void                                                  | -                     |
| size              | Width of the overlay                                                                                                                                                                     | `'small'`(216px) / `'medium'`(282px) / `'large'`(588px) / `'auto'` / `'match-trigger'` / `'min-match-trigger'` / number(px) | - |
| footer            | Footer below overlay content; object `{ left?, right? }` renders split layout                                                                                                           | ReactNode / `{ left?: ReactNode; right?: ReactNode }`                                               | -                     |
| hideOnItemClick   | Close on click of an item inside the dropdown. Provide a CSS selector or `true` to use `[role="menuitem"]`                                                                               | boolean / string                                                                                    | -                     |
| asChild           | Forward trigger props to first child element (Radix-style)                                                                                                                               | boolean                                                                                             | -                     |
| popoverProps      | Pass-through props to the underlying ds-popover                                                                                                                                          | Partial\<PopoverOptions\>                                                                           | -                     |

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

| Property     | Description                    | Type                     | Default |
| ------------ | ------------------------------ | ------------------------ | ------- |
| onClick      | Action triggered on click      | () => void               | -       |
| label        | Label of the button            | ReactNode                | -       |
| tooltip      | Tooltip content                | ReactNode                | -       |
| tooltipProps | Props passed to ds-tooltip     | Partial\<TooltipProps\>  | -       |
