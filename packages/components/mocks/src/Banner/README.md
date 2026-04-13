# Banner Mock

## Vitest

```typescript
vi.mock('@synerise/ds-banner', async () => {
  const { bannerMockFactory } = await import('@synerise/ds-mocks');
  return { ...bannerMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockBanner();
```

## Available test IDs

- `ds-banner` (default)
- `ds-banner-title` — rendered when `title` prop is provided
- `ds-banner-description` — rendered when `description` prop is provided
- Custom via `data-testid` prop
