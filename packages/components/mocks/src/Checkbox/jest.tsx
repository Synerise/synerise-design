import React from 'react';

type MockCheckboxProps = {
  children?: React.ReactNode;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: (e: unknown) => void;
  value?: unknown;
  description?: React.ReactNode;
  errorText?: string;
  'data-testid'?: string;
};

type MockCheckboxGroupProps = {
  children?: React.ReactNode;
  options?: Array<string | { label: React.ReactNode; value: unknown }>;
  value?: unknown[];
  defaultValue?: unknown[];
  onChange?: (values: unknown[]) => void;
  disabled?: boolean;
  'data-testid'?: string;
};

export const mockCheckbox = () => {
  jest.mock('@synerise/ds-checkbox', () => {
    const Group = jest.fn(
      ({
        children,
        options,
        value,
        onChange,
        disabled,
        'data-testid': dataTestId,
      }: MockCheckboxGroupProps) => {
        const testId = dataTestId || 'ds-checkbox-group';
        return (
          <div data-testid={testId} className="ds-checkbox-group">
            {options
              ? options.map((opt, i) => {
                  const optValue = typeof opt === 'string' ? opt : opt.value;
                  const optLabel = typeof opt === 'string' ? opt : opt.label;
                  return (
                    <label key={i} data-testid={`${testId}-option-${i}`}>
                      <input
                        type="checkbox"
                        checked={value?.includes(optValue)}
                        disabled={disabled}
                        onChange={() => {
                          if (!onChange) {
                            return;
                          }
                          const next = value?.includes(optValue)
                            ? value.filter((v: unknown) => v !== optValue)
                            : [...(value || []), optValue];
                          onChange(next);
                        }}
                      />
                      {optLabel}
                    </label>
                  );
                })
              : children}
          </div>
        );
      },
    );

    const Checkbox = Object.assign(
      jest.fn(
        ({
          children,
          className,
          checked,
          disabled,
          indeterminate,
          onChange,
          value,
          description,
          errorText,
          'data-testid': dataTestId,
        }: MockCheckboxProps) => {
          const testId = dataTestId || 'ds-checkbox';
          return (
            <div
              className={`ds-checkbox ${className || ''}`}
              data-testid={testId}
            >
              <label>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  data-indeterminate={indeterminate}
                  onChange={onChange}
                  value={value}
                />
                {children}
              </label>
              {description && (
                <div data-testid={`${testId}-description`}>{description}</div>
              )}
              {errorText && (
                <div data-testid={`${testId}-error`}>{errorText}</div>
              )}
            </div>
          );
        },
      ),
      { Group },
    );

    return {
      __esModule: true,
      default: Checkbox,
      isTristateCheckbox: jest.fn(() => false),
      nextCheckedValues: jest.fn(
        (checked: boolean, _indeterminate: boolean) =>
          [!checked, false] as [boolean, boolean],
      ),
      checkedValue: jest.fn((checked: boolean, _indeterminate: boolean) =>
        _indeterminate ? undefined : checked,
      ),
    };
  });
};

export const mockCheckboxMinimal = () => {
  jest.mock('@synerise/ds-checkbox', () => {
    const Checkbox = Object.assign(
      jest.fn(() => null),
      { Group: jest.fn(() => null) },
    );

    return {
      __esModule: true,
      default: Checkbox,
      isTristateCheckbox: jest.fn(() => false),
      nextCheckedValues: jest.fn(() => [false, false] as [boolean, boolean]),
      checkedValue: jest.fn(() => false),
    };
  });
};
