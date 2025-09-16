import React from 'react';

import { theme , renderWithProvider } from '@synerise/ds-core';
import Icon, { CloseS } from '@synerise/ds-icon';
import { type RenderResult, fireEvent, screen } from '@testing-library/react';

import { type MenuItemProps } from '../Elements/Item/MenuItem.types';
import Menu from '../Menu';

describe('Simple menu', () => {
  const data = [
    {
      text: 'Item 1',
    },
    {
      text: 'Item 2',
      disabled: true,
    },
    {
      text: 'Delete',
      type: 'danger',
      disabled: false,
    },
  ];
  let container: HTMLElement;
  let items: NodeListOf<HTMLLIElement>;
  beforeEach(() => {
    const render = renderWithProvider(<Menu dataSource={data} />);
    container = render.container;
    items = container.querySelectorAll('li');
  });

  it('should display enabled item text with proper color', () => {
    const enabledItem = items[0];
    // ARRANGE
    expect(enabledItem).toHaveStyle(`color: ${theme.palette['grey-700']}`);
  });
  it('should display disabled item text with proper color', () => {
    const disabledItem = items[1];
    // ARRANGE
    expect(disabledItem).toHaveStyle(`color: ${theme.palette['grey-600']}`);
  });
  it('should display danger item text with proper color', () => {
    const dangerItemContent = container.querySelectorAll(
      '.ds-menu-content-wrapper',
    )[2];
    // ARRANGE
    expect(dangerItemContent).toHaveStyle(`color: ${theme.palette['red-600']}`);
  });
});

describe('Menu with nested items', () => {
  const data = [
    { text: 'Option 1' },
    { text: 'Option 2' },
    { text: 'Option 3', subMenu: [{ text: 'Child 1' }] },
    { text: 'Option 4', subMenu: [{ text: 'Child 1' }] },
  ] as MenuItemProps[];

  it('should render basic menu list', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Menu dataSource={data} />);

    // ASSERT
    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
  });
  it('should render children items after click on parent', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Menu dataSource={data} />);
    const parent = getByText('Option 3') as HTMLElement;
    fireEvent.click(parent);

    // ASSERT
    expect(getByText('Child 1')).toBeTruthy();
  });
  it('should display many children from different parents at the same time', () => {
    // ARRANGE
    const { getAllByText, queryAllByText } = renderWithProvider(
      <Menu dataSource={data} />,
    );
    const firstParent = queryAllByText(
      (_, element) =>
        element.textContent === 'Option 3' &&
        element.className === 'ant-menu-submenu-title',
    )[0] as HTMLElement;
    const secondParent = queryAllByText(
      (_, element) =>
        element.textContent === 'Option 4' &&
        element.className === 'ant-menu-submenu-title',
    )[0] as HTMLElement;
    fireEvent.click(firstParent);
    fireEvent.click(secondParent);

    const visibleChildren = getAllByText('Child 1');
    // ASSERT
    expect(visibleChildren.length).toBe(2);
  });
});

describe('Menu with prefix and suffix', () => {
  const data = [
    {
      text: 'Option 1',
      suffixel: (
        <div className={'suffix-test-wrapper'}>
          <Icon color={theme.palette['red-600']} component={<CloseS />} />
        </div>
      ),
    },
    {
      text: 'Option 2',
      prefixel: (
        <div className={'prefix-test-wrapper'}>
          <Icon color={theme.palette['blue-600']} component={<CloseS />} />
        </div>
      ),
    },
    {
      text: 'Disabled option',
      disabled: true,
      prefixel: (
        <div className={'disabled-prefix-test-wrapper'}>
          <Icon color={theme.palette['yellow-600']} component={<CloseS />} />
        </div>
      ),
      suffixel: (
        <div className={'disabled-suffix-test-wrapper'}>
          <Icon color={theme.palette['yellow-100']} component={<CloseS />} />
        </div>
      ),
    },
  ];
  let renderedMenu: RenderResult;
  beforeEach(() => {
    renderedMenu = renderWithProvider(<Menu dataSource={data} />);
  });
  it('should render prefix element', () => {
    // ARRANGE
    const { container } = renderedMenu;
    const suffixWrapper = container.querySelector('.suffix-test-wrapper');
    const suffixElement = container.querySelector(
      '.suffix-test-wrapper > .ds-icon',
    );
    // ASSERT
    expect(suffixWrapper).toBeTruthy();
    expect(suffixElement).toBeTruthy();
  });
  it('should render suffix element', () => {
    // ARRANGE
    const { container } = renderedMenu;
    const prefixWrapper = container.querySelector('.prefix-test-wrapper');
    const prefixElement = container.querySelector(
      '.prefix-test-wrapper > .ds-icon',
    );
    // ASSERT
    expect(prefixWrapper).toBeTruthy();
    expect(prefixElement).toBeTruthy();
  });
  it('should render grey suffix and prefix icons when disabled', () => {
    // ARRANGE
    const { container } = renderedMenu;
    const prefixIcon = container.querySelector(
      '.disabled-prefix-test-wrapper > .ds-icon > svg',
    );
    const suffixIcon = container.querySelector(
      '.disabled-suffix-test-wrapper > .ds-icon > svg',
    );
    // ASSERT
    expect(prefixIcon).toHaveStyle(`fill:${theme.palette['grey-600']}`);
    expect(suffixIcon).toHaveStyle(`fill:${theme.palette['grey-600']}`);
  });
});
describe('Menu with description', () => {
  const data = [
    {
      text: 'Avatar 1',
      description: 'Description 1',
    },
  ];
  let renderedMenu: RenderResult;
  beforeEach(() => {
    renderedMenu = renderWithProvider(<Menu dataSource={data} />);
  });
  it('should render description', () => {
    // ARRANGE
    const { getByText } = renderedMenu;
    // ASSERT
    expect(getByText('Description 1')).toBeTruthy();
  });
});
describe('Menu with copyable items', () => {
  const data = [
    {
      text: 'Item 1',
      copyable: true,
      copyHint: 'Copy to clipboard',
      copyValue: 'Item',
    },
    {
      text: 'Item 2',
      copyable: false,
      copyHint: 'Copy to clipboard',
      copyValue: 'Item',
    },
    {
      text: 'Item 3',
      copyable: true,
      copyHint: 'Copy to clipboard',
    },
    {
      text: 'Disabled',
      disabled: true,
      copyable: true,
      copyHint: 'Copy to clipboard',
      copyValue: 'Item',
    },
  ];
  let renderedMenu: RenderResult;
  beforeEach(() => {
    renderedMenu = renderWithProvider(<Menu dataSource={data} />);
  });
  it('should display copyHint on hover', () => {
    // ARRANGE
    const { getByText } = renderedMenu;
    const element = getByText('Item 1') as HTMLElement;
    fireEvent.mouseOver(element);
    // ASSERT
    expect(element).toHaveTextContent('Copy to clipboard');
  });
  it('should not display copyHint when copyable prop is false', () => {
    // ARRANGE
    const { getByText } = renderedMenu;
    const element = getByText('Item 2') as HTMLElement;
    fireEvent.mouseOver(element);
    // ASSERT
    expect(element.textContent).toBe('Item 2');
  });
  it('should not display copyHint when item is disabled', () => {
    // ARRANGE
    const { getByText } = renderedMenu;
    const element = getByText('Disabled') as HTMLElement;
    fireEvent.mouseOver(element);
    // ASSERT
    expect(element.textContent).toBe('Disabled');
  });
});

