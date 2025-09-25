import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import FieldSet from '../FieldSet';

describe('FieldSet', () => {
  const HEADING = 'Heading';
  const DESCRIPTION = 'Description';

  it('should render heading and description', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FieldSet heading={HEADING} description={DESCRIPTION} />,
    );

    // ASSERT
    expect(getByText(HEADING)).toBeTruthy();
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should render divider', () => {
    // ARRANGE
    const { queryByRole } = renderWithProvider(
      <FieldSet heading={HEADING} description={DESCRIPTION} withLine />,
    );

    // ASSERT
    expect(queryByRole('separator')).toBeTruthy();

  });
});
