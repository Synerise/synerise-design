import { ModalProps } from '@synerise/ds-modal/dist/Modal.types';
import { WizardProps } from '../Wizard.types';

export type OnModalProps = Omit<WizardProps, 'footer' | 'contentWidth'> & { modalProps: ModalProps };
