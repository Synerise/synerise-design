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
| showIcon    | Whether to show icon                                                           | boolean                 | false     | 
| type        | Type of Alert styles, options: `success`, `info`, `warning`, `error` | string                  | `info`    | 
| onClose     | Callback when Alert is closed                                                  | (e: MouseEvent) => void | -         |
| mode     | Whether to render alert with outline, background, or transparent, options: `background`, `background-outline`, `outline`, `clear`                                                  | string | `background`         |
| color     | Set the color that overrides the standard color of alert, options: `blue`, `grey`, `green`, `yellow`, `red`, `pink`, `mars`, `orange`, `fern`, `cyan`, `purple`, `violet` | string |``         | 
