import React from 'react';

type MockCardSelectProps = {
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  value?: unknown;
  onChange?: (value: unknown) => void;
  checked?: boolean;
  disabled?: boolean;
  raised?: boolean;
  className?: string;
  'data-testid'?: string;
};

type MockCardSelectGroupProps = {
  children?: React.ReactNode;
  columns?: number;
  className?: string;
  'data-testid'?: string;
};

export const mockCardSelect = () => {
  jest.mock('@synerise/ds-card-select', () => {
    const CardSelect = jest.fn(
      ({
        children,
        title,
        description,
        icon,
        value,
        onChange,
        checked,
        disabled,
        raised,
        className,
        'data-testid': dataTestId,
      }: MockCardSelectProps) => {
        const testId = dataTestId || 'ds-card-select';
        return (
          <div
            data-testid={testId}
            className={className}
            data-checked={checked}
            data-disabled={disabled}
            data-raised={raised}
            onClick={() => !disabled && onChange?.(value)}
          >
            {icon && <div data-testid={`${testId}-icon`}>{icon}</div>}
            {title && <div data-testid={`${testId}-title`}>{title}</div>}
            {description && (
              <div data-testid={`${testId}-description`}>{description}</div>
            )}
            {children}
          </div>
        );
      },
    );

    const CardSelectGroup = jest.fn(
      ({
        children,
        columns,
        className,
        'data-testid': dataTestId,
      }: MockCardSelectGroupProps) => {
        const testId = dataTestId || 'ds-card-select-group';
        return (
          <div
            data-testid={testId}
            className={className}
            data-columns={columns}
          >
            {children}
          </div>
        );
      },
    );

    return {
      __esModule: true,
      default: CardSelect,
      CardSelectGroup,
    };
  });
};

export const mockCardSelectMinimal = () => {
  jest.mock('@synerise/ds-card-select', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    CardSelectGroup: jest.fn(() => null),
  }));
};
