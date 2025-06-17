import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import Divider from '@synerise/ds-divider';
import { STYLE_ARG_CONTROL, CLASSNAME_ARG_CONTROL, PREFIXCLS_ARG_CONTROL } from '../../utils';

export default {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['plain', 'orientation'],
    }
  },
  argTypes: {
    style: STYLE_ARG_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    prefixCls: PREFIXCLS_ARG_CONTROL,
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
  render: (args) => <Divider {...args} />,
  
} as Meta<typeof Divider>;

export const Default: StoryObj<typeof Divider> = {
  args: {
    marginTop: 24,
    marginBottom: 24,
    dashed: false,
    labelAbove: ' ',
    labelBelow: ' '
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
