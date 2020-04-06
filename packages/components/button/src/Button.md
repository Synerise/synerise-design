#### Version

```js noeditor
import {version} from './../package.json';
`v: ${ version }`
```

<div className="ds-package-info">
  @synerise/ds-button
  <a target="_blank" href="https://www.npmjs.com/package/@synerise/ds-button">https://www.npmjs.com/package/@synerise/ds-button</a>
</div>

<a target="_blank" href="/storybook-static/?path=/story/components-button--simple">Storybook</a>
<br />
<br />

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

```static
npm i @synerise/ds-button
```

or

```static
yarn add @synerise/ds-button
```

## Usage

---

## Demo

```
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
<div>
    <Button mode="split" type="custom-color" color="green">
        Click
        <Icon component={<AngleDownS />} />
    </Button>
</div>
```
