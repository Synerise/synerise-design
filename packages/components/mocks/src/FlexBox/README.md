# FlexBox Mock

## Vitest

```typescript
vi.mock('@synerise/ds-flex-box', async () => {
  const { flexBoxMockFactory } = await import('@synerise/ds-mocks');
  return { ...(await flexBoxMockFactory()) };
});
```

> `flexBoxMockFactory` is async — it uses `vi.importActual` to preserve the original
> module's side effects (`@rebass/grid` / styled-components initialization).

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockFlexBox();
```

## Available test IDs

- `ds-flex` — Flex component
- `ds-box` — Box component
- Custom via `data-testid` prop
