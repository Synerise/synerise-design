import * as React from 'react';
import Modal from '@synerise/ds-modal';
import Button from '@synerise/ds-button';
import Icon, { ArrowLeftCircleM } from '@synerise/ds-icon';
import { useIntl } from 'react-intl';
import { OnModalProps } from './onModal.types';
import * as S from '../Wizard.styles';

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
  const nextButtonProps = stepButtonProps?.nextButtonProps ? stepButtonProps.nextButtonProps : { type: 'primary' };
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
              {texts?.prevButtonLabel || intl.formatMessage({ id: 'DS.WIZARD.PREV-BUTTON', defaultMessage: 'Back' })}
            </Button>
          ) : (
            <S.ButtonPlaceholder />
          )}
          {onNextStep && (
            <Button {...nextButtonProps} onClick={onNextStep}>
              {texts?.nextButtonLabel ||
                intl.formatMessage({ id: 'DS.WIZARD.NEXT-BUTTON', defaultMessage: 'Next step' })}
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
