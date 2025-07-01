import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';

import Badge from '../index';

const TEST_ID = 'badge';
const COUNT = 3;
const OVERFLOW_COUNT = 99;
const LOW_OVERFLOW_COUNT = 2;
const COLOR = '#ffffff';
const ERROR_STATUS = 'blocked';
const TITLE = 'title';

describe('Bagde', () => {
  it('should render badge standalone', () => {
    // ARRANGE
    const { container, getByText } = renderWithProvider(
      <Badge count={COUNT} text={TITLE} data-testid={TEST_ID} />
    );

    const bagdeIndexContainer = container.querySelector('sup');

    // ASSERT
    expect(bagdeIndexContainer).toHaveAttribute('title', expect.stringContaining(`${COUNT}`));
    expect(getByText(TITLE)).toBeTruthy();
  });

  it('should render badge dot', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Badge dot text={TITLE} data-testid={TEST_ID} />);

    const bagdeIndexContainer = container.querySelector('sup');

    // ASSERT
    expect(bagdeIndexContainer).toHaveClass('ant-badge-dot');
  });

  it('should render badge count properly', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Badge count={COUNT} overflowCount={OVERFLOW_COUNT} showZero={false} />);

    const bagdeIndexContainer = container.querySelector('sup');
    const currentIndexElement = bagdeIndexContainer && bagdeIndexContainer.querySelector('.current');

    // ASSERT
    expect(currentIndexElement).toHaveTextContent(`${COUNT}`);
  });

  it('should render badge with max number set in overflowCount', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Badge count={COUNT} overflowCount={LOW_OVERFLOW_COUNT} showZero={false} />
    );

    const bagdeIndexContainer = container.querySelector('sup');

    // ASSERT
    expect(bagdeIndexContainer).toHaveTextContent(`${LOW_OVERFLOW_COUNT}+`);
  });

  it('should render badge status with proper color', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Badge color={COLOR} status={ERROR_STATUS} text={ERROR_STATUS} />);

    const badgeDot = container.querySelector('.ant-badge-status-dot');
    const badgeHoverPopup = container.querySelector('.ant-badge-status-text');

    // ASSERT
    expect(badgeDot).toHaveClass('ant-badge-status-blocked');
    expect(badgeDot).toHaveStyle('background: rgb(255, 255, 255)');
    expect(badgeHoverPopup).toHaveTextContent(/^blocked$/);
  });

  it('should render counter badge with outline', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Badge
      count={4}
      offset={[0, 0]}
      outlined={true}
      overflowCount={99}
      showZero={false}
      title={'title'}
    />);
    const badgeDot = container.querySelector('.ant-badge-count');

    expect(badgeDot).toHaveStyle('box-shadow: 0 0 0 1px #ffffff;');
  });
});
