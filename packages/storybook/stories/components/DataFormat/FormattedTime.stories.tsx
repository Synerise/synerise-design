import React from 'react';

import { FormattedTime } from '@synerise/ds-data-format';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fixedWrapper200 } from '../../utils';

export default {
  component: FormattedTime,
  title: 'Components/DataFormat/FormattedTime',
  tags: ['autodocs'],
  render: args => {
    return <FormattedTime {...args} />;
  },
  decorators: [fixedWrapper200],
  argTypes: {},
  args: {
    value: new Date('2023-06-25T15:40:00'),
  },
} as Meta<typeof FormattedTime>;

export const Default: StoryObj<typeof FormattedTime> = {};
