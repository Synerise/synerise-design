# Logic Mock

Mock for `@synerise/ds-logic` package including Logic (compound with Logic.Matching), Matching, and Placeholder.

## Vitest

```typescript
vi.mock('@synerise/ds-logic', async () => {
  const { logicMockFactory } = await import('@synerise/ds-mocks');
  return { ...logicMockFactory() };
});

// Query elements
screen.getByTestId('ds-logic');
screen.getByTestId('ds-logic-matching');
screen.getByTestId('ds-logic-placeholder');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Logic';

jestMocks.mockLogic();

// Query elements
screen.getByTestId('ds-logic');
screen.getByTestId('ds-logic-matching');
screen.getByTestId('ds-logic-placeholder');
```

## Mocked Components

### Logic (default export, compound)
- Renders div with `data-testid="ds-logic"`
- Has `Logic.Matching` static sub-component via `Object.assign`
- Supports `children`, `className`

### Matching (named export + Logic.Matching)
- Renders div with `data-testid="ds-logic-matching"`
- Supports `value`, `onChange`, `texts`

### Placeholder (named export)
- Renders div with `data-testid="ds-logic-placeholder"`
- Supports `children`

## Available Test IDs

- `ds-logic` - Main container
- `ds-logic-matching` - Matching component
- `ds-logic-placeholder` - Placeholder component
