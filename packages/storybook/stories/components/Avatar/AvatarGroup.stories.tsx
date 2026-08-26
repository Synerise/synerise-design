import React from 'react';

import { Meta } from '@storybook/react-vite';
import AvatarGroup from '@synerise/ds-avatar-group';
import { theme } from '@synerise/ds-core';
import Icon, { LockM, UserRemoveM } from '@synerise/ds-icon';
import ListItem, { ListWrapper } from '@synerise/ds-list-item';

import { sizes as groupSizes } from '../Avatar/constants';
import { groupAvatars } from './mockData';

export default {
  title: 'Components/Avatar/Avatar group',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: groupSizes,
      },
    },
    hasStatus: {
      control: 'boolean',
    },
    numberOfVisibleUsers: {
      control: 'number',
    },
    dataSource: {
      control: 'object',
    },
    moreInfoTooltip: {
      control: 'text',
    },
    groupModal: {
      control: 'object',
    },
  },
} as Meta;
const Template: (args) => JSX.Element = (args) => (
  <div
    style={{
      padding: 24,
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'flex-start',
      width: 500,
    }}
  >
    <AvatarGroup
      id="avatar-group"
      {...args}
      groupModal={{
        ...args.groupModal,
        renderRowMenu: (user) => {
          return (
            <ListWrapper style={{ padding: '8px' }}>
              <ListItem
                onClick={() => {
                  console.info(`Show user permissions ${user.id}`);
                }}
                prefixel={
                  <Icon
                    component={<LockM />}
                    color={theme.palette['grey-600']}
                  />
                }
              >
                User permission
              </ListItem>
              <ListItem
                onClick={() => {
                  console.info(`Remove user ${user.id}`);
                }}
                type="danger"
                prefixel={<Icon component={<UserRemoveM />} />}
              >
                Remove user
              </ListItem>
            </ListWrapper>
          );
        },
      }}
    />
  </div>
);
export const AvatarGroupStory = Template.bind({});
AvatarGroupStory.args = {
  size: 'medium',
  hasStatus: true,
  numberOfVisibleUsers: 3,
  dataSource: groupAvatars,
  moreInfoTooltip: 'More info tooltip copy',
  groupModal: {
    title: 'All users',
    listTitle: `${groupAvatars.length} customers`,
    okText: 'Apply',
    cancelText: 'Cancel',
    inviteText: 'Invite user',
  },
};
