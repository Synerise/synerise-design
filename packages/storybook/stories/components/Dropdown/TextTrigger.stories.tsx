import React, { ReactNode, useRef, useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Dropdown, TextTrigger } from '@synerise/ds-dropdown';

import { Placeholder } from '../../constants';
import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray,
  fixedWrapper400,
} from '../../utils';
import Advanced from './Advanced';
import {
  data,
  dataCopy,
  dataItems,
  menuData,
  tabsWithIcons,
} from './Dropdown.data';
import * as S from './Dropdown.styles';

type DataType = {
  id: string;
  text: string;
};

export default {
  title: 'Components/Dropdown/TextTrigger',
  component: TextTrigger,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: REACT_NODE_AS_STRING,
    size: controlFromOptionsArray('radio', [1, 2, 3, 4, 5, 6]),
    expanded: BOOLEAN_CONTROL,
    isDisabled: BOOLEAN_CONTROL,
  },
  args: {
    value: 'Trigger text',
    size: 4,
    onClick: fn(),
    onFocus: fn(),
  },
} as Meta<typeof TextTrigger>;

type Story = StoryObj<typeof TextTrigger>;

export const Default: Story = {};
export const WithDropdown: Story = {
  render: (args) => (
    <Dropdown overlay={<Placeholder $height={300} />} size="medium">
      <TextTrigger {...args} />
    </Dropdown>
  ),
};
