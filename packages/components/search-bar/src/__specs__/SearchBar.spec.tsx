import React from 'react';

import { renderWithProvider, rulesFor } from '@synerise/ds-core/testing';
import Icon, { SearchM } from '@synerise/ds-icon';
import { fireEvent, screen, waitFor } from '@testing-library/react';

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

describe('SearchBar icon colour', () => {
  const getIconWrappers = () => {
    const clear = screen.getByTestId('clear-btn');
    const iconLeft = screen.getByTestId('search-icon').parentElement;
    return { clear, iconLeft: iconLeft as HTMLElement };
  };
  const renderSearchBar = (disabled = false) =>
    renderWithProvider(
      <SearchBar
        value="query"
        onSearchChange={() => {}}
        onClearInput={() => {}}
        disabled={disabled}
        iconLeft={<Icon component={<SearchM />} data-testid="search-icon" />}
      />,
    );

  it('colours the icon wrappers instead of their svgs', () => {
    renderSearchBar();
    const { clear, iconLeft } = getIconWrappers();

    expect(
      clear.querySelector('.ds-icon')?.querySelector('svg'),
    ).toHaveStyle('color: inherit');
    expect(clear).toHaveStyle('color: var(--ds-form-clear-icon)');
    expect(iconLeft).toHaveStyle('color: var(--ds-search-bar-icon-default)');

    const svgRules = [clear, iconLeft].flatMap((wrapper) =>
      rulesFor(wrapper.querySelector('svg'), { within: wrapper, state: 'any' }),
    );
    expect(svgRules).toEqual([]);
    const activeBodies = [clear, iconLeft]
      .flatMap((wrapper) => rulesFor(wrapper, { state: 'any' }))
      .filter(
        ({ selector }) =>
          selector.includes(':hover') || selector.includes('.is-focused'),
      )
      .map(({ declarations }) => declarations)
      .join(';');
    expect(activeBodies).toContain('color:var(--ds-search-bar-icon-active)');
    expect(activeBodies).toContain('color:var(--ds-form-clear-icon)');
  });

  it('greys out both icon wrappers when disabled', () => {
    renderSearchBar(true);
    const { clear, iconLeft } = getIconWrappers();

    expect(clear).toHaveStyle('color: var(--ds-search-bar-icon-disabled)');
    expect(iconLeft).toHaveStyle('color: var(--ds-search-bar-icon-disabled)');
  });

  it('keeps an explicit colour on the left icon', () => {
    renderWithProvider(
      <SearchBar
        value=""
        onSearchChange={() => {}}
        disabled
        iconLeft={
          <Icon
            component={<SearchM />}
            data-testid="search-icon"
            color="var(--ds-color-icon-danger-default)"
          />
        }
      />,
    );

    const svg = screen
      .getByTestId('search-icon')
      .querySelector('svg') as SVGElement;
    expect(getComputedStyle(svg).color).toBe(
      'var(--ds-color-icon-danger-default)',
    );
    expect(getComputedStyle(svg).fill).toBe('');
  });
});
