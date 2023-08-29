import { ReactNode } from 'react';
import { ButtonProps } from '@synerise/ds-button';
import WizardOnModal from './onModal/onModal';

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

export type WizardSubComponent = {
  OnModal: typeof WizardOnModal;
};
