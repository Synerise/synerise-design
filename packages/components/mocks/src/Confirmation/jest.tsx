import React from 'react';

type MockConfirmationProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  mainButtonProps?: Record<string, unknown>;
  batchActionItems?: Array<{
    label?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  }>;
  texts?: {
    mainButtonLabel?: string;
    secondaryButtonLabel?: string;
  };
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockPromptProps = {
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  'data-testid'?: string;
};

export const mockConfirmation = () => {
  jest.mock('@synerise/ds-confirmation', () => {
    const Confirmation = jest.fn(
      ({
        title,
        description,
        okText,
        cancelText,
        onOk,
        onCancel,
        mainButtonProps,
        batchActionItems,
        texts,
        children,
        'data-testid': dataTestId,
      }: MockConfirmationProps) => {
        const testId = dataTestId || 'ds-confirmation';
        return (
          <div data-testid={testId} className="ds-confirmation">
            {title && <div data-testid={`${testId}-title`}>{title}</div>}
            {description && (
              <div data-testid={`${testId}-description`}>{description}</div>
            )}
            {children}
            <button
              data-testid={`${testId}-ok`}
              onClick={onOk}
              {...mainButtonProps}
            >
              {texts?.mainButtonLabel || okText || 'OK'}
            </button>
            <button data-testid={`${testId}-cancel`} onClick={onCancel}>
              {texts?.secondaryButtonLabel || cancelText || 'Cancel'}
            </button>
            {batchActionItems?.map((item, index) => (
              <button
                key={index}
                data-testid={`${testId}-batch-action-${index}`}
                onClick={item.onClick}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        );
      },
    );

    const Prompt = jest.fn(
      ({
        children,
        title,
        description,
        'data-testid': dataTestId,
      }: MockPromptProps) => {
        const testId = dataTestId || 'ds-prompt';
        return (
          <div data-testid={testId} className="ds-prompt">
            {title && <div data-testid={`${testId}-title`}>{title}</div>}
            {description && (
              <div data-testid={`${testId}-description`}>{description}</div>
            )}
            {children}
          </div>
        );
      },
    );

    return {
      __esModule: true,
      default: Confirmation,
      Prompt,
    };
  });
};

export const mockConfirmationMinimal = () => {
  jest.mock('@synerise/ds-confirmation', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    Prompt: jest.fn(() => null),
  }));
};
