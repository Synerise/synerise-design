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
| maxWidth           | Picker overlay max width                                                                                                          | number                                               | 228     |
| value              | picker value                                                                                                                      | string                                               | -       |
| onChange           | value change handler                                                                                                              | (color: string) => void                              | -       |
| colors             | Array of color swatches to render                                                                                                 | string[]                                             | -       |
| onSaveColors       | change swatches handler                                                                                                           | (colors: string[]) => void                           | -       |
| infix              | used for inlining implementation of other ways of selecting/showing color value (select with converting to other color notations) | (colorHooks?: Partial<ColorHookType>) => JSX.Element | -       |
| maxSavedColors     | max number of allowed swatches                                                                                                    | number                                               | -       |
| tooltip            | copy color tooltip text                                                                                                           | { copy: string; copied: string; }                    | -       |
| isShownSavedColors | controls rendering of swtches                                                                                                     | boolean                                              | -       |
| size               | different size overlay                                                                                                            | 'S' / 'M' / 'L'                                      | -       |
| readOnly           | renders readOnly styled input                                                                                                     | boolean                                              | -       |
| disabled           | renders disabled input                                                                                                            | boolean                                              | -       |
| error              | renders error styled input                                                                                                        | boolean                                              | -       |
| errorText          | renders error styled input and error message                                                                                      | string                                               | -       |
| description        | renders description below trigger                                                                                                 | string                                               | -       |
| placeholder        | Input placeholder text                                                                                                            | string                                               | -       |
| getPopupContainer  | function to find DOM node in which the overlay should be rendered                                                                 | (triggerNode: HTMLElement) => HTMLElement            | -       |
| inputProps         | subset of InputProps - see ds-input                                                                                               | InputProps                                           | -       |
