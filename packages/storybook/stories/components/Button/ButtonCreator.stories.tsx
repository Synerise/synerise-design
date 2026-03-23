import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@synerise/ds-button';
import type { CreatorProps } from '@synerise/ds-button';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  STRING_CONTROL,
  controlFromOptionsArray,
  fixedWrapper400,
} from '../../utils';

const meta: Meta<CreatorProps> = {
  title: 'Components/Button/Creator',
  tags: ['autodocs'],
  decorators: [fixedWrapper400],
  component: Button.Creator,
  argTypes: {
    status: {
      ...controlFromOptionsArray('select', ['default', 'error', 'upload']),
    },
    label: STRING_CONTROL,
    block: BOOLEAN_CONTROL,
    labelAlign: {
      ...controlFromOptionsArray('select', ['center', 'left']),
    },
    disabled: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
  },
};

export default meta;

export const Creator: StoryObj<CreatorProps> = {
  render: (args) => <Button.Creator {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Creator />`,
      },
    },
  },
};

export const CreatorWithLabel: StoryObj<CreatorProps> = {
  ...Creator,
  args: {
    label: 'Label',
  },
  parameters: {
    docs: {
      source: {
        code: `<Creator label="Label" />`,
      },
    },
  },
};

export const CreatorBlock: StoryObj<CreatorProps> = {
  ...Creator,
  args: {
    label: 'Label',
    block: true,
    labelAlign: 'center',
  },
  parameters: {
    docs: {
      source: {
        code: `<Creator
  label="Label"
  block
  labelAlign="center"
/>`,
      },
    },
  },
};
