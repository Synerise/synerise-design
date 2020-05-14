---
id: layout
title: Layout
---

Layout UI Component

## Demo

<iframe src="/storybook-static/iframe.html?id=components-layout--default"></iframe>

## Installation

```
npm i @synerise/ds-layout
or
yarn add @synerise/ds-layout
```

```
import Layout from '@synerise/ds-layout'

<Layout
    header={<HeaderComponent />}
    left={<LeftSidebarComponent>}
    right={RightSidebarComponent}
    className={layoutClass}
>
    <Content />
<Layout />
```

## API

| Property  | Description                              | Type          | Default |
| --------- | ---------------------------------------- | ------------- | ------- |
| header    | Set top header content page              | ReactNode     |         |
| left      | Set left content page                    | React.Node    |         |
| right     | Set right content page                   | React.Node    |         |
| children  | The layout elements passed to the parent | React.Node    |         |
| className | Layout's className                       | string        |         |
| styles    | Custom layout syles                      | CSSProperties |         |
