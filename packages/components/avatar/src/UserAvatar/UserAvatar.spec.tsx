import  * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import UserAvatar from './UserAvatar';

describe('UserAvatar', () => {
  test('should match snapshot', () => {
    const userAvatar = renderWithProvider(<UserAvatar />);
    expect(userAvatar).toMatchSnapshot();
  });
  test('should match snapshot with user data', () => {
    const userAvatar = renderWithProvider(<UserAvatar firstName="John" lastName="Doe" email="john.doe@synerise.com" />);
    expect(userAvatar).toMatchSnapshot();
  });
});