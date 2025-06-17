import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import Checkbox from '@synerise/ds-checkbox';

import { Default } from './Checkbox.stories';

type CheckboxGroupProps = typeof Checkbox.Group;

export default {
  title: 'Components/Checkbox/CheckboxGroup',
  tags: ['autodocs'],
  component: Checkbox.Group,
  argTypes: {
    onChange: {
      control: false,
      table: {
        type: {
          summary: '(checkedValues[]) => void'
        }
      }
    }
  },
  subcomponents: { Checkbox }
} as Meta<CheckboxGroupProps>;

export const Group: StoryObj<CheckboxGroupProps> = {
  render: (args) => (
    <Checkbox.Group {...args}>
      <Checkbox
        {...Default.args}
        value="A"
      >
        Label A
      </Checkbox>
      <Checkbox
        {...Default.args}
        value="B"
      >
        Label B
      </Checkbox>
    </Checkbox.Group>
  ),
}
