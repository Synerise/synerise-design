import { ReactNode } from 'react';
import { ButtonProps } from '@synerise/ds-button';

export type WizardProps = {
  stepper?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  title: ReactNode | string;
  headerAction?: ReactNode;
  onClose: () => void;
  visible: boolean;
  contentWidth?: string;
  onPrevStep?: () => void;
  onNextStep?: () => void;
  texts?: {
    prevButtonLabel: string | ReactNode;
    nextButtonLabel: string | ReactNode;
  };
  stepButtonProps?: {
    prevButtonProps?: Partial<Omit<ButtonProps, 'onClick'>>;
    nextButtonProps?: Partial<Omit<ButtonProps, 'onClick'>>;
  };
};
