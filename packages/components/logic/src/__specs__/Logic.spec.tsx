import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import userEvent from '@testing-library/user-event';
import Logic from '../Logic';

const CUSTOM_OPTIONS = [
  { value: 'AND', label: 'AND' },
  { value: 'OR', label: 'OR' },
];

describe('Logic component', () => {
  it('Should render', () => {
    const onChange = jest.fn();
    const { getByText } = renderWithProvider(<Logic onChange={onChange} value={'AND'} options={CUSTOM_OPTIONS} />);

    expect(getByText('AND')).toBeTruthy();
  });
  it('Should change value', () => {
    const onChange = jest.fn();
    const { container } = renderWithProvider(<Logic onChange={onChange} value={'AND'} options={CUSTOM_OPTIONS} />);
    const trigger = container.querySelector('.ds-logic');

    userEvent.click(trigger as HTMLElement);

    expect(onChange).toBeCalledWith('OR');
  });
});
