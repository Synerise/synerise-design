# Stepper Mock

Mock for `@synerise/ds-stepper` package including Stepper and Stepper.Step.

## Vitest

```typescript
vi.mock('@synerise/ds-stepper', async () => {
  const { stepperMockFactory } = await import('@synerise/ds-mocks');
  return { ...stepperMockFactory() };
});

// Query elements
screen.getByTestId('ds-stepper');
screen.getByTestId('ds-stepper-step');
screen.getByTestId('ds-stepper-step-label');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Stepper';

jestMocks.mockStepper();

// Query elements
screen.getByTestId('ds-stepper');
screen.getByTestId('ds-stepper-step');
```

## Mocked Components

### Stepper (default export)
- Renders div with `data-testid="ds-stepper"`
- Supports `activeStep`, `orientation`, `className`
- Has static `Stepper.Step` sub-component via `Object.assign`

### Stepper.Step
- Renders div with `data-testid="ds-stepper-step"`
- Supports `label`, `number`, `active`, `completed`, `disabled`

## Available Test IDs

- `ds-stepper` - Main stepper container
- `ds-stepper-step` - Individual step
- `ds-stepper-step-label` - Step label
