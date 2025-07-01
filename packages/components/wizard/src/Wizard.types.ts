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
