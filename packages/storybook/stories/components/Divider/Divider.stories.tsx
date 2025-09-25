import React from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Divider from '@synerise/ds-divider';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  STYLE_ARG_CONTROL,
} from '../../utils';

export default {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    style: STYLE_ARG_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    hiddenLine: BOOLEAN_CONTROL,
    marginTop: NUMBER_CONTROL,
    marginBottom: NUMBER_CONTROL,
    dashed: {
      control: 'boolean',
      defaultValue: false,
      description: 'If true, the divider will be dashed.',
    },
    labelAbove: {
      control: 'text',
      description: 'The text label above the divider.',
    },
    labelBelow: {
      control: 'text',
      description: 'The text label below the divider.',
    },
    type: {
      control: { type: 'select', options: ['horizontal', 'vertical'] },
      description: 'The type of the divider',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#fff', width: '300px', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <Divider {...args} />,
} as Meta<typeof Divider>;

export const Default: StoryObj<typeof Divider> = {
  args: {
    marginTop: 24,
    marginBottom: 24,
    dashed: false,
    labelAbove: ' ',
    labelBelow: ' ',
  },
};

export const WithLabelAbove: StoryObj<typeof Divider> = {
  args: {
    ...Default.args,
    labelAbove: 'Label Above',
  },
};

export const WithLabelBelow: StoryObj<typeof Divider> = {
  args: {
    ...Default.args,
    labelBelow: 'Label Below',
  },
};

export const WithBothLabels: StoryObj<typeof Divider> = {
  args: {
    ...Default.args,
    labelAbove: 'Label Above',
    labelBelow: 'Label Below',
  },
};
