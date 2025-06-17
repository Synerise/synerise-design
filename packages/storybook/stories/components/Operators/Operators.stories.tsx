import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import Operators from '@synerise/ds-operators';
import type { OperatorsItem, OperatorsProps } from '@synerise/ds-operators';

import { OPERATORS_GROUPS, OPERATORS_ITEMS, OPERATORS_TEXTS } from './data/index.data';;
import { BOOLEAN_CONTROL, REACT_NODE_AS_STRING } from '../../utils';

export default {
  title: 'Components/Filter/Operators',
  component: Operators,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: args => {
    const [value, setValue] = useState<OperatorsItem | undefined>(args.value);
    return (
      <Operators
        {...args}
        value={value}
        onChange={value => {
          args.onChange && args.onChange(value);
          setValue(value);
        }}
      />
    );
  },
  argTypes: {
    readOnly: {
      ...BOOLEAN_CONTROL
    },
    opened: {
      ...BOOLEAN_CONTROL
    },
    errorText: {
      ...REACT_NODE_AS_STRING
    },
    onActivate: {
      action: 'onActivate',
    },
    onDectivate: {
      action: 'onDectivate',
    },
    items: {
      control: false
    },
    groups: {
      control: false
    },
    texts: {
      control: false
    }
  },
  args: {
    onActivate: fn(),
    onChange: fn(),
    onDeactivate: fn(),
    texts: OPERATORS_TEXTS,
    items: OPERATORS_ITEMS,
    groups: OPERATORS_GROUPS,
    getPopupContainerOverride: (node: HTMLElement | null) => { return node && node.parentElement || document.body }
  },
} as Meta<OperatorsProps>;

type Story = StoryObj<OperatorsProps>;

export const Default: Story = {};


export const Selected: Story = {
  args: {
    value: OPERATORS_ITEMS[4]
  }
};

export const WithError: Story = {
  args: {
    errorText: 'Error message'
  }
};

export const Readonly: Story = {
  args: {
    readOnly: true
  }
};


export const ReadonlyWithValue: Story = {
  args: {
    readOnly: true,
    value: OPERATORS_ITEMS[20]
  }
};

