# CodeSnippet Mock

## Vitest

```typescript
vi.mock('@synerise/ds-code-snippet', async () => {
  const { codeSnippetMockFactory } = await import('@synerise/ds-mocks');
  return { ...codeSnippetMockFactory() };
});
```

## Jest

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
dsMocks.mockCodeSnippet();
```

## Available test IDs

- `ds-code-snippet` (default)
- Custom via `data-testid` prop

## Named exports

- `CodeSnippetType` — `{ INLINE: 'inline', SINGLE: 'single', MULTI: 'multi' }`
