import React, { useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import { ObjectAvatar } from '@synerise/ds-avatar';
import { theme } from '@synerise/ds-core';
import Icon, { MailM, UserM } from '@synerise/ds-icon';
import Modal from '@synerise/ds-modal';
import Stepper from '@synerise/ds-stepper';

import { Placeholder, PropNamePill } from '../../constants';
import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  centeredPaddedWrapper,
  controlFromOptionsArray,
  reactNodeAsSelect,
} from '../../utils';
import { STEPPER_STEPS, StepData } from '../Stepper/Stepper.data';
import { SIZES, TAB_PROPS, headerWithPrefix } from './Modal.data';
import * as S from './styles';

export default {
  title: 'Components/Modal',
  component: Modal,
  render: (args, storyContext) => {
    const visible = storyContext.viewMode === 'docs' ? false : args.visible;
    return <Modal {...args} visible={visible} />;
  },
  decorators: [centeredPaddedWrapper],
  argTypes: {
    wrapClassName: CLASSNAME_ARG_CONTROL,
    visible: BOOLEAN_CONTROL,
    title: {
      ...reactNodeAsSelect(['blank', 'title', 'withAvatar', 'iconAndLabel'], {
        blank: '',
        title: 'Title',
        withAvatar: headerWithPrefix(
          'Header with avatar',
          <ObjectAvatar
            badgeStatus="active"
            iconComponent={
              <Icon component={<MailM />} color={theme.palette['red-500']} />
            }
          />,
        ),
        iconAndLabel: headerWithPrefix(
          'Header with icon',
          <Icon component={<UserM />} color={theme.palette['grey-600']} />,
        ),
      }),
    },
    description: REACT_NODE_AS_STRING,
    cancelText: REACT_NODE_AS_STRING,
    okText: REACT_NODE_AS_STRING,
    width: NUMBER_CONTROL,
    okType: REACT_NODE_AS_STRING,
    zIndex: NUMBER_CONTROL,
    bodyBackground: {
      ...controlFromOptionsArray('select', ['white', 'grey']),
    },
    closable: BOOLEAN_CONTROL,
    confirmLoading: BOOLEAN_CONTROL,
    onOk: {
      action: 'onOk',
    },
    onCancel: {
      action: 'onCancel',
    },
    settingButton: REACT_NODE_AS_STRING,
    showHeaderAction: BOOLEAN_CONTROL,
    headerActions: REACT_NODE_AS_STRING,
    renderCustomFooter: BOOLEAN_CONTROL,
    footer: REACT_NODE_AS_STRING,
    removeFooter: BOOLEAN_CONTROL,
    maxViewportHeight: NUMBER_CONTROL,
    size: {
      ...controlFromOptionsArray('select', SIZES),
    },
  },
  args: {
    onOk: fn(),
    onCancel: fn(),
  },
} as Meta<typeof Modal>;

type Story = StoryObj<typeof Modal>;

export const Blank: Story = {
  args: {
    visible: true,
    blank: true,
    footer: null,
    size: 'small',
    children: <div style={{ height: 362 }}></div>,
  },
};

export const withHeader: Story = {
  args: {
    visible: true,
    title: 'title',
    footer: null,
    size: 'small',
    children: <div style={{ height: 362 }}></div>,
  },
};

export const withTabs: Story = {
  args: {
    visible: true,
    headerTabProps: TAB_PROPS,
    title: (
      <>
        title <PropNamePill>title</PropNamePill>
      </>
    ),
    headerBottomBar: (
      <>
        header bottom bar content <PropNamePill>headerBottomBar</PropNamePill>
      </>
    ),
    footer: null,
    size: 'small',
    children: <Placeholder $height={400} />,
  },
};

export const Fullscreen: Story = {
  args: {
    visible: true,
    title: 'title',
    size: 'fullScreen',
    children: <Placeholder $height={1400} />,
  },
};

export const withFooter: Story = {
  args: {
    visible: true,
    title: 'title',
    size: 'small',
    children: 'Modal content...',
  },
};

export const withScroll: Story = {
  args: {
    visible: true,
    title: 'title',
    footer: null,
    size: 'small',
    children: <Placeholder $height={600} />,
    maxViewportHeight: 70,
  },
};

export const ModalWithStepper: Story = {
  render: ({ activeIndex, ...args }) => {
    const [activeStep, setActiveStep] = useState(activeIndex);
    const handleStepClick = (index) => setActiveStep(index);
    return (
      <Modal {...args}>
        <S.StepperWrapper>
          <Stepper style={{ width: '100%', justifyContent: 'center' }}>
            {STEPPER_STEPS.map((step: StepData, index: number) => (
              <Stepper.Step
                {...step}
                onClick={() => handleStepClick(index)}
                active={index === activeStep}
                done={index < activeStep}
              />
            ))}
          </Stepper>
        </S.StepperWrapper>
      </Modal>
    );
  },
  args: {
    visible: true,
    title: 'title',
    size: 'medium',
  },
};
