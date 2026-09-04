import React from 'react';
import { within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { DynamicIcon, type DynamicIconProps } from '@synerise/ds-icon';

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
} satisfies Meta<DynamicIconProps>;

type Story = StoryObj<DynamicIconProps>;

export const Default: Story = {
  args: {
    name: 'CopyClipboardM',
  },
  // `iconName` resolves through a dynamic import of its icon set, so without waiting Chromatic
  // snapshots the empty (correctly sized) container instead of the icon.
  play: async ({ canvasElement }) => {
    await within(canvasElement).findByTestId('ds-icon-copy-clipboard-m');
  },
};

export const Fallback: Story = {
  args: {
    name: 'NonExistentIcon',
    fallback: 'fallback content',
  },
  play: async ({ canvasElement }) => {
    await within(canvasElement).findByText('fallback content');
  },
};
