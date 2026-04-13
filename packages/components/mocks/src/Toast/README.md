# Toast Mocks

Mock for `@synerise/ds-toast` package including Toast component, static methods, and imperative APIs.

## Vitest

```typescript
vi.mock('@synerise/ds-toast', async () => {
  const { toastMockFactory } = await import('@synerise/ds-mocks');
  return { ...toastMockFactory() };
});

// Query elements
screen.getByTestId('ds-toast');
screen.getByTestId('ds-toast-message');
screen.getByTestId('ds-toast-description');
screen.getByTestId('ds-toast-close');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Toast';

jestMocks.mockToast();

// Query elements
screen.getByTestId('ds-toast');
screen.getByTestId('ds-toast-message');
```

## Mocked Components

### Toast (default + named export)
- `Toast` - renders toast with message, description, close button, expander, and action button
- `Toast.success` - returns `'mock-toast-id'`
- `Toast.error` - returns `'mock-toast-id'`
- `Toast.info` - returns `'mock-toast-id'`
- `Toast.warning` - returns `'mock-toast-id'`

### Imperative APIs (named exports)
- `showToast` - returns `'mock-toast-id'`
- `dismissToast` - no-op
- `removeToast` - no-op
- `ICONS` - empty object

## Testing Imperative API

```typescript
import { showToast, Toast } from '@synerise/ds-toast';

// After calling code that triggers a toast:
expect(Toast.success).toHaveBeenCalledWith(
  expect.objectContaining({ message: 'Saved!' })
);

expect(showToast).toHaveBeenCalledWith(
  expect.objectContaining({ type: 'success' })
);
```

## Available Test IDs

- `ds-toast` - Main container
- `ds-toast-message` - Message element
- `ds-toast-description` - Description element
- `ds-toast-expander` - Expander toggle button
- `ds-toast-expanded-content` - Expanded content area
- `ds-toast-close` - Close button
- `ds-toast-button` - Action button container
