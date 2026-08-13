import React from 'react';

type MockAutocompleteProps = {
  children?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  'data-testid'?: string;
};

type MockOptionProps = {
  value?: string;
  children?: React.ReactNode;
};

// Consumers reach options through `Autocomplete.Option`, so the mocked default has to
// carry it — without this, mocking the package makes any such tree fail to render.
const MockOption = ({ value, children }: MockOptionProps) => (
  <div data-testid="autocomplete-option" role="option" data-value={value}>
    {children}
  </div>
);

MockOption.displayName = 'Autocomplete.Option';

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
export const autocompleteMockFactory = () => {
  const Autocomplete = vi.fn(
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
  );

  return { default: Object.assign(Autocomplete, { Option: MockOption }) };
};

/**
 * Factory function for minimal Autocomplete mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-autocomplete', autocompleteMinimalMockFactory);
 * ```
 */
export const autocompleteMinimalMockFactory = () => ({
  default: Object.assign(
    vi.fn(() => null),
    { Option: () => null },
  ),
});
