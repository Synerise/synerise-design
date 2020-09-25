---
id: modal
title: Modal
---

Modal UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-modal--default"></iframe>

## API

| Property          | Description                                                                                                | Type                                                     | Default                                         | Version |
| ----------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------- | ------- |
| afterClose        | Specify a function that will be called when modal is closed completely.                                    | function                                                 | -                                               |
| bodyStyle         | Body style for modal body element. Such as height, padding etc.                                            | object                                                   | {}                                              |
| cancelText        | Text of the Cancel button                                                                                  | string / ReactNode                                       | `Cancel`                                        |
| centered          | Centered Modal                                                                                             | Boolean                                                  | `false`                                         |
| closable          | Whether a close (x) button is visible on top right of the modal dialog or not                              | boolean                                                  | `true`                                            |
| closeIcon         | custom close icon                                                                                          | ReactNode                                                | -                                               |
| confirmLoading    | Whether to apply loading visual effect for OK button or not                                                | boolean                                                  | `false`                                           |
| destroyOnClose    | Whether to unmount child components on onClose                                                             | boolean                                                  | `false`                                           |
| footer            | Footer content, set as `footer={null}` when you don't need default buttons                                 | string / ReactNode                                       | OK and Cancel buttons                           |
| forceRender       | Force render Modal                                                                                         | boolean                                                  | `false`                                           |
| getContainer      | Return the mount node for Modal                                                                            | HTMLElement / () => HTMLElement / Selectors /`false`     | document.body                                   |
| mask              | Whether show mask or not.                                                                                  | Boolean                                                  | `true`                                            |
| maskClosable      | Whether to close the modal dialog when the mask (area outside the modal) is clicked                        | boolean                                                  | `true`                                            |
| maskStyle         | Style for modal's mask element.                                                                            | object                                                   | {}                                              |
| okText            | Text of the OK button                                                                                      | string / ReactNode                                       | `OK`                                            |
| okType            | Button `type` of the OK button                                                                             | string                                                   | `primary`                                       |
| okButtonProps     | The ok button props                                                                                        | [ButtonProps](/components/button)                        | -                                               |
| cancelButtonProps | The cancel button props                                                                                    | [ButtonProps](/components/button)                        | -                                               |
| style             | Style of floating layer, typically used at least for adjusting the position.                               | object                                                   | -                                               |
| title             | The modal dialog's title                                                                                   | string / ReactNode                                       | -                                               |
| description       | The modal dialog's description                                                                             | string                                                   | -                                               |
| size              | The modal size                                                                                             | `small` / `medium` / `large` / `extraLarge`/ `fullSize`. | -                                               |
| visible           | Whether the modal dialog is visible or not                                                                 | boolean                                                  | `false`                                           |
| width             | Width of the modal dialog                                                                                  | string / number                                          | 520                                             |
| wrapClassName     | The class name of the container of the modal dialog                                                        | string                                                   | -                                               |
| zIndex            | The `z-index` of the Modal                                                                                 | Number                                                   | 1000                                            |
| onCancel          | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button | function(e)                                              | -                                               |
| onOk              | Specify a function that will be called when a user clicks the OK button                                    | function(e)                                              | -                                               |
| headerActions     | Append additional content to header actions space                                                          | React.ReactNode                                          | -                                               |
| bodyBackground    | Set color for body of modal                                                                                | `white` / `grey`                                         | `white`                                         |
| texts             | Labels to render                                                                                           | `{ okButton: string; cancelButton: string }`             | `{ okButton: 'Apply', cancelButton: 'Cancel' }` |
| blank             | Modal with header which contains only close button                                                         | Boolean                                                  | `false`                                           |
