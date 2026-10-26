---
id: flex-box
title: FlexBox
---

FlexBox UI Component

## Installation

```
npm i @synerise/ds-flex-box
or
yarn add @synerise/ds-flex-box
or
pnpm add @synerise/ds-flex-box
```

## Usage

```
import {Flex, Box} from '@synerise/ds-flex-box'

<Flex alignItems="center" justifyContent="space-between" gap={2}>
  <Box width={1 / 2} mt={24} />
  <Box width={1 / 2} />
</Flex>


```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-flex-box--default"></iframe>

## API

Both components accept every prop below, plus standard `div` attributes, `as` and `ref`. `gap` is
`Flex` only.

Numbers behave differently per group. Space props index the theme `space` scale
`[0, 8, 12, 16, 24, 32, 48, 64]`, so `ml={1}` is `8px` and a value past the end of the scale falls
back to pixels (`mt={24}` is `24px`). A negative margin indexes by magnitude and is negated, so
`mx={-2}` is `-12px`; negative padding is not scaled and stays plain pixels. Size props read a number at or below `1` as a fraction, so
`width={1}` is `100%` and `width={1 / 2}` is `50%`, while `width={588}` is `588px`. Strings always
pass through. An array is mobile-first: `width={[1, 1 / 2]}` is `100%` up to the first breakpoint
and `50%` above it — except for `color`, which takes a plain string only.

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| m, margin | Margin on every side | `string \| number \| array` | - |
| mt, marginTop | Margin top | `string \| number \| array` | - |
| mr, marginRight | Margin right | `string \| number \| array` | - |
| mb, marginBottom | Margin bottom | `string \| number \| array` | - |
| ml, marginLeft | Margin left | `string \| number \| array` | - |
| mx, marginX | Margin left and right | `string \| number \| array` | - |
| my, marginY | Margin top and bottom | `string \| number \| array` | - |
| p, padding | Padding on every side | `string \| number \| array` | - |
| pt, paddingTop | Padding top | `string \| number \| array` | - |
| pr, paddingRight | Padding right | `string \| number \| array` | - |
| pb, paddingBottom | Padding bottom | `string \| number \| array` | - |
| pl, paddingLeft | Padding left | `string \| number \| array` | - |
| px, paddingX | Padding left and right | `string \| number \| array` | - |
| py, paddingY | Padding top and bottom | `string \| number \| array` | - |
| gap | Gap between flex items (`Flex` only) | `string \| number \| array` | - |
| width | Width | `string \| number \| array` | - |
| height | Height | `string \| number \| array` | - |
| minWidth | Minimum width | `string \| number \| array` | - |
| maxWidth | Maximum width | `string \| number \| array` | - |
| minHeight | Minimum height | `string \| number \| array` | - |
| maxHeight | Maximum height | `string \| number \| array` | - |
| display | CSS `display` (`Flex` forces `flex`) | `string \| array` | - |
| overflow | CSS `overflow` | `string \| array` | - |
| overflowX | CSS `overflow-x` | `string \| array` | - |
| overflowY | CSS `overflow-y` | `string \| array` | - |
| alignItems | CSS `align-items` | `string \| array` | - |
| justifyContent | CSS `justify-content` | `string \| array` | - |
| flexDirection | CSS `flex-direction` | `string \| array` | - |
| flexWrap | CSS `flex-wrap` | `string \| array` | - |
| flex | CSS `flex` shorthand | `string \| number \| array` | - |
| alignSelf | CSS `align-self` | `string \| array` | - |
| color | Text colour (not responsive — see note above) | `string` | - |
| backgroundColor | Background colour | `string \| array` | - |
| opacity | Opacity | `string \| number \| array` | - |
| fontSize | Font size; a number is pixels | `string \| number \| array` | - |
| fontWeight | Font weight | `string \| number \| array` | - |
| textAlign | CSS `text-align` | `string \| array` | - |
