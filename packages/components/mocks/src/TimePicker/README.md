# TimePicker Mock

Mock for `@synerise/ds-time-picker` component.

## Vitest

```typescript
vi.mock('@synerise/ds-time-picker', async () => {
  const { timePickerMockFactory } = await import('@synerise/ds-mocks');
  return { ...timePickerMockFactory() };
});
```

## Jest

```typescript
import { jest as timePickerMocks } from '@synerise/ds-mocks/TimePicker';
timePickerMocks.mockTimePicker();
```

## Available test IDs

- `ds-time-picker` (default)
- Custom via `data-testid` prop

## Named exports

- `AM` - `'AM'`
- `PM` - `'PM'`
- `HOUR_12` - `12`
- `HOUR` - `24`
- `CLOCK_MODES` - `{}`