describe('Menu item', () => {
  it('should apply classes according to size', () => {
    const { container } = renderWithProvider(
      <Menu>
        <Menu.Item className="custom-class another-class" size="large">
          Hello
        </Menu.Item>
      </Menu>,
    );
    const menuItem = container.querySelector('li');
    expect(menuItem).toHaveClass('large');
    expect(menuItem).toHaveClass('ds-menu-item');
    expect(menuItem).toHaveClass('custom-class');
    expect(menuItem).toHaveClass('another-class');
  });
  it('should apply default class when size is not provided', () => {
    const { container } = renderWithProvider(
      <Menu>
        <Menu.Item className="custom-class another-class">Hello</Menu.Item>
      </Menu>,
    );
    const menuItem = container.querySelector('li');
    expect(menuItem).toHaveClass('default');
    expect(menuItem).toHaveClass('ds-menu-item');
    expect(menuItem).toHaveClass('custom-class');
    expect(menuItem).toHaveClass('another-class');
  });
  it('should show tooltip on hover', async () => {
    renderWithProvider(
      <Menu>
        <Menu.Item
          type={undefined}
          onMouseEnter={() => undefined}
          onMouseLeave={() => undefined}
          hoverTooltipProps={{
            mouseEnterDelay: 0,
          }}
          renderHoverTooltip={() => (
            <div data-testid="hover-tooltip">tooltip content</div>
          )}
        >
          Menu item
        </Menu.Item>
      </Menu>,
    );
    const element = screen.getByText('Menu item');
    const tooltip = screen.queryByTestId('hover-tooltip');
    expect(tooltip).not.toBeInTheDocument();
    fireEvent.mouseOver(element);

    expect(await screen.findByTestId('hover-tooltip')).toHaveTextContent(
      'tooltip content',
    );
  });
  it('should show tooltip on hover on disabled item', async () => {
    renderWithProvider(
      <Menu>
        <Menu.Item
          type={undefined}
          disabled={true}
          onMouseEnter={() => undefined}
          onMouseLeave={() => undefined}
          hoverTooltipProps={{
            mouseEnterDelay: 0,
          }}
          renderHoverTooltip={() => (
            <div data-testid="hover-tooltip">tooltip content</div>
          )}
        >
          Menu item
        </Menu.Item>
      </Menu>,
    );
    const element = screen.getByText('Menu item');
    const tooltip = screen.queryByTestId('hover-tooltip');
    expect(tooltip).not.toBeInTheDocument();
    fireEvent.mouseOver(element);

    expect(await screen.findByTestId('hover-tooltip')).toHaveTextContent(
      'tooltip content',
    );
  });
  it('should have data-name attribute with children as value', () => {
    const { container } = renderWithProvider(
      <Menu>
        <Menu.Item>Hello</Menu.Item>
      </Menu>,
    );
    const menuItem = container.querySelector('li');
    expect(menuItem).toHaveAttribute('data-name', 'Hello');
  });
  it('should have data-name attribute with undefined as value', () => {
    const { container } = renderWithProvider(
      <Menu>
        <Menu.Item>
          <span>Hello</span>
        </Menu.Item>
      </Menu>,
    );
    const menuItem = container.querySelector('li');
    expect(menuItem).not.toHaveAttribute('data-name');
  });
});
