import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import AvatarGroup from './../AvatarGroup';
import { Status } from '@synerise/ds-badge/dist/Badge';

const groupAvatars = [
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
    status: 'active' as Status,
  },
  {
    tooltip: { name: 'Kamil Kowalski', email: 'email' },
    initials: 'KK',
    status: 'active' as Status,
  },
  {
    tooltip: { name: 'Adam Staszewski', email: 'email' },
    initials: 'AS',
    status: 'inactive' as Status,
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
    status: 'blocked' as Status,
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
  },
  {
    tooltip: { name: 'Jan Nowak', email: 'email' },
    initials: 'JN',
  }
];

describe('AvatarGroup', () => {
  it('should render', () => {
    const { getByText } = renderWithProvider(<AvatarGroup
      size={'medium'}
      hasStatus={true}
      numberOfVisibleUsers={5}
      users={groupAvatars}
      moreInfoTooltip={'more users'}
    />);

    expect(getByText('+4')).toBeTruthy();
  });
});
