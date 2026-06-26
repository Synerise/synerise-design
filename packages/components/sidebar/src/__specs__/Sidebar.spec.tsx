import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import SidebarWithButton from '../SidebarWithButton/SidebarWithButton';
import Sidebar from '../index';

describe('Sidebar', () => {
  const HEADER_1 = 'header first';
  const HEADER_2 = 'header second';
  const HEADER_3 = 'header third';
  const ID_1 = 'first';
  const ID_2 = 'second';
  const ID_3 = 'third';
  const CHILDREN = 'Children';
  const CHILDREN_2 = 'Children 2';

  it('should render header', () => {
    renderWithProvider(
      <Sidebar defaultActiveKey={['0']} order={[ID_2, ID_1]}>
        <Sidebar.Panel header={HEADER_1} id={ID_1} key={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_2} id={ID_2}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>,
    );

    expect(screen.getByTestId(`header-${ID_1}`)).toBeInTheDocument();
    expect(screen.getByText(HEADER_1)).toBeInTheDocument();
    // content stays mounted (open/close is CSS-animated, not unmounted); neither panel matches
    // defaultActiveKey "0" here, so no panel is in the active (open) state.
    expect(document.querySelector('.ds-sidebar-item-active')).toBeNull();
  });

  it('should render active panel open', () => {
    renderWithProvider(
      <Sidebar defaultActiveKey={[ID_1]}>
        <Sidebar.Panel header={HEADER_1} id={ID_1} key={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_2} id={ID_2}>
          {CHILDREN_2}
        </Sidebar.Panel>
      </Sidebar>,
    );

    // only the first panel (defaultActiveKey=ID_1) is in the active (open) state
    const activeItems = document.querySelectorAll('.ds-sidebar-item-active');
    expect(activeItems).toHaveLength(1);
    expect(activeItems[0]).toHaveTextContent(HEADER_1);
  });
  it('opens a panel that has no React key by its index (antd parity — the WithBlock case)', () => {
    // A panel given only an `id` (no `key`) controlled by an index-based `defaultActiveKey`, like
    // the Sidebar `WithBlock` story (`id="first"`, `defaultActiveKey="0"`). antd's Collapse keyed
    // unkeyed panels by index, so "0" opens the first panel — id must not hijack the match.
    renderWithProvider(
      <Sidebar defaultActiveKey="0">
        <Sidebar.Panel header={HEADER_1} id={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>,
    );

    // index-0 panel is opened by defaultActiveKey="0"
    expect(document.querySelector('.ds-sidebar-item-active')).not.toBeNull();
  });
  it('should render text Button', () => {
    renderWithProvider(
      <SidebarWithButton buttonLabel="Button" dataSource={[]} />,
    );

    expect(screen.getByText('Button')).toBeTruthy();
  });

  it('should open collapse on click', async () => {
    renderWithProvider(
      <Sidebar order={[ID_2, ID_1]}>
        <Sidebar.Panel header={HEADER_1} id={ID_1} key={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_2} id={ID_2}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>,
    );
    // nothing open initially → no active panel; clicking the header opens (activates) it
    expect(document.querySelector('.ds-sidebar-item-active')).toBeNull();

    fireEvent.click(screen.getByText(HEADER_1));

    const active = document.querySelector('.ds-sidebar-item-active');
    expect(active).not.toBeNull();
    expect(active).toHaveTextContent(HEADER_1);
  });

  it('should render order in draggable mode', () => {
    const onChangeOrder = vi.fn()
    const { container } = renderWithProvider(
      <Sidebar onChangeOrder={onChangeOrder} order={[ID_3, ID_2, ID_1]}>
        <Sidebar.Panel header={HEADER_1} id={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_2} id={ID_2}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_3} id={ID_3}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>,
    );
    const headers = container.querySelectorAll('.ant-collapse-header');

    expect(headers).toHaveLength(3)
    expect(headers[0].textContent,
    ).toEqual(HEADER_3);
    expect(headers[1].textContent,
    ).toEqual(HEADER_2);
    expect(headers[2].textContent,
    ).toEqual(HEADER_1);

    expect(container.querySelector('.ant-collapse.is-drag-drop')).toBeTruthy();
  });


  it('should ignore render order in default mode', () => {
    const { container } = renderWithProvider(
      <Sidebar order={[ID_3, ID_2, ID_1]}>
        <Sidebar.Panel header={HEADER_1} id={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_2} id={ID_2}>
          {CHILDREN}
        </Sidebar.Panel>
        <Sidebar.Panel header={HEADER_3} id={ID_3}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>,
    );
    const headers = container.querySelectorAll('.ant-collapse-header');

    expect(headers).toHaveLength(3)
    expect(headers[0].textContent,
    ).toEqual(HEADER_1);
    expect(headers[1].textContent,
    ).toEqual(HEADER_2);
    expect(headers[2].textContent,
    ).toEqual(HEADER_3);

    expect(container.querySelector('.ant-collapse.is-drag-drop')).toBeFalsy();
  });

  it('should change cursor to "grabbing" in drag and drop mode', () => {
    const onChangeOrder = vi.fn()
    renderWithProvider(
      <Sidebar onChangeOrder={onChangeOrder} order={[ID_1]}>
        <Sidebar.Panel header={HEADER_1} id={ID_1}>
          {CHILDREN}
        </Sidebar.Panel>
      </Sidebar>,
    );

    const headerElement = screen.getByTestId('ds-sidebar-header-handle');

    expect(
      window.getComputedStyle(headerElement).getPropertyValue('cursor'),
    ).toBe('grabbing');
  });
});
