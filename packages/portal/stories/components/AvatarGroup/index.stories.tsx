import * as React from 'react';

import AvatarGroup from '@synerise/ds-avatar-group';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { DataSource } from '@synerise/ds-avatar-group/dist/AvatarGroup';
import Menu from '@synerise/ds-menu';
import { LockM, UserRemoveM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { action } from '@storybook/addon-actions';

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';
const groupSizes = ['small', 'medium', 'large'] as const;
const groupAvatars: DataSource[] = [
  {
    avatarProps: {
      tooltip: { name: 'Kamil Kowalski', email: 'k.kowalski@gmail.com' },
      backgroundColor: 'blue',
      backgroundColorHue: '600',
    },
    initials: 'KK',
    status: 'active',
    firstname: 'Kamil',
    lastname: 'Kowalski',
    email: 'k.kowalski@gmail.com',
    id: 0
  },
  {
    avatarProps: {
      tooltip: { name: 'Adam Staszewski', email: 'adam.staszewski@test.pl' },
      backgroundColor: 'green',
      backgroundColorHue: '600',
    },
    initials: 'AS',
    status: 'inactive',
    firstname: 'Adam',
    lastname: 'Staszewski',
    email: 'adam.staszewski@test.pl',
    id: 1
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'jan@nowak.com.pl' },
      backgroundColor: 'orange',
      backgroundColorHue: '600',
    },
    initials: 'JN',
    status: 'blocked',
    firstname: 'Jan',
    lastname: 'Nowak',
    email: 'jan@nowak.com.pl',
    id: 2
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'jan@nowak.com.pl' },
      backgroundColor: 'red',
      backgroundColorHue: '600',
    },
    initials: 'JN',
    status: 'active',
    firstname: 'Jan',
    lastname: 'Nowak',
    email: 'jan@nowak.com.pl',
    id: 3
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'jan@nowak.com.pl' },
      backgroundColor: 'violet',
      backgroundColorHue: '600',
    },
    initials: 'JN',
    status: 'inactive',
    firstname: 'Jan',
    lastname: 'Nowak',
    email: 'jan@nowak.com.pl',
    id: 4
  },
  {
    avatarProps: {
      tooltip: { name: 'Maciej Piotrowski', email: 'mp@test.com.pl' },
      backgroundColor: 'green',
      backgroundColorHue: '600',
    },
    initials: 'MP',
    status: 'inactive',
    firstname: 'Maciej',
    lastname: 'Piotrowski',
    email: 'mp@test.com.pl',
    id: 5
  },
  {
    avatarProps: {
      tooltip: { name: 'Kamil Kowalski', email: 'k.kowalski@gmail.com' },
      backgroundColor: 'blue',
      backgroundColorHue: '600',
    },
    initials: 'KK',
    status: 'active',
    firstname: 'Kamil',
    lastname: 'Kowalski',
    email: 'k.kowalski@gmail.com',
    id: 6
  },
  {
    avatarProps: {
      tooltip: { name: 'Adam Staszewski', email: 'adam.staszewski@test.pl' },
      backgroundColor: 'green',
      backgroundColorHue: '600',
    },
    initials: 'AS',
    status: 'inactive',
    firstname: 'Adam',
    lastname: 'Staszewski',
    email: 'adam.staszewski@test.pl',
    id: 7
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'jan@nowak.com.pl' },
      backgroundColor: 'orange',
      backgroundColorHue: '600',
    },
    initials: 'JN',
    status: 'blocked',
    firstname: 'Jan',
    lastname: 'Nowak',
    email: 'jan@nowak.com.pl',
    id: 8
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'jan@nowak.com.pl' },
      backgroundColor: 'red',
      backgroundColorHue: '600',
    },
    initials: 'JN',
    status: 'active',
    firstname: 'Jan',
    lastname: 'Nowak',
    email: 'jan@nowak.com.pl',
    id: 9
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'jan@nowak.com.pl' },
      backgroundColor: 'violet',
      backgroundColorHue: '600',
    },
    initials: 'JN',
    status: 'inactive',
    firstname: 'Jan',
    lastname: 'Nowak',
    email: 'jan@nowak.com.pl',
    id: 10
  },
  {
    avatarProps: {
      tooltip: { name: 'Maciej Piotrowski', email: 'mp@test.com.pl' },
      backgroundColor: 'green',
      backgroundColorHue: '600',
    },
    initials: 'MP',
    status: 'inactive',
    firstname: 'Maciej',
    lastname: 'Piotrowski',
    email: 'mp@test.com.pl',
    id: 11
  }
];


const stories = {
  avatarGroup: () => (
    <div style={{padding: 24, backgroundColor: '#fff', display: 'flex', justifyContent: 'flex-start', width: 500}}>
      <AvatarGroup
        size={select('Set size', groupSizes, 'medium')}
        hasStatus={boolean('Has status', true)}
        numberOfVisibleUsers={number('Number of visible avatars', 3)}
        dataSource={groupAvatars}
        moreInfoTooltip={text('More info tooltip copy', 'more users')}
        groupModal={{
          title: 'All users',
          listTitle: `${groupAvatars.length} customers`,
          handleOk: action('Ok action'),
          handleInvite: action('Invite action'),
          okText: text('Set ok button text', 'Apply'),
          cancelText: text('Set cancel button text', 'Cancel'),
          inviteText: text('Set invite button text', 'Invite user'),
          renderRowMenu: (user) => {
            return (
            <Menu style={{padding: '8px'}}>
              <Menu.Item onClick={action(`Show user permissions ${user.id}`)} prefixel={<Icon component={<LockM />}  color={theme.palette['grey-600']} />}>User permission</Menu.Item>
              <Menu.Item onClick={action(`Remove user ${user.id}`)} type='danger' prefixel={<Icon component={<UserRemoveM  />} />}>Remove user</Menu.Item>
            </Menu>
          )}
        }}
      />
    </div>
  )
};

export default {
  name: 'Avatar|Avatar group',
  config: {},
  stories,
  Component: AvatarGroup,
}
