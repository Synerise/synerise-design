import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';

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
    const { rerender, queryByRole } = renderWithProvider(
      <FieldSet heading={HEADING} description={DESCRIPTION} withLine />,
    );

    // ASSERT
    expect(queryByRole('separator')).toBeTruthy();

    // ARRANGE
    rerender(<FieldSet heading={HEADING} description={DESCRIPTION} />);

    // ASSERT
    expect(queryByRole('separator')).toBeNull();
  });
});
