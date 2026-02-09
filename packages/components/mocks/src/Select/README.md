# Select Mock

Mock for `@synerise/ds-select` component.

## Vitest

```typescript
// Full mock
vi.mock('@synerise/ds-select', async () => {
  const { selectMockFactory } = await import('@synerise/ds-mocks');
  return { ...selectMockFactory() };
});

// Minimal mock (renders null)
vi.mock('@synerise/ds-select', async () => {
  const { selectMinimalMockFactory } = await import('@synerise/ds-mocks');
  return { ...selectMinimalMockFactory() };
});

// Usage in tests
screen.getByTestId('ds-select');

// With custom testid
<Select data-testid="country-select" />
screen.getByTestId('country-select');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Select';

jestMocks.mockSelect();

// Usage in tests
screen.getByTestId('ds-select');
```
