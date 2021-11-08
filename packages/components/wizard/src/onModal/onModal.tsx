import * as React from 'react';
import Modal from '@synerise/ds-modal';
import Button from '@synerise/ds-button';
import Icon, { ArrowLeftCircleM } from '@synerise/ds-icon';
import { useIntl } from 'react-intl';
import { OnModalProps } from './onModal.types';
import * as S from '../Wizard.styles';

const WizardOnModal: React.FC<OnModalProps> = ({
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
}) => {
  const intl = useIntl();
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      closable
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
            <Button mode="icon-label" type="ghost" onClick={onPrevStep}>
              <Icon component={<ArrowLeftCircleM />} />{' '}
              {texts?.prevButtonLabel || intl.formatMessage({ id: 'DS.WIZARD.PREV-BUTTON', defaultMessage: 'Back' })}
            </Button>
          ) : (
            <S.ButtonPlaceholder />
          )}
          {onNextStep && (
            <Button type="primary" onClick={onNextStep}>
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
