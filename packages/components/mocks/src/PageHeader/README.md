# PageHeader Mock

## Vitest

```typescript
vi.mock('@synerise/ds-page-header', async () => {
  const { pageHeaderMockFactory } = await import('@synerise/ds-mocks');
  return { ...pageHeaderMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockPageHeader();
```

## Available test IDs

- `ds-page-header` (default)
- `ds-page-header-title` — title slot
- `ds-page-header-description` — description slot
- `ds-page-header-close` — close button
- `ds-page-header-right-side` — right side slot
- Custom via `data-testid` prop
