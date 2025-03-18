---
id: tooltip
title: Tooltip
---

Tooltip UI Component

## Tooltip

<iframe src="/storybook-static/iframe.html?id=components-tooltip--default"></iframe>

## API

| Property              | Description                                                                                            | Type                                                                                                                                                | Default                    |
|-----------------------|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| align                 | this value will be merged into placement's config, please refer to the settings rc-tooltip             | Object                                                                                                                                              | -                          |
| arrowPointAtCenter    | Whether the arrow is pointed at the center of target, supported after `antd@1.11+`                     | boolean                                                                                                                                             | `false`                    |
| autoAdjustOverflow    | Whether to adjust popup placement automatically when popup is off screen                               | boolean                                                                                                                                             | `true`                     |
| button                | Button to display in tooltip footer                                                                    | ReactNode                                                                                                                                           | -                          |
| defaultVisible        | Whether the floating tooltip card is visible by default                                                | boolean                                                                                                                                             | `false`                    |
| description           | tooltip description text                                                                               | ReactNode                                                                                                                                           | -                          |
| image                 | iamge to be rendered above the description                                                             | ReactNode                                                                                                                                           | -                          |
| getPopupContainer     | The DOM container of the tip, the default behavior is to create a `div` element in `body`              | ()=>React.HTMLElement                                                                                                                               | () => document.body        |
| icon                  | icon that can be displayed next to title                                                               | React.ReactNode                                                                                                                                     | NotificationsM, orange-500 |
| mouseEnterDelay       | Delay in seconds, before tooltip is shown on mouse enter                                               | number                                                                                                                                              | `0.1`                      |
| mouseLeaveDelay       | Delay in seconds, before tooltip is hidden on mouse leave                                              | number                                                                                                                                              | `0.1`                      |
| offset                | size of space between trigger and tooltip, you should set `small` when the you use `Icon` as a trigger | `default`, `small`                                                                                                                                  | `default`                  |
| onVisibleChange       | Callback executed when visibility of the tooltip card is changed                                       | (visible: boolean) => void                                                                                                                          | -                          |
| overlayClassName      | Class name of the tooltip card                                                                         | string                                                                                                                                              | -                          |
| overlayStyle          | Style of the tooltip card                                                                              | object                                                                                                                                              | -                          |
| placement             | The position of the tooltip relative to the target.                                                    | `top` / `left` / `right` / `bottom` / `topLeft` / `topRight` / `bottomLeft` / `bottomRight` / `leftTop` / `leftBottom` / `rightTop` / `rightBottom` | `top`                      |
| title                 | tooltip title text                                                                                     | string                                                                                                                                              | -                          |
| trigger               | Tooltip trigger mode                                                                                   | `hover`, `focus`, `click`, `contextMenu`                                                                                                            | `hover`                    |
| tutorialAutoplay      | Whether to autoplay tutorial                                                                           | boolean                                                                                                                                             | `false`                    |
| tutorialAutoplaySpeed | speed of autoplay [ms]                                                                                 | number                                                                                                                                              | 5000                       |
| tutorials             | steps of tutorial                                                                                      | Tutorials[]                                                                                                                                         | -                          |
| type                  | type of tooltip                                                                                        | `default` / `icon` / `largeSimple` / `largeScrollable` / `tutorial` / `avatar` / `button` / `header-label` / `status`                               | `default`                  |
| visible               | Whether the floating tooltip card is visible or not                                                    | boolean                                                                                                                                             | `false`                    |
| timeToHideAfterClick  | time after which tooltip disappears [ms] (value 0 inactivate this functionality)                       | number                                                                                                                                              | 0                          |
| render                | render prop that allows to render custom component as tooltip                                          | () => React.ReactNode                                                                                                                               | -                          |


### ButtonSettings

| Property   | Description                                 | Type                     | Default |
| ---------- | ------------------------------------------- | ------------------------ | ------- |
| buttonIcon | Icon of button                              | React.ReactNode          | -       |
| label      | Label of button                             | React.ReactNode / string | -       |
| onClick    | Callback executed after clicking the button | () => void               | -       |

### Tutorial

| Property    | Description                  | Type                     | Default |
| ----------- | ---------------------------- | ------------------------ | ------- |
| title       | title of tutorial step       | string / React.ReactNode | -       |
| description | description of tutorial step | string / React.ReactNode | -       |
