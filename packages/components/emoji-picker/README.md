---
id: emoji-picker
title: EmojiPicker
---

EmojiPicker UI Component

## Installation

```
npm i @synerise/ds-emoji-picker
or
yarn add @synerise/ds-emoji-picker
```

## Usage

```
import EmojiPicker from '@synerise/ds-emoji-picker'

<EmojiPicker />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-emoji-picker--default"></iframe>

## API

| Property      | Description                                                                              | Type                      | Default |
| ------------- | ---------------------------------------------------------------------------------------- | ------------------------- | ------- |
| children      | the element that triggers showing the picker                                             | ReactElement              | -       |
| onSelect      | triggered when an emoji has been selected                                                | (emoji: Emoji) => void    | -       |
| closeOnSelect | determines whether dropdown should hide when an emoji has been selected. true by default | boolean                   | true    |
| dropdownProps | Dropdown customisation props see ds-dropdown                                             | Partial<DropdownProps>    | -       |
| texts         | customise texts / labels                                                                 | Partial<EmojiPickerTexts> | -       |
