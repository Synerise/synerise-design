// import React, { CSSProperties } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Array, { ArrayProps } from '@synerise/ds-array';
import { fixedWrapper400 } from '../../utils';

export default {
    title: 'Components/Array',
    component: Array,
  tags: ['autodocs'],
  decorators: [fixedWrapper400],
  argTypes: {
  },
} as Meta<ArrayProps>;

export const Default: StoryObj<ArrayProps> = {}