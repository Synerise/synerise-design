import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent } from '@testing-library/react';

import Status from '../Status';

describe('Status', () => {
  const STATUS_LABEL = 'Status Text';

  it('should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Status type="primary" label={STATUS_LABEL} />,
    );

    // ASSERT
    expect(getByText(STATUS_LABEL)).toBeTruthy();
  });

  it('should onClick fire', () => {
    // ARRANGE
    const onClick = jest.fn();
    const { getByText } = renderWithProvider(
      <Status
        type="primary"
        data-testid="testid1"
        label={STATUS_LABEL}
        onClick={onClick}
      />,
    );

    // ACT
    fireEvent.click(getByText(STATUS_LABEL));

    // ASSERT
    expect(onClick).toHaveBeenCalled();
  });
});
