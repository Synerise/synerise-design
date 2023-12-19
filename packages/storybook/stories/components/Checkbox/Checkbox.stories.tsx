import React from 'react';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Checkbox from '@synerise/ds-checkbox';
import { CheckboxProps } from '@synerise/ds-checkbox/dist/Checkbox.types';

type ComponentProps = CheckboxProps & {
  label?: string;
}

const meta: Meta < ComponentProps > = {
  title: 'Components/Checkbox/Checkbox',
  component: Checkbox,
  argTypes: {
    children: {
      control: 'text',
      table: {
        type: {
          summary: 'ReactNode'
        }
      }
    },
  }
};
export default meta;
type Story = StoryObj < ComponentProps > ;
const StoryTemplate: Story = {
  render: (args) => <Checkbox {...args}  />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    description: "This is a checkbox component",
    // errorText: "Some Error",
    withoutPadding: false,
    hasError: false,
    children: 'Label'
  }
}