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

/**
 * Factory function for Toast mock.
 * Mocks the entire @synerise/ds-toast package including Toast component and imperative APIs.
 *
 * @example
 * ```typescript
 * import { toastMockFactory } from '@synerise/ds-mocks/Toast/vi';
 *
 * vi.mock('@synerise/ds-toast', toastMockFactory);
 * ```
 */
export const toastMockFactory = () => {
  const ToastComponent = vi.fn(
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
    success: vi.fn(() => 'mock-toast-id'),
    error: vi.fn(() => 'mock-toast-id'),
    info: vi.fn(() => 'mock-toast-id'),
    warning: vi.fn(() => 'mock-toast-id'),
  });

  return {
    default: Toast,
    Toast,
    showToast: vi.fn(() => 'mock-toast-id'),
    dismissToast: vi.fn(),
    removeToast: vi.fn(),
    ICONS: {},
  };
};

/**
 * Factory function for minimal Toast mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-toast', toastMinimalMockFactory);
 * ```
 */
export const toastMinimalMockFactory = () => {
  const Toast = Object.assign(
    vi.fn(() => null),
    {
      success: vi.fn(() => 'mock-toast-id'),
      error: vi.fn(() => 'mock-toast-id'),
      info: vi.fn(() => 'mock-toast-id'),
      warning: vi.fn(() => 'mock-toast-id'),
    },
  );

  return {
    default: Toast,
    Toast,
    showToast: vi.fn(() => 'mock-toast-id'),
    dismissToast: vi.fn(),
    removeToast: vi.fn(),
    ICONS: {},
  };
};
