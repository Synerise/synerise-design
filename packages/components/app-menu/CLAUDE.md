# AppMenu (`@synerise/ds-app-menu`)

> A fixed left-side icon navigation bar (60px collapsed, 322px expanded) with sliding sub-menu panels, overflow pagination, and a footer slot.

## Package structure

```
src/
  AppMenu.tsx                     — root component; owns menu open/active state
  AppMenu.types.ts                — AppMenuProps
  AppMenu.styles.ts               — MenuWrapper, ItemsWrapper, ItemsDivider
  MenuContext/MenuContext.ts       — React Context for open/active state shared down the tree
  NavigableItems/                 — handles overflow pagination when items exceed viewport height
  Item/
    Item.tsx                      — nav item; attaches Icon sub-component
    Item.styles.ts
    Icon/
      Icon.tsx                    — dual-state icon (active / inactive)
      Icon.styles.ts
  SubMenu/
    SubMenu.tsx                   — sliding panel; attaches Title, SubTitle, Item
    SubMenu.types.ts
    SubMenu.styles.ts
    SubMenuContext/               — React Context scoped to a single sub-menu
    Item/
      Item.tsx                    — sub-menu row; closes menu on click; attaches Action
      Item.types.ts
      Item.styles.ts
  hooks/
    useMenu.ts                    — consumes MenuContext (throws outside provider)
    useSubMenu.ts                 — consumes SubMenuContext (throws outside provider)
  index.ts                        — public exports
```

## Public exports

### `AppMenu` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeItem` | `string` | **required** | `id` of the initially-active menu item |
| `children` | `ReactNodeArray` | **required** | `AppMenu.Item` elements rendered in the icon rail |
| `footer` | `ReactNode` | `undefined` | Content below a divider at the bottom of the rail (e.g. a settings item) |
| `top` | `number` | `0` | Vertical offset in px from the top of the viewport (e.g. height of a top navbar) |
| `className` | `string` | `undefined` | Extra CSS class on the outermost wrapper |

No `forwardRef`. No imperative handle.

The root component is `position: fixed; left: 0`. It owns the open/active state and wraps everything in `MenuContext.Provider`.

### `AppMenu.Item`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **required** | Unique identifier; matched against `activeItem` |
| `name` | `string` | **required** | Text shown in the tooltip (suppressed when sub-menu is open) |
| `children` | `ReactNode` | `undefined` | Typically `<AppMenu.Item.Icon>` |
| `subMenu` | `ReactElement` | `undefined` | The `<AppMenu.SubMenu>` to slide in when this item is active |
| `className` | `string` | `undefined` | Extra CSS class on the `<li>` wrapper |

Clicking an already-active item with a subMenu **toggles** the panel; clicking a different item switches active and opens the panel if that item has a subMenu.

### `AppMenu.Item.Icon`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `ReactNode` | **required** | Icon shown on hover and when item is active |
| `inActive` | `ReactNode` | **required** | Icon shown when item is not active |

Both icons are always in the DOM; toggling is done via CSS opacity transitions (`item__icon--active` / `item__icon--in-active` classes).

### `AppMenu.SubMenu`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | `SubMenu.Title`, `SubMenu.SubTitle`, `SubMenu.Item` elements |
| `className` | `string` | `undefined` | Extra CSS class |
| `style` | `CSSProperties` | `undefined` | Inline style |

Slides in from `left: 61px` as an absolutely-positioned panel (262px wide). Visibility/opacity controlled by `menu__sub-menu--active` class driven by `SubMenuContext`.

### `AppMenu.SubMenu.Title`

Styled `h3` (`macro.h600`). Accepts `children` only (it is a styled-component, not a React component with typed props).

### `AppMenu.SubMenu.SubTitle`

Styled `h4` (`macro.h100`). Uppercase, grey-500, dashed top border. Accepts `children` only.

### `AppMenu.SubMenu.Item`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `undefined` | Applies active highlight style |
| `children` | `ReactNode` | `undefined` | Row content (text, links, etc.) |

Clicking calls `setOpened(false)` — **closes the entire menu**. Must be inside `SubMenuContext` (i.e. inside `AppMenu.SubMenu`).

`SubMenu.Item.Action` is a `styled.span` attached to the item (`float: right`, fades in on hover) for rendering action buttons inside a row.

