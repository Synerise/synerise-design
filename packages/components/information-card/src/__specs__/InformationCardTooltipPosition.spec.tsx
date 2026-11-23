import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import { InformationCardTooltip } from '../index';

const TRIGGER_LABEL = 'trigger';
const CARD_TITLE = 'Card title';

// jsdom's viewport is 1024×768; the trigger sits at 400–440, so a card up to 392px tall fits above it.
const ANCHOR = { top: 400, height: 40, width: 200 };
const OFFSET = 8;
const LOADING_HEIGHT = 300;
const LOADED_HEIGHT = 260;
const above = (height: number) => ANCHOR.top - height - OFFSET;

let cardHeight = LOADING_HEIGHT;

const isOverlay = (element: Element) =>
  element.hasAttribute('data-popover-content');

/** jsdom performs no layout: the trigger gets a box, and floating-ui reads the card's size from `offset*`. */
const stubLayout = () => {
  const originalRect = Element.prototype.getBoundingClientRect;
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetWidth',
  );
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  );

  const root = document.documentElement;
  Object.defineProperty(root, 'clientWidth', {
    configurable: true,
    value: window.innerWidth,
  });
  Object.defineProperty(root, 'clientHeight', {
    configurable: true,
    value: window.innerHeight,
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement) {
      return isOverlay(this) ? 350 : 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement) {
      return isOverlay(this) ? cardHeight : 0;
    },
  });
  Element.prototype.getBoundingClientRect = function stub(this: Element) {
    const isAnchor = this.textContent === TRIGGER_LABEL;
    const top = isAnchor ? ANCHOR.top : 0;
    const height = isAnchor ? ANCHOR.height : window.innerHeight;
    const width = isAnchor ? ANCHOR.width : window.innerWidth;
    return {
      x: 0,
      y: top,
      top,
      left: 0,
      right: width,
      bottom: top + height,
      width,
      height,
      toJSON: () => ({}),
    } as DOMRect;
  };

  return () => {
    cardHeight = LOADING_HEIGHT;
    Reflect.deleteProperty(root, 'clientWidth');
    Reflect.deleteProperty(root, 'clientHeight');
    Element.prototype.getBoundingClientRect = originalRect;
    originalOffsetWidth &&
      Object.defineProperty(
        HTMLElement.prototype,
        'offsetWidth',
        originalOffsetWidth,
      );
    originalOffsetHeight &&
      Object.defineProperty(
        HTMLElement.prototype,
        'offsetHeight',
        originalOffsetHeight,
      );
  };
};

/** The shared test setup makes `ResizeObserver` a no-op; this one can be fired at the card. */
const callbacksByTarget = new Map<Element, Set<ResizeObserverCallback>>();

class FiringResizeObserver {
  private readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    callbacksByTarget.set(
      target,
      (callbacksByTarget.get(target) ?? new Set()).add(this.callback),
    );
  }

  unobserve(target: Element) {
    callbacksByTarget.get(target)?.delete(this.callback);
  }

  disconnect() {
    callbacksByTarget.forEach((callbacks) => callbacks.delete(this.callback));
  }
}

const resizeCard = async (card: HTMLElement, height: number) => {
  cardHeight = height;
  await act(async () => {
    callbacksByTarget.get(card)?.forEach((callback) =>
      callback(
        [
          {
            target: card,
            contentRect: { width: 350, height },
          } as ResizeObserverEntry,
        ],
        {} as ResizeObserver,
      ),
    );
  });
};

const cardTop = (card: HTMLElement) => {
  const match = card.style.transform.match(/translate\(.+?, (.+?)px\)/);
  return match ? Number(match[1]) : undefined;
};

const openCardAboveTrigger = async () => {
  renderWithProvider(
    <InformationCardTooltip
      informationCardProps={{ title: CARD_TITLE }}
      popoverProps={{ placement: 'top' }}
    >
      {TRIGGER_LABEL}
    </InformationCardTooltip>,
  );
  fireEvent.mouseEnter(screen.getByText(TRIGGER_LABEL));
  await screen.findByText(CARD_TITLE);
  return document.querySelector('[data-popover-content]') as HTMLElement;
};

describe('InformationCardTooltip — position while the card resizes', () => {
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
    callbacksByTarget.clear();
  });

  it('stays attached to the trigger when a row that loads late makes the card shorter', async () => {
    const card = await openCardAboveTrigger();
    await waitFor(() => expect(cardTop(card)).toBe(above(LOADING_HEIGHT)));

    await resizeCard(card, LOADED_HEIGHT);

    await waitFor(() => expect(cardTop(card)).toBe(above(LOADED_HEIGHT)));
  });

  it('stays attached to the trigger when the card grows while open', async () => {
    const card = await openCardAboveTrigger();
    await waitFor(() => expect(cardTop(card)).toBe(above(LOADING_HEIGHT)));

    await resizeCard(card, 380);

    await waitFor(() => expect(cardTop(card)).toBe(above(380)));
  });
});
