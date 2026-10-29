import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import Checkbox from '@synerise/ds-checkbox';

import { BOOLEAN_CONTROL } from '../../utils';
import { Default } from './Checkbox.stories';

type CheckboxGroupProps = typeof Checkbox.Group;

export default {
  title: 'Components/Checkbox/CheckboxGroup',
  tags: ['autodocs'],
  component: Checkbox.Group,
  argTypes: {
    disabled: BOOLEAN_CONTROL,
    onChange: {
      control: false,
      table: {
        type: {
          summary: '(checkedValues[]) => void',
        },
      },
    },
  },
  subcomponents: { Checkbox },
} as Meta<CheckboxGroupProps>;

export const Group: StoryObj<CheckboxGroupProps> = {
  render: (args) => (
    <Checkbox.Group {...args}>
      <Checkbox {...Default.args} value="A">
        Label A
      </Checkbox>
      <Checkbox {...Default.args} value="B">
        Label B
      </Checkbox>
    </Checkbox.Group>
  ),
};
