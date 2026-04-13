# InformationCard Mock

Mock for `@synerise/ds-information-card` package including InformationCard, InformationCardPropertyList, InformationCardTooltip, and utility functions.

## Vitest

```typescript
vi.mock('@synerise/ds-information-card', async () => {
  const { informationCardMockFactory } = await import('@synerise/ds-mocks');
  return { ...informationCardMockFactory() };
});

// Query elements
screen.getByTestId('ds-information-card');
screen.getByTestId('ds-information-card-title');
screen.getByTestId('ds-information-card-subtitle');
screen.getByTestId('ds-information-card-property-list');
screen.getByTestId('ds-information-card-tooltip');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/InformationCard';

jestMocks.mockInformationCard();

// Query elements
screen.getByTestId('ds-information-card');
screen.getByTestId('ds-information-card-property-list');
screen.getByTestId('ds-information-card-tooltip');
```

## Mocked Components

### InformationCard (default export)
- Renders div with `data-testid="ds-information-card"`
- Supports `title`, `subtitle`, `children`

### InformationCardPropertyList (named export)
- Renders div with `data-testid="ds-information-card-property-list"`
- Supports `children`

### InformationCardTooltip (named export)
- Renders div with `data-testid="ds-information-card-tooltip"`
- Supports `children`

### Utility Functions (named exports)
- `buildExtraInfo` - vi.fn()
- `buildIconBadge` - vi.fn()
- `buildInitialsBadge` - vi.fn()

## Available Test IDs

- `ds-information-card` - Main container
- `ds-information-card-title` - Title element
- `ds-information-card-subtitle` - Subtitle element
- `ds-information-card-property-list` - Property list container
- `ds-information-card-tooltip` - Tooltip container
