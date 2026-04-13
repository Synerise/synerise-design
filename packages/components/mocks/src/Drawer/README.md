# Drawer Mocks

Mock for `@synerise/ds-drawer` package including Drawer and all static sub-components.

## Vitest

```typescript
vi.mock('@synerise/ds-drawer', async () => {
  const { drawerMockFactory } = await import('@synerise/ds-mocks');
  return { ...drawerMockFactory() };
});

// Query elements
screen.getByTestId('ds-drawer');
screen.getByTestId('ds-drawer-close');
screen.getByTestId('ds-drawer-header');
screen.getByTestId('ds-drawer-header-no-padding');
screen.getByTestId('ds-drawer-header-bar');
screen.getByTestId('ds-drawer-header-back');
screen.getByTestId('ds-drawer-body');
screen.getByTestId('ds-drawer-content');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Drawer';

jestMocks.mockDrawer();

// Query elements
screen.getByTestId('ds-drawer');
screen.getByTestId('ds-drawer-close');
screen.getByTestId('ds-drawer-header');
screen.getByTestId('ds-drawer-header-no-padding');
screen.getByTestId('ds-drawer-header-bar');
screen.getByTestId('ds-drawer-header-back');
screen.getByTestId('ds-drawer-body');
screen.getByTestId('ds-drawer-content');
```

## Mocked Components

### Drawer (default export)
- `Drawer` - renders children only when `open` or `visible` is truthy
- `Drawer.DrawerHeader` - simple div wrapper
- `Drawer.DrawerHeaderWithoutPadding` - simple div wrapper
- `Drawer.DrawerHeaderBar` - simple div wrapper
- `Drawer.DrawerHeaderBack` - simple div wrapper
- `Drawer.DrawerBody` - simple div wrapper
- `Drawer.DrawerContent` - simple div wrapper

## Available Test IDs

### Drawer
- `ds-drawer` - Main container (only rendered when open/visible)
- `ds-drawer-close` - Close button

### DrawerHeader
- `ds-drawer-header` - Header container

### DrawerHeaderWithoutPadding
- `ds-drawer-header-no-padding` - Header without padding container

### DrawerHeaderBar
- `ds-drawer-header-bar` - Header bar container

### DrawerHeaderBack
- `ds-drawer-header-back` - Header back container

### DrawerBody
- `ds-drawer-body` - Body container

### DrawerContent
- `ds-drawer-content` - Content container
