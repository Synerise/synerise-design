import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import InputNumber, { InputNumberProps } from '@synerise/ds-input-number';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
  fixedWrapper300,
} from '../../utils';

type Story = StoryObj<InputNumberProps>;
export default {
  component: InputNumber,
  title: 'Components/InputElements/InputNumber',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  parameters: {
    controls: {
      exclude: ['precision'],
    },
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    defaultValue: NUMBER_CONTROL,
    value: NUMBER_CONTROL,
    min: NUMBER_CONTROL,
    max: NUMBER_CONTROL,
    step: NUMBER_CONTROL,
    disabled: BOOLEAN_CONTROL,
    raw: BOOLEAN_CONTROL,
    autoResize: {
      control: 'select',
      options: ['false', 'min & max width', 'stretch to fit'],
      mapping: {
        false: false,
        'min & max width': { minWidth: '100px', maxWidth: '300px' },
        'stretch to fit': { minWidth: '100px', stretchToFit: true },
      },
    },
    readOnly: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    errorText: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    tooltip: REACT_NODE_AS_STRING,
    tooltipConfig: { control: false },
    prefixel: REACT_NODE_AS_STRING,
    suffixel: REACT_NODE_AS_STRING,
    id: STRING_CONTROL,
    onChange: {
      action: 'onChange',
    },
    onBlur: {
      action: 'onBlur',
    },
  },
  args: {
    onChange: fn(),
    onBlur: fn(),
  },
} as Meta<InputNumberProps>;

export const Default: Story = {};

export const WithLabelAndDescription: Story = {
  args: {
    label: 'Label',
    description: 'Description',
  },
};

export const WithAutoSize: Story = {
  args: {
    autoResize: {
      minWidth: '50px',
      maxWidth: '170px',
    },
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 40,
  },
};

export const WithTooltip: Story = {
  args: {
    ...WithLabelAndDescription.args,
    tooltip: 'Tooltip text',
  },
};

export const WithErrorMessage: Story = {
  args: {
    label: 'Label',
    description: 'Description',
    error: true,
    errorText: 'An error occurred',
  },
};
