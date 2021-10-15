import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import SearchBar from './../SearchBar';
import { fireEvent } from '@testing-library/dom';
import { wait } from '@testing-library/react';

describe('SearchBar', () => {
  const PLACEHOLDER = 'placeholder';
  const INPUT_VALUE = 'input value';
  const onChange = jest.fn();

  it('should render', () => {
    // ARRANGE
    const { getByPlaceholderText } = renderWithProvider(
      <SearchBar placeholder={PLACEHOLDER} onSearchChange={() => {}} value={''} />
    );

    // ASSERT
    expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should change value', () => {
    // ARRANGE
    const { getByPlaceholderText } = renderWithProvider(
      <SearchBar placeholder={PLACEHOLDER} onSearchChange={onChange} value={''} />
    );

    const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

    // ACT
    fireEvent.change(input, { target: { value: INPUT_VALUE } });

    // ASSERT
    expect(onChange).toBeCalledWith(INPUT_VALUE);
  });

  it('autofocus', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <SearchBar placeholder={PLACEHOLDER} onSearchChange={() => {}} autofocus={true} value={''} />
    );

    const inputWrapper = getByTestId('input-wrapper') as HTMLInputElement;

    // ASSERT
    wait(
      () => {
        expect(inputWrapper.className.includes('is-focused')).toBeTruthy();
      },
      { timeout: 100 }
    );
  });

  it('autofocus with delay', () => {
    const DELAY = 50;
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <SearchBar
        placeholder={PLACEHOLDER}
        onSearchChange={() => {}}
        autofocus={true}
        autofocusDelay={DELAY}
        value={''}
      />
    );

    const inputWrapper = getByTestId('input-wrapper') as HTMLInputElement;
    expect(inputWrapper.className.includes('is-focused')).toBeFalsy();
    // ASSERT
    wait(
      () => {
        expect(inputWrapper.className.includes('is-focused')).toBeTruthy();
      },
      { timeout: DELAY }
    );
  });
});
