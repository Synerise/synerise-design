import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import type { Placement } from '@floating-ui/react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Popover, PopoverContent, PopoverTrigger } from '../index';

const TRIGGER_LABEL = 'trigger';
const OVERLAY_CONTENT = 'the overlay';

// jsdom's viewport is 1024×768. With the anchor at 400–440 there are 328px below it and 400px above,
// so an overlay 300px tall fits below and one 380px tall only fits above.
const ANCHOR = { top: 400, height: 40, width: 200 };
const SHORT = 300;
const TALL = 380;
const BELOW = ANCHOR.top + ANCHOR.height;
const above = (height: number) => ANCHOR.top - height;

let overlayHeight = SHORT;

const isOverlay = (element: Element) =>
  element.hasAttribute('data-popover-content');

/**
 * jsdom performs no layout. The anchor gets a box through `getBoundingClientRect`; the overlay's size
 * is read by floating-ui from `offsetWidth`/`offsetHeight`, so those are stubbed for it alone.
 */
const stubLayout = () => {
  const original = {
    getBoundingClientRect: Element.prototype.getBoundingClientRect,
    clientWidth: Object.getOwnPropertyDescriptor(
      Element.prototype,
      'clientWidth',
    ),
    clientHeight: Object.getOwnPropertyDescriptor(
      Element.prototype,
      'clientHeight',
    ),
    offsetWidth: Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetWidth',
    ),
    offsetHeight: Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetHeight',
    ),
  };

  Object.defineProperty(Element.prototype, 'clientWidth', {
    configurable: true,
    get: () => window.innerWidth,
  });
  Object.defineProperty(Element.prototype, 'clientHeight', {
    configurable: true,
    get: () => window.innerHeight,
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement) {
      return isOverlay(this) ? ANCHOR.width : 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement) {
      return isOverlay(this) ? overlayHeight : 0;
    },
  });

  const rect = (top: number, height: number, width: number): DOMRect =>
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
    return this.textContent === TRIGGER_LABEL
      ? rect(ANCHOR.top, ANCHOR.height, ANCHOR.width)
      : rect(0, window.innerHeight, window.innerWidth);
  };

  return () => {
    overlayHeight = SHORT;
    Element.prototype.getBoundingClientRect = original.getBoundingClientRect;
    (['clientWidth', 'clientHeight'] as const).forEach((key) => {
      const descriptor = original[key];
      descriptor && Object.defineProperty(Element.prototype, key, descriptor);
    });
    (['offsetWidth', 'offsetHeight'] as const).forEach((key) => {
      const descriptor = original[key];
      descriptor &&
        Object.defineProperty(HTMLElement.prototype, key, descriptor);
    });
  };
};

/** The shared test setup makes `ResizeObserver` a no-op; this one can be fired at an element. */
const observed = new Map<Element, Set<ResizeObserverCallback>>();

class FiringResizeObserver {
  private readonly callback: ResizeObserverCallback;
  private readonly targets = new Set<Element>();

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.targets.add(target);
    observed.set(
      target,
      (observed.get(target) ?? new Set()).add(this.callback),
    );
  }

  unobserve(target: Element) {
    this.targets.delete(target);
    observed.get(target)?.delete(this.callback);
  }

  disconnect() {
    this.targets.forEach((target) => this.unobserve(target));
  }
}

const notifyResize = async (
  targets: Element[],
  { width, height }: { width: number; height: number },
) => {
  await act(async () => {
    targets.forEach((target) =>
      observed.get(target)?.forEach((callback) =>
        callback(
          [{ target, contentRect: { width, height } } as ResizeObserverEntry],
          {} as ResizeObserver,
        ),
      ),
    );
  });
};

const resizeOverlay = async (overlay: HTMLElement, height: number) => {
  overlayHeight = height;
  await notifyResize([overlay], { width: ANCHOR.width, height });
};

/** The anchor's observed element is the trigger wrapper or, with `asChild`, its child. */
const anchorElements = () => {
  const anchor = screen.getByText(TRIGGER_LABEL).parentElement as Element;
  return [anchor, ...Array.from(anchor.children)];
};

const overlayTop = (overlay: HTMLElement) => {
  const match = overlay.style.transform.match(/translate\(.+?, (.+?)px\)/);
  return match ? Number(match[1]) : undefined;
};

const toggle = () => userEvent.click(screen.getByText(TRIGGER_LABEL));

