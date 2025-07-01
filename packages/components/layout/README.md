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
    left={{content: <LeftSidebarComponent />, opened: true, onChange: () => {}}}
    right={{content: <RightSidebarComponent />, opened: false, onChange: () => {}}}
    className={layoutClass}
>
    <Content />
<Layout />
```

## API

| Property                   | Description                                                         | Type                      | Default |
| -------------------------- | ------------------------------------------------------------------- | ------------------------- | ------- |
| header                     | Set top header content page                                         | React.ReactNode           |         |
| subheader                  | Set subheader content page                                          | React.ReactNode           |         |
| left                       | Configuration of left sidebar                                       | SidebarProps              |         |
| right                      | Configuration of right sidebar                                      | SidebarProps              |         |
| children                   | The layout elements passed to the parent                            | React.ReactNode           |         |
| className                  | Layout's className                                                  | string                    |         |
| styles                     | Custom layout styles                                                | LayoutStyles              |         |
| leftOpened                 | Whether left sidebar is opened                                      | boolean                   | false   |
| rightOpened                | Whether right sidebar is opened                                     | boolean                   | false   |
| leftOpenedWidth            | Width of opened left sidebar                                        | number                    | 320     |
| rightOpenedWidth           | Width of opened right sidebar                                       | number                    | 320     |
| renderLeftSidebarControls  | Left sidebar visibility. Accepts function returning `ReactNode`.    | boolean or function       | false   |
| renderRightSidebarControls | Right sidebar visibility. Accepts function returning `ReactNode`.   | boolean or function       | false   |
| leftSidebarWithDnd         | Set withDnd in left sidebar scrollbar                               | boolean                   | false   |
| mainSidebarWithDnd         | Set withDnd in main sidebar scrollbar                               | boolean                   | false   |
| rightSidebarWithDnd        | Set withDnd in right sidebar scrollbar                              | boolean                   | false   |
| nativeScroll               | Set main column to use native browser scroll                        | boolean                   | false   |
| nativeScrollRef            | ref to pass to scrollable element                                   | Ref&lt;HTMLDivElement&gt; | -       |
| fillViewport               | sets layout to absolute with calc(100vh - viewportTopOffset) height | boolean                   | false   |
| viewportTopOffset          | top viewport offset (if fillViewport is true)                       | number                    | 55      |

### SidebarProps

| Property | Description                                        | Type                        | Default |
| -------- | -------------------------------------------------- | --------------------------- | ------- |
| opened   | Wheter sidebar is opened                           | boolean                     | false   |
| onChange | Callback fired when user clicks the sidebar button | (isOpened: boolean) => void | -       |
| content  | Content of sidebar                                 | React.ReactNode             | -       |
| width    | Width of opened sidebar                            | number                      | 320     |

### LayoutStyles

| Property   | Description                     | Type                | Default |
| ---------- | ------------------------------- | ------------------- | ------- |
| left       | Styles of left component        | React.CSSProperties | -       |
| leftInner  | Styles of left inner component  | React.CSSProperties | -       |
| main       | Styles of main component        | React.CSSProperties | -       |
| mainInner  | Styles of main inner component  | React.CSSProperties | -       |
| right      | Styles of right component       | React.CSSProperties | -       |
| rightInner | Styles of right inner component | React.CSSProperties | -       |
