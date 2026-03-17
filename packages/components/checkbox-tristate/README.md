---
id: checkbox-tristate
title: CheckboxTristate
---

> **DEPRECATED.** Use `<Checkbox tristate />` from `@synerise/ds-checkbox` instead. This package is a thin compatibility shim and will be removed in a future release.

CheckboxTristate UI Component - Expands Checkbox to third undefined state.

## Installation

```
npm i @synerise/ds-checkbox-tristate
or
yarn add @synerise/ds-checkbox-tristate
```

## Usage

```
import CheckboxTristate, { CheckboxTristateChangeEvent } from '@synerise/ds-checkbox-tristate';

<CheckboxTristate
  checked={checkedValue}
  onChange={(event: CheckboxTristateChangeEvent) => {
    console.log(event.target.checked); // this will return false|true|undefined
  }}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-checkbox-tristate--default"></iframe>

## API

| Property       | Description                                                           | Type                                  | Default   |
| -------------- | --------------------------------------------------------------------- | ------------------------------------- | --------- | ----------- |
| autoFocus      | Get focus when component mounted                                      | boolean                               | `false`   |
| checked        | Specifies whether the checkbox is selected or indeterminate           | boolean                               | undefined | `undefined` |
| defaultChecked | Specifies the initial state: whether or not the checkbox is selected. | boolean                               | `false`   |
| description    | Checkbox description                                                  | ReactNode                             | -         |
| disabled       | Disable checkbox                                                      | boolean                               | `false`   |
| errorText      | Error message, if provided sets error state on checkbox               | ReactNode                             | -         |
| hasError       | Determines if checkbox is in error state                              | boolean                               | `false`   |
| onChange       | The callback function that is triggered when the state changes.       | (e:CheckboxTristateChangeEvent)=>void | -         |
| withoutPadding | Reset padding of CheckboxWrapper                                      | boolean                               | `false`   |
