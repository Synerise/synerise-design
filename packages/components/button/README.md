---
id: button
title: Button
---

To trigger an operation.
Based on [Ant Design Button](https://ant.design/components/button/)

## Installation

```
npm i @synerise/ds-button
or
yarn add @synerise/ds-button
```

## When To Use

A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.

## Usage

```jsx
import Button from '@synerise/ds-button';

<Button>Example</Button>;
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-button--with-text&_ijt=15r4sa9s8lrq673m3u169apsa0"></iframe>

## API

| Property | Description                                                                                                                      | Type                        | Default   |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | --------- |
| disabled | disabled state of button                                                                                                         | boolean                     | `false`   |
| ghost    | make background transparent and invert text and border colors                                                                    | boolean                     | `false`   |
| href     | redirect url of link button                                                                                                      | string                      | -         |
| htmlType | set the original html `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string                      | `button`  |
| icon     | set the icon of button, see: Icon component                                                                                      | string                      | -         |
| loading  | set the loading status of button                                                                                                 | boolean \ { delay: number } | `false`   |
| shape    | can be set to `circle`, `round` or omitted                                                                                       | string                      | -         |
| size     | can be set to `small` `large` or omitted                                                                                         | string                      | `default` |
| target   | same as target attribute of a, works when href is specified                                                                      | string                      | -         |
| type     | can be set to `primary` `ghost` `dashed` `danger` `link` or omitted (meaning `default`)                                          | string                      | `default` |
| onClick  | set the handler to handle `click` event                                                                                          | (event) => void             | -         |
| block    | option to fit button width to its parent width                                                                                   | boolean                     | `false`   |
