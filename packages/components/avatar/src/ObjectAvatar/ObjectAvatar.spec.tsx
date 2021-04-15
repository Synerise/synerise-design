import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
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
  test('should match snapshot', () => {
    const objectAvatar = renderWithProvider(<ObjectAvatar />);
    expect(objectAvatar).toMatchSnapshot();
  });
  test('should match snapshot with object data', () => {
    const objectAvatar = renderWithProvider(<ObjectAvatar object={testObject} />);
    expect(objectAvatar).toMatchSnapshot();
  });
  test('should match snapshot with object data and avatar', () => {
    const objectAvatar = renderWithProvider(<ObjectAvatar object={testObjectImage} />);
    expect(objectAvatar).toMatchSnapshot();
  });
});
