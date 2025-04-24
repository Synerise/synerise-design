import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import InlineEdit from '@synerise/ds-inline-edit';
import type { InlineEditProps } from '@synerise/ds-inline-edit';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  fixedWrapper300,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
} from '../../utils';

const InlineEditMeta = {
  title: 'Components/InlineEdit',
  component: InlineEdit,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedWrapper300],
  render: ({ input, ...args }) => {
    const [value, setValue] = useState(input.value);
    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      input.onChange?.(event);
    };
    const inputProp = {
      ...input,
      onChange: handleValueChange,
    };
    return <InlineEdit {...args} input={{ ...inputProp, value }} />;
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    autoFocus: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    hideIcon: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    tooltipTitle: STRING_CONTROL,
  },
  args: {
    input: {
      name: 'name-of-input',
      value: '',
      maxLength: 120,
      placeholder: 'Placeholder',
      autoComplete: 'off',
      onChange: fn(),
    },
  },
} as Meta<InlineEditProps>;
export default InlineEditMeta

type Story = StoryObj<InlineEditProps>;

export const Default: Story = {
  name: 'InlineEdit',
};


export const Populated: Story = {
  args: {
    input: {
      ...InlineEditMeta.args?.input,
      value: 'Test value',
      onChange: fn(),
    }
  }
};
