---
id: color-picker
title: ColorPicker
---

ColorPicker UI Component

## Installation

```
npm i @synerise/ds-color-picker
or
yarn add @synerise/ds-color-picker
```

## Usage

```
import ColorPicker from '@synerise/ds-color-picker'

<ColorPicker />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-color-picker--default"></iframe>

## API

#### ColorPicker

| Property           | Description                                                                                                                       | Type                                                 | Default |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------- |
| maxWidth           | Picker overlay max width. Only applied when value is >= 228.                                                                      | number                                               | -       |
| value              | picker value                                                                                                                      | string                                               | -       |
| onChange           | value change handler                                                                                                              | (color: string) => void                              | -       |
| colors             | Array of color swatches to render (initialises local state on mount)                                                              | string[]                                             | []      |
| onSaveColors       | change swatches handler                                                                                                           | (colors: string[]) => void                           | -       |
| infix              | used for inlining implementation of other ways of selecting/showing color value (select with converting to other color notations) | (colorHooks?: Partial<ColorHookType>) => JSX.Element | -       |
| maxSavedColors     | max number of allowed swatches                                                                                                    | number                                               | 9       |
| tooltip            | copy color tooltip text                                                                                                           | { copy: string; copied: string; }                    | -       |
| isShownSavedColors | controls rendering of swtches                                                                                                     | boolean                                              | -       |
| size               | height of the color picker panel (S=136px, M=168px, L=200px)                                                                     | 'S' / 'M' / 'L'                                      | 'M'     |
| readOnly           | renders readOnly styled input                                                                                                     | boolean                                              | -       |
| disabled           | renders disabled input                                                                                                            | boolean                                              | -       |
| error              | renders error styled input                                                                                                        | boolean                                              | -       |
| errorText          | renders error styled input and error message                                                                                      | string                                               | -       |
| description        | renders description below trigger                                                                                                 | string                                               | -       |
| placeholder        | Input placeholder text                                                                                                            | string                                               | -       |
| getPopupContainer  | function to find DOM node in which the overlay should be rendered                                                                 | (triggerNode: HTMLElement) => HTMLElement            | -       |
| inputProps         | subset of InputProps - see ds-input (value, onChange, placeholder, disabled, readOnly, prefix and FormFieldCommonProps are excluded) | Omit&lt;InputProps, ...&gt;                           | -       |
