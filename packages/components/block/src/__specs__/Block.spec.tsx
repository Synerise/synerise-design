import React from 'react';

import Icon, { EditM } from '@synerise/ds-icon';
import { renderWithProvider, rulesFor } from '@synerise/ds-core/testing';

import Block from '../index';

describe('Sidebar', () => {
  const TITLE = 'Title';

  it('should render title', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Block isDragging={false} icon={<Icon component={<EditM />} />}>
        {TITLE}
      </Block>,
    );

    // ASSERT
    expect(getByText(TITLE)).toBeTruthy();
  });
});

// Rules setting a colour on the svg inside `element` that come through `owner`.
const svgColourRules = (element: Element | null, owner: Element) =>
  rulesFor(element?.querySelector('svg') ?? null, {
    within: owner,
    state: 'any',
  }).filter(({ declarations }) => /(^|;)(fill|color):/.test(declarations));

describe('Block icon colour', () => {
  const renderBlock = (color?: string) => {
    const { getByTestId } = renderWithProvider(
      <Block
        isDragging={false}
        icon={<Icon component={<EditM />} color={color} data-testid="icon" />}
      >
        Title
      </Block>,
    );
    const icon = getByTestId('icon');
    const content = icon.parentElement as HTMLElement;
    const block = content.parentElement as HTMLElement;
    return { block, content, icon };
  };

  it('darkens the icon on hover through the block content', () => {
    const { block, content, icon } = renderBlock();

    expect(icon?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(
      rulesFor(content, { within: block, state: 'any' })
        .filter(({ selector }) => selector.includes(':hover'))
        .map(({ declarations }) => declarations)
        .join(';'),
    ).toContain('color:var(--ds-color-text-base-default)');
  });

  it('lets an explicit icon colour win on hover', () => {
    const { block, icon } = renderBlock('var(--ds-color-icon-brand-default)');

    expect(icon?.querySelector('svg')).toHaveStyle(
      'color: var(--ds-color-icon-brand-default)',
    );
    expect(svgColourRules(icon, block)).toEqual([]);
  });
});
