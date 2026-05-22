import figma from '@figma/code-connect';

import AppMenu from './AppMenu';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=319-5906&m=dev';

// AppMenu's open/closed state is managed internally via `useState`, not a prop —
// so both Figma `State` variants produce the same code. We provide a usage
// example showing the compound API; designers can choose which variant to
// preview, but the generated snippet is identical.
//
// Icons are illustrated as `<>...</>` placeholders so the snippet remains
// copy-pasteable without forcing a specific icon import.

figma.connect(AppMenu, FIGMA_URL, {
  variant: { State: 'Collapsed' },
  example: () => (
    <AppMenu activeItem="dashboards">
      <AppMenu.Item id="dashboards" name="Dashboards">
        <AppMenu.Item.Icon active={<></>} inActive={<></>} />
      </AppMenu.Item>
      <AppMenu.Item id="settings" name="Settings">
        <AppMenu.Item.Icon active={<></>} inActive={<></>} />
      </AppMenu.Item>
    </AppMenu>
  ),
});

figma.connect(AppMenu, FIGMA_URL, {
  variant: { State: 'Expanded' },
  example: () => (
    <AppMenu activeItem="settings">
      <AppMenu.Item id="dashboards" name="Dashboards">
        <AppMenu.Item.Icon active={<></>} inActive={<></>} />
      </AppMenu.Item>
      <AppMenu.Item
        id="settings"
        name="Settings"
        subMenu={
          <AppMenu.SubMenu>
            <AppMenu.SubMenu.Title>Settings</AppMenu.SubMenu.Title>
            <AppMenu.SubMenu.SubTitle>My Account</AppMenu.SubMenu.SubTitle>
            <AppMenu.SubMenu.Item active>Account Details</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Business profile</AppMenu.SubMenu.Item>
          </AppMenu.SubMenu>
        }
      >
        <AppMenu.Item.Icon active={<></>} inActive={<></>} />
      </AppMenu.Item>
    </AppMenu>
  ),
});
