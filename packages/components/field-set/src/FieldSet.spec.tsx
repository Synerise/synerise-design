import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import FieldSet from './index';

describe('Field-Set', () => {
  const TITLE = 'Advanced option';
  const DESCRIPTION = 'This section is for avanced users only';

  it('should render', function() {
    // ARRANGE
    renderWithProvider(
      <FieldSet
        title={TITLE}
        description={DESCRIPTION}
      />
    );
    // ASSERT
    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });
  it('should render title', function() {
    // ARRANGE
    renderWithProvider(
      <FieldSet
      title={TITLE}
      description={DESCRIPTION}
      />
    );
    // ASSERT
    expect(screen.getByText(TITLE)).toBeTruthy();
  });
  it('title should be clickable', function() {
    // ARRANGE
    const onClick = jest.fn();
    renderWithProvider(
      <FieldSet
        onTitleClick={onClick}
        title={TITLE}
        description={DESCRIPTION}
      />
    );
    // ASSERT
    const titleNode = screen.getByText(TITLE);
    expect(titleNode).toBeTruthy();
    userEvent.click(titleNode);
    expect(onClick).toHaveBeenCalled();
  })
});