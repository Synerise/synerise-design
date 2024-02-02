import { ReactNode } from 'react';
import { ButtonProps } from '@synerise/ds-button';

export type WizardProps = {
  stepper?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  title: ReactNode;
  headerAction?: ReactNode;
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
};
