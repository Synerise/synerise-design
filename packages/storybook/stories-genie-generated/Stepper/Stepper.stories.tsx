import type {
  Meta,
  Story
} from '@storybook/react';
import React from 'react';
import Stepper from './Stepper';
const meta: Meta = {
  title: 'Stepper',
  component: Stepper,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type StepperPropsWithoutExcluded = Omit < StepperProps, typeof excludedProps[number] > ;
type StepperStory = Story < StepperPropsWithoutExcluded > ;
const StoryTemplate: StepperStory = (args) => <Stepper {...args} />;
export const Primary = {
  ...StoryTemplate,
  args: {
    orientation: ORIENTATIONS.HORIZONTAL,
    style: {},
    children: [<Stepper.Step key="step1">Step 1</Stepper.Step>, <Stepper.Step key="step2">Step 2</Stepper.Step>, <Stepper.Step key="step3">Step 3</Stepper.Step>, ],
    size: 'default',
  },
};