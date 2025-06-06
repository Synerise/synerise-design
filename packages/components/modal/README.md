---
id: modal
title: Modal
---

# Modal UI Component

The Modal component provides a flexible and customizable way to display modal dialogs in your React applications. It offers various options and configurations to control the appearance and behavior of the modal dialogs.

## Demo

<iframe src="/storybook-static/iframe.html?id=components-modal--default"></iframe>

## Installation

Install the Modal component using npm:

```bash
npm install @synerise/ds-core
```

## Deprecated Features

Some features of the Modal component have been deprecated. Please refer to the [API](#api) and [FOOTER](#modalfooter) section for more information on deprecated features.

## API

**(Deprecated)** type Props is deprecated - recommended is using ModalProps

## ModalProps

| Property            | Description                                                                                                | Type                                                                   | Default                                         | Version |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------- | ------- |
| description         | The modal dialog's description                                                                             | string                                                                 | -                                               |
| headerActions       | Append additional content to header actions space                                                          | React.ReactNode                                                        | -                                               |
| size                | The modal size                                                                                             | `small` / `medium` / `large` / `extraLarge`/ `fullSize`/ `fullScreen`. | -                                               |
| bodyBackground      | Set color for body of modal                                                                                | `white` / `grey`                                                       | `white`                                         |
| blank               | Modal with header which contains only close button                                                         | Boolean                                                                | `false`                                         |
| titleContainerStyle | The modal title's container styles object                                                                  | React.CSSProperties / undefined                                        | -                                               |
| settingButtonText   | Text of the setting button                                                                                 | string                                                                 | `Setting`                                       |
| texts               | Labels to render                                                                                           | `{ okButton: string; cancelButton: string }`                           | `{ okButton: 'Apply', cancelButton: 'Cancel' }` |
| children            | Children element to render                                                                                 | `{ okButton: string; cancelButton: string }`                           | -                                               |
| visible             | Whether the modal dialog is visible or not                                                                 | boolean                                                                | `false`                                         |
| confirmLoading      | Whether to apply loading visual effect for OK button or not                                                | boolean                                                                | `false`                                         |
| title               | The modal dialog's title                                                                                   | string / ReactNode                                                     | -                                               |
| closable            | Whether a close (x) button is visible on top right of the modal dialog or not                              | boolean                                                                | `true`                                          |
| onOk                | Specify a function that will be called when a user clicks the OK button                                    | function(e)                                                            | -                                               |
| onCancel            | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button | function(e)                                                            | -                                               |
| afterClose          | Specify a function that will be called when modal is closed completely.                                    | function                                                               | -                                               |
| centered            | Centered Modal                                                                                             | Boolean                                                                | `false`                                         |
| width               | Width of the modal dialog                                                                                  | string / number                                                        | 520                                             |
| footer              | Footer content, set as `footer={null}` when you don't need default buttons                                 | ReactNode                                                              | OK and Cancel buttons                           |
| okText              | Text of the OK button                                                                                      | string / ReactNode                                                     | `OK`                                            |
| okType              | Button `type` of the OK button                                                                             | string                                                                 | `primary`                                       |
| cancelText          | Text of the Cancel button                                                                                  | string / ReactNode                                                     | `Cancel`                                        |
| maskClosable        | Whether to close the modal dialog when the mask (area outside the modal) is clicked                        | boolean                                                                | `true`                                          |
| forceRender         | Force render Modal                                                                                         | boolean                                                                | `false`                                         |
| okButtonProps       | The ok button props                                                                                        | [ButtonProps](/components/button)                                      | -                                               |
| cancelButtonProps   | The cancel button props                                                                                    | [ButtonProps](/components/button)                                      | -                                               |
| destroyOnClose      | Whether to unmount child components on onClose                                                             | boolean                                                                | `false`                                         |
| style               | Style of floating layer, typically used at least for adjusting the position.                               | object                                                                 | -                                               |
| wrapClassName       | The class name of the container of the modal dialog                                                        | string                                                                 | -                                               |
| getContainer        | Return the mount node for Modal                                                                            | HTMLElement / () => HTMLElement / Selectors /`false`                   | document.body                                   |
| zIndex              | The `z-index` of the Modal                                                                                 | Number                                                                 | 1000                                            |
| bodyStyle           | Body style for modal body element. Such as height, padding etc.                                            | object                                                                 | {}                                              |
| mask                | Whether show mask or not.                                                                                  | Boolean                                                                | `true`                                          |
| closeIcon           | custom close icon                                                                                          | ReactNode                                                              | -                                               |
| maskStyle           | Style for modal's mask element.                                                                            | object                                                                 | {}                                              |
| maxHeightViewport   | height of modal with with scrollbar                                                                        | true / number                                                                 | 80                                              |



and it is extended by props for ModalFooterBuilder:

| Property     | Description                                                  | Type      | Default | Version |
| ------------ | ------------------------------------------------------------ | --------- | ------- | ------- |
| prefix       | Element in footer, before Cancel Button                      | ReactNode | -       |
| infix        | Element in footer between Cancel Button nad before Ok Button | ReactNode | -       |
| suffix       | Element in footer, after Ok Button                           | ReactNode | -       |
| okButton     | Custom OK button in footer                                   | ReactNode | -       |
| cancelButton | Custom Cancel button in footer                               | ReactNode | -       |

## ModalTitle

```bash
type ModalTitleProps = Pick<
  ModalProps,
  | 'headerActions'
  | 'onCancel'
  | 'titleContainerStyle'
  | 'blank'
  | 'description'
  | 'title'
>;
```

## ModalFooter

```bash
export type ModalFooterProps = Pick<
  ModalProps,
  | 'prefix'
  | 'infix'
  | 'suffix'
  | 'okButton'
  | 'cancelButton'
  | 'CustomFooterButton'
  | 'DSButton'
  | 'texts'
  | 'onOk'
  | 'onCancel'
  | 'cancelText'
  | 'okText'
  | 'cancelButtonProps'
  | 'okType'
  | 'okButtonProps'
>;
```

**(Deprecated)** method buildModalFooter - use ModalFooter Component instead
