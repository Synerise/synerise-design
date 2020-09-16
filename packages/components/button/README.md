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
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
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
| onClick        | Callback executed after clicking the button                                  | (event: React.MouseEvent<HTMLElement>) => void                                                                                            | -           |
| type           | Defines the type of the button.                                              | `primary` / `secondary`/ `tertiary`/ `tertiary-white` / `ghost-primary` / `ghost` / `ghost-white` / `custom-color` / `custom-color-ghost` | `secondary` |

## Button.Creator

| Property | Description                                            | Type                                           | Default   |
| -------- | ------------------------------------------------------ | ---------------------------------------------- | --------- |
| block    | Defines if the button should take all available space. | boolean                                        | `false`   |
| disabled | Defines if the button is disabled.                     | boolean                                        | `false`   |
| label    | Label of the button.                                   | `left-rounded` / `squared` / `right-rounded`   | -         |
| onClick  | Callback executed after clicking the button            | (event: React.MouseEvent<HTMLElement>) => void | -         |
| status   | Defines the color of the button.                       | `upload` / `error`/ `default`                  | `default` |

## Button.Expander

| Property | Description                                 | Type                                           | Default |
| -------- | ------------------------------------------- | ---------------------------------------------- | ------- |
| disabled | Defines if the button is disabled.          | boolean                                        | `false` |
| expanded | The current state of the button.            | boolean                                        | `false` |
| onClick  | Callback executed after clicking the button | (event: React.MouseEvent<HTMLElement>) => void | -       |
| size     | Defines the size of the button.             | `S` / `M`                                      | `M`     |

## Button.Cruds

| Property         | Description                                                                  | Type                                           | Default |
| ---------------- | ---------------------------------------------------------------------------- | ---------------------------------------------- | ------- |
| addTooltip       | Tooltip of the add button                                                    | React.ReactNode / string                       | -       |
| duplicateTooltip | Tooltip of the duplicate button                                              | React.ReactNode / string                       | -       |
| deleteTooltip    | Tooltip of the delete button (which has a different icon than remove button) | React.ReactNode / string                       | -       |
| editTooltip      | Tooltip of the edit button                                                   | React.ReactNode / string                       | -       |
| moveTooltip      | Tooltip of the move button                                                   | React.ReactNode / string                       | -       |
| removeTooltip    | Tooltip of the remove button                                                 | React.ReactNode / string                       | -       |
| onAdd            | Callback executed after clicking the add button.                             | (event: React.MouseEvent<HTMLElement>) => void | -       |
| onDuplicate      | Callback executed after clicking the duplicate button.                       | (event: React.MouseEvent<HTMLElement>) => void | -       |
| onDelete         | Callback executed after clicking the delete button.                          | (event: React.MouseEvent<HTMLElement>) => void | -       |
| onEdit           | Callback executed after clicking the edit button.                            | (event: React.MouseEvent<HTMLElement>) => void | -       |
| onMove           | Callback executed after clicking the move button.                            | (event: React.MouseEvent<HTMLElement>) => void | -       |
| onRemove         | Callback executed after clicking the remove button.                          | (event: React.MouseEvent<HTMLElement>) => void | -       |
