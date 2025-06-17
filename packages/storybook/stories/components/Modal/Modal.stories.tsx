import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import Modal from '@synerise/ds-modal';
import { ObjectAvatar } from '@synerise/ds-avatar';
import Icon, { MailM, UserM } from '@synerise/ds-icon';
import Stepper from '@synerise/ds-stepper';
import { theme } from '@synerise/ds-core';
import * as S from './styles';
import { sizes, headerWithPrefix, color } from './Modal.data';
import { StepData, STEPPER_STEPS } from '../Stepper/Stepper.data';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL, controlFromOptionsArray, NUMBER_CONTROL,
  REACT_NODE_AS_STRING, reactNodeAsSelect,
} from '../../utils';



export default {
  title: "Components/Modal",
  component: Modal,
  render: (args, storyContext) => {
    const visible = storyContext.viewMode === 'docs' ? false : args.visible;
    return <Modal {...args} visible={visible} />
  },
  decorators: [centeredPaddedWrapper],
  argTypes: {
    wrapClassName: CLASSNAME_ARG_CONTROL,
    visible: BOOLEAN_CONTROL,
    title: {
      ...reactNodeAsSelect(
        ['blank', 'title', 'withAvatar', 'iconAndLabel'],
        {
          blank: '',
          title: 'Title',
          withAvatar: headerWithPrefix(
            'Header with avatar',
            <ObjectAvatar
              badgeStatus="active"
              iconComponent={<Icon component={<MailM />} color={theme.palette['red-500']} />}
            />
          ),
          iconAndLabel: headerWithPrefix('Header with icon', <Icon component={<UserM />} color={theme.palette['grey-600']} />),

        }
      ),
    },
    description: REACT_NODE_AS_STRING,
    cancelText: REACT_NODE_AS_STRING,
    okText: REACT_NODE_AS_STRING,
    width: NUMBER_CONTROL,
    okType: REACT_NODE_AS_STRING,
    zIndex: NUMBER_CONTROL,
    bodyBackground: {
      ...controlFromOptionsArray('select', color),
    },
    closable: BOOLEAN_CONTROL,
    confirmLoading: BOOLEAN_CONTROL,
    withTabs: BOOLEAN_CONTROL,
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
      ...controlFromOptionsArray('select', sizes),
    },

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
    description: 'Description',
    footer: null,
    size: 'small',
    children: <div style={{ height: 362 }}></div>,
  },
};


export const Fullscreen: Story = {
  args: {
    visible: true,
    title: 'title',
    description: 'Description',
    size: 'fullScreen',
    children: <div style={{ height: 1400, backgroundColor: 'rgba(0,0,0,0.2)' }}></div>,
  },
};

export const withFooter: Story = {
  args: {
    visible: true,
    title: 'title',
    description: 'Description',
    onOk: 'Apply',
    onCancel: 'Cancel',
    size: 'small',
    children: 'Modal content...',
  },
};

export const withScroll: Story = {
  args: {
    visible: true,
    title: 'title',
    description: 'Description',
    footer: null,
    size: 'small',
    children: <div> Modal content... Modal content... Modal content... Modal content... Modal content... Modal
      content... Modal content... Modal content...Modal content... Modal content... Modal content... Modal content...
      Modal content... Modal content... Modal content... Modal content... Modal content... Modal content... Modal
      content... Modal content... Modal content... Modal content... Modal content... Modal content... Modal content...
      Modal content... Modal content... Modal content... Modal content... Modal content... Modal content... Modal
      content...Modal content... Modal content... Modal content... Modal content... Modal content... Modal content...
      Modal content... Modal content... Modal content... Modal content... Modal content... Modal content... Modal
      content... Modal content... Modal content... Modal content...Modal content... Modal content... Modal content...
      Modal content... Modal content... Modal content... Modal content... Modal content...Modal content... Modal
      content... Modal content... Modal content... Modal content... Modal content... Modal content... Modal content...
      Modal content... Modal content... Modal content... Modal content... Modal content... Modal content... Modal
      content... Modal content...</div>,
    maxViewportHeight: 70,
  },
};

export const ModalWithStepper: Story = {
  render: ({activeIndex, ...args }) => {
    const [activeStep, setActiveStep] = useState(activeIndex);
    const handleStepClick = index => setActiveStep(index);
    return (
        <Modal {...args} >
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
    )
  },
  args: {
    visible: true,
    title: 'title',
    description: 'Description',
    onOk: 'Apply',
    onCancel: 'Cancel',
    size: 'medium',
  },
};


