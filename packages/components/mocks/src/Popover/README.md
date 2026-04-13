# Popover Mock

## Vitest

```typescript
// Basic usage - renders all sub-components with test IDs
vi.mock('@synerise/ds-popover', async () => {
  const { popoverMockFactory } = await import('@synerise/ds-mocks');
  return { ...popoverMockFactory() };
});

// Minimal mock - triggers pass children through, content renders null
vi.mock('@synerise/ds-popover', async () => {
  const { popoverMinimalMockFactory } = await import('@synerise/ds-mocks');
  return { ...popoverMinimalMockFactory() };
});
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Popover';

// Basic usage
jestMocks.mockPopover();

// Minimal mock
jestMocks.mockPopoverMinimal();
```

## Test IDs

- `ds-popover` - wrapper element (default)
- `ds-popover-trigger` - trigger element
- `ds-popover-content` - content container
- `ds-popover-arrow` - arrow element
- `ds-popover-close` - close button
