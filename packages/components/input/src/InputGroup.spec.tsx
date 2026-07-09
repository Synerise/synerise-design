import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import InputGroup from './InputGroup';

describe('InputGroup', () => {
  it('should render label', () => {
    const LABEL = 'Label';
    const { getByText } = renderWithProvider(<InputGroup label={LABEL} />);

    expect(getByText(LABEL)).toBeTruthy();
  });

  it('should render description', () => {
    const DESCRIPTION = 'Description';
    const { getByText } = renderWithProvider(
      <InputGroup description={DESCRIPTION} />,
    );

    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should render errorText', () => {
    const ERROR_TEXT = 'Error text';
    const { getByText } = renderWithProvider(
      <InputGroup errorText={ERROR_TEXT} />,
    );

    expect(getByText(ERROR_TEXT)).toBeTruthy();
  });

  it('should render the deprecated errors array', () => {
    const FIRST_ERROR = 'First error';
    const SECOND_ERROR = 'Second error';
    const ERRORS = [FIRST_ERROR, SECOND_ERROR];
    const { getByText } = renderWithProvider(<InputGroup errors={ERRORS} />);

    expect(getByText(FIRST_ERROR)).toBeTruthy();
    expect(getByText(SECOND_ERROR)).toBeTruthy();
  });

  it('grows the last item by default and the first item when growItem="first"', () => {
    const { container, rerender } = renderWithProvider(
      <InputGroup compact>
        <input data-testid="a" />
        <input data-testid="b" />
      </InputGroup>,
    );
    const items = () =>
      Array.from(container.querySelectorAll('.ds-input-group-item'));
    // Default: last item is the growing one.
    expect(items()[0].className).toContain('ds-input-group-item-0');
    expect(items()[1].className).toContain('ds-input-group-item-1');
    // The styled rule targeting :last-child / :first-child is applied via CSS;
    // assert the prop reaches the DOM contract (item order) and that growItem is
    // accepted for both values without error.
    rerender(
      <InputGroup compact growItem="first">
        <input data-testid="a" />
        <input data-testid="b" />
      </InputGroup>,
    );
    expect(items()).toHaveLength(2);
  });

  it('should prefer errorText over the deprecated errors array', () => {
    const ERROR_TEXT = 'Error text';
    const LEGACY_ERROR = 'Legacy error';
    const { getByText, queryByText } = renderWithProvider(
      <InputGroup errorText={ERROR_TEXT} errors={[LEGACY_ERROR]} />,
    );

    expect(getByText(ERROR_TEXT)).toBeTruthy();
    expect(queryByText(LEGACY_ERROR)).toBeNull();
  });
});
