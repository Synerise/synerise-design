---
id: code-area
title: CodeArea
---

CodeArea UI Component

## Installation
```
npm i @synerise/ds-code-area
or
yarn add @synerise/ds-code-area
```

## Usage
```
import CodeArea from '@synerise/ds-code-area'

<CodeArea />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-code-area--default"></iframe>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| onChangeDebounced | flag for onChange interval | boolean/undefined | false |
| onChangeDebouncedWait | interval timer in ms | number/undefined | 300 | 
| description | description of code area | React.ReactNode/undefined | undefined |
| label | label of code area | React.ReactNode/undefined | undefined |
| error | flag if has error | boolean/undefined | undefined |
| errorText | text of error | React.ReactNode/undefined | undefined |
| tooltipText | on hover tooltip | React.ReactNode/undefined | 'Full screen' |

also developer can use MonacoEditorProps for example


    | language | choose language for syntax support | html/css/javascript | javascript |
