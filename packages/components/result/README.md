---
id: Result
title: Result
---

Result UI Component

## Installation

```
npm i @synerise/ds-result
or
yarn add @synerise/ds-result
```

## Usage

```
import Result from '@synerise/ds-result'

<Result
  type="success"
  title="Chicken has been successfully cooked"
  description="Would you like to cook any other chickens?"
  onClose={() => console.log('close button was clicked')}
  buttons={(
    <>
      <Button type="secondary">
        Cancel
      </Button>
      <Button type="primary">
        Freeze
      </Button>
    </>
  )}
  panel={(
    <span>Some content, for example a picture of cooked chicken</span>
  )}
  closable
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-result--default"></iframe>

## API

| Property        | Description                                                              | Type                                                                 | Default |
| --------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- | ------- |
| type            | type of result                                                           | 'info' / 'warning' / 'error' / 'success' / 'progress' / 'no-results' | -       |
| closable        | whether or not to show X button to close                                 | boolean                                                              | -       |
| title           | title text                                                               | string / React.ReactNode                                             | -       |
| description     | description text                                                         | string / React.ReactNode                                             | -       |
| onClose         | event called when clicked on close button                                | () => void                                                           | -       |
| buttons         | render buttons                                                           | React.ReactNode                                                      | -       |
| panel           | render custom panel                                                      | React.ReactNode                                                      | -       |
| customIcon      | render custom icon in place of type icon                                 | React.ReactElement                                                   | -       |
| noSearchResults | use only in search results (renders with smaller space between elements) | boolean                                                              | -       |
