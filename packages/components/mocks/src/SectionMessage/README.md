# SectionMessage Mock

## Vitest

```typescript
vi.mock('@synerise/ds-section-message', async () => {
  const { sectionMessageMockFactory } = await import('@synerise/ds-mocks');
  return { ...sectionMessageMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockSectionMessage();
```

## Available test IDs

- `ds-section-message` (default)
- Custom via `data-testid` prop
