# Search Mock

Mocks the Search component and all its sub-components: `SearchInput`, `SearchHeader`, `SearchItems`, `SearchItemList`, `SearchButton`, and `renderSearchList`.

## Vitest

```typescript
vi.mock('@synerise/ds-search', async () => {
  const { searchMockFactory } = await import('@synerise/ds-mocks');
  return { ...searchMockFactory() };
});

screen.getByTestId('ds-search');
screen.getByTestId('ds-search-input');
```

## Jest

```typescript
import { jest as searchMocks } from '@synerise/ds-mocks/Search';

searchMocks.mockSearch();

screen.getByTestId('ds-search');
```

## Custom data-testid

```tsx
<Search data-testid="my-search" />

screen.getByTestId('my-search');
screen.getByTestId('my-search-input');
screen.getByTestId('my-search-clear');
```

## Available test IDs

### Search (default export)

| Test ID | Element | Condition |
|---|---|---|
| `ds-search` | Root container | Always |
| `ds-search-input` | Text input | Always |
| `ds-search-clear` | Clear button | When `value` is set |
| `ds-search-parameters` | Parameters list | When `parameters` has items |
| `ds-search-parameter-{i}` | Individual parameter | Per parameter item |
| `ds-search-recent` | Recent items list | When `recent` has items |
| `ds-search-recent-{i}` | Individual recent item | Per recent item |
| `ds-search-suggestions` | Suggestions list | When `suggestions` has items |
| `ds-search-suggestion-{i}` | Individual suggestion | Per suggestion item |

### SearchInput

| Test ID | Element | Condition |
|---|---|---|
| `ds-search-input` | Root container | Always |
| `ds-search-input-field` | Input element | Always |
| `ds-search-input-clear` | Clear button | When `value` is set |

### SearchHeader

| Test ID | Element | Condition |
|---|---|---|
| `ds-search-header` | Root container | Always |
| `ds-search-header-tooltip` | Tooltip text | When `tooltip` is set |

### SearchItems / SearchItemList

| Test ID | Element | Condition |
|---|---|---|
| `ds-search-items` | Root container | Always |
| `ds-search-item-{i}` | Individual item | Per data item |

### SearchButton

| Test ID | Element | Condition |
|---|---|---|
| `ds-search-button` | Button element | Always |
