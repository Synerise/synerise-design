import React from 'react';

type MockAutocompleteProps = {
  children?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  'data-testid'?: string;
};

/**
 * Factory function for Autocomplete mock.
 * Mocks the @synerise/ds-autocomplete package.
 *
 * @example
 * ```typescript
 * import { autocompleteMockFactory } from '@synerise/ds-mocks/Autocomplete/vi';
 *
 * vi.mock('@synerise/ds-autocomplete', autocompleteMockFactory);
 * ```
 */
export const autocompleteMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      value,
      onChange,
      placeholder,
      className,
      'data-testid': dataTestId,
    }: MockAutocompleteProps) => (
      <div data-testid={dataTestId || 'ds-autocomplete'} className={className}>
        <input
          data-testid={`${dataTestId || 'ds-autocomplete'}-input`}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
        {children}
      </div>
    ),
  ),
});

/**
 * Factory function for minimal Autocomplete mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-autocomplete', autocompleteMinimalMockFactory);
 * ```
 */
export const autocompleteMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
