---
id: button
title: Button
---

Buttons allow users to take actions, and make choices, with a single tap. Buttons communicate actions that users can take. They are typically placed throughout your UI, in places such as dialogs, modal windows, forms, cards, and toolbars.

Inspired by [Ant Design Button](https://ant.design/components/button/)

## When to use it

---

- To produce things that didn’t exist before (register, submit, save, and more).
- To perform actions (send, delete, edit, cancel, and more).
- To confirm the displayed information.
- Generally, to be used when actions caused by users affect back-end and/or front-end of the application.

## Component anatomy

---

This is a simple component, which means that it doesn't consist of other components.

## Installation

---

```
npm i @synerise/ds-button
```

or

```
yarn add @synerise/ds-button
```

## Usage

---

```jsx
import Button from '@synerise/ds-button';

<Button>Example</Button>;
```

## Demo

---

<iframe src="/storybook-static/iframe.html?id=components-button--with-text&_ijt=15r4sa9s8lrq673m3u169apsa0"></iframe>

## API

---

| Property       | Description                                                                                                                                                                                  | Type                                                                                                                                                         | Default   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| disabled       | Defines if the button is disabled                                                                                                                                                            | boolean                                                                                                                                                      | `false`   |
| ghost          | Defines the background as transparent, inverts text and border colors                                                                                                                        | boolean                                                                                                                                                      | `false`   |
| href           | URL target of the button                                                                                                                                                                     | string                                                                                                                                                       | -         |
| htmlType       | Sets the original HTML `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)                                                            | string                                                                                                                                                       | `button`  |
| icon           | Sets the icon of the button, see: [Icon](/docs/components/icon/) component                                                                                                                   | string                                                                                                                                                       | -         |
| loading        | Enables delayed loading of the button. Delay is in milliseconds                                                                                                                              | boolean \ { delay: number }                                                                                                                                  | `false`   |
| shape          | Defines the shape of the button: circle, round or omitted                                                                                                                                    | string                                                                                                                                                       | -         |
| size           | Defines the size of the button: `small`, `large`, or `omitted`                                                                                                                               | string                                                                                                                                                       | `default` |
| target         | Defines where to display the linked URL (for example, a tab or a window), works when `href` is specified see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target) | string                                                                                                                                                       | -         |
| type           | Defines the type of the button: `primary`, `ghost`, `dashed`, `danger`, `link` or omitted (meaning `default`). It affects the button color                                                   | string                                                                                                                                                       | `default` |
| onClick        | Sets the handler to handle `click` event                                                                                                                                                     | (event) => void                                                                                                                                              | -         |
| block          | Fits the button width to its parent width                                                                                                                                                    | boolean                                                                                                                                                      | `false`   |
| justifyContent | button content horizontal alignment by CSS JustifyContentProperty                                                                                                                            | `flex-start` \ `flex-end` \ `center` \ `space-between` \ `space-around` \ `space-evenly` \ `start` \ `end` \ `left` \ `right` \ `safe` \ `unsafe` \ `center` | `center`  |
