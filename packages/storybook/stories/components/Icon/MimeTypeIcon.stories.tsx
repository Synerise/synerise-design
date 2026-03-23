import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { MimeTypeIcon } from '@synerise/ds-icon';

import {
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  STRING_CONTROL,
  centeredPaddedWrapper,
  gappedColumnDecorator,
} from '../../utils';
import { TYPES } from './MimeTypeIcon.data';

export default {
  title: 'Components/Icon/MimeTypeIcon',
  component: MimeTypeIcon,
  decorators: [centeredPaddedWrapper],
  render: (args) => {
    return <MimeTypeIcon {...args} />;
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    size: NUMBER_CONTROL,
    type: STRING_CONTROL,
    color: { control: 'color' },
  },
} as Meta<typeof MimeTypeIcon>;

type Story = StoryObj<typeof MimeTypeIcon>;

export const Default: Story = {
  args: {
    type: 'image/svg',
  },
};

export const AllTypes: Story = {
  decorators: [gappedColumnDecorator],
  render: (args) => {
    return (
      <>
        {TYPES.map((type) => (
          <div style={{ width: '200px' }}>
            <MimeTypeIcon {...args} type={type} /> - {type}
          </div>
        ))}
      </>
    );
  },
};
