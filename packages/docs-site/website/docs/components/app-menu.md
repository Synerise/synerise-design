---
id: app-menu
title: AppMenu
---

AppMenu UI Component

## Installation

```
npm i @synerise/ds-app-menu
or
yarn add @synerise/ds-app-menu
```

## Usage

```
import AppMenu from '@synerise/ds-app-menu'
import Icon from '@synerise/ds-icon';
import { DashboardColorM, DashboardGreyM, SettingsColorM, SettingsColorM, AnalyticsColorM } from '@synerise/ds-icon/dist/icons';

<AppMenu
  activeItem="settings"
  top={20}
  footer={
    <AppMenu.Item id="dashboards" name="Dashboards">
      <AppMenu.Item.Icon active={<DashboardColorM />} inActive={<DashboardGreyM />} />
    </AppMenu.Item>
  }
>
  <AppMenu.Item
    name="Settings"
    id="settings"
    subMenu={(
      <AppMenu.SubMenu>
        <AppMenu.SubMenu.Title>Settings</AppMenu.SubMenu.Title>
        <AppMenu.SubMenu.SubTitle>My Account</AppMenu.SubMenu.SubTitle>
        <AppMenu.SubMenu.Item active>Account Details</AppMenu.SubMenu.Item>
        <AppMenu.SubMenu.Item>Business profile</AppMenu.SubMenu.Item>
      </AppMenu.SubMenu>
    })
  >
    <AppMenu.Item.Icon active={<SettingsColorM />} inActive={<SettingsGreyM />} />
  </AppMenu.Item>
  <AppMenu.Item id="analyics" name="Analytics">
    <AppMenu.Item.Icon active={<AnalyticsColorM />} inActive={<AnalyticsGreyM />} />
  </AppMenu.Item>
</AppMenu>
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-app-menu--default"></iframe>

## API

### AppMenu

| Property   | Description                       | Type                 | Default |
| ---------- | --------------------------------- | -------------------- | ------- |
| activeItem | ID of active menu item            | string               | -       |
| footer     | Footer of menu                    | React.ReactNode      | -       |
| children   | Menu items                        | React.ReactNodeArray | -       |
| top        | Distance from top of window in px | number               | -       |

### AppMenu.Item

| Property | Description                 | Type            | Default |
| -------- | --------------------------- | --------------- | ------- |
| subMenu  | Submenu component           | React.ReactNode | -       |
| name     | Name visible in toolti      | string          | -       |
| id       | ID of submenu               | string          | -       |
| children | Menu item children ie. icon | React.ReactNode | -       |

### AppMenu.Item.Icon

| Property | Description             | Type            | Default |
| -------- | ----------------------- | --------------- | ------- |
| active   | Active icon component   | React.ReactNode | -       |
| inActive | Inactive icon component | React.ReactNode | -       |

### AppMenu.SubMenu

| Property | Description      | Type                 | Default |
| -------- | ---------------- | -------------------- | ------- |
| children | Submenu elements | React.ReactNodeArray | -       |

### AppMenu.SubMenu.Title

| Property | Description      | Type            | Default |
| -------- | ---------------- | --------------- | ------- |
| children | Title of submenu | React.ReactNode | -       |

### AppMenu.SubMenu.SubTitle

| Property | Description              | Type            | Default |
| -------- | ------------------------ | --------------- | ------- |
| children | Text of subtitle section | React.ReactNode | -       |

### AppMenu.SubMenu.Item

| Property | Description            | Type            | Default |
| -------- | ---------------------- | --------------- | ------- |
| active   | Whether item is active | boolean         | -       |
| children | Item children ie. link | React.ReactNode | -       |
