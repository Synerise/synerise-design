---
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

```tsx
import Icon from '@synerise/ds-icon'

// Recommended: use iconName prop with icon name as string
<Icon iconName="AngleLeftM" color="red" size={20} />

// Deprecated: using component prop
import Icon, { AngleLeftM } from '@synerise/ds-icon'
<Icon component={<AngleLeftM />} color="red" size={20} />
```

## API

| Property  | Description                                                | Type             | Default |
| --------- | ---------------------------------------------------------- | ---------------- | ------- |
| iconName  | Icon name as string (recommended)                          | IconName         |         |
| color     | Define the color used                                      | string           | inherit |
| title     | Name icon                                                  | string           |         |
| size      | Define size icon                                           | string or number | 24      |
| onClick   | The callback function that is triggered when click on icon | function         |         |
| component | ⚠️ Deprecated - use `iconName` instead                     | ReactNode        |         |
| className | icon className                                             | string           |         |
| style     | Style properties of icon, like color etc.                  | CSSProperties    |         |
