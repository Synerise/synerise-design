import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import AvatarGroup, { Avatar } from './../AvatarGroup';

const groupAvatars: Avatar[] = [
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'JN',
    status: 'active',
  },
  {
    avatarProps: {
      tooltip: { name: 'Kamil Kowalski', email: 'email' },
    },
    initials: 'KK',
    status: 'active',
  },
  {
    avatarProps: {
      tooltip: { name: 'Adam Staszewski', email: 'email' },
    },
    initials: 'AS',
    status: 'inactive',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'JW',
    status: 'blocked',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'JE',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'JJ',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'JZ',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'AN',
  },
  {
    avatarProps: {
      tooltip: { name: 'Jan Nowak', email: 'email' },
    },
    initials: 'TN',
  }
];

describe('AvatarGroup', () => {
  it('should render', () => {
    const { container } = renderWithProvider(<AvatarGroup
      size={'medium'}
      hasStatus={true}
      numberOfVisibleUsers={5}
      avatars={groupAvatars}
      moreInfoTooltip={'more users'}
    />);

    expect(container.querySelector('.ds-avatar-group')).toBeTruthy();
  });

  it('should render more users info', () => {
    const { getByText } = renderWithProvider(<AvatarGroup
      size={'medium'}
      hasStatus={true}
      numberOfVisibleUsers={5}
      avatars={groupAvatars}
      moreInfoTooltip={'more users'}
    />);

    expect(getByText('+4')).toBeTruthy();
  });

  it('should render 5 avatars', () => {
    const { container } = renderWithProvider(<AvatarGroup
      size={'medium'}
      hasStatus={true}
      numberOfVisibleUsers={5}
      avatars={groupAvatars}
      moreInfoTooltip={'more users'}
    />);

    expect(container.querySelectorAll('.ant-avatar').length).toBe(5);
  });
});
