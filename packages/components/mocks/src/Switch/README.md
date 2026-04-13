# Switch Mock

## Vitest

```typescript
vi.mock('@synerise/ds-switch', async () => {
  const { switchMockFactory } = await import('@synerise/ds-mocks');
  return { ...switchMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockSwitch();
```

## Available test IDs

- `ds-switch` (default)
- `ds-switch-toggle` — the toggle button
- `ds-switch-label` — label text (when provided)
- `ds-raw-switch` — RawSwitch export
- Custom via `data-testid` prop
