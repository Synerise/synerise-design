import classnames from 'classnames';
import React from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Icon, { ArrowLeftCircleM } from '@synerise/ds-icon';
import Layout from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';

import * as S from './Wizard.styles';
import { type WizardProps } from './Wizard.types';
import WizardOnModal from './onModal/onModal';

const Wizard = ({
  stepper,
  contentWidth,
  headerAction,
  footerAction,
  footer,
  footerLeft,
  title,
  onClose,
  children,
  onPrevStep,
  onNextStep,
  stepButtonProps,
  texts,
  visible,
  className,
  navigationInFooter,
  headerInlineEdit,
  headerAvatar,
}: WizardProps) => {
  const intl = useIntl();

  const prevButtonType = navigationInFooter ? 'secondary' : 'ghost';

  const prevButtonProps = stepButtonProps?.prevButtonProps
    ? stepButtonProps.prevButtonProps
    : { type: prevButtonType, mode: 'icon-label' };
  const nextButtonProps = stepButtonProps?.nextButtonProps
    ? stepButtonProps.nextButtonProps
    : { type: 'primary' };

  const navButtons = (onPrevStep || onNextStep) && (
    <>
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
    </>
  );

  const hasFooter = Boolean(
    footer || footerLeft || (navigationInFooter && navButtons) || footerAction,
  );

  const editableTitle = headerInlineEdit !== undefined;

  return visible ? (
    <S.WizardWrapper className={classnames(className, 'ds-wizard')}>
      <Layout
        fullPage
        header={
          <PageHeader
            inlineEdit={headerInlineEdit}
            avatar={editableTitle && headerAvatar}
            title={!editableTitle && title}
            onClose={onClose}
            rightSide={
              <S.WizardHeader withHeaderAction={!!headerAction}>
                {stepper && <S.WizardStepper>{stepper}</S.WizardStepper>}
                {headerAction && (
                  <S.WizardHeaderAction>{headerAction}</S.WizardHeaderAction>
                )}
              </S.WizardHeader>
            }
          />
        }
      >
        <S.WizardContainer withFooter={hasFooter}>
          <S.WizardContent contentWidth={contentWidth}>
            {children}
            {!navigationInFooter && navButtons && (
              <S.WizardButtons>{navButtons}</S.WizardButtons>
            )}
          </S.WizardContent>
        </S.WizardContainer>
        {hasFooter && (
          <S.WizardFooter>
            {(footerLeft || footer) && (
              <S.FooterLeftSide>{footerLeft || footer}</S.FooterLeftSide>
            )}
            {(footerAction || (navigationInFooter && navButtons)) && (
              <S.FooterRightSide>
                {footerAction} {navigationInFooter && navButtons}
              </S.FooterRightSide>
            )}
          </S.WizardFooter>
        )}
      </Layout>
    </S.WizardWrapper>
  ) : null;
};

Wizard.OnModal = WizardOnModal;

export default Wizard;
