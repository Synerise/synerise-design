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
import Icon, { AngleLeftM } from '@synerise/ds-icon'

// Recommended for known icons: import the icon and pass it via `component`.
// Only the icons you import are bundled, so unused icons are tree-shaken from the app bundle.
<Icon component={<AngleLeftM />} color="red" size={20} />

// Only when the icon is not known at build time (e.g. the name is stored in a DB / returned by an API):
<Icon iconName={iconNameFromApi} color="red" size={20} />
```

## API

| Property  | Description                                                                              | Type             | Default |
| --------- | ---------------------------------------------------------------------------------------- | ---------------- | ------- |
| iconName  | Icon name as string. Use **only** when the icon isn't known at build time (e.g. from a DB/API); prefer `component`. Takes precedence over `component` | IconName |         |
| color     | Sets CSS `color` on SVG. Inherits parent colour if omitted (L/XL icons default to grey-800) | string       | inherit |
| name      | Sets the `title` HTML attribute on the container div (tooltip on hover)                  | string           |         |
| size      | Width and height of container and SVG in px                                              | string or number | 24      |
| stroke    | Also applies `color` value to CSS `stroke` property                                      | boolean          |         |
| onClick   | Callback triggered when clicking the icon. Adds `cursor: pointer` CSS                   | function         |         |
| component | **Recommended for known icons** — import the icon and pass it (e.g. `<AngleLeftM />`); tree-shakeable | ReactNode        |         |
| className | icon className (appended to `'ds-icon'`)                                                 | string           |         |
| style     | Style properties of icon, like color etc.                                                | CSSProperties    |         |
