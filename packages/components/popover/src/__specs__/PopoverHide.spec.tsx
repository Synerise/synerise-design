import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Popover, PopoverContent, PopoverTrigger } from '../index';

const TRIGGER_LABEL = 'trigger';
const OVERLAY_CONTENT = 'the overlay';

const DEFAULT_ANCHOR_BOX = { height: 40, width: 200 };

/**
 * The anchor's own box, kept in one mutable place so a spec can collapse it while the overlay is
 * already open — which is what `display: none` does to an anchor in a browser. `stubRects` sets it
 * up, and its teardown puts it back.
 */
let anchorBox = { top: 0, ...DEFAULT_ANCHOR_BOX };

/** The 0×0 box at the document origin that an element which stopped being rendered reports. */
const collapseAnchorBox = (): void => {
  anchorBox = { top: 0, height: 0, width: 0 };
};

/**
 * jsdom performs no layout, so every element reports a 0×0 rect. These specs stub the rects the
 * `hide` middleware reads, which is the only way to exercise either branch: without a stub the
 * anchor has no layout and the overlay is deliberately left alone (see `PopoverContent`).
 */
const stubRects = ({ anchorTop }: { anchorTop: number }) => {
  anchorBox = { top: anchorTop, ...DEFAULT_ANCHOR_BOX };
  const original = Element.prototype.getBoundingClientRect;
  // floating-ui reads the viewport from documentElement.clientWidth/Height, which jsdom reports as
  // 0 — so the clipping rect would be empty and everything would read as hidden.
  const originalClientWidth = Object.getOwnPropertyDescriptor(
    Element.prototype,
    'clientWidth',
  );
  const originalClientHeight = Object.getOwnPropertyDescriptor(
    Element.prototype,
    'clientHeight',
  );
  Object.defineProperty(Element.prototype, 'clientWidth', {
    configurable: true,
    get: () => window.innerWidth,
  });
  Object.defineProperty(Element.prototype, 'clientHeight', {
    configurable: true,
    get: () => window.innerHeight,
  });

  const rect = (top: number, height: number, width = 200): DOMRect =>
    ({
      x: 0,
      y: top,
      top,
      left: 0,
      right: width,
      bottom: top + height,
      width,
      height,
      toJSON: () => ({}),
    }) as DOMRect;

  Element.prototype.getBoundingClientRect = function stub(this: Element) {
    // Only the anchor gets a position; every other element stands in for a clipping ancestor and so
    // has to span the viewport, or the anchor would fall outside the clipping rect and read as
    // hidden no matter where it sits.
    return this.textContent === TRIGGER_LABEL
      ? rect(anchorBox.top, anchorBox.height, anchorBox.width)
      : rect(0, window.innerHeight, window.innerWidth);
  };

  return () => {
    anchorBox = { top: 0, ...DEFAULT_ANCHOR_BOX };
    Element.prototype.getBoundingClientRect = original;
    if (originalClientWidth) {
      Object.defineProperty(Element.prototype, 'clientWidth', originalClientWidth);
    }
    if (originalClientHeight) {
      Object.defineProperty(Element.prototype, 'clientHeight', originalClientHeight);
    }
  };
};

const openPopover = async (hideConfig?: { enabled?: boolean }) => {
  renderWithProvider(
    // `autoUpdate` is what every component that can reach this passes — tooltip, dropdown,
    // popconfirm, date-range-picker, tabs. It is what keeps the overlay glued to its anchor, and so
    // what repositions it when the anchor's box changes underneath it.
    <Popover hideConfig={hideConfig} autoUpdate={true}>
      <PopoverTrigger>
        <button>{TRIGGER_LABEL}</button>
      </PopoverTrigger>
      <PopoverContent>{OVERLAY_CONTENT}</PopoverContent>
    </Popover>,
  );
  userEvent.click(screen.getByText(TRIGGER_LABEL));
  await waitFor(() =>
    expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument(),
  );
  return document.querySelector('[data-popover-content]') as HTMLElement;
};

