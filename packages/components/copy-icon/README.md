---
id: copy-icon
title: CopyIcon
---

CopyIcon UI Component

## Installation
```
npm i @synerise/ds-copy-icon
or
yarn add @synerise/ds-copy-icon
```

## Usage
```
import CopyButton from '@synerise/ds-copy-icon'

<CopyIcon />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-copy-icon--default"></iframe>

## API

 Property   | Description                                            | Type                     | Default |
| --------- | ------------------------------------------------------ | ------------------------ | ------- |
| texts     | Group of texts before copy and after                   | CopyTooltipTexts         | -       |
| icon      | custom icon to render                                  | ReactNode                | -       |
| copyValue | Value to copy after click on icon                      | string                   | -       |
| placement | prop to set tooltip where need to be                   | TooltipPlacement         | -       |
| onCopy    | An extra function to invoke on copy button event       | () => void               | -       |
