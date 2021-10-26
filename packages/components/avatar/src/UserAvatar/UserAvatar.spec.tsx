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

const firstAndLast = 'JD';

describe('UserAvatar', () => {
  test('should render', () => {
    const { container } = renderWithProvider(<UserAvatar />);
    const svg = container.querySelector('user-m');
    expect(svg).toBeTruthy();
  });
  test('should render with user data', () => {
    const userAvatar = renderWithProvider(<UserAvatar user={testUser} />);
    const nameFirstLetters = userAvatar.getByText(firstAndLast);
    expect(nameFirstLetters).toBeTruthy();
  });
  test('should render with user data and avatar', () => {
    const userAvatar = renderWithProvider(<UserAvatar user={testUserImage} />);
    const img = userAvatar.getByRole('img');
    expect(img).toHaveAttribute('src', testUserImage.avatar);
  });
});
