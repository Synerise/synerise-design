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

| Property  | Description                              | Type            | Default |
| --------- | ---------------------------------------- | --------------- | ------- |
| header    | Set top header content page              | React.ReactNode |         |
| left      | Set left content page                    | React.ReactNode |         |
| right     | Set right content page                   | React.ReactNode |         |
| children  | The layout elements passed to the parent | React.ReactNode |         |
| className | Layout's className                       | string          |         |
| styles    | Custom layout styles                     | LayoutStyles    |         |

### LayoutStyles

| Property   | Description                     | Type                | Default |
| ---------- | ------------------------------- | ------------------- | ------- |
| left       | Styles of left component        | React.CSSProperties | -       |
| leftInner  | Styles of left inner component  | React.CSSProperties | -       |
| main       | Styles of main component        | React.CSSProperties | -       |
| mainInner  | Styles of main inner component  | React.CSSProperties | -       |
| right      | Styles of right component       | React.CSSProperties | -       |
| rightInner | Styles of right inner component | React.CSSProperties | -       |
