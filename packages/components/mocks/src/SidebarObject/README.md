# SidebarObject Mock

## Vitest

```typescript
vi.mock('@synerise/ds-sidebar-object', async () => {
  const { sidebarObjectMockFactory } = await import('@synerise/ds-mocks');
  return { ...sidebarObjectMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockSidebarObject();
```

## Available test IDs

- `ds-sidebar-object` (default)
- Custom via `data-testid` prop
