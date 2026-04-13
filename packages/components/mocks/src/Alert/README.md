# Alert Mocks

Mock for `@synerise/ds-alert` package including Alert and all sub-components.

> **Note:** This is a deprecated package. Most sub-components are re-exports from their own packages.

## Vitest

```typescript
vi.mock('@synerise/ds-alert', async () => {
  const { alertMockFactory } = await import('@synerise/ds-mocks');
  return { ...alertMockFactory() };
});

// Query elements
screen.getByTestId('ds-alert');
screen.getByTestId('ds-alert-toast');
screen.getByTestId('ds-alert-section-message');
screen.getByTestId('ds-alert-broadcast-bar');
screen.getByTestId('ds-alert-icon-alert');
screen.getByTestId('ds-alert-inline-alert');
screen.getByTestId('ds-alert-info');
screen.getByTestId('ds-alert-message');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Alert';

jestMocks.mockAlert();

// Query elements
screen.getByTestId('ds-alert');
screen.getByTestId('ds-alert-toast');
```

## Mocked Components

### Alert (default export)
- `Alert` - renders div with type, message, description, close button (when closable), and children

### Named exports
- `Toast` - renders div with children
- `SectionMessage` - renders div with children
- `BroadcastBar` - renders div with children
- `IconAlert` - renders div with children
- `InlineAlert` - renders div with children
- `AlertInfo` - renders div with children
- `AlertMessage` - renders div with children
- `AlertStyles` - empty object

## Available Test IDs

- `ds-alert` - Main Alert container
- `ds-alert-message` (on Alert) - Message element within Alert
- `ds-alert-description` - Description element within Alert
- `ds-alert-close` - Close button within Alert
- `ds-alert-toast` - Toast container
- `ds-alert-section-message` - SectionMessage container
- `ds-alert-broadcast-bar` - BroadcastBar container
- `ds-alert-icon-alert` - IconAlert container
- `ds-alert-inline-alert` - InlineAlert container
- `ds-alert-info` - AlertInfo container
- `ds-alert-message` (AlertMessage) - AlertMessage container
