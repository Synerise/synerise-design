# Cruds Mock

Mock for `@synerise/ds-cruds` component.

## Vitest

```typescript
vi.mock('@synerise/ds-cruds', async () => {
  const { crudsMockFactory } = await import('@synerise/ds-mocks');
  return { ...crudsMockFactory() };
});

// In tests
screen.getByTestId('ds-cruds');
fireEvent.click(screen.getByTestId('ds-cruds-edit'));
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Cruds';

jestMocks.mockCruds();

// In tests
screen.getByTestId('ds-cruds');
fireEvent.click(screen.getByTestId('ds-cruds-add'));
```

## Available test IDs

- `ds-cruds` - main container
- `ds-cruds-add` - add button
- `ds-cruds-edit` - edit button
- `ds-cruds-duplicate` - duplicate button
- `ds-cruds-delete` - delete button
- `ds-cruds-remove` - remove button
- `ds-cruds-move-up` - move up button
- `ds-cruds-move-down` - move down button
