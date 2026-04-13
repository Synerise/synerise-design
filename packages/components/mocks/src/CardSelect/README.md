# CardSelect Mocks

Mock for `@synerise/ds-card-select` package including CardSelect and CardSelectGroup.

## Vitest

```typescript
vi.mock('@synerise/ds-card-select', async () => {
  const { cardSelectMockFactory } = await import('@synerise/ds-mocks');
  return { ...cardSelectMockFactory() };
});

// Query elements
screen.getByTestId('ds-card-select');
screen.getByTestId('ds-card-select-title');
screen.getByTestId('ds-card-select-description');
screen.getByTestId('ds-card-select-icon');
screen.getByTestId('ds-card-select-group');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/CardSelect';

jestMocks.mockCardSelect();

// Query elements
screen.getByTestId('ds-card-select');
screen.getByTestId('ds-card-select-title');
screen.getByTestId('ds-card-select-description');
screen.getByTestId('ds-card-select-icon');
screen.getByTestId('ds-card-select-group');
```

## Mocked Components

### CardSelect (default export)
- `CardSelect` - renders div with icon, title, description, and children; fires onChange on click when not disabled

### CardSelectGroup (named export)
- `CardSelectGroup` - renders div wrapper with columns support

## Available Test IDs

### CardSelect
- `ds-card-select` - Main container
- `ds-card-select-icon` - Icon element
- `ds-card-select-title` - Title element
- `ds-card-select-description` - Description element

### CardSelectGroup
- `ds-card-select-group` - Group container
