import * as React from 'react';
import Divider from '@synerise/ds-divider';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    dashed: {
      control: 'boolean',
      defaultValue: false,
      description: 'If true, the divider will be dashed.',
    },
    orientation: {
      control: { type: 'select', options: ['left', 'right', 'center'] },
      defaultValue: 'center',
      description: 'The orientation of the divider text.',
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
      control: { type: 'select', options: ['undefined', 'horizontal', 'vertical'] },
      description: 'The type of the divider'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#fff', width: '300px', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Divider>;

export const Default: StoryObj<typeof Divider> = {
  render: (args) => <Divider {...args} />,
  args: {
    marginTop: 24,
    marginBottom: 24,
    dashed: false,
    labelAbove: ' ',
    labelBelow: ' '
  },
};

export const WithLabelAbove: StoryObj<typeof Divider> = {
  render: (args) => <Divider {...args} />,
  args: {
    ...Default.args,
    labelAbove: 'Label Above',
  },
};

export const WithLabelBelow: StoryObj<typeof Divider> = {
  render: (args) => <Divider {...args} />,
  args: {
    ...Default.args,
    labelBelow: 'Label Below',
  },
};

export const WithBothLabels: StoryObj<typeof Divider> = {
  render: (args) => <Divider {...args} />,
  args: {
    ...Default.args,
    labelAbove: 'Label Above',
    labelBelow: 'Label Below',
  },
};
