import React from 'react';

import { FormattedDate } from '@synerise/ds-data-format';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fixedWrapper200 } from '../../utils';

export default {
  component: FormattedDate,
  title: 'Components/DataFormat/FormattedDate',
  tags: ['autodocs'],
  render: args => {
    return <FormattedDate {...args} />;
  },
  decorators: [fixedWrapper200],
  argTypes: {},
  args: {
    value: new Date('2023-06-25T15:40:00'),
  },
} as Meta<typeof FormattedDate>;

export const Default: StoryObj<typeof FormattedDate> = {};
