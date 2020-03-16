import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import InputGroup from "../InputGroup";

describe('InputGroup', () => {
  it('should render label', () => {
    // ARRANGE
    const LABEL = 'Label';
    const { getByText } = renderWithProvider(<InputGroup label={LABEL} />);

    // ASSERT
    expect(getByText(LABEL)).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const DESCRIPTION = 'Description';
    const { getByText } = renderWithProvider(<InputGroup description={DESCRIPTION} />);

    // ASSERT
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should render errors', () => {
    // ARRANGE
    const FIRST_ERROR = 'First error';
    const SECOND_ERROR = 'Second error';
    const ERRORS = [
      FIRST_ERROR,
      SECOND_ERROR,
    ];
    const { getByText } = renderWithProvider(<InputGroup errors={ERRORS} />);

    // ASSERT
    expect(getByText(FIRST_ERROR)).toBeTruthy();
    expect(getByText(SECOND_ERROR)).toBeTruthy();
  });
});
