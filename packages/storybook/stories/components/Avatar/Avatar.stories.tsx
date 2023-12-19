import React from 'react';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import type {
  AvatarProps
} from '@synerise/ds-avatar/dist/Avatar.types';

import Avatar from '@synerise/ds-avatar';

const meta: Meta < AvatarProps > = {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {}
};

export default meta;
type Story = StoryObj < AvatarProps > ;

const StoryTemplate: Story = {
  render: (args) => <Avatar {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    backgroundColor: "blue",
    backgroundColorHue: "500",
    disabled: false,
    hasStatus: false,
    iconScale: true,
    iconComponent: null,
    tooltip: {},
    size: 'medium'
  }
}