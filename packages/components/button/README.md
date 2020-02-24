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

| Property | Description                                                                                                                                                                                            | Type                      | Default     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | ----------- |
| disabled | Defines if the button is disabled                                                                                                                                                                      | boolean                   | `false`     |
| href     | URL target of the button                                                                                                                                                                               | string                    | -           |
| htmlType | Sets the original HTML `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)                                                                      | string                    | `button`    |
| shape    | Defines the shape of the button: circle, round or omitted                                                                                                                                              | string                    | -           |
| size     | Defines the size of the button: `large` or `omitted`                                                                                                                                                   | string                    | `default`   |
| target   | Defines where to display the linked URL (for example, a tab or a window), works when `href` is specified see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)           | string                    | -           |
| type     | Defines the type of the button: `primary`, `secondary`, `tertiary`, `tertiary-white`, `ghost`, `ghost-primary`, `ghost-white`, `danger`, `success`, `warning`, or omitted. It affects the button color | string                    | `secondary` |
| mode     | Defines the type of the button content: `simple`, `split`, `icon-label`, `label-icon`, `two-icons`, `single-icon` or omitted. It affects content inside the button                                     | string                    | `simple`    |
| onClick  | Sets the handler to handle `click` event                                                                                                                                                               | (event) => void           | -           |
| block    | Fits the button width to its parent width                                                                                                                                                              | boolean                   | `false`     |
| loading  | set the loading status of button                                                                                                                                                                       | boolean / {delay: number} | `false`     |