const openPopover = async ({
  stickyPlacement,
  placement = 'bottom',
  autoUpdate = true,
}: {
  stickyPlacement?: boolean;
  placement?: Placement;
  autoUpdate?: boolean;
}) => {
  renderWithProvider(
    <Popover
      autoUpdate={autoUpdate}
      placement={placement}
      stickyPlacement={stickyPlacement}
    >
      <PopoverTrigger>
        <button>{TRIGGER_LABEL}</button>
      </PopoverTrigger>
      <PopoverContent>{OVERLAY_CONTENT}</PopoverContent>
    </Popover>,
  );
  toggle();
  await waitFor(() =>
    expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument(),
  );
  return document.querySelector('[data-popover-content]') as HTMLElement;
};

describe('Popover — sticky placement', () => {
  let restoreLayout: () => void;
  const originalResizeObserver = window.ResizeObserver;

  beforeEach(() => {
    restoreLayout = stubLayout();
    window.ResizeObserver =
      FiringResizeObserver as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    restoreLayout();
    window.ResizeObserver = originalResizeObserver;
    observed.clear();
  });

  it('flips to the other side when its content grows, without it', async () => {
    const overlay = await openPopover({ stickyPlacement: false });
    await waitFor(() => expect(overlayTop(overlay)).toBe(BELOW));

    await resizeOverlay(overlay, TALL);

    await waitFor(() => expect(overlayTop(overlay)).toBe(above(TALL)));
  });

  it('keeps its side when its content grows', async () => {
    const overlay = await openPopover({ stickyPlacement: true });
    await waitFor(() => expect(overlayTop(overlay)).toBe(BELOW));

    await resizeOverlay(overlay, TALL);

    expect(overlayTop(overlay)).toBe(BELOW);
  });

  it('stays attached to the anchor while its size changes above it', async () => {
    const overlay = await openPopover({
      stickyPlacement: true,
      placement: 'top',
    });
    await waitFor(() => expect(overlayTop(overlay)).toBe(above(SHORT)));

    await resizeOverlay(overlay, 350);

    await waitFor(() => expect(overlayTop(overlay)).toBe(above(350)));
  });

  it('chooses its side again when the viewport is resized', async () => {
    const overlay = await openPopover({ stickyPlacement: true });
    await waitFor(() => expect(overlayTop(overlay)).toBe(BELOW));
    await resizeOverlay(overlay, TALL);
    expect(overlayTop(overlay)).toBe(BELOW);

    fireEvent(window, new Event('resize'));

    await waitFor(() => expect(overlayTop(overlay)).toBe(above(TALL)));
  });

  it('chooses its side again when the anchor is resized', async () => {
    const overlay = await openPopover({ stickyPlacement: true });
    await waitFor(() => expect(overlayTop(overlay)).toBe(BELOW));
    await notifyResize(anchorElements(), ANCHOR);
    await resizeOverlay(overlay, TALL);

    await notifyResize(anchorElements(), { ...ANCHOR, width: 260 });

    await waitFor(() => expect(overlayTop(overlay)).toBe(above(TALL)));
  });

  it('keeps its side through the anchor’s first, possibly late, notification', async () => {
    const overlay = await openPopover({ stickyPlacement: true });
    await waitFor(() => expect(overlayTop(overlay)).toBe(BELOW));
    await resizeOverlay(overlay, TALL);

    await notifyResize(anchorElements(), ANCHOR);

    expect(overlayTop(overlay)).toBe(BELOW);
  });

  it('forgets its side once closed', async () => {
    const overlay = await openPopover({ stickyPlacement: true });
    await waitFor(() => expect(overlayTop(overlay)).toBe(BELOW));
    await resizeOverlay(overlay, TALL);

    toggle();
    await waitFor(() =>
      expect(screen.queryByText(OVERLAY_CONTENT)).not.toBeInTheDocument(),
    );
    toggle();
    await waitFor(() =>
      expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument(),
    );

    const reopened = document.querySelector(
      '[data-popover-content]',
    ) as HTMLElement;
    await waitFor(() => expect(overlayTop(reopened)).toBe(above(TALL)));
  });

  it('has no effect without autoUpdate, so a reopen still chooses its side', async () => {
    await openPopover({ stickyPlacement: true, autoUpdate: false });
    await waitFor(() =>
      expect(overlayTop(document.querySelector('[data-popover-content]') as HTMLElement)).toBe(BELOW),
    );

    toggle();
    await waitFor(() =>
      expect(screen.queryByText(OVERLAY_CONTENT)).not.toBeInTheDocument(),
    );
    overlayHeight = TALL;
    toggle();
    await waitFor(() =>
      expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument(),
    );

    const reopened = document.querySelector(
      '[data-popover-content]',
    ) as HTMLElement;
    await waitFor(() => expect(overlayTop(reopened)).toBe(above(TALL)));
  });
});
