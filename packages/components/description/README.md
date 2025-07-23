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
| type     | Type of description: `table` - description will looks like vertical table, `inline` - value will aligns to label, `corner` -  label and value have space-between them                                                     | `table`/ `inline`/ `corner`                                   | `table` |
| ratio    | Define size of column if type='table'                                                                                                                                                                                     | `50-50`/ `25-75`                                              | `50-50` |

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
