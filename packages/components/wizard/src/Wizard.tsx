import React from 'react';
import Layout from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header/dist/PageHeader';
import Button from '@synerise/ds-button';
import Icon, { ArrowLeftCircleM } from '@synerise/ds-icon';
import { useIntl } from 'react-intl';
import * as S from './Wizard.styles';
import { WizardProps } from './Wizard.types';
import WizardOnModal from './onModal/onModal';

const Wizard = ({
  stepper,
  contentWidth,
  headerAction,
  footer,
  title,
  onClose,
  children,
  onPrevStep,
  onNextStep,
  stepButtonProps,
  texts,
  visible,
}: WizardProps) => {
  const intl = useIntl();

  const prevButtonProps = stepButtonProps?.prevButtonProps
    ? stepButtonProps.prevButtonProps
    : { type: 'ghost', mode: 'icon-label' };
  const nextButtonProps = stepButtonProps?.nextButtonProps ? stepButtonProps.nextButtonProps : { type: 'primary' };

  return visible ? (
    <S.WizardWrapper className="ds-wizard">
      <Layout
        fullPage
        header={
          <PageHeader
            title={title}
            onClose={onClose}
            rightSide={
              <S.WizardHeader withHeaderAction={!!headerAction}>
                {stepper && <S.WizardStepper>{stepper}</S.WizardStepper>}
                {headerAction && <S.WizardHeaderAction>{headerAction}</S.WizardHeaderAction>}
              </S.WizardHeader>
            }
          />
        }
      >
        <S.WizardContainer withFooter={Boolean(footer)}>
          <S.WizardContent contentWidth={contentWidth}>
            {children}
            <S.WizardButtons>
              {onPrevStep ? (
                <Button {...prevButtonProps} onClick={onPrevStep}>
                  <Icon component={<ArrowLeftCircleM />} />{' '}
                  {texts?.prevButtonLabel ||
                    intl.formatMessage({ id: 'DS.WIZARD.PREV-BUTTON', defaultMessage: 'Back' })}
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
            </S.WizardButtons>
          </S.WizardContent>
        </S.WizardContainer>
        {footer && <S.WizardFooter>{footer}</S.WizardFooter>}
      </Layout>
    </S.WizardWrapper>
  ) : null;
};

Wizard.OnModal = WizardOnModal;

export default Wizard;
