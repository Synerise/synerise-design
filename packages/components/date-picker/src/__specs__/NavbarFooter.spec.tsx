import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { screen } from '@testing-library/react';

import Footer from '../Elements/Footer/Footer';
import Navbar from '../Elements/Navbar/Navbar';

const NAV_BUTTON_TEST_IDS = [
  'datapicker-long-prev',
  'datapicker-short-prev',
  'datapicker-short-next',
  'datapicker-long-next',
];

// Inline closures on purpose: a parent re-render hands down new handler identities.
const renderNavbar = () => (
  <Navbar
    title="September 2026"
    onLongPrev={() => {}}
    onShortPrev={() => {}}
    onShortNext={() => {}}
    onLongNext={() => {}}
  />
);

const renderFooter = () => (
  <Footer
    mode="date"
    canSwitchMode
    onSwitchMode={() => {}}
    texts={{
      apply: 'Apply',
      now: 'Now',
      inputPlaceholder: '',
      clearTooltip: '',
      quickPicks: '',
    }}
  />
);

describe('Navbar', () => {
  it('should not remount nav buttons when the parent re-renders', () => {
    const { rerender } = renderWithProvider(renderNavbar());
    const buttons = NAV_BUTTON_TEST_IDS.map((id) => screen.getByTestId(id));

    rerender(renderNavbar());

    NAV_BUTTON_TEST_IDS.forEach((id, index) => {
      expect(screen.getByTestId(id)).toBe(buttons[index]);
    });
  });
});

describe('Footer', () => {
  it('should not remount the switch-mode button when the parent re-renders', () => {
    const { container, rerender } = renderWithProvider(renderFooter());
    const switchButton = container.querySelector('.ds-date-time-switch');
    expect(switchButton).toBeInTheDocument();

    rerender(renderFooter());

    expect(container.querySelector('.ds-date-time-switch')).toBe(switchButton);
  });
});
