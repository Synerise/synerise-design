import React from 'react';

import { FormattedRelativeDateTimeFrom, FormattedRelativeDateTimeTo } from '@synerise/ds-data-format';
import type { Meta, StoryObj } from '@storybook/react';
import { BOOLEAN_CONTROL, fixedWrapper200 } from '../../utils';

export default {
  component: FormattedRelativeDateTimeTo,
  title: 'Components/DataFormat/FormattedRelativeDateTime',
  tags: ['autodocs'],
  decorators: [fixedWrapper200],
  argTypes: {
    withoutSuffix: BOOLEAN_CONTROL
  },
  args: {
    value: new Date('2023-06-25T15:40:00'),
  },
} as Meta<typeof FormattedRelativeDateTimeTo>;


export const RelativeTo: StoryObj<typeof FormattedRelativeDateTimeTo> = {
  name: 'FormattedRelativeDateTimeTo',
  render: args => {
    return <FormattedRelativeDateTimeTo {...args} />;
  }

}
export const RelativeFrom: StoryObj<typeof FormattedRelativeDateTimeTo> = {
  name: 'FormattedRelativeDateTimeFrom',
  render: args => {
    return <FormattedRelativeDateTimeFrom {...args} />;
  }
}
