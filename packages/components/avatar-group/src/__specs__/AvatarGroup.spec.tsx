import React from 'react';
import { renderWithProvider } from '@synerise/ds-core';
import AvatarGroup from './../AvatarGroup';
import { type DataSource } from '../AvatarGroup.types';

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

describe('AvatarGroup', () => {
  it('should render', () => {
    const { container } = renderWithProvider(<AvatarGroup
      size={'medium'}
      hasStatus={true}
      numberOfVisibleUsers={5}
      dataSource={groupAvatars}
      moreInfoTooltip={'more users'}
    />);

    expect(container.querySelector('.ds-avatar-group')).toBeTruthy();
  });

  it('should render more users info', () => {
    const { getByText } = renderWithProvider(<AvatarGroup
      size={'medium'}
      hasStatus={true}
      numberOfVisibleUsers={5}
      dataSource={groupAvatars}
      moreInfoTooltip={'more users'}
    />);

    expect(getByText('+7')).toBeTruthy();
  });

  it('should render 5 avatars', () => {
    const { container } = renderWithProvider(<AvatarGroup
      size={'medium'}
      hasStatus={true}
      numberOfVisibleUsers={5}
      dataSource={groupAvatars}
      moreInfoTooltip={'more users'}
    />);

    // it's 6 decause moreInfo is now avatar
    expect(container.querySelectorAll('.ant-avatar').length).toBe(6);
  });
});
