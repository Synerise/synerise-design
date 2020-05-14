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

<Popconfirm title="title" onConfirm={() => alert('confirm')} onCancel={() => alert('cancel')}>
  <button>text</button>
</Popconfirm>;
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-Popconfirm--default"></iframe>

## API

| Property   | Description                                    | Type                | Default                            |
|------------|------------------------------------------------|---------------------|--------
| cancelText | text of the Cancel button                      | string              | Cancel                             |
| okText     | text of the Confirm button                     | string              | OK                                 |
| okType     | Button type of the Confirm button              | string              | primary                            |
| title      | title of the confirmation box                  | string or ReactNode |                                    |
| onCancel   | callback of cancel                             | function(e)         | -                                  |
| onConfirm  | callback of confirmation                       | function(e)         | -                                  |
| icon       | customize icon of confirmation                 | ReactNode           | <Icon type="exclamation-circle" /> |
| disabled   | is show popconfirm when click its childrenNode | boolean             | false                              |


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
</Popconfirm.ConfirmMessage>```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-Popconfirm--confirmmessage"></iframe>

## API

| Property        | Description                                                                                                                                                           | Type                                     | Default  |
| ------------    | ------------------------------------------------                                                                                                                      | ---------------------                    | -------- |
| title           | text confirm message                                                                                                                                                  | string                                   | -        |
| icon            | icon component                                                                                                                                                        | React.ReactNode                          | -        |
| displayDuration | confirm message display time in ms                                                                                                                                    | number                                   | 5000     |
| placement       | position of confirm message `left`, `top`, `right`, `bottom`, `topLeft`, `topRight`, `bottomLeft`, `bottomRight`, `leftTop`, `leftBottom,`, `rightTop`, `rightBottom` | string                                   | `topLeft`|
| onClick         | method which returns a showConfirmMessage callback                                                                                                                    | (showConfirmMessage: () => void) => void | -        |
