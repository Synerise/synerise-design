---
id: field-set
title: FieldSet
---

FieldSet UI Component

## Installation

```
npm i @synerise/ds-field-set
or
yarn add @synerise/ds-field-set
```

## Usage

```
import FieldSet from '@synerise/ds-field-set'

<FieldSet />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-field-set--default"></iframe>

## API

| Property        | Description                                            | Type                                       | Default      |
| --------------- | ------------------------------------------------------ | ------------------------------------------ | ------------ |
| title           | Header title                                           | `ReactNode`                                | -            |
| description     | Subtitle rendered below title                          | `ReactNode`                                | -            |
| component       | Main content inside the collapsible area               | `ReactNode`                                | -            |
| button          | Action node at the bottom of the collapsible area      | `ReactNode`                                | -            |
| prefix          | Custom prefix in the header (ignored when `expandable`)| `ReactNode`                                | -            |
| onTitleClick    | Click handler for the title element                    | `(ev: MouseEvent<HTMLElement>) => void`    | -            |
| divider         | Show a full-width divider between header and content   | `boolean`                                  | `true`       |
| expandable      | Enable expand/collapse of component and button         | `boolean`                                  | -            |
| triggerType     | Trigger shown when `expandable` is true                | `'expander' \| 'switch'`                   | `'expander'` |
| defaultExpanded | Initial expanded state; re-syncs if prop changes       | `boolean`                                  | -            |
| onExpandChange  | Callback fired after expand/collapse toggle            | `(expanded: boolean) => void`              | -            |
