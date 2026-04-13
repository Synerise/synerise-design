# Wizard Mocks

Mock for `@synerise/ds-wizard` package including Wizard and Wizard.OnModal.

## Vitest

```typescript
vi.mock('@synerise/ds-wizard', async () => {
  const { wizardMockFactory } = await import('@synerise/ds-mocks');
  return { ...wizardMockFactory() };
});

// Query elements
screen.getByTestId('ds-wizard');
screen.getByTestId('ds-wizard-step-0');
screen.getByTestId('ds-wizard-on-modal');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Wizard';

jestMocks.mockWizard();

// Query elements
screen.getByTestId('ds-wizard');
screen.getByTestId('ds-wizard-on-modal');
```

## Mocked Components

### Wizard (default export)
- Renders children and optional steps list
- Steps rendered with `data-active` attribute based on `activeStep`
- `Wizard.OnModal` - renders modal wrapper, respects `open`/`visible` prop

## Available Test IDs

### Wizard
- `ds-wizard` - Main container
- `ds-wizard-steps` - Steps container
- `ds-wizard-step-{index}` - Individual step

### Wizard.OnModal
- `ds-wizard-on-modal` - Main container
- `ds-wizard-on-modal-title` - Title element
- `ds-wizard-on-modal-close` - Close button
