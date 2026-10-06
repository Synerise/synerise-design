import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { Creator } from '../index';
import { CreatorStatus } from '../Creator/Creator.types';

const LABEL_TEXT = 'Add something';
const TEST_ID = 'button-creator';

describe('Creator', () => {
  const onClick = vi.fn();
  it('should render', () => {
    renderWithProvider(
      <Creator data-testid={TEST_ID} onClick={onClick}></Creator>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
  it('should handle onClick', () => {
    renderWithProvider(
      <Creator data-testid={TEST_ID} onClick={onClick}></Creator>,
    );

    const creator = screen.getByTestId(TEST_ID);
    fireEvent.click(creator);

    expect(onClick).toBeCalledTimes(1);
  });
  it('should render disabled with lower opacity', () => {
    renderWithProvider(
      <Creator
        data-testid={TEST_ID}
        onClick={onClick}
        disabled={true}
      ></Creator>,
    );

    const creator = screen.getByTestId(TEST_ID);
    expect(creator).toBeInTheDocument();
    // Disabled dimming now comes from the --ds-buttons-disabled-opacity token (0.4). jsdom can't
    // resolve var() via getComputedStyle, so assert the token is wired into the injected styles.
    const injectedCss = Array.from(document.querySelectorAll('style'))
      .map((s) => s.textContent)
      .join('')
      .replace(/\s/g, '');
    expect(injectedCss).toContain('opacity:var(--ds-buttons-disabled-opacity)');
  });
  it('should render label text', () => {
    renderWithProvider(
      <Creator
        data-testid={TEST_ID}
        onClick={onClick}
        label={LABEL_TEXT}
      ></Creator>,
    );

    const label = screen.getByText(LABEL_TEXT);

    expect(label).toBeTruthy();
  });
  it('should render red when validated', () => {
    renderWithProvider(
      <Creator
        data-testid={TEST_ID}
        onClick={onClick}
        status={CreatorStatus.Error}
      ></Creator>,
    );
    const creator = screen.getByTestId(TEST_ID);
    expect(creator).toHaveStyle(
      `border: 1px dashed var(--ds-color-border-danger-default)`,
    );
  });
  it('should render blue when uploading', async () => {
    renderWithProvider(
      <Creator
        data-testid={TEST_ID}
        onClick={onClick}
        status={CreatorStatus.Upload}
      ></Creator>,
    );

    const creator = screen.getByTestId(TEST_ID);
    await waitFor(() =>
      expect(creator).toHaveStyle(
        `border: 1px dashed var(--ds-color-border-brand-strong)`,
      ),
    );
  });

  describe('tokens', () => {
    const injected = () =>
      Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('')
        .replace(/\s/g, '');

    it('should use creator hover and pressed background tokens', () => {
      renderWithProvider(<Creator data-testid={TEST_ID} pressed />);
      expect(injected()).toContain(
        'background-color:var(--ds-button-creator-bg-hover)',
      );
      expect(injected()).toContain(
        'background-color:var(--ds-button-creator-bg-pressed)',
      );
    });
    it('should use upload hover text token', () => {
      renderWithProvider(
        <Creator data-testid={TEST_ID} status={CreatorStatus.Upload} />,
      );
      expect(injected()).toContain(
        'color:var(--ds-button-creator-upload-text-hover)',
      );
    });
  });
});
