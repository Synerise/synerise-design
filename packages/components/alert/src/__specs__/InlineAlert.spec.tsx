import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import Alert from '../index';

describe('Inline alert', () => {
  it('Should render as success', () => {
    // ARRANGE
    const { getByText, container } = renderWithProvider(
      <Alert.InlineAlert type={'success'} message={'Inline success'} />
    );

    // ASSERT
    expect(container.querySelector('.check-2-m')).toBeTruthy();
    expect(getByText('Inline success')).toBeTruthy();
  });
  it('Should render as alert', () => {
    // ARRANGE
    const { getByText, container } = renderWithProvider(<Alert.InlineAlert type={'alert'} message={'Inline alert'} />);

    // ASSERT
    expect(container.querySelector('.warning-fill-m')).toBeTruthy();
    expect(getByText('Inline alert')).toBeTruthy();
  });
  it('Should render as warning', () => {
    // ARRANGE
    const { getByText, container } = renderWithProvider(
      <Alert.InlineAlert type={'warning'} message={'Inline warning'} />
    );

    // ASSERT
    expect(container.querySelector('.warning-fill-m')).toBeTruthy();
    expect(getByText('Inline warning')).toBeTruthy();
  });
});
