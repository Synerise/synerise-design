# Popconfirm Mock

## Vitest

```typescript
// Basic usage - renders children with confirm/cancel buttons
vi.mock('@synerise/ds-popconfirm', async () => {
  const { popconfirmMockFactory } = await import('@synerise/ds-mocks');
  return { ...popconfirmMockFactory() };
});

// Minimal mock - just renders children through
vi.mock('@synerise/ds-popconfirm', async () => {
  const { popconfirmMinimalMockFactory } = await import('@synerise/ds-mocks');
  return { ...popconfirmMinimalMockFactory() };
});
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Popconfirm';

// Basic usage
jestMocks.mockPopconfirm();

// Minimal mock
jestMocks.mockPopconfirmMinimal();
```

## Test IDs

- `ds-popconfirm` - wrapper element (default)
- `ds-popconfirm-content` - confirmation content container
- `ds-popconfirm-title` - title element
- `ds-popconfirm-description` - description element
- `ds-popconfirm-cancel` - cancel button
- `ds-popconfirm-ok` - confirm/ok button
- `ds-confirm-message` - ConfirmMessage wrapper
