import React from 'react';

type MockAutocompleteProps = {
  children?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  'data-testid'?: string;
};

export const mockAutocomplete = () => {
  jest.mock('@synerise/ds-autocomplete', () => ({
    __esModule: true,
    default: jest.fn(
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
    ),
  }));
};

export const mockAutocompleteMinimal = () => {
  jest.mock('@synerise/ds-autocomplete', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
