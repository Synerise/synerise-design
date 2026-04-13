# ContextSelector Mock

Mock for `@synerise/ds-context-selector` package.

## Vitest

```typescript
vi.mock('@synerise/ds-context-selector', async () => {
  const { contextSelectorMockFactory } = await import('@synerise/ds-mocks');
  return { ...contextSelectorMockFactory() };
});

// Query elements
screen.getByTestId('ds-context-selector');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/ContextSelector';

jestMocks.mockContextSelector();

// Query elements
screen.getByTestId('ds-context-selector');
```

## Mocked Components

### ContextSelector (default export)
- Renders div with `data-testid="ds-context-selector"`
- Supports `children`, `value`, `onChange`, `className`

## Available Test IDs

- `ds-context-selector` - Main container
