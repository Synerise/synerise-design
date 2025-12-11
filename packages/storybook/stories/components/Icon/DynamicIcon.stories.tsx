import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DynamicIcon } from '@synerise/ds-icon';

import {
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  STRING_CONTROL,
  centeredPaddedWrapper,
} from '../../utils';

export default {
  title: 'Components/Icon/DynamicIcon',
  component: DynamicIcon,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    size: NUMBER_CONTROL,
    name: STRING_CONTROL,
    color: { control: 'color' },
  },
} as Meta<typeof DynamicIcon>;

type Story = StoryObj<typeof DynamicIcon>;

export const Default: Story = {
  args: {
    name: 'CopyClipboardM',
  },
};
