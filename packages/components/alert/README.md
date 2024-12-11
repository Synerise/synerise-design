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

### Notifications

**DEPRECATED** Notification component will no longer be supported

Notifications API offer three things:

  * `<Notification/>` component for styled content,
  * `notificationApi.useNotification()` for building a tunnel for the the right ContextApi (notifications use both `React.createPortal` plus they are mounted in container mounted in `document.body` for making it possible to position them correctly),
    * *Pro-users*: change `getContainer` for sending notifications in other scrollable sections (`@synerise/ds-modal`, `@synerise/ds-section`).
  * and `notificationOpen` for scheduling showing notificaitons.

#### The simplest notification call

```jsx
import notificationApi from '@synerise/ds-alert'

notification.open({message: 'Message content'});
```

#### Styled notification
```jsx
import { Notification, notificationApi} from '@synerise/ds-alert'

notificationApi.open({
  duration: 4.5,
  message: <Notification>Message content</Notification>
});
```

#### Differently positioned notification

`antd-notification` is mounted in `docuemnt.body` by default. In order to style using scoped css -
`getContainer` has to be a `styled-components`-scoped element, this is done in `mountInstance`, see source code for more.

```jsx
import { Notification, notificationApi, notificationOpen } from '@synerise/ds-alert';

const [api, contextHolder] = notificationApi.useNotification();
notificationOpen({
  message: <Notification>You have new message.</Notification>,
  placement: 'topLeft'
}, api, contextHolder);
```

### Usage recommendations

It is recommended to call `notificationOpen` from `React.useEffect`.
Of course you can mount styled `<Notification/>` component by yourself,
but then you need to manage its rendering lifecycle.

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

| Property | Description                                                 | Type                         | Default   | 
| ---      | ---                                                         | ---                          | ---       | 
| type     | Type of AlertSemanticColor, options: `notice`, `negative`, `positive`,`informative`,`neutral`,`supply`,`service`,`entity`                | `string`                    | `positive` |
| color    | type of colors,options: `red`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`blue`                                                  | `string`                    | -          |
| mode     | type of modes, options: `background`, `background-outline`,`outline`,`shadow`                                                            | `string`                    | -          |

### Alert.IconAlert

| Property        | Description                                                                                                            | Type                        | Default    | 
| ----            | ---                                                                                                                    | ---                         | ---        | 
| type            | Type of Alert styles, options: `success`, `info`, `warning`, `error`                                                   | `string`                    | `warning`  | 
| message         | Message of Icon Alert                                                                                                  | `React.ReactNode`           | -          | 
| disabled        | prop to set disabled icon                                                                                              | `boolean`                   | -          |
| withEmphasis    | prop to show bolder text                                                                                               | `React.ReactNode`           | -          |
| withLink        | prop to show highlited text                                                                                            | `React.ReactNode`           | -          |
| iconAlert       | prop to set custom icon                                                                                                | `boolean`                   | -          |
| hoverButton     | prop to set hover state button                                                                                         | `boolean`                   | -          |
| customIcon      | prop to set custom icon                                                                                                | `React.ReactNode`           | -          |


### Alert.Toast

| Property        | Description                                                                                                            | Type                        | Default    | 
| ----            | ---                                                                                                                    | ---                         | ---        | 
| type            | Type of Alert styles, options: `success`, `info`, `warning`, `error`                                                   | `string`                    | `warning`  | 
| message         | Message of Icon Alert                                                                                                  | `React.ReactNode`           | -          | 
| button          | prop to set button                                                                                                     | `React.ReactNode`           | -          |
| expanded        | prop to set show expanded content                                                                                      | `boolean`                   | -          |
| onExpand        | prop on click to show content                                                                                          | `isExpanded:boolean => void`| -          |
| customColor     | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`                    | -          |
| customColorIcon | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`                    | -          |
| color           | type of colors,options: `red`, `green`,`yellow`,`grey`,`blue`                                                          | `string`                    | -          |
| colorIcon       | type of colors,options: `white`, `black`,`yellow`,`grey`,`blue`                                                        | `string`                    | -          |
| customColorText | type of colors,options:`red`, `blue`, `green`,`yellow`,`grey`,`purple`,`violet`, `cyan`,`fern`,`orange`, `mars`,`pink` | `string`                    | -          |
| withClose       | prop to show close button                                                                                              | `React.ReactNode`           | -          |
| customIcon      | prop to set custom icon                                                                                                | `React.ReactNode`           | -          |
| expander        | prop to set expanded icon                                                                                              | `React.ReactNode`           | -          |
| expanderContent | prop to set custom icon                                                                                                | `React.ReactNode`           | -          |
| onCloseClick    | Callback when Toast is closed                                                                                          | `(e: MouseEvent) => void`   | -          |
| show            | prop to show Toast                                                                                                     | `boolean`                   | -          |

### Alert.BroadcastBar

| Property        | Description                                                                                                            | Type                        | Default    | 
| ----            | ---                                                                                                                    | ---                         | ---        | 
| type            | Type of Alert styles, options: `success`, `warning`, `negative`                                                        | `string`                    | `warning`  | 
| color           | type of colors,options: `red`, `green`,`yellow`                                                                        | `string`                    | -          |
| onCloseClick    | prop to close broadcastBar                                                                                             | `void`                      | -          |
| withEmphasis    | prop to show bolder text                                                                                               | `React.ReactNode`           | -          |
| withLink        | prop to show highlited text                                                                                            | `React.ReactNode`           | -          |
| withClose       | prop to set closeIcon                                                                                                  | `React.ReactNode`           | -          |
| button          | prop to set button                                                                                                     | `boolean`                   | -          |
| textButton      | string of button                                                                                                       | `string`                    | -          |
| text            | string of withEmphasis or withLink                                                                                     | `string`                    | -          |


### Alert.Notification
| Property            | Description                                                                                       | Type                                                          | Default         |
|---------------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------|-----------------|
| children            | Content of the notification                                                                       | string\/React.ReactNode\/JSX.Element                          | JSX.Element     |
| type                | type of the notification, `"info"/"success"`, see `antd-notification`, `info` by default          | keyof NotificationInstance                                    | "info"          |
| placement           | where to position the notification                                                                | 'bottomLeft' 'bottomRight' 'topLeft' 'topRight' 'bottom'      | "bottom"        |
| onClose?            | Handler for clicking on the close button (close button is rendered only if this prop is provided) | () => void                                                    | -               |
| buttonText?         | Text on the action button                                                                         | string                                                        | -               |
| onButtonClick?      | Handler for `onClick` on the action button                                                        | () => void                                                    | -               |
| icon?               | Icon on the action button                                                                         | DSIcon                                                        | -               |
| closeIconClassName? | Class of the close icon name                                                                      | string                                                        | "ds-close-icon" |
