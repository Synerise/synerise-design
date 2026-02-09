import React from 'react';

import type { ModalProps } from '@synerise/ds-modal';

export type MockModalProps = ModalProps & {
  'data-testid'?: string;
};

/**
 * Factory function for Modal mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { modalMockFactory } from '@synerise/ds-mocks/Modal/vi';
 *
 * vi.mock('@synerise/ds-modal', modalMockFactory);
 * ```
 */
export const modalMockFactory = () => ({
  default: vi.fn(
    ({
      open,
      visible,
      title,
      children,
      onCancel,
      onOk,
      footer,
      closable = true,
      size,
      texts,
      'data-testid': dataTestId,
    }: MockModalProps) => {
      const isOpen = open ?? visible;
      if (!isOpen) {
        return null;
      }

      const testId = dataTestId || 'ds-modal';

      return (
        <div
          data-testid={testId}
          className="ds-modal"
          data-size={size}
          role="dialog"
        >
          <div data-testid={`${testId}-header`}>
            {title && <div data-testid={`${testId}-title`}>{title}</div>}
            {closable && (
              <button
                data-testid={`${testId}-close`}
                onClick={onCancel}
                aria-label="Close"
              >
                ×
              </button>
            )}
          </div>
          <div data-testid={`${testId}-body`}>{children}</div>
          {footer !== null && (
            <div data-testid={`${testId}-footer`}>
              {footer || (
                <>
                  <button data-testid={`${testId}-cancel`} onClick={onCancel}>
                    {texts?.cancelButton || 'Cancel'}
                  </button>
                  <button data-testid={`${testId}-ok`} onClick={onOk}>
                    {texts?.okButton || 'OK'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      );
    },
  ),
});

/**
 * Factory function for minimal Modal mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-modal', modalMinimalMockFactory);
 * ```
 */
export const modalMinimalMockFactory = () => ({
  default: vi.fn(({ open, visible, children }: MockModalProps) => {
    const isOpen = open ?? visible;
    return isOpen ? <div data-testid="ds-modal">{children}</div> : null;
  }),
});
