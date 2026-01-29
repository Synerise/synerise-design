---
id: toast
title: Toast
---

Toast UI Component

## Installation

```
npm i @synerise/ds-toast
or
yarn add @synerise/ds-toast
```

## Usage

```
import Toast from '@synerise/ds-toast';
import Button from '@synerise/ds-button';

<Button onClick={() => Toast.success({message: 'Message title'})} />

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-toast--default"></iframe>

## API

| Property        | Description                                           | Type                                               | Default |
| --------------- | ----------------------------------------------------- | -------------------------------------------------- | ------- |
| type            | message type                                          | 'success' / 'negative' / 'warning' / 'informative' | -       |
| message         | message main content                                  | ReactNode                                          | -       |
| description     | message description                                   | ReactNode                                          | -       |
| customIcon      | overwrite default icon (default icon depends on type) | ReactNode                                          | -       |
| expander        | render with expander icon                             | boolean                                            | -       |
| onExpand        | triggered on click of expander icon                   | (expanded: boolean) => void                        | -       |
| expandedContent | content rendered if exapanded prop is true            | ReactNode                                          | -       |
| expanded        | toggles rendering expanded content                    | boolean                                            | -       |
| withClose       | renders X icon to manually dismiss toast              | boolean                                            | -       |
| onCloseClick    | triggered on click of close icon                      | () => void                                         | -       |
| onDismiss       | triggered when toast is dismissed                     | () => void                                         | -       |
| button          | button element to render below message content        | ReactNode                                          | -       |

## Static methods

To display a Toast using Toaster (it is rendered inside DSProvider by default) use any of the shortcut methods provided:

- Toast.success(props) - shows a Toast type 'success'
- Toast.error(props) - shows a Toast type 'negative'
- Toast.info(props) - shows a Toast type 'informative'
- Toast.warning(props) - shows a Toast type 'warning'

```

import Toast from '@synerise/ds-toast';
import Button from '@synerise/ds-button';

<Button onClick={() => Toast.success({message: 'Message title'})} />

```

### Additional methods

#### removeToast(toastId?)

Removes a specific or all displayed toasts instantly

#### dismissToast(toastId?)

Removes a specific or all displayed toasts with an exit animation.

#### showToast(type, toastProps, toastOptions?)

enders a Toast of specified `type`, using toastProps and then displays it using the Toaster with toastOptoins. returns a toastID that can be later used to remove / dismiss that toast manually.
