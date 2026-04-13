# Card Mock

Mock for `@synerise/ds-card` package including Card, CardGroup, CardBadge, CardSummary, and CardStyles.

## Vitest

```typescript
vi.mock('@synerise/ds-card', async () => {
  const { cardMockFactory } = await import('@synerise/ds-mocks');
  return { ...cardMockFactory() };
});

// Query elements
screen.getByTestId('ds-card');
screen.getByTestId('ds-card-header');
screen.getByTestId('ds-card-title');
screen.getByTestId('ds-card-description');
screen.getByTestId('ds-card-group');
screen.getByTestId('ds-card-badge');
screen.getByTestId('ds-card-summary');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Card';

jestMocks.mockCard();

// Query elements
screen.getByTestId('ds-card');
screen.getByTestId('ds-card-group');
screen.getByTestId('ds-card-badge');
screen.getByTestId('ds-card-summary');
```

## Mocked Components

### Card (default export)
- Renders div with `data-testid="ds-card"`
- Supports `title`, `description`, `withHeader`, `raised`, `compact`, `lively`
- Header section rendered only when `withHeader` is true

### CardGroup (named export)
- Renders div with `data-testid="ds-card-group"`
- Supports `columns`

### CardBadge (named export)
- Renders div with `data-testid="ds-card-badge"`
- Supports `status`

### CardSummary (named export)
- Renders div with `data-testid="ds-card-summary"`

### CardStyles (named export)
- Mocked as empty object

## Available Test IDs

- `ds-card` - Main card container
- `ds-card-header` - Card header (when `withHeader` is true)
- `ds-card-title` - Card title
- `ds-card-description` - Card description
- `ds-card-group` - Card group container
- `ds-card-badge` - Card badge
- `ds-card-summary` - Card summary
