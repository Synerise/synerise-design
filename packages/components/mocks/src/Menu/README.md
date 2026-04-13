# Menu Mocks

Mock for `@synerise/ds-menu` package including Menu and its sub-components (Item, Breadcrumb, Header, Divider, SubMenu, ItemGroup).

## Vitest

```typescript
vi.mock('@synerise/ds-menu', async () => {
  const { menuMockFactory } = await import('@synerise/ds-mocks');
  return { ...menuMockFactory() };
});

// Query elements
screen.getByTestId('ds-menu');
screen.getByTestId('ds-menu-item');
screen.getByTestId('ds-menu-item-text');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Menu';

jestMocks.mockMenu();

// Query elements
screen.getByTestId('ds-menu');
screen.getByTestId('ds-menu-item');
```

## Mocked Components

### Menu (default export)
- `Menu` - renders menu container, supports `dataSource` array or `children`
- `Menu.Item` - renders menu item with text, description, prefix/suffix elements
- `Menu.Breadcrumb` - renders breadcrumb container
- `Menu.Header` - renders header container
- `Menu.Divider` - renders `<hr>` divider
- `Menu.SubMenu` - renders submenu container
- `Menu.ItemGroup` - renders item group container

### Named Exports
- `MenuStyles` - empty object
- `VisibilityTrigger` - empty object
- `ItemType` - empty object
- `ItemSize` - empty object

## Available Test IDs

### Menu
- `ds-menu` - Main container
- `ds-menu-item-{index}` - Items rendered from `dataSource` (indexed)

### Menu.Item
- `ds-menu-item` - Item container
- `ds-menu-item-text` - Text/children content
- `ds-menu-item-description` - Description element
- `ds-menu-item-prefix` - Prefix element
- `ds-menu-item-suffix` - Suffix element

### Menu.Breadcrumb
- `ds-menu-breadcrumb` - Breadcrumb container

### Menu.Header
- `ds-menu-header` - Header container

### Menu.Divider
- `ds-menu-divider` - Divider element

### Menu.SubMenu
- `ds-menu-submenu` - SubMenu container

### Menu.ItemGroup
- `ds-menu-item-group` - ItemGroup container
