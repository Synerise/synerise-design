---
id: switch
title: Switch
---

Switch UI Component

Based on [Ant Design Switch](https://ant.design/components/switch/)

## Demo

<iframe src="/storybook-static/iframe.html?id=components-switch--default"></iframe>

## API

### Props

| Property          | Description                                       | Type                                     | Default   |
| ----------------- | ------------------------------------------------- | ---------------------------------------- | --------- |
| autoFocus         | get focus when component mounted                  | boolean                                  | `false`   |
| checked           | determine whether the Switch is checked           | boolean                                  | `false`   |
| checkedChildren   | content to be shown when the state is checked     | string / React.ReactNode                 | -         |
| className         | additional class to Switch                        | string                                   | -         |
| defaultChecked    | to set the initial state                          | boolean                                  | `false`   |
| disabled          | Disable switch                                    | boolean                                  | `false`   |
| description       | Switch description                                | string                                   | -         |
| errorText         | Error message, when provided changes switch style | string                                   | -         |
| label             | switch label                                      | string                                   | -         |
| tooltip           | tooltip next to label                             | string &#124; null                       | `null`    |
| tooltipIcon       | icon for tooltip                                  | React.ReactNode                          | -         |
| tooltipConfig     | configuration of tooltip                          | React.ReactNode                          | -         |
| loading           | loading state of switch                           | boolean                                  | `false`   |
| onChange          | trigger when the checked state is changing        | (checked: boolean, event: Event) => void | -         |
| onClick           | trigger when clicked                              | (checked: boolean, event: Event) => void | -         |
| unCheckedChildren | content to be shown when the state is unchecked   | string / React.ReactNode                 | -         |
| size              | the size of the Switch,                           | `small` &#124; `default`                 | `default` |

### Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |
