# DatePicker Mocks

Mock for `@synerise/ds-date-picker` package including DatePicker, RawDatePicker, DayPicker, MonthPicker, YearPicker, and TimePicker.

## Vitest

```typescript
vi.mock('@synerise/ds-date-picker', async () => {
  const { datePickerMockFactory } = await import('@synerise/ds-mocks');
  return { ...datePickerMockFactory() };
});

// Query elements
screen.getByTestId('ds-date-picker');
screen.getByTestId('ds-date-picker-value');
screen.getByTestId('ds-date-picker-input');
screen.getByTestId('ds-date-picker-apply');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/DatePicker';

jestMocks.mockDatePicker();

// Query elements
screen.getByTestId('ds-date-picker');
screen.getByTestId('ds-date-picker-input');
```

## Mocked Components

### DatePicker (default export)
- Renders value as string when provided
- Renders placeholder when no value
- Includes text input for interaction
- Supports `onApply` with apply button

### RawDatePicker (named export)
- Same implementation as DatePicker

### Sub-pickers (named exports)
- `DayPicker` - renders `ds-day-picker`
- `MonthPicker` - renders `ds-month-picker`
- `YearPicker` - renders `ds-year-picker`
- `TimePicker` - renders `ds-time-picker`

## Available Test IDs

### DatePicker / RawDatePicker
- `ds-date-picker` - Main container
- `ds-date-picker-value` - Displayed value
- `ds-date-picker-placeholder` - Placeholder text
- `ds-date-picker-input` - Text input
- `ds-date-picker-apply` - Apply button

### Sub-pickers
- `ds-day-picker` - DayPicker container
- `ds-month-picker` - MonthPicker container
- `ds-year-picker` - YearPicker container
- `ds-time-picker` - TimePicker container
- `ds-{name}-value` - Value display for each sub-picker
