# Tags Mock

Mock for `@synerise/ds-tags` package including `Tags` (default), `AddTags`, `TagsStyles`, and deprecated `Tag`/`TagShape` re-exports.

## Vitest

```typescript
vi.mock('@synerise/ds-tags', async () => {
  const { tagsMockFactory } = await import('@synerise/ds-mocks');
  return { ...tagsMockFactory() };
});

screen.getByTestId('ds-tags');
screen.getByTestId('ds-tags-selected');
screen.getByTestId('ds-tags-tag-0');
```

## Jest

```typescript
import { jest as tagsMocks } from '@synerise/ds-mocks/Tags';

tagsMocks.mockTags();

screen.getByTestId('ds-tags');
screen.getByTestId('ds-tags-selected');
screen.getByTestId('ds-tags-tag-0');
```

## Mocked Components

### Tags (default export)
- Renders selected tags as child divs with tag name
- Supports `removable` — shows remove button per tag that calls `onSelectedChange`
- Supports `addable` — renders available tags from `data` that can be added
- Supports `creatable` — renders a create button that calls `onCreate`
- Supports `disabled` — hides interactive elements

### AddTags (named export)
- Renders a simple div placeholder

### TagsStyles (named export)
- Empty object

### Tag / TagShape (deprecated re-exports)
- `Tag` renders a simple div with tag name
- `TagShape` is an empty object

## Available Test IDs

- `ds-tags` — Main container
- `ds-tags-title` — Title element
- `ds-tags-selected` — Selected tags container
- `ds-tags-tag-{index}` — Individual selected tag
- `ds-tags-tag-{index}-remove` — Remove button for a tag
- `ds-tags-add` — Add tags container (available tags from pool)
- `ds-tags-add-tag-{index}` — Individual addable tag button
- `ds-tags-create` — Create new tag button
- `ds-add-tags` — AddTags component
