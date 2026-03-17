# Drawer (`@synerise/ds-drawer`)

> Thin wrapper around Ant Design's Drawer that enforces no built-in close button and exposes styled sub-components for composing header/body layouts.

## Package structure

```
src/
  Drawer.tsx          — main class component; attaches sub-components as static properties
  Drawer.types.ts     — DrawerProps interface
  Drawer.styles.tsx   — styled-components for AntdDrawer and all sub-components
  index.ts            — default export only
  style/index.less    — Ant Design Drawer LESS overrides (side-effect import)
  __specs__/
    Drawer.spec.tsx   — render/visibility tests
```

## Public exports

### `Drawer` (default)

Class component (`React.PureComponent`). Wraps `antd/lib/drawer` and **always sets `closable={false}`** — the Ant Design close button is permanently disabled. Callers must implement their own close action.

Props extend `antd` `DrawerProps` (minus `closable`):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Destructured but **not rendered** — ignored at runtime. Place titles inside `DrawerHeaderBar` instead. |
| `closable` | `string` | `undefined` | Accepted by the type but overridden to `false` internally. Has no effect. |
| `open` | `boolean` | `false` | Whether the drawer is visible (preferred Ant Design 4.x prop). |
| `visible` | `boolean` | `false` | Legacy Ant Design visibility prop (still works in antd 4.x, deprecated in antd 5). |
| `width` | `string \| number` | `256` | Drawer width. |
| `placement` | `'top' \| 'left' \| 'right' \| 'bottom'` | `'right'` | Side the drawer slides from. |
| `onClose` | `(e: Event) => void` | — | Called when mask or keyboard Escape is pressed. |
| `maskClosable` | `boolean` | `true` | Whether clicking the mask closes the drawer. |
| `destroyOnClose` | `boolean` | `false` | Unmount children when closed. |
| `...rest` | `AntdDrawerProps` | — | All other Ant Design Drawer props pass through. |

Sub-components attached as static properties:

| Static | Element | Description |
|--------|---------|-------------|
| `Drawer.DrawerHeader` | `div` | Header wrapper with `24px` padding (top/sides) and a bottom border. |
| `Drawer.DrawerHeaderWithoutPadding` | `div` | Header wrapper variant — no padding, no border. Used to wrap `DrawerHeader` when adding full-width elements below it (tabs, search bar). |
| `Drawer.DrawerHeaderBar` | `div` | Flex row (`space-between`, centered) with `24px` bottom padding. Place back icon, title, and action buttons here. |
| `Drawer.DrawerHeaderBack` | `div` | Container for a back/navigation icon; adds `24px` right margin. |
| `Drawer.DrawerBody` | `div` | Scrollable body (`overflow-y: auto`). Wraps `DrawerContent`. |
| `Drawer.DrawerContent` | `div` | Content area with `24px` padding on all sides. |

## Usage patterns

```tsx
import Drawer from '@synerise/ds-drawer';

// Basic usage
<Drawer open={isOpen} placement="right" width={676} onClose={() => setOpen(false)}>
  <Drawer.DrawerHeader>
    <Drawer.DrawerHeaderBar>
      <Drawer.DrawerHeaderBack>{backButton}</Drawer.DrawerHeaderBack>
      <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>Title</Typography.Title>
      {closeButton}
    </Drawer.DrawerHeaderBar>
  </Drawer.DrawerHeader>
  <Drawer.DrawerBody>
    <Drawer.DrawerContent>
      <p>Content</p>
    </Drawer.DrawerContent>
  </Drawer.DrawerBody>
</Drawer>

// With tabs or search bar below the header (no bottom border on header)
<Drawer open={isOpen} placement="right" width={676} onClose={() => setOpen(false)}>
  <Drawer.DrawerHeaderWithoutPadding>
    <Drawer.DrawerHeader>
      <Drawer.DrawerHeaderBar>...</Drawer.DrawerHeaderBar>
    </Drawer.DrawerHeader>
    <Tabs ... />          {/* or <SearchBar ... /> */}
  </Drawer.DrawerHeaderWithoutPadding>
  <Drawer.DrawerBody>
    <Drawer.DrawerContent>...</Drawer.DrawerContent>
  </Drawer.DrawerBody>
</Drawer>
```

## Styling

Styles live in `Drawer.styles.tsx`. `AntdDrawer` overrides Ant Design's internal class names:
- `.ant-drawer-mask` — background uses `theme.palette['grey-500']` at 10% opacity
- `.ant-drawer-body` — zero padding, white background, flex column, `overflow: hidden`

`DrawerHeader` uses `theme.palette['grey-100']` for its border. `DrawerBody` uses a hardcoded `background-color: white` instead of a theme token.

## Key dependencies

- `antd/lib/drawer` — base Drawer implementation; all functionality (animation, portal, mask, keyboard) comes from here
- `styled-components` — styling overrides and sub-component primitives
- `@synerise/ds-core` — theme palette tokens (via styled-components `theme`)

## Implementation notes

- **Class component** — `Drawer` uses `React.PureComponent`, not a functional component. Avoid converting without checking all consumers.
- **`title` prop is a no-op** — it is destructured to prevent it from being passed to Ant Design (which would render it in its own header slot), but the value is never used. Callers must always compose their own title inside `DrawerHeaderBar`.
- **`closable` type mismatch** — `DrawerProps` declares `closable` as `string` but Ant Design expects `boolean`. The prop is overridden to `false` internally regardless.
- **`visible` vs `open`** — both work with antd 4.x. The spec tests use `open`; stories still use `visible`. Prefer `open`.
- **No `DrawerHeaderWithoutPadding` export from `index.ts`** — this component is only accessible as `Drawer.DrawerHeaderWithoutPadding` (static property), not as a named export.
