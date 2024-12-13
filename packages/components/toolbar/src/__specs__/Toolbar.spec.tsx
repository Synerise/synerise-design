import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Toolbar from '../index';

const CONTENT = 'CONTENT';

describe('Toolbar', () => {
  it('should render', function() {
    renderWithProvider(<Toolbar>{CONTENT}</Toolbar>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });
});
