import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import Alert from '../index';

describe('Inline alert', () => {
  it('Should render as success', () => {
    const { getByText, container } = renderWithProvider(
      <Alert.InlineAlert type={'success'} message={'Inline success'} />
    );

    expect(container.querySelector('.check-3-m')).toBeTruthy();
    expect(getByText('Inline success')).toBeTruthy();
  });
  it('Should render as alert', () => {
    const { getByText, container } = renderWithProvider(<Alert.InlineAlert type={'alert'} message={'Inline alert'} />);

    expect(container.querySelector('.warning-fill-m')).toBeTruthy();
    expect(getByText('Inline alert')).toBeTruthy();
  });
  it('Should render as warning', () => {
    const { getByText, container } = renderWithProvider(
      <Alert.InlineAlert type={'warning'} message={'Inline warning'} />
    );

    expect(container.querySelector('.warning-fill-m')).toBeTruthy();
    expect(getByText('Inline warning')).toBeTruthy();
  });
  it('Should render as info', () => {
    const { getByText, container } = renderWithProvider(
      <Alert.InlineAlert type={'info'} message={'Inline info'} />
    );

    expect(container.querySelector('.info-fill-m')).toBeTruthy();
    expect(getByText('Inline info')).toBeTruthy();
  });
});