describe('Popover — hiding while the anchor is not visible', () => {
  it('leaves the overlay alone while the anchor is in view', async () => {
    const restore = stubRects({ anchorTop: 100 });
    try {
      const content = await openPopover();

      expect(content.style.visibility).not.toBe('hidden');
      expect(content).not.toHaveAttribute('data-popover-anchor-hidden');
    } finally {
      restore();
    }
  });

  it('hides the overlay once the anchor is scrolled out of view', async () => {
    // Well above the viewport — the position a table's sticky header parks itself in.
    const restore = stubRects({ anchorTop: -9999 });
    try {
      const content = await openPopover();

      expect(content.style.visibility).toBe('hidden');
      expect(content).toHaveAttribute('data-popover-anchor-hidden', 'true');
    } finally {
      restore();
    }
  });

  it('hides in a way a descendant cannot undo', async () => {
    const restore = stubRects({ anchorTop: -9999 });
    try {
      const content = await openPopover();

      // `visibility` alone is not enough: it is inherited, and a descendant that declares
      // `visibility: visible` re-shows itself out of an ancestor that asked to be hidden — how
      // `ds-list-item`'s copyable label used to stay painted over a hidden dropdown. `opacity` is
      // not inherited and applies to the subtree as one group, so it cannot be raised back, and
      // `pointer-events: none` keeps such a descendant from being an invisible click target.
      //
      // Only the inline declarations are asserted here. jsdom does not resolve inherited visibility
      // the way a browser paints it, so the leak itself is not reproducible in this suite — it
      // belongs to Chromatic.
      expect(content.style.visibility).toBe('hidden');
      expect(content.style.opacity).toBe('0');
      expect(content.style.pointerEvents).toBe('none');
    } finally {
      restore();
    }
  });

  it('hides rather than closes, so the overlay content survives', async () => {
    const restore = stubRects({ anchorTop: -9999 });
    try {
      const content = await openPopover();

      // The distinction that matters: a half-filled overlay must come back intact when the anchor
      // scrolls into view again, so it stays mounted rather than being dismissed.
      expect(content.style.visibility).toBe('hidden');
      expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument();
    } finally {
      restore();
    }
  });

  it('can be opted out of, for an overlay that must outlive its anchor', async () => {
    const restore = stubRects({ anchorTop: -9999 });
    try {
      const content = await openPopover({ enabled: false });

      expect(content.style.visibility).not.toBe('hidden');
      expect(content.style.opacity).not.toBe('0');
      expect(content.style.pointerEvents).not.toBe('none');
      expect(content).not.toHaveAttribute('data-popover-anchor-hidden');
    } finally {
      restore();
    }
  });

  it('does nothing when the anchor reports no box at all', async () => {
    // No stub: jsdom's 0×0 default. Treated as "no layout information", not as hidden — otherwise
    // every overlay in every consumer's jsdom suite would render hidden.
    const content = await openPopover();

    expect(content.style.visibility).not.toBe('hidden');
    expect(content).not.toHaveAttribute('data-popover-anchor-hidden');
  });

  it('hides the overlay once its anchor stops being rendered', async () => {
    const restore = stubRects({ anchorTop: 100 });
    try {
      const content = await openPopover();
      const positionWhileAnchored = content.style.transform;
      expect(content).not.toHaveAttribute('data-popover-anchor-hidden');

      // What a hover-revealed row action does on mouse-out: the anchor keeps its node — so
      // floating-ui keeps its reference and goes on recomputing — but reports the 0×0 box at the
      // document origin. `flip` and `shift` clamp the overlay into the viewport from there, which
      // parks it in the top-left corner for as long as it stays open.
      collapseAnchorBox();
      // A browser drives that recompute through the `ResizeObserver` `autoUpdate` puts on the
      // anchor. The shared test setup stubs `ResizeObserver` out to a no-op, so this goes through
      // the `resize` listener `autoUpdate` puts on the window instead: the same `update()`, the
      // same `computePosition` against the collapsed box, committed the same way.
      fireEvent(window, new Event('resize'));

      await waitFor(() =>
        expect(content).toHaveAttribute('data-popover-anchor-hidden', 'true'),
      );
      // Both halves of that commit are asserted together: the position did move, so floating-ui
      // really recomputed against the collapsed box, and the masking is already on it — floating-ui
      // commits with `flushSync` and this component re-measures the anchor in that same render, so
      // the top-left position is never painted unmasked.
      expect(content.style.transform).not.toBe(positionWhileAnchored);
      expect(content.style.visibility).toBe('hidden');
      expect(content.style.opacity).toBe('0');
      expect(content.style.pointerEvents).toBe('none');
      // Still hiding rather than closing: rendering the anchor again brings the overlay back as it
      // was.
      expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument();
    } finally {
      restore();
    }
  });

  it('leaves an anchor that never had a box alone, recompute or not', async () => {
    // No stub, so jsdom's 0×0 default — which the `hide` middleware does report as hidden. The only
    // thing keeping this inert is that the anchor never had a box to lose. Drop that and every
    // overlay in every consumer's jsdom suite renders `visibility: hidden` the moment anything
    // triggers a recompute, which is why this sits right next to the spec above.
    const content = await openPopover();

    await act(async () => {
      fireEvent(window, new Event('resize'));
    });

    expect(content).not.toHaveAttribute('data-popover-anchor-hidden');
    expect(content.style.visibility).not.toBe('hidden');
  });
});
