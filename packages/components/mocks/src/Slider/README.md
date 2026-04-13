# Slider Mocks

Mock for `@synerise/ds-slider` package.

## Vitest

```typescript
vi.mock('@synerise/ds-slider', async () => {
  const { sliderMockFactory } = await import('@synerise/ds-mocks');
  return { ...sliderMockFactory() };
});

// Query elements (single value)
screen.getByTestId('ds-slider');
screen.getByTestId('ds-slider-input');

// Query elements (range value)
screen.getByTestId('ds-slider-input-min');
screen.getByTestId('ds-slider-input-max');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/Slider';

jestMocks.mockSlider();

// Query elements
screen.getByTestId('ds-slider');
screen.getByTestId('ds-slider-input');
```

## Mocked Components

### Slider (default export)
- Renders a range input for single value mode
- Renders two range inputs for range mode (`value` as `[number, number]`)
- Supports `min`, `max`, `step`, `disabled` props
- `onChange` fires with updated value on input change

## Available Test IDs

### Slider (single value)
- `ds-slider` - Main container
- `ds-slider-input` - Range input element

### Slider (range value)
- `ds-slider` - Main container
- `ds-slider-input-min` - Range input for minimum value
- `ds-slider-input-max` - Range input for maximum value
