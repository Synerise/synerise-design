import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import Toolbar from '../index';

const CONTENT = 'CONTENT';

describe('Toolbar', () => {
  it('should render', function () {
    renderWithProvider(<Toolbar>{CONTENT}</Toolbar>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });
});
