import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';

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

  it('should render errors', () => {
    const FIRST_ERROR = 'First error';
    const SECOND_ERROR = 'Second error';
    const ERRORS = [FIRST_ERROR, SECOND_ERROR];
    const { getByText } = renderWithProvider(<InputGroup errors={ERRORS} />);

    expect(getByText(FIRST_ERROR)).toBeTruthy();
    expect(getByText(SECOND_ERROR)).toBeTruthy();
  });
});
