# Typography Mock

## Vitest

```typescript
vi.mock('@synerise/ds-typography', async () => {
  const { typographyMockFactory } = await import('@synerise/ds-mocks');
  return { ...typographyMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockTypography();
```

## Available test IDs

- `ds-title` — Title component
- `ds-text` — Text component
- `ds-paragraph` — Paragraph component
- `ds-description` — Description component
- `ds-error-text` — ErrorText component
- `ds-label` — Label component
- Custom via `data-testid` prop
