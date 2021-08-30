---
id: code-snippet
title: CodeSnippet
---

CodeSnippet UI Component

## Installation
```
npm i @synerise/ds-code-snippet
or
yarn add @synerise/ds-code-snippet
```

## Usage
```
import CodeSnippet from '@synerise/ds-code-snippet'

<CodeSnippet />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-code-snippet--default"></iframe>

## API

| Property            | Description                                                           | Type                 | Default     |
| ------------------- | --------------------------------------------------------------------- | -------------------- | ----------- |
| type                | Defines the type of the codesnippet.                                  | CodeSnippetType      | INLINE      |
| className           | Class name for main CodeSnippet's container                           | string               |    -        |
| children            | CodeSnippet's content                                                 | string               |    -        | 
| style               | Defines the CSS of the container                                      | React.CSSProperties  |    -        |   
| tooltipHint         | Defines the text                                                      | string               | 'Copy'      |
| labelBeforeExpanded |                                                                       | string               | 'Show more' |
| labelAfterExpanded  |                                                                       | string               | 'Show less' |
| fontSize            | Defines the size for single block                                     | FontSize             | 'small'     |
| colorSyntax         |                                                                       | boolean              | false       |
