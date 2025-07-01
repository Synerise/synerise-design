import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { screen } from '@testing-library/react';

import { ToolbarGroup } from '../index';

const CONTENT = 'CONTENT';

describe('ToolbarGroup', () => {
  it('should render', function () {
    renderWithProvider(<ToolbarGroup>{CONTENT}</ToolbarGroup>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });
});
