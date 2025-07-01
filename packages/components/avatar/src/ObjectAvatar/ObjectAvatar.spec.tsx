import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import ObjectAvatar from './ObjectAvatar';

const testObject = {
  name: 'Shovel',
  description: 'Some product',
  status: 'API',
};

const testObjectImage = {
  name: 'Shovel',
  description: 'Some product',
  status: 'API',
  avatar: 'https://image.com/image.jpg',
};

describe('ObjectAvatar', () => {
  test('should render', () => {
    const { container, debug } = renderWithProvider(<ObjectAvatar />);
    debug();
    expect(container.getElementsByClassName('mail-m').length).toBe(1);
  });
  test('should render with object data', () => {
    const objectAvatar = renderWithProvider(<ObjectAvatar object={testObject} />);
    const firstLetters = objectAvatar.getByText(testObject.name.charAt(0));
    expect(firstLetters).toBeTruthy();
  });
  test('should render with object data and avatar', () => {
    const objectAvatar = renderWithProvider(<ObjectAvatar object={testObjectImage} />);
    const img = objectAvatar.getByRole('img');
    expect(img).toHaveAttribute('src', testObjectImage.avatar);
  });
});
