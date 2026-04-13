# IconPicker Mock

## Vitest

```typescript
vi.mock('@synerise/ds-icon-picker', async () => {
  const { iconPickerMockFactory } = await import('@synerise/ds-mocks');
  return { ...iconPickerMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockIconPicker();
```

## Available test IDs

- `ds-icon-picker` (default)
- Custom via `data-testid` prop
