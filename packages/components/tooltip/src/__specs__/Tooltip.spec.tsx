import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import Tooltip from '../index';


describe('Tooltip', () => {
  const TOOLTIP_TITLE = 'Test';
  const TEST_ID = 'inner-element';

  it('should render', async () => {
   renderWithProvider(<Tooltip open title={TOOLTIP_TITLE}>test</Tooltip>);

    await waitFor(() => {
      expect(screen.getByText(TOOLTIP_TITLE)).toBeTruthy();
    });
  });

  it('should appear on mouseOver', async () => {
    renderWithProvider(
      <Tooltip title={TOOLTIP_TITLE}>
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    const INNER_SPAN = screen.getByTestId(TEST_ID);
    await userEvent.hover(INNER_SPAN);
    
    await waitFor(() => expect(screen.getByText(TOOLTIP_TITLE)).toBeTruthy());
  });

  it('should appear on click', async () => {
    renderWithProvider(
      <Tooltip title={TOOLTIP_TITLE} trigger="click">
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    const INNER_SPAN = screen.getByTestId(TEST_ID);
    await userEvent.click(INNER_SPAN);

    await waitFor(() => expect(screen.getByText(TOOLTIP_TITLE)).toBeTruthy());
  });

  it('should trigger onOpenChange', async () => {
    const onOpenChange = jest.fn();
    renderWithProvider(
      <Tooltip title={TOOLTIP_TITLE} onOpenChange={onOpenChange}>
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    const INNER_SPAN = screen.getByTestId(TEST_ID);
    await userEvent.hover(INNER_SPAN);

    await waitFor(() => expect(onOpenChange).toHaveBeenCalled());
  });

  it('should render custom tooltip body', async () => {
    const customTooltipTitlte = 'CUSTOM TOOLTIP TITLE';
    renderWithProvider(
      <Tooltip
        render={(): React.ReactNode => (
          <span id="CUSTOM_TOOLTIP_COMPONENT">{customTooltipTitlte}</span>
        )}
      >
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    await userEvent.hover(screen.getByTestId(TEST_ID));

    await waitFor(() => expect(document.getElementById('CUSTOM_TOOLTIP_COMPONENT')).toBeTruthy());
  });
});
