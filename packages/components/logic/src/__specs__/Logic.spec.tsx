import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import Logic from '../Logic';
import userEvent from '@testing-library/user-event';

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
  it('Should change value', () => {
    // ARRANGE
    const onChange = jest.fn();
    const { container } = renderWithProvider(<Logic onChange={onChange} value={'AND'} options={CUSTOM_OPTIONS} />);
    const trigger = container.querySelector('.ds-logic');

    // ACT
    userEvent.click(trigger as HTMLElement);

    // ASSERT
    expect(onChange).toBeCalledWith('OR');
  });
});
