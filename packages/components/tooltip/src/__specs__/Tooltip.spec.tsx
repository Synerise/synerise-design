import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-utils';

import Tooltip from '../index';


describe('Tooltip', () => {
  const TOOLTIP_TITLE = 'Test';
  const TEST_ID = 'inner-element';

  it('should render', async () => {
   renderWithProvider(<Tooltip visible title={TOOLTIP_TITLE} />);

    await waitFor(() => {
      expect(screen.getByText(TOOLTIP_TITLE)).toBeTruthy();
    });
  });

  it('should appear on mouseOver', () => {
    renderWithProvider(
      <Tooltip title={TOOLTIP_TITLE} mouseEnterDelay={0} mouseLeaveDelay={0}>
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    const INNER_SPAN = screen.getByTestId(TEST_ID);
    fireEvent.mouseOver(INNER_SPAN);

    expect(screen.getByText(TOOLTIP_TITLE)).toBeTruthy();
  });

  it('should appear on click', () => {
    renderWithProvider(
      <Tooltip title={TOOLTIP_TITLE} trigger="click">
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    const INNER_SPAN = screen.getByTestId(TEST_ID);
    fireEvent.click(INNER_SPAN);

    expect(screen.getByText(TOOLTIP_TITLE)).toBeTruthy();
  });

  it('should trigger onVisibleChange', () => {
    const onVisibleChange = jest.fn();
    renderWithProvider(
      <Tooltip title={TOOLTIP_TITLE} onVisibleChange={onVisibleChange} mouseEnterDelay={0} mouseLeaveDelay={0}>
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    const INNER_SPAN = screen.getByTestId(TEST_ID);
    fireEvent.mouseOver(INNER_SPAN);

    expect(onVisibleChange).toHaveBeenCalled();
  });

  it('should render custom tooltip body', () => {
    const customTooltipTitlte = 'CUSTOM TOOLTIP TITLE';
    renderWithProvider(
      <Tooltip
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        render={(): React.ReactNode => (
          <span id="CUSTOM_TOOLTIP_COMPONENT">{customTooltipTitlte}</span>
        )}
      >
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    fireEvent.mouseOver(screen.getByTestId(TEST_ID));

    expect(document.getElementById('CUSTOM_TOOLTIP_COMPONENT')).toBeTruthy();
  });
});
