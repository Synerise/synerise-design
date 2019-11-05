---
id: Popconfirm
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

| Property | Description | Type | Default |
| cancelText | text of the Cancel button | string | Cancel |
| okText | text of the Confirm button | string | OK |
| okType | Button type of the Confirm button | string | primary |
| title | title of the confirmation box | string or ReactNode | |
| onCancel | callback of cancel | function(e) | - |
| onConfirm | callback of confirmation | function(e) | - |
| icon | customize icon of confirmation | ReactNode | <Icon type="exclamation-circle" /> |
| disabled | is show popconfirm when click its childrenNode | boolean | false |
