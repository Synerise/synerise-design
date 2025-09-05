---
id: section-message
title: SectionMessage
---

SectionMessage UI Component

## Installation
```
npm i @synerise/ds-section-message
or
yarn add @synerise/ds-section-message
```

## Usage
```
import SectionMessage from '@synerise/ds-section-message'

<SectionMessage />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-section-message--default"></iframe>

## API

| Property        | Description                                                                                                            | Type        | Default    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------| ---------- |
| type            | Type of SectionMessage, options: `notice`, `negative`, `positive`,`neutral`,`supply`,`service`,`entity`                | `string`    | `negative` |
| message         | Message of section messsage                                                                                            | `ReactNode` | -          |
| customColor     | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`    | -          |
| customColorIcon | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`    | -          |
| showMoreLabel   | prop to show label                                                                                                     | `ReactNode` | -          |
| onShowMore      | callback executed after clicking                                                                                       | `void`      | -          |
| moreButtons     | prop to show buttons                                                                                                   | `ReactNode` | -          |
| withEmphasis    | prop to show bolder text                                                                                               | `ReactNode` | -          |
| withLink        | prop to show highlited text                                                                                            | `ReactNode` | -          |
| unorderedList   | prop to show unordered list                                                                                            | `ReactNode` | -          |
| withClose       | prop to show close button                                                                                              | `ReactNode` | -          |
| customIcon      | prop to set custom icon                                                                                                | `ReactNode` | -          |
| textButton      | text for button                                                                                                        | `string   ` | -          |
| icon            | prop to set icon                                                                                                       | `ReactNode` | -          |
| description     | prop to show description                                                                                               | `ReactNode` | -          |
