import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Typography from '../index';

describe('Typography', () => {
  it('title should render', function() {
    renderWithProvider(<Typography.Title level={3}>HEADER</Typography.Title>);
    expect(screen.getByText('HEADER')).toBeInTheDocument();
  });
});
