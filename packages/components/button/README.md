```js noeditor
import { version } from './package.json';

`Current version: ${version}`;
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

- To produce things that didn’t exist before (register, submit, save, and more).
- To perform actions (send, delete, edit, cancel, and more).
- To confirm the displayed information.
- Generally, to be used when actions caused by users affect back-end and/or front-end of the application.

## Component anatomy

This is a simple component, which means that it doesn't consist of other components.

## Installation

```static
npm i @synerise/ds-button
```

or

```static
yarn add @synerise/ds-button
```

## Usage

```
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon';
<div>
    <Button mode="split" type="custom-color" color="green">
        Click
        <Icon component={<AngleDownS />} />
    </Button>
</div>
```

## Button

| Property       | Description                                                                  | Type                                                                                                                                      | Default     |
| -------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| color          | Defines color of `custom-color` button.                                      | `green` / `grey` / `yellow` / `blue` / `pink`/ `mars`/ `orange`/ `fern`/ `cyan`/ `purple` / `violet`                                      | `red`       |
| disabled       | Defines if the button is disabled.                                           | boolean                                                                                                                                   | `false`     |
| groupVariant   | Defines shape of the button                                                  | `left-rounded` / `squared` / `right-rounded`                                                                                              | -           |
| justifyContent | Defines justify of content in button.                                        | JustifyContentProperty (React.CSSPRroperties)                                                                                             | -           |
| loading        | Sets the loading status of button.                                           | boolean / `{ delay?: number }`                                                                                                            | `false`     |
| mode           | Defines the mode of the button content. It affects content inside the button | `single-icon` / `split` / `two-icons` /`label-icon` / `icon-label`                                                                        | -           |
| onClick        | Callback executed after clicking the button                                  | (event: React.MouseEvent) => void                                                                                                         | -           |
| type           | Defines the type of the button.                                              | `primary` / `secondary`/ `tertiary`/ `tertiary-white` / `ghost-primary` / `ghost` / `ghost-white` / `custom-color` / `custom-color-ghost` | `secondary` |
| iconColor      | Defines color of `icon` in button.                                           | `green` / `grey` / `yellow` / `blue` / `pink`/ `mars`/ `orange`/ `fern`/ `cyan`/ `purple` / `violet`                                      | `grey`      |
| error          | Defines if the button has error button styles .                              | boolean                                                                                                                                   | `false`     |
| tagProps       | Renders a status tag next to button label                                    | TagProps see ds-tag                                                                                                                       | -           |

## ButtonToggle

Special type of Button, with two states: default and activated (selected). Inherits most props from Button.

| Property       | Description                                                                  | Type                                                               | Default |
| -------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| disabled       | Defines if the button is disabled.                                           | boolean                                                            | `false` |
| groupVariant   | Defines shape of the button                                                  | `left-rounded` / `squared` / `right-rounded`                       | -       |
| justifyContent | Defines justify of content in button.                                        | JustifyContentProperty (React.CSSPRroperties)                      | -       |
| loading        | Sets the loading status of button.                                           | boolean / `{ delay?: number }`                                     | `false` |
| mode           | Defines the mode of the button content. It affects content inside the button | `single-icon` / `split` / `two-icons` /`label-icon` / `icon-label` | -       |
| onClick        | Callback executed after clicking the button                                  | (event: React.MouseEvent) => void                                  | -       |
| type           | Defines the type of the button.                                              | `solid` / `ghost`                                                  | `solid` |
| error          | Defines if the button has error button styles .                              | boolean                                                            | `false` |
| activated      | Defines if the button has activated button styles .                          | boolean                                                            | `false` |
| tagProps       | Renders a status tag next to button label                                    | TagProps see ds-tag                                                | -       |

## Button.Creator

| Property      | Description                                            | Type                              | Default   |
| ------------- | ------------------------------------------------------ | --------------------------------- | --------- |
| block         | Defines if the button should take all available space. | boolean                           | `false`   |
| disabled      | Defines if the button is disabled.                     | boolean                           | `false`   |
| label         | Label of the button.                                   | string / React.ReactNode          | -         |
| onClick       | Callback executed after clicking the button            | (event: React.MouseEvent) => void | -         |
| status        | Defines the color of the button.                       | `upload` / `error`/ `default`     | `default` |
| labelAlign    | Defines label in center or left                        | `center` / `left`                 | `center`  |

## Button.Expander

| Property | Description                                 | Type                              | Default |
| -------- | ------------------------------------------- | --------------------------------- | ------- |
| disabled | Defines if the button is disabled.          | boolean                           | `false` |
| expanded | The current state of the button.            | boolean                           | `false` |
| onClick  | Callback executed after clicking the button | (event: React.MouseEvent) => void | -       |
| size     | Defines the size of the button.             | `S` / `M`                         | `M`     |

## Button.Checkbox

This is special checkbox built on Button and inheriting its appereance.
It behaves like checkbox input due to `role="checkbox"` and `aria-checked` attributes.

### Props

It inherits all `Button`'s props excluding `type`, `block`, `color`, `groupVariant`, `icon`, `iconColor`, `leftIconSize`, `mode`, `rightIconSize`, `size`, `onChange`.

| Property       | Description                                                | Type                         | Default     |
| -------------- | ---------------------------------------------------------- | ---------------------------- | ----------- |
| checked        | (optional) Sets checkbox state for controlled component.   | `boolean`                    | `undefined` |
| defaultChecked | (optional) Sets checkbox state for uncontrolled component. | `boolean`                    | `false`     |
| hasError       | (optional) Changes appereance for wrong validation.        | `boolean`                    | `undefined` |
| indeterminate  | (optional) Forces indeterminate checkbox state.            | `boolean`                    | `undefined` |
| onChange       | (optional) On change callback                              | `(checked: boolean) => void` |             |

## Button.Star

This is star toggle built on Button and inheriting its appereance.

### Props

It inherits all `Button`'s props excluding.

| Property | Description                                              | Type      | Default     |
| -------- | -------------------------------------------------------- | --------- | ----------- |
| active   | (optional) Sets checkbox state for controlled component. | `boolean` | `undefined` |
