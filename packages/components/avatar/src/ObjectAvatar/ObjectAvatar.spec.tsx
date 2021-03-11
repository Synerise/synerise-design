import  * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import ObjectAvatar from './ObjectAvatar';

describe('ObjectAvatar', () => {
  test('should match snapshot', () => {
    const objectAvatar = renderWithProvider(<ObjectAvatar />);
    expect(objectAvatar).toMatchSnapshot();
  });
  test('should match snapshot with object data', () => {
    const objectAvatar = renderWithProvider(<ObjectAvatar objectName="John" objectDescription="Doe" objectStatus="API" />);
    expect(objectAvatar).toMatchSnapshot();
  });
});