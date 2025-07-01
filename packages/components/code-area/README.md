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

To have syntax validation you need to follow the integration instructions here:
https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md

## Usage

```js
import CodeArea from '@synerise/ds-code-area'

type SupportedSyntaxes = 'json' | 'javascript';
const syntaxOptions = [
    {
        language: 'json',
        label: 'JSON'
    },
    {
        language: 'javascript',
        label: 'Javascript'
    }
];

<CodeArea<SupportedSyntaxes>
    syntaxOptions={syntaxOptions}
    onSyntaxChange={ /* current syntax handler */ }
    onChange={ /* current value handler */ }
/>

```

## API

| Property                    | Description                                                    | Type                                                    | Default |
| --------------------------- | -------------------------------------------------------------- | ------------------------------------------------------- | ------- |
| label                       | label above editor                                             | `ReactNode`                                             | -       |
| fullscreenLabel             | label above editor in fullscreen mode (defaults to label prop) | `ReactNode`                                             | -       |
| description                 | description below editor                                       | `ReactNode`                                             | -       |
| counter                     | limit character count                                          | `{ limit: number; placement?: 'bottom' &#124; 'top'; }` | -       |
| errorText                   | error message to show below editor (also adds "error styles")  | `ReactNode`                                             | -       |
| syntaxOptions               | array of available syntaxes                                    | `CodeAreaSyntaxOption[]`                                | -       |
| currentSyntax               | current syntax of editor value                                 | `CodeAreaSyntax`                                        | -       |
| allowFullscreen             | renders fullscreen mode button                                 | `boolean`                                               | -       |
| readOnly                    | renders readOnly mode                                          | `boolean`                                               | -       |
| tooltip                     | tooltip text displayed next to label                           | `ReactNode`                                             | -       |
| tooltipProps                | tooltip properties (see @synerise/ds-tooltip)                  | `TooltipExtendedProps & TooltipProps`                   | -       |
| style                       | custom style added to outermost div                            | `CSSProperties`                                         | -       |
| className                   | class name to add to outermost div                             | `string`                                                | -       |
| renderFooterContent         | renders custom content in footer bar                           | `(CodeAreaStateProps) => ReactNode`                     | -       |
| renderAdditionalDescription | renders custom content above description                       | `(CodeAreaStateProps) => ReactNode`                     | -       |
| onFullscreenChange          | triggered when fullscreen is toggled on/off                    | `(isFullscreen: boolean) => void`                       | -       |
| onSyntaxChange              | triggered when user switches syntax                            | `(newSyntax: SyntaxName) => void`                       | -       |
| texts                       | customise displayed texts                                      | `CodeAreaTexts`                                         | -       |
| getPopupContainer           | customise where fullscreen layer is rendered into              | getPopupContainer (@synerise/ds-utils)                  | -       |

### CodeAreaTexts

Customisable user-facing labels

| Property        | Description                                         | Type        | Default |
| --------------- | --------------------------------------------------- | ----------- | ------- |
| fullscreen      | fullscreen button label                             | `ReactNode` | -       |
| closeFullscreen | close fullscreen button label                       | `ReactNode` | -       |
| fullscreenTitle | used in fullscreen mode if no `label` prop provided | `ReactNode` | -       |

### CodeAreaSyntaxOption

At least one syntax option must be provided.

| Property | Description                         | Type             | Default |
| -------- | ----------------------------------- | ---------------- | ------- |
| language | language of editor `value`          | `CodeAreaSyntax` | -       |
| label    | optional user-friendly display name | `string`         | -       |

### CodeAreaSyntax

See list of languages supported by monaco here: https://github.com/microsoft/monaco-editor/tree/main/src/basic-languages.

```js
CodeAreaSyntax = 'json' | 'html' | 'css' | 'typescript' | 'javascript' | string;
```

### CodeAreaStateProps

Props passed to `renderAdditionalDescription()` and `renderFooterContent()`.

| Property     | Description                  | Type      | Default |
| ------------ | ---------------------------- | --------- | ------- |
| isFullscreen | is fullscreen mode on or off | `boolean` | -       |
| count        | current character count      | `number`  | -       |
| isValid      | is editor value valid        | `boolean` | -       |
