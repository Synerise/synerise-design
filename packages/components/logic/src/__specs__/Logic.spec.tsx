import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import Logic from '../Logic';

const CUSTOM_OPTIONS = [
  { value: 'AND', label: 'AND' },
  { value: 'OR', label: 'OR' },
];

describe('Logic component', () => {
  it('Should render', () => {
    // ARRANGE
    const onChange = jest.fn();
    const { getByText } = renderWithProvider(<Logic onChange={onChange} value={'AND'} options={CUSTOM_OPTIONS} />);

    // ASSERT
    expect(getByText('AND')).toBeTruthy();
  });
});
