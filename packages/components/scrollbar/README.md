---
id: scrollbar
title: Scrollbar
---

Scrollbar UI Component

## Installation

```
npm i @synerise/ds-scrollbar
or
yarn add @synerise/ds-scrollbar
```

## Usage

```
import Scrollbar from '@synerise/ds-scrollbar'

<Scrollbar />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-scrollbar--default"></iframe>

## API

| Property      | Description                                                                      | Type                     | Default |
| ------------- | -------------------------------------------------------------------------------- | ------------------------ | ------- |
| absolute      | Whether the scrollbar is over content                                            | boolean                  | `true`  |
| largeSize     | Larger scrollbar                                                                 | boolean                  | false   |
| children      | Scrolled component                                                               | React.ReactNode / string | -       |
| classes       | String with optional classes                                                     | string                   | -       |
| fetchData     | Callback called when scrollbar has been scrolled to the end in Y axis            | () => void               | -       |
| hasMore       | Whether the scrollbar can calls fetchData                                        | boolean                  | -       |
| loading       | Whether the scrollbar shows loading icon                                         | boolean                  | -       |
| maxHeight     | Optional max-height value                                                        | string / number          | -       |
| style         | Additional styles for scrollbar wrapper                                          | React.CSSProperties      | -       |
| withDnd       | Whether use DndScrollbar or VirtualScrollbar component                           | boolean                  | false   |
| confineScroll | Will prevent wheel event from propagating (scrolling outer scope) if set to true | boolean                  | false   |
