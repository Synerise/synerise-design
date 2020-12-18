import * as React from 'react';
import WizardOnModal from './onModal/onModal';

export type WizardProps = {
  stepper?: React.ReactNode;
  footer?: React.ReactNode;
  title: React.ReactNode | string;
  headerAction?: React.ReactNode;
  onClose: () => void;
  visible: boolean;
  contentWidth?: string;
  onPrevStep?: () => void;
  onNextStep?: () => void;
  texts?: {
    prevButtonLabel: string | React.ReactNode;
    nextButtonLabel: string | React.ReactNode;
  };
};

export type WizardSubComponent = {
  OnModal: typeof WizardOnModal;
};
