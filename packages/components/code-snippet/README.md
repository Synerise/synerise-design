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
| tooltipTitleHover        | Tooltip title on hover (before copy)                       | string              | 'Copy'                               |
| tooltipTitleClick        | Tooltip title after copy                                   | string              | 'Copied!'                            |
| labelBeforeExpanded      | Text of expand button before expanding                     | string              | 'Show more'                          |
| labelAfterExpanded       | Text of expand button after expanding                      | string              | 'Show less'                          |
| fontSize                 | Font size (FontSize.SMALL=12, FontSize.MEDIUM=14)          | FontSize            | FontSize.SMALL                       |
| colorSyntax              | Enable syntax highlighting (multi-line only)               | boolean             | false                                |
| languages                | Languages for syntax highlighting (multi-line only)        | LanguageHighlight[] | ['javascript', 'typescript', 'json'] |
| rows                     | Visible lines before expand button appears (multi-line)    | number              | 6                                    |
| expanded                 | Initial expanded state (multi-line only)                   | boolean             | false                                |
| wrap                     | Enable word wrap (multi-line only)                         | boolean             | false                                |
| hideExpandButton         | Hide the expand/collapse button (multi-line only)          | boolean             | false                                |
| hideCopyButton           | Hide the copy icon (multi-line only)                       | boolean             | false                                |
| customTriggerComponent   | Custom node to replace the copy icon                       | ReactNode           | -                                    |
| onExpand                 | Extra callback on expand/collapse click                    | () => void          | -                                    |
| onCopy                   | Extra callback on copy                                     | () => void          | -                                    |
