---
id: drawer
title: Drawer
---

Drawer UI Component

## Installation

```
npm i @synerise/ds-drawer
or
yarn add @synerise/ds-drawer
```

## Usage

```
import Drawer from '@synerise/ds-drawer'

<Drawer
  visible={true}
  width={400}
  onClose={() => {}}
>
    <Drawer.DrawerHeader>
        <span>Header</span>
    </Drawer.DrawerHeader>
    <Drawer.DrawerBody>
        <Drawer.DrawerContent>
            <p>Content</p>
        </Drawer.DrawerContent>
    </Drawer.DrawerBody>
</Drawer>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-drawer--default"></iframe>

## API

| Property           | Description                                                                                    | Type                                          | Default   |
| ------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------- | --------- |
| destroyOnClose     | Whether to unmount child components on closing drawer or not.                                  | boolean                                       | `false`   |
| getContainer       | Return the mounted node for Drawer.                                                            | () => HTMLElement                             | Selectors |
| mask               | Whether to show mask or not.                                                                   | boolean                                       | `true`    |
| maskClosable       | Clicking on the mask (area outside the Drawer) to close the Drawer or not.                     | boolean                                       | `true`    |
| maskStyle          | Style for Drawer's mask element.                                                               | object                                        | {}        |
| style              | Style of wrapper element which contains mask compare to drawerStyle                            | object                                        | {}        |
| drawerStyle        | Style of the popup layer element                                                               | object                                        | {}        |
| visible            | Whether the Drawer dialog is visible or not.                                                   | boolean                                       | `false`   |
| width              | Width of the Drawer dialog.                                                                    | string / number                               | 256       |
| height             | placement is top or bottom, height of the Drawer dialog.                                       | string / number                               | 256       |
| className          | The class name of the container of the Drawer dialog.                                          | string                                        | -         |
| zIndex             | The z-index of the Drawer.                                                                     | number                                        | 1000      |
| placement          | The placement of the Drawer.                                                                   | `top` / `left` / `right` / `bottom` / `right` |
| onClose            | Specify a callback that will be called when a user clicks mask, close button or Cancel button. | (e:Event) => void                             | -         |
| afterVisibleChange | Callback after the animation ends when switching drawers.                                      | (visible: boolean) => void                    | -         |
| keyboard           | Whether support press esc to close                                                             | boolean                                       | `true`    |
