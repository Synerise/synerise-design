import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { InlineSelect } from '@synerise/ds-inline-edit';
import type { InlineSelectProps } from '@synerise/ds-inline-edit';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL,
  STRING_CONTROL,
  STYLE_ARG_CONTROL,
} from '../../utils';
import { DATA_SOURCE } from './InlineSelect.data';

export default {
  title: 'Components/InlineEdit',
  component: InlineSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [centeredPaddedWrapper],
  render: args => {
    return <InlineSelect {...args} />;
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    autoFocus: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    expanded: BOOLEAN_CONTROL,
    hideIcon: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    tooltipTitle: STRING_CONTROL,
    initialValue: STRING_CONTROL,
    placeholder: STRING_CONTROL,
  },
  args: {
    input: {
      name: 'name-of-input',
      value: '',
      maxLength: 120,
    },
    placeholder: 'Placeholder',
    dataSource: DATA_SOURCE,
    onValueChange: fn(),
  },
} as Meta<InlineSelectProps>;

type Story = StoryObj<InlineSelectProps>;

export const DefaultInlineSelect: Story = {
  name: 'InlineSelect',
};
