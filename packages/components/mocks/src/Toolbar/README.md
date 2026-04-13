# Toolbar Mock

Mock for `@synerise/ds-toolbar` package including Toolbar, ToolbarGroup, ToolbarButton, ToolbarLabel, and ToolbarDivider.

## Vitest

```typescript
vi.mock('@synerise/ds-toolbar', async () => {
  const { toolbarMockFactory } = await import('@synerise/ds-mocks');
  return { ...toolbarMockFactory() };
});

// Query elements
screen.getByTestId('ds-toolbar');
screen.getByTestId('ds-toolbar-group');
screen.getByTestId('ds-toolbar-button');
screen.getByTestId('ds-toolbar-label');
screen.getByTestId('ds-toolbar-divider');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Toolbar';

jestMocks.mockToolbar();

// Query elements
screen.getByTestId('ds-toolbar');
screen.getByTestId('ds-toolbar-group');
screen.getByTestId('ds-toolbar-button');
```

## Mocked Components

### Toolbar (default export)
- Renders div with `data-testid="ds-toolbar"`
- Supports `className`

### ToolbarGroup (named export)
- Renders div with `data-testid="ds-toolbar-group"`

### ToolbarButton (named export)
- Renders button with `data-testid="ds-toolbar-button"`
- Supports `onClick`, `disabled`

### ToolbarLabel (named export)
- Renders span with `data-testid="ds-toolbar-label"`

### ToolbarDivider (named export)
- Renders hr with `data-testid="ds-toolbar-divider"`

## Available Test IDs

- `ds-toolbar` - Main toolbar container
- `ds-toolbar-group` - Toolbar group
- `ds-toolbar-button` - Toolbar button
- `ds-toolbar-label` - Toolbar label
- `ds-toolbar-divider` - Toolbar divider
