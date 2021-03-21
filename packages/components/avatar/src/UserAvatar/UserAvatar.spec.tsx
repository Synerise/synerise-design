import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import UserAvatar from './UserAvatar';

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@synerise.com',
};

const testUserImage = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@synerise.com',
  avatar: 'http://image.com/image.jpg',
};

describe('UserAvatar', () => {
  test('should match snapshot', () => {
    const userAvatar = renderWithProvider(<UserAvatar />);
    expect(userAvatar).toMatchSnapshot();
  });
  test('should match snapshot with user data', () => {
    const userAvatar = renderWithProvider(<UserAvatar user={testUser} />);
    expect(userAvatar).toMatchSnapshot();
  });
  test('should match snapshot with user data and avatar', () => {
    const userAvatar = renderWithProvider(<UserAvatar user={testUserImage} />);
    expect(userAvatar).toMatchSnapshot();
  });
});
