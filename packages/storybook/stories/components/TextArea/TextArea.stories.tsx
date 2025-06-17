import React, { ChangeEvent } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';

import { TextArea, TextareaProps } from '@synerise/ds-input';
import Icon, { Add2M, FileM } from '@synerise/ds-icon';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  fixedWrapper300,
  NUMBER_CONTROL,
  PREFIXCLS_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
} from '../../utils';

type Story = StoryObj<TextareaProps>;
export default {
  component: TextArea,
  title: 'Components/InputElements/TextArea',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: args => {
    const [{ value }, updateArgs] = useArgs();
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      updateArgs({ value: event.target.value });
      args.onChange?.(event);
    };
    return <TextArea {...args} onChange={handleChange} value={value} />;
  },
  parameters: {
    controls: {
      exclude: ['bordered', 'autoResize', 'expandable', 'expandableTooltip',]
    }
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    value: STRING_CONTROL,
    readOnly: BOOLEAN_CONTROL,
    maxLength: NUMBER_CONTROL,
    error: BOOLEAN_CONTROL,
    errorText: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    counterLimit: NUMBER_CONTROL,
  },
  args: {},
} as Meta<TextareaProps>;

export const Default: Story = {};

export const WithLabelAndDescription: Story = {
  args: {
    label: 'Label',
    description: 'Description',
    value: 'Sample text'
  },
};

export const WithError: Story = {
  args: {
    ...WithLabelAndDescription.args,
    error: true,
    errorText: 'Error Message'
  },
};

export const Disabled: Story = {
  args: {
    ...WithLabelAndDescription.args,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...WithLabelAndDescription.args,
    readOnly: true,
  },
};

export const WithMinAndMaxRows: Story = {
  args: {
    ...WithLabelAndDescription.args,
    autoSize: { minRows: 5, maxRows: 10 },
  },
};
export const WithCounter: Story = {
  args: {
    ...WithLabelAndDescription.args,
    counterLimit: 200,
  },
};

export const WithCustomCounter: Story = {
  args: {
    ...WithLabelAndDescription.args,
    renderCustomCounter: (count?: number) => count !== undefined && <>{count} characters billed as 1 SMS</>,
  },
};

export const WithIcons: Story = {
  args: {
    ...WithLabelAndDescription.args,
    icon1: <Icon component={<Add2M />} />,
    icon1Tooltip: <>Icon 1 tooltip text</>,
    icon2: <Icon component={<FileM />} />,
    icon2Tooltip: <>Icon 2 tooltip text</>,
  },
};
