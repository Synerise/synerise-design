import React from 'react';

import { renderWithProvider, rulesFor } from '@synerise/ds-core/testing';

import Navbar from '../index';

describe('Navbar', () => {
  const DESCRIPTION = 'DESCRIPTION';
  const LOGO = 'LOGO';
  const ACTIONS = 'ACTIONS';
  const ALERT_NOTIFICATION = 'ALERT NOTIFICATION';

  it('should render logo', () => {
    // ARRANGE
    const { getByRole } = renderWithProvider(
      <Navbar description={DESCRIPTION} logo={LOGO} actions />,
    );
    // ASSERT
    expect(getByRole('img')).toBeTruthy();
  });

  it('should render children', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Navbar description={DESCRIPTION} logo={LOGO} actions>
        Children
      </Navbar>,
    );
    // ASSERT
    expect(getByText('Children')).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Navbar description={DESCRIPTION} logo actions />,
    );
    // ASSERT
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should render actions', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Navbar description={DESCRIPTION} logo actions={ACTIONS} />,
    );
    // ASSERT
    expect(getByText(ACTIONS)).toBeTruthy();
  });

  it('should render alert notification', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Navbar
        description={DESCRIPTION}
        logo
        actions
        alertNotification={ALERT_NOTIFICATION}
      />,
    );
    // ASSERT
    expect(getByText(ALERT_NOTIFICATION)).toBeTruthy();
  });

  it('lets an explicit color override the default background', () => {
    const { container } = renderWithProvider(
      <Navbar
        description={DESCRIPTION}
        logo={LOGO}
        color="var(--ds-color-custom-green-600)"
      />,
    );

    expect(container.querySelector('.ds-navbar')).toHaveStyle({
      backgroundColor: 'var(--ds-color-custom-green-600)',
    });
  });
});

// Rules setting a colour on the svg inside `element` that come through `owner`.
const svgColourRules = (element: Element | null, owner: Element) =>
  rulesFor(element?.querySelector('svg') ?? null, {
    within: owner,
    state: 'any',
  }).filter(({ declarations }) => /(^|;)(fill|color):/.test(declarations));

describe('Navbar alert notification colour', () => {
  const renderNavbar = () => {
    const { getByTestId } = renderWithProvider(
      <Navbar
        description="Description"
        logo="Logo"
        alertNotification={
          <span className="ds-inline-alert" data-testid="alert">
            <span className="ds-icon">
              <svg />
            </span>
            <span>Message</span>
          </span>
        }
      />,
    );
    const alert = getByTestId('alert');
    return { alert, wrapper: alert.parentElement as HTMLElement };
  };

  it('makes the alert itself white so its default icon inherits it', () => {
    const { alert, wrapper } = renderNavbar();
    const rules = rulesFor(alert, { within: wrapper, state: 'any' }).filter(
      ({ declarations }) =>
        declarations.includes('color:var(--ds-color-text-base-onsolid)'),
    );

    expect(rules).not.toEqual([]);
    // Must outrank InlineAlert's own `:hover` / `:active` colour (two classes).
    rules.forEach(({ selector }) => {
      expect(selector.match(/[.:][\w-]+/g)?.length).toBeGreaterThan(2);
    });
  });

  it('leaves the alert svg alone so a custom icon colour can win', () => {
    const { alert, wrapper } = renderNavbar();

    expect(svgColourRules(alert, wrapper)).toEqual([]);
  });
});
