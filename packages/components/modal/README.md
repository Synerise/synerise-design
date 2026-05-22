---
id: modal
title: Modal
---

# Modal UI Component

The Modal component provides a flexible and customizable way to display modal dialogs in your React applications. It is a native React implementation (no Ant Design dependency) with portal-based rendering and full async handler support.

## Demo

<iframe src="/storybook-static/iframe.html?id=components-modal--with-footer"></iframe>

## Installation

```bash
npm install @synerise/ds-modal
```

## Usage

```tsx
import Modal from '@synerise/ds-modal';

<Modal
  title="Confirm action"
  open={isOpen}
  onOk={handleOk}
  onCancel={handleCancel}
>
  Modal body content
</Modal>
```

### Imperative API

Use `showModal` when you need to open a modal outside of the React component tree:

```tsx
import { showModal } from '@synerise/ds-modal';

const ref = showModal({
  title: 'Confirm',
  onOk: () => ref.destroy(),
  onCancel: () => ref.destroy(),
});
```

`showModal` returns a `ModalHandle` with a single `destroy()` method that unmounts the modal.

### Async handlers

Both `onOk` and `onCancel` accept handlers that return a `Promise`. The modal stays open until the promise resolves:

```tsx
<Modal
  onOk={async () => {
    await saveData();
  }}
  onCancel={async () => {
    await cleanup();
  }}
/>
```

### Scroll imperative handle

Use a `ref` to imperatively scroll the modal body:

```tsx
import Modal from '@synerise/ds-modal';
import type { ModalRef } from '@synerise/ds-modal';

const ref = useRef<ModalRef>(null);

<Modal ref={ref} open>
  {/* content */}
</Modal>

ref.current?.scrollToTop();
ref.current?.scrollToBottom();
```

## API

### ModalProps

| Property            | Description                                                                                                       | Type                                                                              | Default   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------- |
| `open`              | Whether the modal is visible                                                                                      | `boolean`                                                                         | `false`   |
| `title`             | Modal header title                                                                                                | `ReactNode`                                                                       | –         |
| `description`       | Subtitle rendered below the title (**deprecated** — use `headerBottomBar` instead)                               | `ReactNode`                                                                       | –         |
| `headerBottomBar`   | Content rendered below the title and description in the header                                                    | `ReactNode`                                                                       | –         |
| `headerActions`     | Content rendered in the top-right area of the header                                                              | `ReactNode`                                                                       | –         |
| `headerTabProps`    | Props forwarded to the `Tabs` component rendered inside the header                                                | `TabsProps`                                                                       | –         |
| `size`              | Predefined width of the modal                                                                                     | `small` \| `medium` \| `large` \| `extraLarge` \| `fullSize` \| `fullScreen`     | –         |
| `blank`             | Renders a minimal modal without any header/footer chrome; only a close button is shown when `onCancel` is set    | `boolean`                                                                         | `false`   |
| `centered`          | Vertically centers the modal in the viewport                                                                      | `boolean`                                                                         | `false`   |
| `closable`          | Whether the close (×) button is shown                                                                             | `boolean`                                                                         | `true`    |
| `maskClosable`      | Whether clicking the backdrop closes the modal                                                                    | `boolean`                                                                         | `true`    |
| `onOk`              | Called when the OK / Apply button is clicked; may return a `Promise` — modal stays open until it resolves        | `(e: MouseEvent) => void \| Promise<unknown>`                                     | –         |
| `onCancel`          | Called when the close button, backdrop, or Cancel button is clicked; may return a `Promise`                      | `(e: MouseEvent) => void \| Promise<unknown>`                                     | –         |
| `afterClose`        | Called after the modal has fully unmounted                                                                        | `() => void`                                                                      | –         |
| `footer`            | Custom footer content. Set `footer={null}` to remove the footer entirely                                         | `ReactNode`                                                                       | OK + Cancel buttons |
| `okText`            | Label for the OK button                                                                                           | `ReactNode`                                                                       | `Apply`   |
| `cancelText`        | Label for the Cancel button                                                                                       | `ReactNode`                                                                       | `Cancel`  |
| `okType`            | Button type for the OK button                                                                                     | `ButtonType`                                                                      | `primary` |
| `okButtonProps`     | Extra props forwarded to the OK button                                                                            | `ButtonProps`                                                                     | –         |
| `cancelButtonProps` | Extra props forwarded to the Cancel button                                                                        | `ButtonProps`                                                                     | –         |
| `texts`             | Override both button labels at once                                                                               | `{ okButton?: ReactNode; cancelButton?: ReactNode }`                              | –         |
| `bodyBackground`    | Background colour of the modal body                                                                               | `white` \| `grey`                                                                 | `white`   |
| `bodyStyle`         | Inline styles applied to the modal body element                                                                   | `CSSProperties`                                                                   | –         |
| `bodyFullWidth`     | Removes horizontal padding from the modal body                                                                    | `boolean`                                                                         | `false`   |
| `maxViewportHeight` | Constrains the modal height to a percentage of the viewport and wraps children in a scrollbar. Pass `true` for 80 vh or a number for a custom value | `true \| number`                                              | –         |
| `disableScrollbar`  | When `maxViewportHeight` is set, disables the built-in scrollbar wrapper                                          | `boolean`                                                                         | `false`   |
| `titleContainerStyle` | Inline styles applied to the title container element                                                            | `CSSProperties`                                                                   | –         |
| `getContainer`      | Returns the DOM node to mount the modal into                                                                      | `() => HTMLElement`                                                               | `document.body` |
| `zIndex`            | `z-index` of the modal                                                                                            | `number`                                                                          | –         |
| `className`         | CSS class applied to the modal root                                                                               | `string`                                                                          | –         |
| `style`             | Inline styles applied to the modal root                                                                           | `CSSProperties`                                                                   | –         |

