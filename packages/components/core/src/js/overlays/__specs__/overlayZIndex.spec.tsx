import React from 'react';

import { screen } from '@testing-library/react';

import { renderWithProvider } from '../../testing';
import {
  OVERLAY_Z_INDEX_STEP,
  OverlayZIndexProvider,
  useResolvedOverlayZIndex,
} from '../overlayZIndex';

const MODAL_TOKEN = 991000;
const DROPDOWN_TOKEN = 991050;
const CEILING = DROPDOWN_TOKEN - OVERLAY_Z_INDEX_STEP;

// Renders whatever the hook resolves so a test can assert on it as text.
const Probe = ({ zIndex }: { zIndex?: number }) => (
  <span data-testid="probe">{useResolvedOverlayZIndex(zIndex)}</span>
);

const resolved = (): number => Number(screen.getByTestId('probe').textContent);

describe('useResolvedOverlayZIndex', () => {
  describe('with no enclosing overlay', () => {
    it('falls back to the zindex-modal token', () => {
      renderWithProvider(<Probe />);

      expect(resolved()).toBe(MODAL_TOKEN);
    });

    it('uses an explicit zIndex as given', () => {
      renderWithProvider(<Probe zIndex={12345} />);

      expect(resolved()).toBe(12345);
    });
  });

  describe('inside an enclosing overlay', () => {
    it('stacks one step above it', () => {
      renderWithProvider(
        <OverlayZIndexProvider value={MODAL_TOKEN}>
          <Probe />
        </OverlayZIndexProvider>,
      );

      expect(resolved()).toBe(MODAL_TOKEN + OVERLAY_Z_INDEX_STEP);
    });

    it('lets an explicit zIndex win over the derived value', () => {
      renderWithProvider(
        <OverlayZIndexProvider value={MODAL_TOKEN}>
          <Probe zIndex={500} />
        </OverlayZIndexProvider>,
      );

      expect(resolved()).toBe(500);
    });

    it('derives from a parent that raised itself explicitly', () => {
      // The reported analytics chain: a host modal hardcodes 991002, so a modal
      // nested inside it has to land on 991004 — not on the flat token.
      renderWithProvider(
        <OverlayZIndexProvider value={991002}>
          <Probe />
        </OverlayZIndexProvider>,
      );

      expect(resolved()).toBe(991004);
    });

    it('nests transitively through several levels', () => {
      renderWithProvider(
        <OverlayZIndexProvider value={MODAL_TOKEN}>
          <OverlayZIndexProvider value={MODAL_TOKEN + OVERLAY_Z_INDEX_STEP}>
            <Probe />
          </OverlayZIndexProvider>
        </OverlayZIndexProvider>,
      );

      expect(resolved()).toBe(MODAL_TOKEN + 2 * OVERLAY_Z_INDEX_STEP);
    });
  });

  describe('ceiling', () => {
    it('clamps below zindex-dropdown so an overlay cannot cover its own popovers', () => {
      renderWithProvider(
        <OverlayZIndexProvider value={CEILING}>
          <Probe />
        </OverlayZIndexProvider>,
      );

      expect(resolved()).toBe(CEILING);
      expect(resolved()).toBeLessThan(DROPDOWN_TOKEN);
    });

    it('does not clamp the last value that still fits', () => {
      renderWithProvider(
        <OverlayZIndexProvider value={CEILING - OVERLAY_Z_INDEX_STEP}>
          <Probe />
        </OverlayZIndexProvider>,
      );

      expect(resolved()).toBe(CEILING);
    });

    it('never clamps an explicit zIndex', () => {
      renderWithProvider(
        <OverlayZIndexProvider value={CEILING}>
          <Probe zIndex={99910000} />
        </OverlayZIndexProvider>,
      );

      expect(resolved()).toBe(99910000);
    });
  });
});
