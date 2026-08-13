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

export const mockAutocomplete = () => {
  jest.mock('@synerise/ds-autocomplete', () => {
    const Autocomplete = jest.fn(
      ({
        children,
        value,
        onChange,
        placeholder,
        className,
        'data-testid': dataTestId,
      }: MockAutocompleteProps) => (
        <div
          data-testid={dataTestId || 'ds-autocomplete'}
          className={className}
        >
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

    return {
      __esModule: true,
      default: Object.assign(Autocomplete, { Option: MockOption }),
    };
  });
};

export const mockAutocompleteMinimal = () => {
  jest.mock('@synerise/ds-autocomplete', () => ({
    __esModule: true,
    default: Object.assign(
      jest.fn(() => null),
      { Option: () => null },
    ),
  }));
};
