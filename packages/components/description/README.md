---
id: description
title: Description
---

Description UI Component

## Installation

```
npm i @synerise/ds-description
or
yarn add @synerise/ds-description
```

## Usage

```
import Description, {DescriptionRow} from '@synerise/ds-description';

<Description type='inline'>
    <DescriptionRow label="Name" value="John Kowalski" prefixEl="Mr" suffix="<Avatar>JK</Avatar>" />
</Description>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-description--default"></iframe>

## API

### Description

| Property | Description                                                                                                                                                                                                               | Type                                                          | Default |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| type     | Type of description: `table` - description will looks like vertical table, `inline` - value will aligns to label, `dotted-list` - list with dots as prefix, without label, `numbered-list` - counted list, without labels | `table`/ `inline`/ `dotted-list`/ `numbered-list`             | `table` |
| ratio    | Define size of column if type='table'                                                                                                                                                                                     | `20-80`/ `30-70`/ `40-60`/ `50-50`/ `60-40`/ `70-30`/ `80-20` | `30-70` |

### DescriptionRow

| Property  | Description                                            | Type                     | Default |
| --------- | ------------------------------------------------------ | ------------------------ | ------- |
| label     | Label of description row                               | string                   | -       |
| labelIcon | Icon visible before row label                          | React.ReactNode          | -       |
| value     | Value of description row                               | string / React.ReactNode | -       |
| prefixEl  | Element rendered before value                          | string / React.ReactNode | -       |
| suffixEl  | Element rendered after value                           | string / React.ReactNode | -       |
| copyValue | Whether to render copy icon on the end of row          | string                   | -       |
| starType  | Whether to render star before value, and type of start | `active`, `inactive`     | -       |
