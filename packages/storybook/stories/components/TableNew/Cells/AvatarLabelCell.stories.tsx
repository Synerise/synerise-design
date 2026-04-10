import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import Avatar, { ObjectAvatar } from '@synerise/ds-avatar';
import Icon, { EmailsListM, UserM } from '@synerise/ds-icon';
import {
  AvatarLabelCell,
  type BaseAvatarLabelProps,
} from '@synerise/ds-table-new';

import { AVATAR_IMAGE } from '../../../constants';
import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_NO_CONTROL,
  STRING_CONTROL,
  fixedWrapper300,
} from '../../../utils';

const meta: Meta<BaseAvatarLabelProps> = {
  title: 'Components/TableNew/Cells/AvatarLabelCell',
  component: AvatarLabelCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    avatar: REACT_NODE_NO_CONTROL,
    title: REACT_NODE_NO_CONTROL,
    labels: { control: false },
    avatarAction: { control: false },
    avatarLink: STRING_CONTROL,
    icon: REACT_NODE_NO_CONTROL,
    ellipsis: BOOLEAN_CONTROL,
    maxWidth: NUMBER_CONTROL,
    avatarSize: STRING_CONTROL,
    loader: REACT_NODE_NO_CONTROL,
    disabled: BOOLEAN_CONTROL,
  },
};

export default meta;

type Story = StoryObj<BaseAvatarLabelProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<AvatarLabelCell
  avatar={<Avatar src="avatar.png" size="small" />}
  title="Charlotte Stiedemann"
/>`,
      },
    },
  },
  render: (args) => <AvatarLabelCell {...args} />,
  args: {
    avatar: <Avatar src={AVATAR_IMAGE} size="small" />,
    title: 'Charlotte Stiedemann',
    avatarAction: fn(),
    labels: ['Static'],
    icon: <Icon component={<EmailsListM />} />,
    ellipsis: true,
  },
};

export const WithLabels: Story = {
  parameters: {
    docs: {
      source: {
        code: `<AvatarLabelCell
  avatar={
    <ObjectAvatar
      badgeStatus="active"
      size="medium"
      iconComponent={<Icon component={<UserM />} color="red" />}
    />
  }
  title="Charlotte Stiedemann"
  labels={['Admin', 'charlotte@example.com']}
/>`,
      },
    },
  },
  render: (args) => <AvatarLabelCell {...args} />,
  args: {
    avatar: (
      <ObjectAvatar
        badgeStatus="active"
        size="medium"
        iconComponent={<Icon component={<UserM />} color="red" />}
      />
    ),
    title: 'Charlotte Stiedemann',
    labels: ['Admin', 'charlotte@example.com'],
  },
};

export const WithLink: Story = {
  parameters: {
    docs: {
      source: {
        code: `<AvatarLabelCell
  avatar={<Avatar src="avatar.png" size="small" />}
  avatarLink="https://example.com"
  title="Charlotte Stiedemann"
/>`,
      },
    },
  },
  render: (args) => <AvatarLabelCell {...args} />,
  args: {
    avatar: <Avatar src={AVATAR_IMAGE} size="small" />,
    avatarLink: 'https://example.com',
    title: 'Charlotte Stiedemann',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<AvatarLabelCell
  avatar={<Avatar src="avatar.png" size="small" />}
  title="Charlotte Stiedemann"
  disabled
/>`,
      },
    },
  },
  render: (args) => <AvatarLabelCell {...args} />,
  args: {
    avatar: <Avatar src={AVATAR_IMAGE} size="small" />,
    title: 'Charlotte Stiedemann',
    disabled: true,
  },
};
