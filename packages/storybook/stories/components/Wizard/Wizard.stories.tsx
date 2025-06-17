import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import Wizard, { WizardProps } from '@synerise/ds-wizard';
import { theme } from '@synerise/ds-core';
import Button from '@synerise/ds-button';
import { action } from 'storybook/actions';
import { ObjectAvatar } from '@synerise/ds-avatar';
import Icon, { AcademyM, ChatM, EditM, HelpM, MailM } from '@synerise/ds-icon';
import Stepper from '@synerise/ds-stepper';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
} from '../../utils';
import { STEPS } from './Wizard.data';

type Story = StoryObj<WizardProps>;
export default {
  component: Wizard,
  title: 'Components/Wizard',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    visible: BOOLEAN_CONTROL,
    navigationInFooter: BOOLEAN_CONTROL,
    title: REACT_NODE_AS_STRING,
  },
  args: {
    children: <div style={{ width: '100%', height: '400px', backgroundColor: theme.palette['red-200'] }}></div>,
    visible: true,
    headerAction: <Button>Save and skip wizard</Button>,
    title: 'Wizard Title',
    onClose: fn(),
  },
  render: args => {
    const [activeStep, setActiveStep] = useState(0);

    const handlePrevStep = () => setActiveStep(activeStep - 1);
    const handleNextStep = () => setActiveStep(activeStep + 1);

    return (
      <Wizard
        {...args}
        onPrevStep={activeStep === 0 ? undefined : handlePrevStep}
        onNextStep={activeStep === 3 ? undefined : handleNextStep}
      />
    );
  },
} as Meta<WizardProps>;

export const Default: Story = {};
export const FooterContent: Story = {
  args: {
    navigationInFooter: true,
    footerAction: (
      <Button type="secondary" onClick={action('footer action')}>
        Skip wizard
      </Button>
    ),
    footerLeft: (
      <>
        <Button mode="icon-label" type="ghost" onClick={fn()}>
          <Icon component={<AcademyM />} /> AI Search Help
        </Button>
        <Button mode="icon-label" type="ghost" onClick={fn()}>
          <Icon component={<ChatM />} /> Feedback about AI Search?
        </Button>
        <Button mode="icon-label" type="ghost" onClick={fn()}>
          <Icon component={<HelpM />} /> Contact support
        </Button>
      </>
    ),
  },
};
export const NavigationInFooter: Story = {
  args: { navigationInFooter: true },
};
export const EditableTitle: Story = {
  args: {
    headerAvatar: (
      <ObjectAvatar
        iconComponent={<Icon component={<MailM />} color={theme.palette['red-600']} />}
        badgeStatus="active"
      />
    ),
    headerInlineEdit: {
      name: 'name-of-input',
      value: 'Wizard title',
      maxLength: 60,
      handleOnChange: action('onChange'),
      handleOnBlur: () => action('onBlur'),
      handleOnEnterPress: () => action('onEnterPress'),
      placeholder: 'Example text',
      size: 'normal',
      customIcon: <EditM />,
    },
  },
};
export const WithStepper: Story = {
  render: args => {
    const [activeStep, setActiveStep] = useState(0);

    const handlePrevStep = () => setActiveStep(activeStep - 1);
    const handleNextStep = () => setActiveStep(activeStep + 1);

    return (
      <Wizard
        {...args}
        onPrevStep={activeStep === 0 ? undefined : handlePrevStep}
        onNextStep={activeStep === 3 ? undefined : handleNextStep}
        stepper={
          <Stepper>
            {STEPS.map((step, index) => (
              <Stepper.Step
                onClick={() => setActiveStep(index)}
                label={step.label}
                stepNumber={step.number}
                active={index === activeStep}
                done={index < activeStep}
                validated={false}
                tooltip={false}
                children={step.children}
              />
            ))}
          </Stepper>
        }
      />
    );
  },
  args: {},
};
export const OnModal: StoryObj<typeof Wizard.OnModal> = {
  render: args => {
    const [activeStep, setActiveStep] = useState(0);

    const handlePrevStep = () => setActiveStep(activeStep - 1);
    const handleNextStep = () => setActiveStep(activeStep + 1);

    return (
      <Wizard.OnModal
        {...args}
        onPrevStep={activeStep === 0 ? undefined : handlePrevStep}
        onNextStep={activeStep === 3 ? undefined : handleNextStep}
      />
    );
  },
  args: {
    modalProps: {
      size: 'medium',
    },
  },
};
