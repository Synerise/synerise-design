import type {
  Meta,
  Story
} from '@storybook/react';
import React from 'react';
import {
  Input,
  TextArea
} from './Input';
const meta: Meta = {
  title: 'Input',
  component: Input,
};
export default meta;
const excludedProps = ['id', 'className', 'handleInputRef'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type InputStoryArgs = React.ComponentProps < typeof Input > ;
const StoryTemplate: Story < InputStoryArgs > = (args) => <Input {...args} />;
export const Primary = StoryTemplate.bind({});
Primary.args = {
  label: 'Input',
  placeholder: 'Enter value',
};
export const WithError = StoryTemplate.bind({});
WithError.args = {
  label: 'Input with error',
  placeholder: 'Enter value',
  errorText: 'Invalid input',
};
export const WithDescription = StoryTemplate.bind({});
WithDescription.args = {
  label: 'Input with description',
  placeholder: 'Enter value',
  description: 'This is a description',
};
export const TextareaPrimary = () => <TextArea />;
export const TextareaWithError = () => <TextArea errorText="Invalid input" />;
export const TextareaWithDescription = () => <TextArea description="This is a description" />;