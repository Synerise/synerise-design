import React, { useState } from 'react';

import type { StoryObj, Meta } from '@storybook/react-webpack5';

import Stepper from '@synerise/ds-stepper';

import {
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL,
  STYLE_ARG_CONTROL,
} from '../../utils';
import { StepData, STEPPER_STEPS } from './Stepper.data';

type StoryProps = typeof Stepper & {
  steps: Array<StepData>;
  activeIndex?: number;
};
export default {
  title: 'Components/Stepper',
  tags: ['autodocs'],
  component: Stepper,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    activeIndex: { table: { category: 'Story options' } },
    steps: { table: { category: 'Story options' } },
  },
  render: ({ steps, activeIndex, ...args }) => {
    const [activeStep, setActiveStep] = useState(activeIndex);
    const handleStepClick = index => setActiveStep(index);
    return (
      <Stepper {...args}>
        {steps.map((step: StepData, index: number) => (
          <Stepper.Step
            {...step}
            onClick={() => handleStepClick(index)}
            active={index === activeStep}
            done={index < activeStep}
          />
        ))}
      </Stepper>
    );
  },
  args: {
    steps: STEPPER_STEPS,
  },
} as Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};

export const AllDone: Story = {
  args: {
    activeIndex: STEPPER_STEPS.length,
  },
};

export const WithWarningAndValidation: Story = {
  args: {
    activeIndex: 3,
    steps: STEPPER_STEPS.map((step, index) => ({ ...step, warning: index === 2, validated: index === 3 })),
  },
};
