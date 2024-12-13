import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { ToolbarGroup } from '../index';

const CONTENT = 'CONTENT';

describe('ToolbarGroup', () => {
  it('should render', function() {
    renderWithProvider(<ToolbarGroup>{CONTENT}</ToolbarGroup>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });
});