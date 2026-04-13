import React from 'react';

type MockResultProps = {
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  type?: string;
  noSearchResults?: boolean;
  panel?: boolean;
  'data-testid'?: string;
};

export const mockResult = () => {
  jest.mock('@synerise/ds-result', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        title,
        description,
        type,
        noSearchResults,
        panel,
        'data-testid': dataTestId,
      }: MockResultProps) => {
        const testId = dataTestId || 'ds-result';
        return (
          <div
            className={`ds-result ${className || ''}`}
            data-testid={testId}
            data-type={type}
            data-no-search-results={noSearchResults}
            data-panel={panel}
          >
            {title && <div data-testid={`${testId}-title`}>{title}</div>}
            {description && (
              <div data-testid={`${testId}-description`}>{description}</div>
            )}
            {children}
          </div>
        );
      },
    ),
  }));
};

export const mockResultMinimal = () => {
  jest.mock('@synerise/ds-result', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
