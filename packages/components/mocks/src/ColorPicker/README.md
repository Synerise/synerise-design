# ColorPicker Mock

## Vitest

```typescript
vi.mock('@synerise/ds-color-picker', async () => {
  const { colorPickerMockFactory } = await import('@synerise/ds-mocks');
  return { ...colorPickerMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockColorPicker();
```

## Available test IDs

- `ds-color-picker` (default)
- Custom via `data-testid` prop
