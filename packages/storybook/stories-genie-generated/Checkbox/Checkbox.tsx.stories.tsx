import * as React from 'react';
import {
  Meta,
  Story
} from '@storybook/react';
import Checkbox, {
  CheckboxProps
} from './Checkbox';
const meta: Meta < CheckboxProps > = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
};
const excludedProps = ['children'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < CheckboxProps > ;
const StoryTemplate: Story = {
  render: (args) => <Checkbox {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    disabled: false,
    checked: true
  }
}