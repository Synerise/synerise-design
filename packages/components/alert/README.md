---
id: alert
title: Alert
---

Alert UI Component

## Installation

```
npm i @synerise/ds-alert
or
yarn add @synerise/ds-alert
```

## Usage

```jsx
import Alert from '@synerise/ds-alert';

<Alert
  mode="background-outline"
  showIcon
  type="success"
  message="Success!"
  description="Success description"
  showMoreLabel="Show more"
  onShowMore={() => {}}
/>;
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-alert--default"></iframe>

## API

| Property    | Description                                                                                                                                                               | Type                    | Default      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------ | --- |
| afterClose  | Called when close animation is finished                                                                                                                                   | () => void              | -            |
| closable    | Whether Alert can be closed                                                                                                                                               | boolean                 | -            |
| closeText   | Close text to show                                                                                                                                                        | string\                 | ReactNode    | -   |
| description | Additional content of Alert                                                                                                                                               | string\                 | ReactNode    | -   |
| icon        | Custom icon, effective when `showIcon` is `true`                                                                                                                          | ReactNode               | -            |
| message     | Content of Alert                                                                                                                                                          | string\                 | ReactNode    | -   |
| showIcon    | Whether to show icon                                                                                                                                                      | boolean                 | `false`      |
| type        | Type of Alert styles, options: `success`, `info`, `warning`, `error`                                                                                                      | string                  | `info`       |
| onClose     | Callback when Alert is closed                                                                                                                                             | (e: MouseEvent) => void | -            |
| mode        | Whether to render alert with outline, background, or transparent, options: `background`, `background-outline`, `outline`, `clear`                                         | string                  | `background` |
| color       | Set the color that overrides the standard color of alert, options: `blue`, `grey`, `green`, `yellow`, `red`, `pink`, `mars`, `orange`, `fern`, `cyan`, `purple`, `violet` | string                  | ``           |

### Alert.InlineAlert

| Property | Description                                                 | Type                         | Default   |
| -------- | ----------------------------------------------------------- | ---------------------------- | --------- |
| type     | Type of InlineAlert, options: `success`, `alert`, `warning` | `string`                     | `warning` |
| message  | Message of alert                                            | `string` \ `React.ReactNode` | -         |

### Alert.SectionMessage

| Property        | Description                                                                                                            | Type                        | Default    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------- |
| type            | Type of SectionMessage, options: `notice`, `negative`, `positive`,`neutral`,`supply`,`service`,`entity`                | `string`                    | `negative` |
| message         | Message of section messsage                                                                                            | `React.ReactNode`           | -          |
| customColor     | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`                    | -          |
| customColorIcon | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`                    | -          |
| color           | type of colors,options: `red`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`                                       | `string`                    | -          |
| mode            | type of modes, options: `background`, `background-outline`,`outline`,`clear`                                           | `string`                    | -          |
| showMoreLabel   | prop to show label                                                                                                     | `React.ReactNode`           | -          |
| onShowMore      | callback executed after clicking                                                                                       | `void`                      | -          |
| newClient       | prop to show button                                                                                                    | `React.ReactNode`/`boolean` | -          |
| moreButtons     | prop to show buttons                                                                                                   | `React.ReactNode`/`boolean` | -          |
| withEmphasis    | prop to show bolder text                                                                                               | `React.ReactNode`           | -          |
| withLink        | prop to show highlited text                                                                                            | `React.ReactNode`           | -          |
| unorderedList   | prop to show unordered list                                                                                            | `React.ReactNode`           | -          |
| withClose       | prop to show close button                                                                                              | `React.ReactNode`           | -          |
| customIcon      | prop to set custom icon                                                                                                | `React.ReactNode`           | -          |
| textButton      | text for button                                                                                                        | `string         `           | -          |

### Alert.AlertSemanticColor

| Property | Description                                                                                                               | Type     | Default    |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- |
| type     | Type of AlertSemanticColor, options: `notice`, `negative`, `positive`,`informative`,`neutral`,`supply`,`service`,`entity` | `string` | `positive` |
| color    | type of colors,options: `red`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`blue`                                   | `string` | -          |
| mode     | type of modes, options: `background`, `background-outline`,`outline`,`shadow`                                             | `string` | -          |

### Alert.IconAlert

| Property     | Description                                                          | Type              | Default   |
| ------------ | -------------------------------------------------------------------- | ----------------- | --------- |
| type         | Type of Alert styles, options: `success`, `info`, `warning`, `error` | `string`          | `warning` |
| message      | Message of Icon Alert                                                | `React.ReactNode` | -         |
| disabled     | prop to set disabled icon                                            | `boolean`         | -         |
| withEmphasis | prop to show bolder text                                             | `React.ReactNode` | -         |
| withLink     | prop to show highlited text                                          | `React.ReactNode` | -         |
| iconAlert    | prop to set custom icon                                              | `boolean`         | -         |
| hoverButton  | prop to set hover state button                                       | `boolean`         | -         |
| customIcon   | prop to set custom icon                                              | `React.ReactNode` | -         |

### Alert.Toast

| Property        | Description                                                                                                            | Type                         | Default   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------- |
| type            | Type of Alert styles, options: `success`, `info`, `warning`, `error`                                                   | `string`                     | `warning` |
| message         | Message of Icon Alert                                                                                                  | `React.ReactNode`            | -         |
| button          | prop to set button                                                                                                     | `React.ReactNode`            | -         |
| expanded        | prop to set show expanded content                                                                                      | `boolean`                    | -         |
| onExpand        | prop on click to show content                                                                                          | `isExpanded:boolean => void` | -         |
| customColor     | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`                     | -         |
| customColorIcon | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`                     | -         |
| color           | type of colors,options: `red`, `green`,`yellow`,`grey`,`blue`                                                          | `string`                     | -         |
| colorIcon       | type of colors,options: `white`, `black`,`yellow`,`grey`,`blue`                                                        | `string`                     | -         |
| customColorText | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`                     | -         |
| withClose       | prop to show close button                                                                                              | `React.ReactNode`            | -         |
| customIcon      | prop to set custom icon                                                                                                | `React.ReactNode`            | -         |
| expander        | prop to set expanded icon                                                                                              | `React.ReactNode`            | -         |
| expanderContent | prop to set custom icon                                                                                                | `React.ReactNode`            | -         |
| onCloseClick    | Callback when Toast is closed                                                                                          | `(e: MouseEvent) => void`    | -         |
| show            | prop to show Toast                                                                                                     | `boolean`                    | -         |

### Alert.BroadcastBar

| Property     | Description                                                     | Type              | Default   |
| ------------ | --------------------------------------------------------------- | ----------------- | --------- |
| type         | Type of Alert styles, options: `success`, `warning`, `negative` | `string`          | `warning` |
| color        | type of colors,options: `red`, `green`,`yellow`                 | `string`          | -         |
| onCloseClick | prop to close broadcastBar                                      | `void`            | -         |
| withEmphasis | prop to show bolder text                                        | `React.ReactNode` | -         |
| withLink     | prop to show highlited text                                     | `React.ReactNode` | -         |
| withClose    | prop to set closeIcon                                           | `React.ReactNode` | -         |
| button       | prop to set button                                              | `boolean`         | -         |
| textButton   | string of button                                                | `string`          | -         |
| text         | string of withEmphasis or withLink                              | `string`          | -         |
