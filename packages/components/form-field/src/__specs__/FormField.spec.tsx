import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import FormField from '../FormField';

const CHILDREN = 'CHILDREN';
const LABEL = 'LABEL';
const DESCRIPTION = 'DESCRIPTION';
const RIGHT_SIDE_CONTENT = 'RIGHT_SIDE_CONTENT';
const ERROR = 'ERROR';
const TOOLTIP_TEXT = 'TOOLTIP_TEXT';

describe('FormField component', () => {
  it('Should render', () => {
    renderWithProvider(<FormField>{CHILDREN}</FormField>);
    expect(screen.getByText(CHILDREN)).toBeInTheDocument();
  });
  it('Should render with label', () => {
    renderWithProvider(<FormField label={LABEL}>{CHILDREN}</FormField>);
    expect(screen.getByText(LABEL)).toBeInTheDocument();
  });
  it('Should render with description', () => {
    renderWithProvider(
      <FormField description={DESCRIPTION}>{CHILDREN}</FormField>,
    );
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });
  it('Should render with right side content', () => {
    renderWithProvider(
      <FormField rightSide={RIGHT_SIDE_CONTENT}>{CHILDREN}</FormField>,
    );
    expect(screen.getByText(RIGHT_SIDE_CONTENT)).toBeInTheDocument();
  });
  it('Should render with error message', () => {
    renderWithProvider(<FormField errorText={ERROR}>{CHILDREN}</FormField>);
    expect(screen.getByText(ERROR)).toBeInTheDocument();
  });
  it('Should render with label tooltip', async () => {
    renderWithProvider(
      <FormField label={LABEL} tooltip={TOOLTIP_TEXT}>
        {CHILDREN}
      </FormField>,
    );
    fireEvent.mouseOver(screen.getByTestId('label-tooltip-trigger'));
    await waitFor(() =>
      expect(screen.getByText(TOOLTIP_TEXT)).toBeInTheDocument(),
    );
  });
});
