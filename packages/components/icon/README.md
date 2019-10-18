\---
id: icon
title: Icon

---

Icon UI Component

## Single icon

<iframe src="/storybook-static/iframe.html?id=components-icon--single-icon"></iframe>

## Icon list

<iframe src="/storybook-static/iframe.html?id=components-icon--list-icon"></iframe>

## Installation

```
npm i @synerise/ds-icon
or
yarn add @synerise/ds-icon
```

## Usage

```
import Icon from '@synerise/ds-layout'
import AngleLeftM from '@synerise/ds-icon/dist/icons/AngleLeftM';

<Icon component={<AngleLeftM />
      color={'red'}
      title={'customIcon'}
      size={20}
      className={'classIcon'}
/>
```

## API

| Property  | Description                                                | Type             | Default |
| --------- | ---------------------------------------------------------- | ---------------- | ------- |
| color     | Define the color used                                      | string           | inherit |
| title     | Name icon                                                  | string           |         |
| size      | Define size icon                                           | string or number | 24      |
| type      | Define custom type of special category icons               | string           |         |
| onClick   | The callback function that is triggered when click on icon | fucnction        |         |
| component | The component used for the root node                       | ReactNode        |         |
| className | icon className                                             | string           |         |
| style     | Style properties of icon, like color etc.                  | CSSProperties    |         |
