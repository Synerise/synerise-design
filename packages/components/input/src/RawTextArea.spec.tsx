import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { screen } from '@testing-library/react';

import { DSRawTextArea, RawTextArea } from './index';

const ERROR_BACKGROUND = 'background: var(--ds-form-field-bg-validated)';

describe('RawTextArea', () => {
  it('draws its own error surface when used on its own', () => {
    renderWithProvider(<RawTextArea error placeholder="standalone" />);

    expect(screen.getByPlaceholderText('standalone')).toHaveStyle(
      ERROR_BACKGROUND,
    );
  });

  it('has no error surface without the error prop', () => {
    renderWithProvider(<RawTextArea placeholder="standalone" />);

    expect(screen.getByPlaceholderText('standalone')).not.toHaveStyle(
      ERROR_BACKGROUND,
    );
  });

  it('leaves the error surface to the wrapper inside the DS textarea', () => {
    renderWithProvider(<DSRawTextArea error placeholder="wrapped" />);

    expect(screen.getByPlaceholderText('wrapped')).not.toHaveStyle(
      ERROR_BACKGROUND,
    );
  });
});
