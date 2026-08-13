import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import ContextSelector from '../ContextSelector';
import ContextSelectorDropdown from '../ContextSelectorDropdown/ContextSelectorDropdown';
import { type ContextProps } from '../ContextSelector.types';

const TEXTS = {
  buttonLabel: 'Choose',
  searchPlaceholder: 'Search',
  noResults: 'No results',
  showMore: 'Show more',
};

const nodeItems = Array.from({ length: 10 }, (_, i) => ({
  name: `Node ${i}`,
  id: `node_${i}`,
  icon: <span />,
  groupId: 'NODES',
}));

const sequenceItems = Array.from({ length: 14 }, (_, i) => ({
  name: `Sequence ${i}`,
  id: `seq_${i}`,
  icon: <span />,
  groupId: 'SEQUENCES',
}));

const topSection = (
  <div data-testid="top-section">
    <div role="button" tabIndex={0} aria-label="Card A">
      Card A
    </div>
    <div role="button" tabIndex={0} aria-label="Card B">
      Card B
    </div>
  </div>
);

const GROUPS = [
  { id: 'NODES', name: 'Nodes', defaultGroup: true, subGroups: [], topSection },
  { id: 'SEQUENCES', name: 'Sequences' },
];

const arrowDown = () =>
  fireEvent.keyDown(document.activeElement as HTMLElement, {
    key: 'ArrowDown',
  });

const activeText = () =>
  (document.activeElement as HTMLElement | null)?.getAttribute('aria-label') ||
  (document.activeElement as HTMLElement | null)?.textContent;

const DROPDOWN_SELECTOR = '[data-testid="context-selector-dropdown"]';

describe('ContextSelector keyboard navigation', () => {
  const originalScrollTo = Element.prototype.scrollTo;

  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  afterEach(() => {
    Element.prototype.scrollTo = originalScrollTo;
  });

  test('one ArrowDown moves focus exactly one step (popover list navigation must stay disabled)', async () => {
    const props: ContextProps = {
      texts: TEXTS,
      onSelectItem: () => {},
      selectedItem: undefined,
      items: [...nodeItems, ...sequenceItems],
      groups: GROUPS,
      onSearch: () => {},
      onSetGroup: () => {},
      opened: true,
      customTriggerComponent: <div />,
      trigger: [],
    };
    renderWithProvider(<ContextSelector {...props} />);

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText(TEXTS.searchPlaceholder),
      ).toBeInTheDocument(),
    );

    screen.getByPlaceholderText(TEXTS.searchPlaceholder).focus();

    arrowDown();
    expect(activeText()).toBe('Card A');

    arrowDown();
    expect(activeText()).toBe('Node 0');

    arrowDown();
    expect(activeText()).toBe('Node 1');
  });

  test('dropdown stays open across tab switches during keyboard navigation', async () => {
    const props: ContextProps = {
      texts: TEXTS,
      onSelectItem: () => {},
      selectedItem: undefined,
      items: [...nodeItems, ...sequenceItems],
      groups: GROUPS,
      onSearch: () => {},
      onSetGroup: () => {},
      opened: true,
      customTriggerComponent: <div />,
      trigger: [],
    };
    renderWithProvider(<ContextSelector {...props} />);

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText(TEXTS.searchPlaceholder),
      ).toBeInTheDocument(),
    );
    screen.getByPlaceholderText(TEXTS.searchPlaceholder).focus();

    arrowDown();
    arrowDown();
    arrowDown();
    expect(activeText()).toBe('Node 1');

    const overlay = document.querySelector(DROPDOWN_SELECTOR) as HTMLElement;
    const sequencesTab = Array.from(
      overlay.querySelectorAll<HTMLElement>('span'),
    ).find((el) => el.textContent === 'Sequences') as HTMLElement;
    fireEvent.click(sequencesTab);

    await waitFor(() =>
      expect(screen.getByText('Sequence 0')).toBeInTheDocument(),
    );

    expect(document.querySelector(DROPDOWN_SELECTOR)).not.toBeNull();
    expect(document.activeElement).toBe(
      screen.getByPlaceholderText(TEXTS.searchPlaceholder),
    );
    arrowDown();
    expect(activeText()).toBe('Sequence 0');
  });

  test('recovers arrow navigation after focus is lost to <body>', () => {
    renderWithProvider(
      <ContextSelectorDropdown
        texts={TEXTS}
        setSelected={() => {}}
        onSetGroup={() => {}}
        setDropdownVisible={() => {}}
        groups={GROUPS}
        items={[...nodeItems, ...sequenceItems]}
        value={undefined}
        visible
        onSearch={() => {}}
      />,
    );

    screen.getByPlaceholderText(TEXTS.searchPlaceholder).focus();
    arrowDown();
    arrowDown();
    arrowDown();
    expect(activeText()).toBe('Node 1');

    (document.activeElement as HTMLElement).blur();
    expect(document.activeElement).toBe(document.body);

    fireEvent.keyDown(document.body, { key: 'ArrowDown' });
    expect(activeText()).toBe('Node 0');
  });

  test('ArrowUp from the first row focuses the search field on tabs without a top section', async () => {
    renderWithProvider(
      <ContextSelectorDropdown
        texts={TEXTS}
        setSelected={() => {}}
        onSetGroup={() => {}}
        setDropdownVisible={() => {}}
        groups={GROUPS}
        items={[...nodeItems, ...sequenceItems]}
        value={undefined}
        visible
        onSearch={() => {}}
      />,
    );

    const search = screen.getByPlaceholderText(TEXTS.searchPlaceholder);
    search.focus();

    fireEvent.click(screen.getByText('Sequences'));
    await waitFor(() =>
      expect(screen.getByText('Sequence 0')).toBeInTheDocument(),
    );

    arrowDown();
    expect(activeText()).toBe('Sequence 0');
    fireEvent.keyDown(document.activeElement as HTMLElement, {
      key: 'ArrowUp',
    });
    expect(document.activeElement).toBe(search);
  });

  test('ArrowUp on the search field does not wrap to a mid-list row', () => {
    renderWithProvider(
      <ContextSelectorDropdown
        texts={TEXTS}
        setSelected={() => {}}
        onSetGroup={() => {}}
        setDropdownVisible={() => {}}
        groups={GROUPS}
        items={[...nodeItems, ...sequenceItems]}
        value={undefined}
        visible
        onSearch={() => {}}
      />,
    );

    const search = screen.getByPlaceholderText(TEXTS.searchPlaceholder);
    search.focus();
    fireEvent.keyDown(search, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(search);
  });

  test('tab switch restarts arrow navigation from the first row', async () => {
    renderWithProvider(
      <ContextSelectorDropdown
        texts={TEXTS}
        setSelected={() => {}}
        onSetGroup={() => {}}
        setDropdownVisible={() => {}}
        groups={GROUPS}
        items={[...nodeItems, ...sequenceItems]}
        value={undefined}
        visible
        onSearch={() => {}}
      />,
    );

    screen.getByPlaceholderText(TEXTS.searchPlaceholder).focus();

    arrowDown();
    arrowDown();
    arrowDown();
    arrowDown();
    expect(activeText()).toBe('Node 2');

    fireEvent.click(screen.getByText('Sequences'));
    await waitFor(() =>
      expect(screen.getByText('Sequence 0')).toBeInTheDocument(),
    );

    arrowDown();
    expect(activeText()).toBe('Sequence 0');

    fireEvent.click(screen.getByText('Nodes'));
    await waitFor(() => expect(screen.getByText('Node 0')).toBeInTheDocument());

    arrowDown();
    expect(activeText()).toBe('Card A');
  });
});