### `useMenu` (named export)

Reads `MenuContext`. **Throws** `"Cannot use useMenu hook outside MenuContext"` if called outside an `AppMenu` tree. Returns `{ isOpened, setOpened, activeItem, setActiveItem }`.

### `useSubMenu` (named export)

Reads `SubMenuContext`. **Throws** `"Cannot use useMenu hook outside MenuContext"` if called outside a `SubMenu` tree. Returns `{ id, isActive, setOpened }`.

## Usage patterns

```tsx
import AppMenu from '@synerise/ds-app-menu';
import { DashboardColorM, DashboardGreyM, SettingsColorM, SettingsGreyM } from '@synerise/ds-icon';

<AppMenu
  activeItem="settings"
  top={56}  // height of top navbar
  footer={
    <AppMenu.Item id="dashboards" name="Dashboards">
      <AppMenu.Item.Icon active={<DashboardColorM />} inActive={<DashboardGreyM />} />
    </AppMenu.Item>
  }
>
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
    <AppMenu.Item.Icon active={<SettingsColorM />} inActive={<SettingsGreyM />} />
  </AppMenu.Item>
</AppMenu>
```

## Context / Provider

Two contexts are used internally — no external Provider is needed:

- **`MenuContext`** — created in `AppMenu.tsx`. Holds `{ isOpened, setOpened, activeItem, setActiveItem }`. Consumed by `Item`, `NavigableItems`, and the exported `useMenu` hook.
- **`SubMenuContext`** — created in `Item/Item.tsx` and wrapped around each `subMenu` element. Holds `{ id, isActive, setOpened }`. Consumed by `SubMenu` and `SubMenu.Item`, and the exported `useSubMenu` hook.

`useMenu` and `useSubMenu` throw if used outside their respective providers — useful when building custom sub-components.

## Styling

All styles in `*.styles.ts` files. Uses `theme.palette` tokens throughout (no hardcoded colours). Notable specifics:

- `MenuWrapper`: `position: fixed; left: 0; width: 60px` → `width: 322px` on `.menu--opened`, with a `cubic-bezier` transition and `0.25s` delay.
- `SubMenu` panel: `position: absolute; left: 61px; width: 262px`. Child elements stagger in using a generated array of 100 `transition-delay` CSS rules.
- `Icon`: both active/inactive icons are always rendered; CSS `opacity` transitions between them on `.menu__item--active` or hover.

## NavigableItems

`NavigableItems` (internal, not exported) measures its container with `getBoundingClientRect` and shows up/down navigation arrows when the total item height exceeds the available space. Item height is hardcoded at `64px`. Navigation triggers a 100ms CSS slide animation and calls `onHideMenu` to close the sub-menu panel.

## Key dependencies

- `@synerise/ds-utils` (`useOnClickOutside`) — closes menu and resets `activeItem` to the original `activeId` prop on outside click
- `@synerise/ds-tooltip` — wraps each `Item`; tooltip title is suppressed (set to `''`) when the item is active and the menu is open
- `@synerise/ds-icon` — renders both active/inactive icon variants inside `AppMenu.Item.Icon`; also `AngleUpS`/`AngleDownS` for NavigableItems pagination
- `@synerise/ds-typography` (`macro`) — used in SubMenu heading styles

## Implementation notes

- Clicking `SubMenu.Item` closes the **entire** menu (calls `setOpened(false)` from `SubMenuContext`). If you want an item that doesn't close the menu, don't use `SubMenu.Item` — render a plain `div` instead.
- Clicking outside resets `activeItem` back to the initial `activeId` prop value (not the currently selected item). This means if the user navigates to a different item and then clicks outside, the selection reverts.
- `top` is used in the inline CSS `height: calc(100% - ${top}px)` and `top: ${top}px`. This is the only way to offset the fixed menu below a top navbar.
- `footer` content is rendered below an `ItemsDivider` but **outside** the `NavigableItems` scroll container, so footer items are always visible regardless of overflow.
- `SubMenu` is rendered inside an `Item` via the `subMenu` prop — it is positioned absolutely relative to the `MenuWrapper`, not relative to the `Item`.
- The component adds `ds-app-menu` as a fixed CSS class on the wrapper alongside `menu` and `menu--opened`.
