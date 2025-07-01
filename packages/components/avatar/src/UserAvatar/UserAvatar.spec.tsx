import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
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
  test('should render', () => {
    const { container } = renderWithProvider(<UserAvatar />);
    expect(container.getElementsByClassName('user-m').length).toBe(1);
  });
  test('should render with user data', () => {
    const userAvatar = renderWithProvider(<UserAvatar user={testUser} />);
    const nameFirstLetters = userAvatar.getByText(testUser.firstName.charAt(0) + testUser.lastName.charAt(0));
    expect(nameFirstLetters).toBeTruthy();
  });
  test('should render with user data and avatar', () => {
    const userAvatar = renderWithProvider(<UserAvatar user={testUserImage} />);
    const img = userAvatar.getByRole('img');
    expect(img).toHaveAttribute('src', testUserImage.avatar);
  });
  test('should render with custom color token (including hue)', () => {
    const { container } = renderWithProvider(<UserAvatar user={testUserImage} backgroundColor="grey-800" />);
    const avatar = container.querySelector('.ant-avatar');
    expect(avatar).toHaveStyle('background: rgb(56, 67, 80);');
  });
});
