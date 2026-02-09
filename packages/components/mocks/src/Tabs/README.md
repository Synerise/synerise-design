# Tabs Mock

Mock for `@synerise/ds-tabs` component.

## Vitest

```typescript
// Full mock
vi.mock('@synerise/ds-tabs', async () => {
  const { tabsMockFactory } = await import('@synerise/ds-mocks');
  return { ...tabsMockFactory() };
});

// Minimal mock (renders null)
vi.mock('@synerise/ds-tabs', async () => {
  const { tabsMinimalMockFactory } = await import('@synerise/ds-mocks');
  return { ...tabsMinimalMockFactory() };
});

// In your test
screen.getByTestId('ds-tabs');
screen.getByTestId('ds-tabs-tab-0');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Tabs';

jestMocks.mockTabs();

// In your test
screen.getByTestId('ds-tabs');
screen.getByTestId('ds-tabs-tab-0');
```
