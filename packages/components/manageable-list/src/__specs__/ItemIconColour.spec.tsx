import React from 'react';

import { renderWithProvider, rulesFor } from '@synerise/ds-core/testing';
import { AddS, FileM } from '@synerise/ds-icon';
import { screen } from '@testing-library/react';

import BlankItem from '../Item/BlankItem/BlankItem';
import ContentItem from '../Item/ContentItem/ContentItem';
import FilterItem from '../Item/FilterItem/FilterItem';
import SimpleItem from '../Item/SimpleItem/SimpleItem';

const BASE_DEFAULT = 'var(--ds-color-icon-base-default)';
const BASE_MUTED = 'var(--ds-color-icon-base-muted)';
const BRAND = 'var(--ds-color-icon-brand-default)';
const DANGER = 'var(--ds-color-icon-danger-default)';
const WARNING = 'var(--ds-color-icon-warning-default)';

const iconIn = (root: ParentNode | null | undefined, svgSelector = 'svg') =>
  root?.querySelector(svgSelector)?.closest('.ds-icon') ?? null;

// The hover rule that styles `target`, through `scope` when it is an ancestor.
const hoverRule = (
  scope: Element | null | undefined,
  target: Element | null | undefined,
) =>
  rulesFor(target ?? null, {
    state: 'any',
    within: scope === target ? undefined : (scope ?? null),
  }).find(({ selector }) => selector.includes(':hover'));

// Whether any rule `scope` emits, for itself or anything inside it, targets an
// svg or sets `fill`.
const forcesSvgColour = (scope: Element | null | undefined) =>
  [
    ...rulesFor(scope ?? null, { state: 'any' }),
    ...Array.from(scope?.querySelectorAll('*') ?? []).flatMap((element) =>
      rulesFor(element, { within: scope, state: 'any' }),
    ),
  ].some(
    ({ selector, declarations }) =>
      /svg/.test(selector) || /(^|;)fill:/.test(declarations),
  );

