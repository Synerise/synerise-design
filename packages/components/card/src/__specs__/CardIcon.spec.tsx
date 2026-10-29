import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import Icon, { BookmarkM, CheckS } from '@synerise/ds-icon';

import Card, { CardBadge } from '../index';

const renderCard = (icon: React.ReactNode, iconColor?: string) =>
  renderWithProvider(
    <Card title="Title" withHeader icon={icon} iconColor={iconColor} />,
  );

describe('Card icon', () => {
  it('wraps a bare icon component in an Icon with iconColor', () => {
    const { container } = renderCard(<BookmarkM />, 'var(--ds-color-icon-base-muted)');

    expect(container.querySelectorAll('.ds-icon')).toHaveLength(1);
    expect(container.querySelector('svg')).toHaveStyle(
      'color: var(--ds-color-icon-base-muted)',
    );
  });

  it('renders a CardBadge without wrapping it in another Icon', () => {
    const { container } = renderCard(<CardBadge icon={<CheckS />} />);

    expect(container.querySelector('.ds-icon .ds-icon')).toBeNull();
  });

  it('does not wrap an Icon element in a second Icon, and gives it iconColor', () => {
    const { container } = renderCard(
      <Icon component={<BookmarkM />} />,
      'var(--ds-color-icon-base-muted)',
    );

    expect(container.querySelectorAll('.ds-icon')).toHaveLength(1);
    expect(container.querySelector('svg')).toHaveStyle(
      'color: var(--ds-color-icon-base-muted)',
    );
  });

  it("keeps an Icon element's own color over iconColor", () => {
    const { container } = renderCard(
      <Icon component={<BookmarkM />} color="var(--ds-color-icon-brand-default)" />,
      'var(--ds-color-icon-base-muted)',
    );

    expect(container.querySelector('svg')).toHaveStyle(
      'color: var(--ds-color-icon-brand-default)',
    );
  });
});
