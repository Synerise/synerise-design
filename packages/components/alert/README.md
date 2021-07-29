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
```
import Alert from '@synerise/ds-alert'

<Alert 
    mode="background-outline"
    showIcon
    type="success"
    message="Success!"
    description="Success description"
    showMoreLabel="Show more"
    onShowMore={() => {}}
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-alert--default"></iframe>

## API

| Property    | Description                                                                    | Type                    | Default   | 
| ---         | ---                                                                            | ---                     | ---       | 
| afterClose  | Called when close animation is finished                                        | () => void              | -         | 
| closable    | Whether Alert can be closed                                                    | boolean                 | -         | 
| closeText   | Close text to show                                                             | string\                 | ReactNode | - |
| description | Additional content of Alert                                                    | string\                 | ReactNode | - |
| icon        | Custom icon, effective when `showIcon` is `true`                               | ReactNode               | -         | 
| message     | Content of Alert                                                               | string\                 | ReactNode | - |
| showIcon    | Whether to show icon                                                           | boolean                 |`false`    | 
| type        | Type of Alert styles, options: `success`, `info`, `warning`, `error` | string                  | `info`    | 
| onClose     | Callback when Alert is closed                                                  | (e: MouseEvent) => void | -         |
| mode     | Whether to render alert with outline, background, or transparent, options: `background`, `background-outline`, `outline`, `clear`                                                  | string | `background`         |
| color     | Set the color that overrides the standard color of alert, options: `blue`, `grey`, `green`, `yellow`, `red`, `pink`, `mars`, `orange`, `fern`, `cyan`, `purple`, `violet` | string |``         | 

### Alert.InlineAlert

| Property | Description                                                 | Type                         | Default   | 
| ---      | ---                                                         | ---                          | ---       | 
| type     | Type of InlineAlert, options: `success`, `alert`, `warning` | `string`                     | `warning` | 
| message  | Message of alert                                            | `string` \ `React.ReactNode` | -         | 

### Alert.SectionMessage

| Property        | Description                                                                                                            | Type                        | Default    | 
| ----            | ---                                                                                                                    | ---                         | ---        | 
| type            | Type of SectionMessage, options: `notice`, `negative`, `positive`,`neutral`,`supply`,`service`,`entity`                | `string`                    | `negative` | 
| message         | Message of section messsage                                                                                            | `React.ReactNode`           | -          | 
| customColor     | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`                    | -          |
| customColorIcon | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`                    | -          |
| color           | type of colors,options: `red`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`                                       | `string`                    | -          |
| mode            | type of modes, options: `background`, `background-outline`,`outline`,`clear`                                           | `string`                    | -          |
| showMoreLabel   | prop to show label                                                                                                     | `React.ReactNode`           | -          |
| onShowMore      | prop to show label                                                                                                     | `void`                      | -          |
| newClient       | prop to show button                                                                                                    | `React.ReactNode`/`boolean` | -          |
| moreButtons     | prop to show buttons                                                                                                   | `React.ReactNode`/`boolean` | -          |
| withEmphasis    | prop to show highlited text                                                                                            | `React.ReactNode`           | -          |
| withLink        | prop to show highlited text                                                                                            | `React.ReactNode`           | -          |
| unorderedList   | prop to show unordered list                                                                                            | `React.ReactNode`           | -          |
| withClose       | prop to show close button                                                                                              | `React.ReactNode`           | -          |
| customIcon      | prop to set custom icon                                                                                                | `React.ReactNode`           | -          |
| textButton      | text for button                                                                                                        | `string         `           | -          |

### Alert.AlertSemanticColor

| Property | Description                                                 | Type                         | Default   | 
| ---      | ---                                                         | ---                          | ---       | 
| type     | Type of AlertSemanticColor, options: `notice`, `negative`, `positive`,`informative`,`neutral`,`supply`,`service`,`entity`                | `string`                    | `positive` |
| color    | type of colors,options: `red`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`blue`                                                  | `string`                    | -          |
| mode     | type of modes, options: `background`, `background-outline`,`outline`,`shadow`                                                            | `string`                    | -          |