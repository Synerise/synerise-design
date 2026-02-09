# Tooltip Mock

## Vitest

```typescript
// Basic usage - renders children only
vi.mock('@synerise/ds-tooltip', async () => {
  const { tooltipMockFactory } = await import('@synerise/ds-mocks');
  return { ...tooltipMockFactory()() };
});

// With tooltip content visible
vi.mock('@synerise/ds-tooltip', async () => {
  const { tooltipMockFactory } = await import('@synerise/ds-mocks');
  return { ...tooltipMockFactory({ showContent: true })() };
});

// Minimal mock - just renders children
vi.mock('@synerise/ds-tooltip', async () => {
  const { tooltipMinimalMockFactory } = await import('@synerise/ds-mocks');
  return { ...tooltipMinimalMockFactory() };
});
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Tooltip';

// Basic usage
jestMocks.mockTooltip();

// With tooltip content visible
jestMocks.mockTooltip({ showContent: true });

// Minimal mock
jestMocks.mockTooltipMinimal();
```

## Test IDs

- `ds-tooltip` - wrapper element (default)
- `ds-tooltip-content` - tooltip content container (when `showContent: true`)
- `ds-tooltip-title` - title element
- `ds-tooltip-description` - description element
