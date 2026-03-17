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
or
pnpm add @synerise/ds-section-message
```

## Usage

```
import SectionMessage from '@synerise/ds-section-message'

<SectionMessage />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-section-message--default"></iframe>

## API

| Property        | Description                                                                                                                      | Type              | Default             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------- |
| type            | Visual variant. Options: `notice`, `negative`, `positive`, `neutral`, `supply`, `service`, `entity`                             | `SectionType`     | — (required)        |
| message         | Bold heading text                                                                                                                | `ReactNode`       | -                   |
| description     | Regular-weight body text rendered below the message                                                                              | `ReactNode`       | -                   |
| icon            | Overrides the automatic type-derived icon (passed as `component` prop to `<Icon>`)                                               | `ReactNode`       | -                   |
| customIcon      | Renders a React element directly inside the icon wrapper, bypassing the `<Icon>` wrapper; takes precedence over `icon`           | `ReactElement`    | -                   |
| customColor     | Overrides background and border colours. Options: `red`, `blue`, `green`, `yellow`, `grey`, `purple`, `violet`, `cyan`, `fern`, `orange`, `mars`, `pink` | `CustomColorType` | -                   |
| customColorIcon | Overrides the icon and top-border colour. Same options as `customColor`                                                          | `CustomColorType` | -                   |
| showMoreLabel   | Label for the "show more" link; only rendered when `onShowMore` is also provided                                                 | `ReactNode`       | -                   |
| onShowMore      | Callback executed when the "show more" link is clicked; requires `showMoreLabel`                                                 | `() => void`      | -                   |
| onClose         | Callback executed when the close button is clicked; requires `withClose` to be truthy                                           | `() => void`      | -                   |
| withClose       | When truthy, shows a close button in the right-hand area                                                                         | `ReactNode`       | -                   |
| suffixel        | Content placed in the right-hand action area, before the close button                                                           | `ReactNode`       | -                   |
| moreButtons     | Additional action content rendered inside the content area                                                                       | `ReactNode`       | -                   |
| withEmphasis    | Bold inline content; only rendered when `withLink` is falsy                                                                      | `ReactNode`       | -                   |
| withLink        | Underlined link content; rendered instead of `withEmphasis`; also adjusts content area padding                                  | `ReactNode`       | -                   |
| unorderedList   | List content; only rendered when `moreButtons` is falsy                                                                          | `ReactNode`       | -                   |
| color           | **Deprecated** — use `customColor` instead                                                                                       | `ColorType`       | -                   |