### Footer layout slots

These props allow fine-grained control of the default footer layout:

| Property            | Description                                          | Type        |
| ------------------- | ---------------------------------------------------- | ----------- |
| `prefix`            | Content placed before the Cancel button              | `ReactNode` |
| `infix`             | Content placed between Cancel and OK buttons         | `ReactNode` |
| `suffix`            | Content placed after the OK button                   | `ReactNode` |
| `okButton`          | Replaces the default OK button                       | `ReactNode` |
| `cancelButton`      | Replaces the default Cancel button                   | `ReactNode` |
| `CustomFooterButton`| Component type used instead of the default button    | `ComponentType<ButtonProps>` |

### ModalRef

Obtained via `useRef<ModalRef>()` passed to the `ref` prop.

| Method           | Description                              |
| ---------------- | ---------------------------------------- |
| `scrollToTop()`  | Scrolls the modal body to the top        |
| `scrollToBottom()` | Scrolls the modal body to the bottom   |

### ModalHandle

Returned by `showModal()`.

| Property    | Description                        |
| ----------- | ---------------------------------- |
| `destroy()` | Unmounts the imperatively-opened modal |

## ModalTitle

Sub-component for the modal header. Props are a subset of `ModalProps`:

```tsx
type ModalTitleProps = Pick<
  ModalProps,
  | 'headerActions'
  | 'headerTabProps'
  | 'onCancel'
  | 'titleContainerStyle'
  | 'blank'
  | 'description'
  | 'title'
  | 'headerBottomBar'
>;
```

## ModalFooter

Sub-component for the modal footer. Props are a subset of `ModalProps`:

```tsx
type ModalFooterProps = Pick<
  ModalProps,
  | 'footer'
  | 'prefix'
  | 'infix'
  | 'suffix'
  | 'okButton'
  | 'cancelButton'
  | 'CustomFooterButton'
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

## Deprecated

The following prop is **deprecated** and will be removed in a future major version:

| Prop | Replacement |
| ---- | ----------- |
| `description` | `headerBottomBar` |
