import React from 'react';

import { FormattedDateTime } from '@synerise/ds-data-format';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fixedWrapper200 } from '../../utils';

export default {
  component: FormattedDateTime,
  title: 'Components/DataFormat/FormattedDateTime',
  tags: ['autodocs'],
  render: args => {
    return <FormattedDateTime {...args} />;
  },
  decorators: [fixedWrapper200],
  argTypes: {},
  args: {
    value: new Date('2023-06-25T15:40:00'),
  },
} as Meta<typeof FormattedDateTime>;

export const Default: StoryObj<typeof FormattedDateTime> = {};
