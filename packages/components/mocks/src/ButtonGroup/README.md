# ButtonGroup Mock

Mock for `@synerise/ds-button-group` package including ButtonGroup and ButtonDivider.

## Vitest

```typescript
vi.mock('@synerise/ds-button-group', async () => {
  const { buttonGroupMockFactory } = await import('@synerise/ds-mocks');
  return { ...buttonGroupMockFactory() };
});

// Query elements
screen.getByTestId('ds-button-group');
screen.getByTestId('ds-button-divider');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/ButtonGroup';

jestMocks.mockButtonGroup();

// Query elements
screen.getByTestId('ds-button-group');
screen.getByTestId('ds-button-divider');
```

## Mocked Components

### ButtonGroup (default export)
- Renders div with `data-testid="ds-button-group"`
- Supports `children`, `className`

### ButtonDivider (named export)
- Renders hr with `data-testid="ds-button-divider"`

## Available Test IDs

- `ds-button-group` - Main container
- `ds-button-divider` - Button divider
