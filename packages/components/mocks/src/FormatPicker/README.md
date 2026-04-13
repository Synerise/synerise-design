# FormatPicker Mock

## Vitest

```typescript
vi.mock('@synerise/ds-format-picker', async () => {
  const { formatPickerMockFactory } = await import('@synerise/ds-mocks');
  return { ...formatPickerMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockFormatPicker();
```

## Available test IDs

- `ds-format-picker` (default)
- Custom via `data-testid` prop
