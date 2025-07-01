import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent, waitFor } from '@testing-library/react';

import Tooltip from '../index';

const TUTORIALS = [
  {
    title: 'Tip for you',
    description: 'You can change profile name later in your profile settings.',
  },
  {
    title: 'Tip for you',
    description: 'You can change avatar later in your profile settings.',
  },
  {
    title: 'Tip for you',
    description: 'You can change password later in your profile settings.',
  },
];

describe('Tooltip', () => {
  const TOOLTIP_TITLE = 'Test';
  const TEST_ID = 'inner-element';

  it('should render', async () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Tooltip visible title={TOOLTIP_TITLE} />,
    );

    // ASSERT
    await waitFor(() => {
      expect(getByText(TOOLTIP_TITLE)).toBeTruthy();
    });
  });

  it('should appear on mouseOver', () => {
    // ARRANGE
    const { getByText, getByTestId } = renderWithProvider(
      <Tooltip title={TOOLTIP_TITLE} mouseEnterDelay={0} mouseLeaveDelay={0}>
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    // ACT
    const INNER_SPAN = getByTestId(TEST_ID);
    fireEvent.mouseOver(INNER_SPAN);

    // ASSERT
    expect(getByText(TOOLTIP_TITLE)).toBeTruthy();
  });

  it('should appear on click', () => {
    // ARRANGE
    const { getByText, getByTestId } = renderWithProvider(
      <Tooltip title={TOOLTIP_TITLE} trigger="click">
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    // ACT
    const INNER_SPAN = getByTestId(TEST_ID);
    fireEvent.click(INNER_SPAN);

    // ASSERT
    expect(getByText(TOOLTIP_TITLE)).toBeTruthy();
  });

  it('should trigger onVisibleChange', () => {
    // ARRANGE
    const onVisibleChange = jest.fn();
    const { getByTestId } = renderWithProvider(
      <Tooltip
        title={TOOLTIP_TITLE}
        onVisibleChange={onVisibleChange}
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
      >
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    // ACT
    const INNER_SPAN = getByTestId(TEST_ID);
    fireEvent.mouseOver(INNER_SPAN);

    // ASSERT
    expect(onVisibleChange).toHaveBeenCalled();
  });

  it('should render with 3 tutorial slides', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <Tooltip
        type="tutorial"
        tutorials={TUTORIALS}
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
      >
        <span data-testid={TEST_ID}>Tooltip will show on mouse enter.</span>
      </Tooltip>,
    );

    // ACT
    fireEvent.mouseOver(getByTestId(TEST_ID));

    // ASSERT
    expect(document.querySelectorAll('.slick-slide').length).toBe(3);
    expect(document.querySelectorAll('.slick-dots li').length).toBe(3);
  });
  it('should render custom tooltip body', () => {
    // ARRANGE
    const customTooltipTitlte = 'CUSTOM TOOLTIP TITLE';
    const { getByTestId } = renderWithProvider(
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

    // ACT
    fireEvent.mouseOver(getByTestId(TEST_ID));

    // ASSERT
    expect(document.getElementById('CUSTOM_TOOLTIP_COMPONENT')).toBeTruthy();
  });
});
