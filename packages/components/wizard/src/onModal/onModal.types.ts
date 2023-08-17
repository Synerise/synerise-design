import { ModalProps } from '@synerise/ds-modal/src/Modal.types';
import { WizardProps } from '../Wizard.types';

export type OnModalProps = Omit<WizardProps, 'footer' | 'contentWidth'> & { modalProps: ModalProps };
