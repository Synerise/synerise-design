import React, { ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputGroup } from '@synerise/ds-input';
import { Props } from '@synerise/ds-input/dist/InputGroup.types';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray,
} from '../../utils';
import {
  inputGroupOptions,
  inputGroupSelectType,
  inputGroupType,
} from './InputGroup.data';

export default {
  title: 'Components/InputElements/InputGroup',
  tags: ['autodocs'],
  component: ({ leftComponent, rightComponent, ...args }) => (
    <InputGroup {...args}>
      {leftComponent}
      {rightComponent}
    </InputGroup>
  ),
  argTypes: {
    size: {
      ...controlFromOptionsArray('select', ['large', 'small', 'default']),
    },
    growItem: {
      ...controlFromOptionsArray('inline-radio', ['last', 'first']),
    },
    label: REACT_NODE_AS_STRING,
    resetMargin: BOOLEAN_CONTROL,
    compact: BOOLEAN_CONTROL,
    description: REACT_NODE_AS_STRING,
    errorText: REACT_NODE_AS_STRING,
    tooltip: REACT_NODE_AS_STRING,
    leftComponent: {
      ...controlFromOptionsArray('inline-radio', inputGroupOptions),
      mapping: inputGroupSelectType,
    },
    rightComponent: {
      ...controlFromOptionsArray('inline-radio', inputGroupOptions),
      mapping: inputGroupSelectType,
    },
  },
} as Meta<Props & { leftComponent: ReactNode; rightComponent: ReactNode }>;

type Story = StoryObj<
  Props & { leftComponent: ReactNode; rightComponent: ReactNode }
>;

export const Default: Story = {
  render: ({ leftComponent, rightComponent, ...args }) => {
    return (
      <InputGroup {...args}>
        {leftComponent}
        {rightComponent}
      </InputGroup>
    );
  },
  args: {
    size: 'default',
    label: 'label',
    resetMargin: true,
    compact: true,
    tooltip: 'tooltip',
    leftComponent: 'input',
    rightComponent: 'select',
  },
};

export const AllVariants: Story = {
  render: (args) => {
    return (
      <>
        {inputGroupType.map(
          ({ leftComponent, rightComponent, growItem }, i) => (
            // Each variant carries its own `growItem` (undefined → default 'last');
            // the ColorPicker row uses 'first' so the input stretches, keeping the
            // picker compact while the group still fills the parent.
            <InputGroup key={i} {...args} growItem={growItem}>
              {leftComponent}
              {rightComponent}
            </InputGroup>
          ),
        )}
      </>
    );
  },
  argTypes: {
    leftComponent: {
      control: false,
    },
    rightComponent: {
      control: false,
    },
    growItem: {
      control: false,
    },
  },
  args: {
    size: 'default',
    label: 'label',
    resetMargin: false,
    compact: true,
    tooltip: 'tooltip',
  },
};
