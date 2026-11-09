import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { act, fireEvent, screen, within } from '@testing-library/react';

import Tabs from '../Tabs';
import type { TabsProps } from '../Tabs.types';

const WIDE_CONTAINER = 1000;
const TAB_WIDTH = 70;
let containerWidth = WIDE_CONTAINER;

const widthOf = (element: Element) => {
  switch (element.getAttribute('data-testid')) {
    case 'tabs-container':
      return element.isConnected ? containerWidth : 0;
    case 'ds-tabs-hidden-helper':
      return element.childElementCount * TAB_WIDTH;
    case 'tab-container':
      return TAB_WIDTH;
    default:
      return 0;
  }
};

type ObserverRecord = { callback: ResizeObserverCallback; elements: Element[] };
let observers: ObserverRecord[] = [];

const resizeAll = () =>
  act(() => {
    observers.forEach(({ callback, elements }) =>
      elements.forEach((element) =>
        callback(
          [{ contentRect: { width: widthOf(element) } } as ResizeObserverEntry],
          {} as ResizeObserver,
        ),
      ),
    );
    vi.advanceTimersByTime(50);
  });

const originalResizeObserver = window.ResizeObserver;
const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetWidth',
);

beforeAll(() => {
  window.ResizeObserver = class {
    record: ObserverRecord;
    constructor(callback: ResizeObserverCallback) {
      this.record = { callback, elements: [] };
      observers.push(this.record);
    }
    observe(element: Element) {
      this.record.elements.push(element);
    }
    unobserve(element: Element) {
      this.record.elements = this.record.elements.filter(
        (observed) => observed !== element,
      );
    }
    disconnect() {
      this.record.elements = [];
    }
  } as unknown as typeof ResizeObserver;
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement) {
      return widthOf(this);
    },
  });
});

afterAll(() => {
  window.ResizeObserver = originalResizeObserver;
  if (originalOffsetWidth) {
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      originalOffsetWidth,
    );
  }
});

beforeEach(() => {
  observers = [];
  containerWidth = WIDE_CONTAINER;
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const LOADED_TABS = ['One', 'Two', 'Three', 'Four', 'Five'].map((label) => ({
  label,
}));

const renderTabs = (tabs: TabsProps['tabs'], activeTab = 0) => (
  <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={() => {}} />
);

const visibleTabCount = (container: HTMLElement) =>
  within(container).queryAllByTestId('tab-container').length;

const dropdownItem = (label: string) => {
  const item = screen
    .getAllByTestId('ds-list-item')
    .find((element) => element.textContent === label);
  if (!item) {
    throw new Error(`No dropdown item labelled ${label}`);
  }
  return item;
};

// jsdom cannot resolve var(), so read the injected rules for the item's own classes instead.
// Rules with a pseudo-class (:active, :hover) are interaction styles, not the resting state.
const hasActiveItemStyle = (element: Element) => {
  const ownSelectors = Array.from(element.classList).map(
    (className) => `.${className}`,
  );
  return Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules))
    .some(
      (rule) =>
        rule instanceof CSSStyleRule &&
        !rule.selectorText.includes(':') &&
        ownSelectors.includes(rule.selectorText.split(' ')[0]) &&
        rule.style.getPropertyValue('background') ===
          'var(--ds-list-item-role-normal-bg-active)',
    );
};

describe('Tabs overflow', () => {
  it('should show tabs that arrive while the initial width update is still pending', () => {
    // An empty tab list without configuration renders no container, so the first width the
    // component sees is 0. Tabs loaded before that update settles must still fit by real width.
    const { rerender, getByTestId } = renderWithProvider(renderTabs([]));
    resizeAll();

    rerender(renderTabs(LOADED_TABS));
    for (let frame = 0; frame < 5; frame += 1) {
      resizeAll();
    }
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(visibleTabCount(getByTestId('tabs-container'))).toBe(
      LOADED_TABS.length,
    );
  });

  it('should mark the active tab as selected in the overflow dropdown', () => {
    // Fits two 70px tabs next to the trigger, so tabs Three to Five overflow.
    containerWidth = 200;
    renderWithProvider(renderTabs(LOADED_TABS, 3));
    for (let frame = 0; frame < 5; frame += 1) {
      resizeAll();
    }
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    fireEvent.click(screen.getByTestId('tabs-dropdown-trigger'));
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(hasActiveItemStyle(dropdownItem('Four'))).toBe(true);
    expect(hasActiveItemStyle(dropdownItem('Three'))).toBe(false);
    expect(hasActiveItemStyle(dropdownItem('Five'))).toBe(false);
  });
});
