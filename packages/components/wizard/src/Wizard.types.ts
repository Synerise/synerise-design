import { type ReactNode } from 'react';

import { type ButtonProps } from '@synerise/ds-button';
import type { PageHeaderProps } from '@synerise/ds-page-header';

export type WizardProps = {
  stepper?: ReactNode;

  // @deprecated
  footer?: ReactNode;

  footerLeft?: ReactNode;
  children?: ReactNode;
  title: ReactNode;
  headerAction?: ReactNode;

  /**
   * Right side of the footer bar. In `Wizard` it is rendered before the
   * prev/next buttons (which reach the footer only with `navigationInFooter`).
   * In `Wizard.OnModal` it is rendered before the next button and before
   * `modalProps.suffix`.
   */
  footerAction?: ReactNode;
  onClose: () => void;
  visible: boolean;
  contentWidth?: string;
  className?: string;
  onPrevStep?: () => void;
  onNextStep?: () => void;
  texts?: {
    prevButtonLabel: ReactNode;
    nextButtonLabel: ReactNode;
  };
  stepButtonProps?: {
    prevButtonProps?: Partial<Omit<ButtonProps, 'onClick'>>;
    nextButtonProps?: Partial<Omit<ButtonProps, 'onClick'>>;
  };
  headerInlineEdit?: PageHeaderProps['inlineEdit'];
  headerAvatar?: PageHeaderProps['avatar'];
  navigationInFooter?: boolean;
};
