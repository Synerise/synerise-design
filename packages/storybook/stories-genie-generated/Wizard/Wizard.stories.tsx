import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from 'react';
import Layout from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header/dist/PageHeader';
import Button from '@synerise/ds-button';
import Icon, {
  ArrowLeftCircleM
} from '@synerise/ds-icon';
import {
  useIntl
} from 'react-intl';
import * as S from './Wizard.styles';
import {
  WizardProps
} from './Wizard.types';
import WizardOnModal from './onModal/onModal';
const meta: Meta < WizardProps > = {
  title: 'Wizard',
  component: Wizard,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < WizardProps > ;
const StoryTemplate: Story = {
  render: (args) => (<Wizard {...args}>
      <Layout
        fullPage
        header={
          <PageHeader
            title={args.title}
            onClose={args.onClose}
            rightSide={
              <S.WizardHeader withHeaderAction={!!args.headerAction}>
                {args.stepper && <S.WizardStepper>{args.stepper}</S.WizardStepper>}
                {args.headerAction && <S.WizardHeaderAction>{args.headerAction}</S.WizardHeaderAction>}
              </S.WizardHeader>
            }
          />
        }
      >
        <S.WizardContainer withFooter={Boolean(args.footer)}>
          <S.WizardContent contentWidth={args.contentWidth}>
            {args.children}
            <S.WizardButtons>
              {args.onPrevStep ? (
                <Button {...args.stepButtonProps.prevButtonProps} onClick={args.onPrevStep}>
                  <Icon component={<ArrowLeftCircleM />} /> {args.texts?.prevButtonLabel || intl.formatMessage({ id: 'DS.WIZARD.PREV-BUTTON', defaultMessage: 'Back' })}
                </Button>
              ) : (
                <S.ButtonPlaceholder />
              )}
              {args.onNextStep && (
                <Button {...args.stepButtonProps.nextButtonProps} onClick={args.onNextStep}>
                  {args.texts?.nextButtonLabel || intl.formatMessage({ id: 'DS.WIZARD.NEXT-BUTTON', defaultMessage: 'Next step' })}
                </Button>
              )}
            </S.WizardButtons>
          </S.WizardContent>
        </S.WizardContainer>
        {args.footer && <S.WizardFooter>{args.footer}</S.WizardFooter>}
      </Layout>
    </Wizard>),
};
export const Primary = {
  ...StoryTemplate,
  args: {
    stepper: 'Step 1 of 3',
    contentWidth: 800,
    headerAction: <Button type="secondary">Action</Button>,
    footer: <Button type="primary">Save</Button>,
    title: 'Wizard',
    onClose: () => {},
    children: (<>
        <p>Step 1</p>
        <p>Content</p>
      </>),
    onPrevStep: () => {},
    onNextStep: () => {},
    stepButtonProps: {
      prevButtonProps: {
        type: 'ghost',
        mode: 'icon-label'
      },
      nextButtonProps: {
        type: 'primary'
      },
    },
    texts: {
      prevButtonLabel: 'Previous',
      nextButtonLabel: 'Next',
    },
    visible: true,
  },
};