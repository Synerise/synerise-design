import React from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Icon, { ArrowLeftCircleM } from '@synerise/ds-icon';
import Modal from '@synerise/ds-modal';

import * as S from '../Wizard.styles';
import { type OnModalProps } from './onModal.types';

const WizardOnModal = ({
  visible,
  stepper,
  headerAction,
  title,
  onClose,
  children,
  onPrevStep,
  onNextStep,
  texts,
  modalProps,
  stepButtonProps,
}: OnModalProps) => {
  const intl = useIntl();
  const prevButtonProps = stepButtonProps?.prevButtonProps
    ? stepButtonProps.prevButtonProps
    : { type: 'ghost', mode: 'icon-label' };
  const nextButtonProps = stepButtonProps?.nextButtonProps
    ? stepButtonProps.nextButtonProps
    : { type: 'primary' };
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title={title}
      {...modalProps}
      headerActions={
        <S.HeaderActions>
          {stepper} {headerAction}
        </S.HeaderActions>
      }
      footer={
        <S.ModalWizardButtons>
          {onPrevStep ? (
            <Button {...prevButtonProps} onClick={onPrevStep}>
              <Icon component={<ArrowLeftCircleM />} />{' '}
              {texts?.prevButtonLabel ||
                intl.formatMessage({
                  id: 'DS.WIZARD.PREV-BUTTON',
                  defaultMessage: 'Back',
                })}
            </Button>
          ) : (
            <S.ButtonPlaceholder />
          )}
          {onNextStep && (
            <Button {...nextButtonProps} onClick={onNextStep}>
              {texts?.nextButtonLabel ||
                intl.formatMessage({
                  id: 'DS.WIZARD.NEXT-BUTTON',
                  defaultMessage: 'Next step',
                })}
            </Button>
          )}
        </S.ModalWizardButtons>
      }
    >
      <S.ModalWizardContent>{children}</S.ModalWizardContent>
    </Modal>
  );
};

export default WizardOnModal;
