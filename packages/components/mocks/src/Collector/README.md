# Collector Mocks

Mock for `@synerise/ds-collector` package including `Collector` and its compound sub-components.

## Vitest

```typescript
vi.mock('@synerise/ds-collector', async () => {
  const { collectorMockFactory } = await import('@synerise/ds-mocks');
  return { ...collectorMockFactory() };
});

// Query elements
screen.getByTestId('ds-collector');
screen.getByTestId('ds-collector-values');
screen.getByTestId('ds-collector-button-panel');
screen.getByTestId('ds-collector-options-dropdown');
screen.getByTestId('ds-collector-navigation-hint');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Collector';

jestMocks.mockCollector();

// Query elements
screen.getByTestId('ds-collector');
screen.getByTestId('ds-collector-values');
```

## Mocked Components

### Collector (default export, compound component)
- `Collector` - div container with children and className support
- `Collector.Values` - div for collector values
- `Collector.ButtonPanel` - div for button panel
- `Collector.OptionsDropdown` - div for options dropdown
- `Collector.NavigationHint` - div for navigation hint

## Available Test IDs

- `ds-collector` - Main container
- `ds-collector-values` - Values container
- `ds-collector-button-panel` - Button panel container
- `ds-collector-options-dropdown` - Options dropdown container
- `ds-collector-navigation-hint` - Navigation hint container
