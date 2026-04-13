# Sidebar Mocks

Mock for `@synerise/ds-sidebar` package including `Sidebar`, `Sidebar.Panel`, and `SidebarWithButton`.

## Vitest

```typescript
vi.mock('@synerise/ds-sidebar', async () => {
  const { sidebarMockFactory } = await import('@synerise/ds-mocks');
  return { ...sidebarMockFactory() };
});

// Query elements
screen.getByTestId('ds-sidebar');
screen.getByTestId('ds-sidebar-panel');
screen.getByTestId('ds-sidebar-with-button');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Sidebar';

jestMocks.mockSidebar();

// Query elements
screen.getByTestId('ds-sidebar');
screen.getByTestId('ds-sidebar-panel');
```

## Mocked Components

### Sidebar (default export, compound component)
- `Sidebar` - div container with children and className support
- `Sidebar.Panel` - div for sidebar panel content
- `Sidebar.SidebarWithButton` - div for sidebar with button variant

### Named Exports
- `SidebarWithButton` - div container with children support

## Available Test IDs

- `ds-sidebar` - Main Sidebar container
- `ds-sidebar-panel` - Panel container
- `ds-sidebar-with-button` - SidebarWithButton container
