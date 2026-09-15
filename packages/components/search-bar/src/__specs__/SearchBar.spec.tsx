import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, waitFor } from '@testing-library/react';

import SearchBar from './../SearchBar';

describe('SearchBar', () => {
  const PLACEHOLDER = 'placeholder';
  const INPUT_VALUE = 'input value';
  const onChange = vi.fn();

  it('should render', () => {
    const { getByPlaceholderText } = renderWithProvider(
      <SearchBar
        placeholder={PLACEHOLDER}
        onSearchChange={() => {}}
        value={''}
      />,
    );

    expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should change value', () => {
    const { getByPlaceholderText } = renderWithProvider(
      <SearchBar
        placeholder={PLACEHOLDER}
        onSearchChange={onChange}
        value={''}
      />,
    );

    const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

    fireEvent.change(input, { target: { value: INPUT_VALUE } });

    expect(onChange).toBeCalledWith(INPUT_VALUE);
  });

  it('autofocus', async () => {
    const { getByTestId } = renderWithProvider(
      <SearchBar
        placeholder={PLACEHOLDER}
        onSearchChange={() => {}}
        autofocus={true}
        value={''}
      />,
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
      />,
    );
    const input = getByTestId('input-autosize-input');
    await waitFor(() => expect(input).toHaveFocus());
  });

  /**
   * `handleInputRef` is how a consumer learns which element the input is, and consumers hang focus
   * side effects off it — `DropdownMenu` uses it to put the caret in the search field when it opens.
   * That only works if it means "here is the input", once. Reporting it again on every render turns
   * any re-render of the surrounding UI into a focus grab, which takes the caret away from whatever
   * the user was typing in elsewhere in the dropdown.
   */
  describe('handleInputRef', () => {
    it('reports the input once', () => {
      const handleInputRef = vi.fn();
      renderWithProvider(
        <SearchBar
          placeholder={PLACEHOLDER}
          onSearchChange={() => {}}
          value={''}
          handleInputRef={handleInputRef}
        />,
      );

      expect(handleInputRef).toHaveBeenCalledTimes(1);
    });

    it('does not report it again when the consumer re-renders', () => {
      const handleInputRef = vi.fn();
      const searchBar = (value: string) => (
        <SearchBar
          placeholder={PLACEHOLDER}
          onSearchChange={() => {}}
          value={value}
          handleInputRef={handleInputRef}
        />
      );

      const { rerender } = renderWithProvider(searchBar(''));
      handleInputRef.mockClear();
      rerender(searchBar('a'));
      rerender(searchBar('ab'));

      expect(handleInputRef).not.toHaveBeenCalled();
    });

    it('reports again when the consumer hands over a different callback', () => {
      const first = vi.fn();
      const second = vi.fn();
      const searchBar = (onRef: typeof first) => (
        <SearchBar
          placeholder={PLACEHOLDER}
          onSearchChange={() => {}}
          value={''}
          handleInputRef={onRef}
        />
      );

      const { rerender } = renderWithProvider(searchBar(first));
      rerender(searchBar(second));

      expect(second).toHaveBeenCalledTimes(1);
    });
  });
});
