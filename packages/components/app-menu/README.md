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
import { DashboardColorM, SettingsColorM, AnalyticsColorM } from '@synerise/ds-icon/dist/icons';

<AppMenu
  activeItem="settings"
  top={20}
  footer={
    <AppMenu.Item id="dashboards" name="Dashboards">
      <Icon component={<DashboardColorM />} />
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
    <Icon component={<SettingsColorM />} />
  </AppMenu.Item>
  <AppMenu.Item id="analyics" name="Analytics">
    <Icon component={<AnalyticsColorM />} />
  </AppMenu.Item>
</AppMenu>
```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-app-menu--default"></iframe>

## API

| Property   | Description                       | Type                 | Default |
| ---------- | --------------------------------- | -------------------- | ------- |
| activeItem | ID of active menu item            | string               | -       |
| footer     | Footer of menu                    | React.ReactNode      | -       |
| children   | Menu items                        | React.ReactNodeArray | -       |
| top        | Distance from top of window in px | number               | -       |
