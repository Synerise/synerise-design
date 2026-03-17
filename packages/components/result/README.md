---
id: result
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
/>

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-result--default"></iframe>

## API

| Property        | Description                                                              | Type                                                                 | Default |
| --------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- | ------- |
| type            | type of result                                                           | `info` / `warning` / `error` / `success` / `progress` / `no-results` | -       |
| title           | title text                                                               | string / React.ReactNode                                             | -       |
| description     | description text                                                         | string / React.ReactNode                                             | -       |
| buttons         | render buttons                                                           | React.ReactNode                                                      | -       |
| panel           | render custom panel                                                      | React.ReactNode                                                      | -       |
| customIcon      | render custom icon in place of type icon                                 | React.ReactElement                                                   | -       |
| noSearchResults | **Deprecated** — use `type="no-results"` instead                         | boolean                                                              | -       |
