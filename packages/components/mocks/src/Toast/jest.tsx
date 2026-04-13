import React from 'react';

type MockToastProps = {
  children?: React.ReactNode;
  type?: 'success' | 'warning' | 'negative' | 'informative';
  message?: React.ReactNode;
  description?: React.ReactNode;
  withClose?: boolean;
  onCloseClick?: () => void;
  onDismiss?: () => void;
  button?: React.ReactNode;
  expander?: boolean;
  expanded?: boolean;
  onExpand?: (expanded: boolean) => void;
  expandedContent?: React.ReactNode;
  toastId?: string;
  show?: boolean;
  'data-testid'?: string;
};

export const mockToast = () => {
  jest.mock('@synerise/ds-toast', () => {
    const ToastComponent = jest.fn(
      ({
        type,
        message,
        description,
        withClose,
        onCloseClick,
        button,
        expander,
        expanded,
        onExpand,
        expandedContent,
        'data-testid': dataTestId,
      }: MockToastProps) => {
        const testId = dataTestId || 'ds-toast';
        return (
          <div data-testid={testId} data-type={type} className="ds-toast">
            {message && <div data-testid={`${testId}-message`}>{message}</div>}
            {description && (
              <div data-testid={`${testId}-description`}>{description}</div>
            )}
            {expander && (
              <button
                data-testid={`${testId}-expander`}
                onClick={() => onExpand?.(!expanded)}
              >
                Expand
              </button>
            )}
            {expanded && expandedContent && (
              <div data-testid={`${testId}-expanded-content`}>
                {expandedContent}
              </div>
            )}
            {withClose && (
              <button data-testid={`${testId}-close`} onClick={onCloseClick}>
                Close
              </button>
            )}
            {button && <div data-testid={`${testId}-button`}>{button}</div>}
          </div>
        );
      },
    );

    const Toast = Object.assign(ToastComponent, {
      success: jest.fn(() => 'mock-toast-id'),
      error: jest.fn(() => 'mock-toast-id'),
      info: jest.fn(() => 'mock-toast-id'),
      warning: jest.fn(() => 'mock-toast-id'),
    });

    return {
      __esModule: true,
      default: Toast,
      Toast,
      showToast: jest.fn(() => 'mock-toast-id'),
      dismissToast: jest.fn(),
      removeToast: jest.fn(),
      ICONS: {},
    };
  });
};

export const mockToastMinimal = () => {
  jest.mock('@synerise/ds-toast', () => {
    const Toast = Object.assign(
      jest.fn(() => null),
      {
        success: jest.fn(() => 'mock-toast-id'),
        error: jest.fn(() => 'mock-toast-id'),
        info: jest.fn(() => 'mock-toast-id'),
        warning: jest.fn(() => 'mock-toast-id'),
      },
    );

    return {
      __esModule: true,
      default: Toast,
      Toast,
      showToast: jest.fn(() => 'mock-toast-id'),
      dismissToast: jest.fn(),
      removeToast: jest.fn(),
      ICONS: {},
    };
  });
};
