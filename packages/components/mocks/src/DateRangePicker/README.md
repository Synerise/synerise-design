# DateRangePicker Mocks

Mock for `@synerise/ds-date-range-picker` package including DateRangePicker, RawDateRangePicker, filter components, utils, CONST, and fnsFormat.

## Vitest

```typescript
vi.mock('@synerise/ds-date-range-picker', async () => {
  const { dateRangePickerMockFactory } = await import('@synerise/ds-mocks');
  return { ...dateRangePickerMockFactory() };
});

// Query elements
screen.getByTestId('ds-date-range-picker');
screen.getByTestId('ds-date-range-picker-value');
screen.getByTestId('ds-date-range-picker-input');
screen.getByTestId('ds-date-range-picker-apply');
```

## Jest

```typescript
import { jest as jestMocks } from '@synerise/ds-mocks/DateRangePicker';

jestMocks.mockDateRangePicker();

// Query elements
screen.getByTestId('ds-date-range-picker');
screen.getByTestId('ds-date-range-picker-input');
```

## Mocked Components

### DateRangePicker (default export)
- Renders value as string when provided
- Renders placeholder when no value
- Includes text input for interaction
- Supports `onApply` with apply button

### RawDateRangePicker (named export)
- Same as DateRangePicker with `ds-raw-date-range-picker` test ID

### Filter Components (named exports)
- `DailyDateFilter` - renders `ds-daily-date-filter`
- `WeeklyDateFilter` - renders `ds-weekly-date-filter`
- `MonthlyDateFilter` - renders `ds-monthly-date-filter`
- `TimeWindow` - renders `ds-time-window`

### Utilities (named exports)
- `utils` - empty object
- `CONST` - empty object
- `fnsFormat` - mock function returning `String(date)`

## Available Test IDs

### DateRangePicker
- `ds-date-range-picker` - Main container
- `ds-date-range-picker-value` - Displayed value
- `ds-date-range-picker-placeholder` - Placeholder text
- `ds-date-range-picker-input` - Text input
- `ds-date-range-picker-apply` - Apply button

### RawDateRangePicker
- `ds-raw-date-range-picker` - Main container
- `ds-raw-date-range-picker-value` - Displayed value
- `ds-raw-date-range-picker-input` - Text input
- `ds-raw-date-range-picker-apply` - Apply button

### Filter Components
- `ds-daily-date-filter` - DailyDateFilter container
- `ds-weekly-date-filter` - WeeklyDateFilter container
- `ds-monthly-date-filter` - MonthlyDateFilter container
- `ds-time-window` - TimeWindow container
