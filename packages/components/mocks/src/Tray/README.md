# Tray Mocks

Mock for `@synerise/ds-tray` package including Tray, TrayProvider, and useTray hook.

## Vitest

```typescript
vi.mock('@synerise/ds-tray', async () => {
  const { trayMockFactory } = await import('@synerise/ds-mocks');
  return { ...trayMockFactory() };
});

// Query elements
screen.getByTestId('ds-tray');
screen.getByTestId('ds-tray-title');
screen.getByTestId('ds-tray-close');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Tray';

jestMocks.mockTray();

// Query elements
screen.getByTestId('ds-tray');
screen.getByTestId('ds-tray-title');
screen.getByTestId('ds-tray-close');
```

## Mocked Components

### Tray (default export)
- `Tray` - renders div with title, close button, and children

### TrayProvider (named export)
- `TrayProvider` - renders fragment wrapping children

### useTray (named export, hook)
- Returns `{ open: false, setOpen: vi.fn(), toggle: vi.fn() }`

## Testing useTray Hook

```typescript
import { useTray } from '@synerise/ds-tray';

// In your test, after rendering:
expect(useTray).toHaveBeenCalled();

// To override the hook return value:
vi.mocked(useTray).mockReturnValue({
  open: true,
  setOpen: vi.fn(),
  toggle: vi.fn(),
});
```

## Available Test IDs

### Tray
- `ds-tray` - Main container
- `ds-tray-title` - Title element
- `ds-tray-close` - Close button
