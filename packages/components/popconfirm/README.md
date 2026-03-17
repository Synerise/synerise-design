---
id: popconfirm
title: Popconfirm
---

Popconfirm UI Component

## Installation

```
npm i @synerise/ds-popconfirm
or
yarn add @synerise/ds-popconfirm
```

## Usage

```javascript
import Popconfirm from '@synerise/ds-popconfirm';

<Popconfirm
  title="title"
  onConfirm={() => alert('confirm')}
  onCancel={() => alert('cancel')}
>
  <button>text</button>
</Popconfirm>;
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-Popconfirm--default"></iframe>

## API

| Property            | Description                            | Type                                                                                                                          | Default   |
| ------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------- |
| cancelText          | Text of the Cancel button              | React.ReactNode                                                                                                               | -         |
| okText              | Text of the Confirm button             | React.ReactNode                                                                                                               | -         |
| okType              | Button type of the Confirm button      | ButtonProps['type']                                                                                                           | `primary` |
| title               | Title of the confirmation box          | React.ReactNode                                                                                                               | -         |
| description         | Description of the confirmation box    | React.ReactNode                                                                                                               | -         |
| images              | Urls of images displayed as a carousel | string[]                                                                                                                      | -         |
| imagesAutoplay      | Whether to autoplay images             | boolean                                                                                                                       | -         |
| imagesAutoplaySpeed | Speed of autoplay [ms]                 | number                                                                                                                        | `5000`    |
| onCancel            | Callback of cancel                     | (event?: MouseEvent\<HTMLElement\>) => void                                                                                   | -         |
| onConfirm           | Callback of confirmation               | (event?: MouseEvent\<HTMLElement\>) => void                                                                                   | -         |
| icon                | Icon displayed left of the title       | React.ReactNode                                                                                                               | -         |
| disabled            | When true renders only children with no popover | boolean                                                                                                              | -         |
| withLink            | Link node rendered below description   | React.ReactNode                                                                                                               | -         |
| closeIcon           | Icon rendered as a close button        | React.ReactNode                                                                                                               | -         |
| hideButtons         | Truthy value hides the button row      | React.ReactNode                                                                                                               | -         |
| titlePadding        | Adjusts close icon margin and description spacing | boolean                                                                                                          | -         |
| buttonsAlign        | Sets footer buttons align              | 'right' / 'left'                                                                                                              | -         |
| staticVisible       | Stay open even after click outside     | boolean                                                                                                                       | -         |
| placement           | Popover placement                      | 'top' / 'topLeft' / 'topCenter' / 'topRight' / 'bottom' / 'bottomLeft' / 'bottomCenter' / 'bottomRight' / 'left' / 'leftTop' / 'leftBottom' / 'right' / 'rightTop' / 'rightBottom' | `top` |
| trigger             | Open trigger                           | 'click' / 'hover' / array                                                                                                     | `click`   |
| open                | Controlled open state                  | boolean                                                                                                                       | -         |
| onOpenChange        | Callback when open state changes       | (open: boolean) => void                                                                                                       | -         |
| asChild             | Merge trigger props onto child element | boolean                                                                                                                       | `true`    |
| zIndex              | Z-index override                       | number                                                                                                                        | `theme.variables['zindex-popconfirm']` |
| overlayClassName    | Class applied to popconfirm container  | string                                                                                                                        | -         |
| overlayStyle        | Inline styles for popconfirm container | CSSProperties                                                                                                                 | -         |

# Popconfirm.ConfirmMessage

## Usage

```javascript
import Popconfirm from '@synerise/ds-popconfirm';

<Popconfirm.ConfirmMessage
    title='Copied! Keep it somewhere safe.'
    icon={<Icon component={<WarningFillM />} color={'#ffc300'} />}
    displayDuration={5000}
    placement='topLeft'}
    onClick={(showMessage) => {
      do sth...
      showMessage();
    }}
>
    <Button>
        Click
    </Button>
</Popconfirm.ConfirmMessage>
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-Popconfirm--confirmmessage"></iframe>

## API

| Property        | Description                                                                                                                                                           | Type                                     | Default   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------- |
| title           | text confirm message                                                                                                                                                  | string                                   | -         |
| icon            | icon component                                                                                                                                                        | React.ReactNode                          | -         |
| displayDuration | confirm message display time in ms                                                                                                                                    | number                                   | 5000      |
| placement       | Position of confirm message                                                                                                                                           | 'top' / 'left' / 'right' / 'bottom' / 'topLeft' / 'topRight' / 'bottomLeft' / 'bottomRight' | `topLeft` |
| onClick         | method which returns a showConfirmMessage callback                                                                                                                    | (showConfirmMessage: () => void) => void | -         |
