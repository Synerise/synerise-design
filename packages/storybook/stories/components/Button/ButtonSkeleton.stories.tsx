import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Skeleton from '@synerise/ds-skeleton';
import { controlFromOptionsArray, fixedWrapper200 } from '../../utils';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Button/ButtonSkeleton',
  tags: ['autodocs'],
  component: Skeleton,
  decorators: [fixedWrapper200],
  argTypes: {
    width: {
      ...controlFromOptionsArray('select', ['S','M','L'])
    },
    size: {
      ...controlFromOptionsArray('select', ['S','M','L'])
    }
  },
};

export default meta;

export const ButtonSkeleton: StoryObj<typeof Skeleton> = {
  render: (args) => (
    <Skeleton numberOfSkeletons={1} width='M' size='L'/>
  ),
  parameters: {
    controls: {
      include: []
    }
  },
  
}
