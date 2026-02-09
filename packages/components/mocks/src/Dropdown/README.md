# Dropdown Mock

## Vitest

```typescript
// Full mock
vi.mock('@synerise/ds-dropdown', async () => {
  const { dropdownMockFactory } = await import('@synerise/ds-mocks');
  return { ...dropdownMockFactory() };
});

// Minimal mock (renders children only)
vi.mock('@synerise/ds-dropdown', async () => {
  const { dropdownMinimalMockFactory } = await import('@synerise/ds-mocks');
  return { ...dropdownMinimalMockFactory() };
});

// In your test
screen.getByTestId('ds-dropdown');
screen.getByTestId('ds-dropdown-trigger');
screen.getByTestId('ds-dropdown-overlay');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Dropdown';

jestMocks.mockDropdown();

// In your test
screen.getByTestId('ds-dropdown');
screen.getByTestId('ds-dropdown-trigger');
screen.getByTestId('ds-dropdown-overlay');
```
