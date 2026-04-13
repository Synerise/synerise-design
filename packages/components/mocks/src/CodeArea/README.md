# CodeArea Mock

Replaces Monaco Editor with a simple `<textarea>`, eliminating the heavy Monaco dependency in tests.

## Vitest

```typescript
vi.mock('@synerise/ds-code-area', async () => {
  const { codeAreaMockFactory } = await import('@synerise/ds-mocks');
  return { ...codeAreaMockFactory() };
});

screen.getByTestId('ds-code-area');
screen.getByTestId('ds-code-area-editor');
```

## Jest

```typescript
import { jest as codeAreaMocks } from '@synerise/ds-mocks/CodeArea';

codeAreaMocks.mockCodeArea();

screen.getByTestId('ds-code-area');
```

## Custom data-testid

```tsx
<CodeArea data-testid="my-editor" />

screen.getByTestId('my-editor');
screen.getByTestId('my-editor-editor');
screen.getByTestId('my-editor-label');
screen.getByTestId('my-editor-counter');
screen.getByTestId('my-editor-description');
screen.getByTestId('my-editor-error');
```

## Available test IDs

| Test ID | Element | Condition |
|---|---|---|
| `ds-code-area` | Root container | Always |
| `ds-code-area-label` | Label element | When `label` prop is set |
| `ds-code-area-editor` | Textarea (replaces Monaco) | Always |
| `ds-code-area-counter` | Character counter | When `counter` prop is set |
| `ds-code-area-description` | Description text | When `description` prop is set |
| `ds-code-area-error` | Error message | When `errorText` prop is set |
