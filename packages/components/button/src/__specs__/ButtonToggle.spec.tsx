import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import { ButtonToggle } from '../index';

describe('ButtonToggle', () => {
  const onClick = vi.fn();
  it('should render', function () {
    renderWithProvider(
      <ButtonToggle onClick={onClick}>Click ME!</ButtonToggle>,
    );

    expect(screen.getByText('Click ME!')).toBeInTheDocument();
  });

  it('should onClick be called', function () {
    renderWithProvider(
      <ButtonToggle onClick={onClick}>Click ME!</ButtonToggle>,
    );

    fireEvent.click(screen.getByText('Click ME!'));

    expect(onClick).toBeCalled();
  });

  it('should show spinner animation', () => {
    renderWithProvider(<ButtonToggle loading>Click ME!</ButtonToggle>);
    expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
  });

  it('should render with status tag', () => {
    const TAG_NAME = 'tag name';
    renderWithProvider(
      <ButtonToggle tagProps={{ name: TAG_NAME }}>Click ME!</ButtonToggle>,
    );
    expect(screen.getByText(TAG_NAME)).toBeInTheDocument();
  });
});
