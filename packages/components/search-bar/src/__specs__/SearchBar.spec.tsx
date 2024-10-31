import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import SearchBar from './../SearchBar';
import { fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/react';

describe('SearchBar', () => {
  const PLACEHOLDER = 'placeholder';
  const INPUT_VALUE = 'input value';
  const onChange = jest.fn();

  it('should render', () => {
    const { getByPlaceholderText } = renderWithProvider(
      <SearchBar placeholder={PLACEHOLDER} onSearchChange={() => {}} value={''} />
    );

    expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should change value', () => {
    const { getByPlaceholderText } = renderWithProvider(
      <SearchBar placeholder={PLACEHOLDER} onSearchChange={onChange} value={''} />
    );

    const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

    fireEvent.change(input, { target: { value: INPUT_VALUE } });

    expect(onChange).toBeCalledWith(INPUT_VALUE);
  });

  it('autofocus', async () => {
    const { getByTestId } = renderWithProvider(
      <SearchBar placeholder={PLACEHOLDER} onSearchChange={() => {}} autofocus={true} value={''} />
    );
    const input = getByTestId('input-autosize-input');
    await waitFor(() => expect(input).toHaveFocus());
  });

  it('autofocus with delay', async () => {
    const DELAY = 50;
    const { getByTestId } = renderWithProvider(
      <SearchBar
        placeholder={PLACEHOLDER}
        onSearchChange={() => {}}
        autofocus={true}
        autofocusDelay={DELAY}
        value={''}
      />
    );
    const input = getByTestId('input-autosize-input');
    await waitFor(() => expect(input).toHaveFocus());
  });
});
