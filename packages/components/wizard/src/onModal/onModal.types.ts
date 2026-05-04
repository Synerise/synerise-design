import { type ModalProps } from '@synerise/ds-modal';

import { type WizardProps } from '../Wizard.types';

export type OnModalProps = Omit<WizardProps, 'footer' | 'contentWidth'> & {
  modalProps: ModalProps;
};
