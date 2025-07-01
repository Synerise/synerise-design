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

| Property            | Description                            | Type                         | Default                              |
| ------------------- | -------------------------------------- | ---------------------------- | ------------------------------------ |
| cancelText          | Text of the Cancel button              | string                       | `Cancel`                             |
| okText              | Text of the Confirm button             | string                       | `OK`                                 |
| okType              | Button type of the Confirm button      | string                       | `primary`                            |
| title               | Title of the confirmation box          | string / React.ReactNode     | -                                    |
| description         | Description of the confirmation box    | string / React.ReactNode     | -                                    |
| images              | Urls of images displayed as a carousel | string[]                     | `[]`                                 |
| imagesAutoplay      | Whether to autoplay images             | boolean                      | `false`                              |
| imagesAutoplaySpeed | Speed of autoplay [ms]                 | number                       | `5000`                               |
| onCancel            | Callback of cancel                     | (e: Event) => void           | -                                    |
| onConfirm           | Callback of confirmation               | (e: Event) => void           | -                                    |
| icon                | Customize icon of confirmation         | React.ReactNode              | `<Icon type="exclamation-circle" />` |
| disabled            | Whether component is disabled          | boolean                      | `false`                              |
| withLink            | Text with highlited text               | React.ReactNode              | -                                    |
| closeIcon           | Icon to close popconfirm               | React.ReactNode              | -                                    |
| hideButtons         | prop to hide buttons                   | React.ReactNode              | -                                    |
| titlePadding        | prop to set padding                    | boolean                      | `false`                              |
| buttonsAlign        | Sets footer buttons align              | 'right' / 'left' / undefined | `'right'`                            |

# Popcofirm.ConfirmMessage

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
| placement       | position of confirm message `left`, `top`, `right`, `bottom`, `topLeft`, `topRight`, `bottomLeft`, `bottomRight`, `leftTop`, `leftBottom,`, `rightTop`, `rightBottom` | string                                   | `topLeft` |
| onClick         | method which returns a showConfirmMessage callback                                                                                                                    | (showConfirmMessage: () => void) => void | -         |
