import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/dom';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { CloseS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { RenderResult, wait } from '@testing-library/react';

import Menu from '../Menu';
import { MenuItemProps } from '../Elements/Item/MenuItem.types';

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
    const dangerItemContent = container.querySelectorAll('.ds-menu-content-wrapper')[2];
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
    const { getAllByText,queryAllByText } = renderWithProvider(
      <Menu dataSource={data} />
    ); 
    const firstParent = queryAllByText(
      (_, element) => element.textContent === 'Option 3' && element.className === 'ant-menu-submenu-title'
    )[0] as HTMLElement;
    const secondParent = queryAllByText(
      (_, element) => element.textContent === 'Option 4' && element.className === 'ant-menu-submenu-title'
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
    const suffixElement = container.querySelector('.suffix-test-wrapper > .ds-icon');
    // ASSERT
    expect(suffixWrapper).toBeTruthy();
    expect(suffixElement).toBeTruthy();
  });
  it('should render suffix element', () => {
    // ARRANGE
    const { container } = renderedMenu;
    const prefixWrapper = container.querySelector('.prefix-test-wrapper');
    const prefixElement = container.querySelector('.prefix-test-wrapper > .ds-icon');
    // ASSERT
    expect(prefixWrapper).toBeTruthy();
    expect(prefixElement).toBeTruthy();
  });
  it('should render grey suffix and prefix icons when disabled', () => {
    // ARRANGE
    const { container } = renderedMenu;
    const prefixIcon = container.querySelector('.disabled-prefix-test-wrapper > .ds-icon > svg');
    const suffixIcon = container.querySelector('.disabled-suffix-test-wrapper > .ds-icon > svg');
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
