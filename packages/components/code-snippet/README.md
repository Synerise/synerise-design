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

<CodeSnippet type={'single-line'}  >
    {"code"}
</CodeSnippet>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-code-snippet--default"></iframe>

## API

| Property            | Description                                                | Type                | Default                              |
| ------------------- | ---------------------------------------------------------- | ------------------- | ------------------------------------ |
| type                | Defines the type of the codesnippet                        | CodeSnippetType     | INLINE                               |
| className           | Class name for main CodeSnippet's container                | string              | -                                    |
| children            | CodeSnippet's content                                      | string              | ""                                   |
| tooltipHint         | Defines the text                                           | string              | 'Copy'                               |
| labelBeforeExpanded | Defines the text of button before expand                   | string              | 'Show more'                          |
| labelAfterExpanded  | Defines the text of button after expand                    | string              | 'Show less'                          |
| tooltipTitleHover   | Tooltip title on hover                                     | string              | 'Copy'                               |
| tooltipTitleClick   | Tooltip title on click                                     | string              | 'Copied!'                            |
| fontSize            | Defines the size for single block                          | FontSize            | 'small'                              |
| colorSyntax         | Specify when use color syntax                              | boolean             | false                                |
| languages           | Array of langugages defined for color syntax               | LanguageHighlight[] | ['javascript', 'typescript', 'json'] |
| rows                | Specify the number of visible lines before expand          | number              | 6                                    |
| wrap                | Specify whether content is wrap or not                     | boolean             | false                                |
| onExpand            | An extra function to invoke on button click expand content | () => void          | -                                    |
| onCopy              | An extra function to invoke on copy button event           | () => void          | -                                    |