describe('ManageableList item icon colour', () => {
  it('lets default item actions take their colour from the wrapper and keeps status colours', () => {
    renderWithProvider(
      <SimpleItem
        item={{
          id: 'a',
          name: 'Item',
          icon: <FileM />,
          canUpdate: true,
          canDelete: true,
        }}
        onRemove={vi.fn()}
        additionalActions={[
          { icon: <AddS />, color: WARNING, onClick: vi.fn(), tooltip: 'A' },
          { icon: <AddS />, onClick: vi.fn(), tooltip: 'B' },
        ]}
      />,
    );

    const edit = iconIn(screen.getByTestId('list-item-edit'));
    expect(edit?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(edit).toHaveStyle('color: var(--ds-color-icon-base-subtle)');
    expect(
      iconIn(screen.getByTestId('list-item-remove'))?.querySelector('svg'),
    ).toHaveStyle(`color: ${DANGER}`);
    expect(
      iconIn(screen.getByTestId('additional-action-0'))?.querySelector('svg'),
    ).toHaveStyle(`color: ${WARNING}`);
    expect(
      iconIn(screen.getByTestId('additional-action-1'))?.querySelector('svg'),
    ).toHaveStyle('color: inherit');

    let actions = screen.getByTestId('list-item-edit').parentElement;
    while (actions && !actions.contains(screen.getByTestId('list-item-remove'))) {
      actions = actions.parentElement;
    }
    const iconHover = hoverRule(actions, edit);
    expect(iconHover?.selector).not.toMatch(/svg/);
    expect(iconHover?.declarations).toContain(`color:${BRAND}`);
    expect(forcesSvgColour(actions)).toBe(false);
  });

  it('colours the simple item icon on the icon itself in base, selected and hover states', () => {
    const { rerender } = renderWithProvider(
      <SimpleItem item={{ id: 'a', name: 'Item', icon: <FileM /> }} />,
    );
    const icon = document.querySelector('.ds-manageable-list-item-icon');
    const container = icon?.closest('[data-active]');

    expect(icon).toHaveStyle(`color: ${BASE_DEFAULT}`);
    const iconHover = hoverRule(container, icon);
    expect(iconHover?.selector).not.toMatch(/svg/);
    expect(iconHover?.declarations).toContain(`color:${BRAND}`);
    expect(forcesSvgColour(container)).toBe(false);

    rerender(
      <SimpleItem selected item={{ id: 'a', name: 'Item', icon: <FileM /> }} />,
    );
    expect(document.querySelector('.ds-manageable-list-item-icon')).toHaveStyle(
      `color: ${BRAND}`,
    );
  });

  it('colours blank item actions and drag handle from their wrappers', () => {
    renderWithProvider(
      <BlankItem
        draggable
        item={{ id: 'a', name: 'Item' }}
        renderItem={(item) => item.name}
        onRemove={vi.fn()}
        onDuplicate={vi.fn()}
      />,
    );

    const blankItem = screen.getByTestId('manageable-list-blank-item');
    const handle = blankItem.firstElementChild;
    const actions = blankItem.lastElementChild;
    const duplicate = iconIn(actions, '.duplicate-s');

    expect(duplicate?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(duplicate).toHaveStyle(`color: ${BASE_DEFAULT}`);
    expect(
      iconIn(actions, '.close-s')?.querySelector('svg'),
    ).toHaveStyle(`color: ${DANGER}`);
    expect(handle).toHaveStyle(`color: ${BASE_MUTED}`);

    const iconHover = hoverRule(actions, duplicate);
    expect(iconHover?.selector).not.toMatch(/svg/);
    expect(iconHover?.declarations).toContain(`color:${BRAND}`);
    expect(hoverRule(handle, handle)?.declarations).toContain(
      `color:${BASE_DEFAULT}`,
    );
    expect(forcesSvgColour(actions)).toBe(false);
    expect(forcesSvgColour(handle)).toBe(false);
  });

  it('colours the content item drag handle and dropdown trigger from their wrappers', () => {
    renderWithProvider(
      <ContentItem
        draggable
        item={{
          id: 'a',
          name: 'Item',
          icon: <FileM />,
          dropdown: <div />,
          content: <div />,
        }}
      />,
    );

    const dragger = iconIn(document, '.drag-handle-m')?.parentElement;
    const header = dragger?.parentElement?.parentElement;
    const suffix = header?.lastElementChild;
    const trigger = document.querySelector('.ds-dropdown-trigger .ds-icon');

    expect(dragger).toHaveStyle(`color: ${BASE_MUTED}`);
    expect(trigger?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(trigger).toHaveStyle(`color: ${BASE_DEFAULT}`);
    expect(
      iconIn(document, '.file-m')?.querySelector('svg'),
    ).toHaveStyle(`color: ${BASE_DEFAULT}`);

    const draggerHover = hoverRule(header, dragger);
    expect(draggerHover?.selector).not.toMatch(/svg/);
    expect(draggerHover?.declarations).toContain(`color:${BASE_DEFAULT}`);
    const triggerHover = hoverRule(suffix, trigger);
    expect(triggerHover?.selector).not.toMatch(/svg/);
    expect(triggerHover?.declarations).toContain(`color:${BRAND}`);
    expect(forcesSvgColour(dragger?.parentElement)).toBe(false);
    expect(forcesSvgColour(suffix)).toBe(false);
  });

  it('lets the filter item dropdown trigger take its colour from the wrapper', () => {
    renderWithProvider(
      <FilterItem selected item={{ id: 'a', name: 'Item' }} texts={{}} />,
    );

    const trigger = document.querySelector('.ds-dropdown-trigger .ds-icon');
    expect(trigger?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(trigger).toHaveStyle(`color: ${BASE_DEFAULT}`);
    expect(
      document.querySelector('.selected-item-icon')?.querySelector('svg'),
    ).toHaveStyle(
      'color: var(--ds-color-icon-success-onsolid)',
    );
  });
});
