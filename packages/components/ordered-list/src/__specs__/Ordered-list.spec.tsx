import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

import * as React from 'react';
import OrderedList from '../../dist/OrderedList';
import { OrderedListProps } from '../../dist/Ordered-list';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { CloseS } from '@synerise/ds-icon/dist/icons';
import { RenderResult } from '@testing-library/react';

  describe('Ordered-list with nested items', () => {
    const data = [
      { text: 'Option 1' },
      { text: 'Option 2' },
      { text: 'Option 3', subMenu: [{ text: 'Child 1' }] },
      { text: 'Option 4', subMenu: [{ text: 'Child 1' }] },
    ] as OrderedListProps[];

    it('should render basic menu list', () => {
      // ARRANGE
      const { getByText } = renderWithProvider(<OrderedList data={data}/>);

      // ASSERT
      expect(getByText('Option 1')).toBeTruthy();
      expect(getByText('Option 2')).toBeTruthy();
    });
  });
describe('Ordered-list indexFormatter', () => {
  const indexFormatter = (index: number) => (`${index}-custom`)

  it('should render basic menu list', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<OrderedList indexFormatter={indexFormatter}/>);

    // ASSERT
    expect(getByText("1-custom")).toBeTruthy();
  });
});
describe('Ordered-list with prefix and suffix', () => {
    const dataSource = [
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
      ]
  let renderedMenu: RenderResult;
  beforeEach(() => {
    renderedMenu = renderWithProvider(<OrderedList data={dataSource} />);
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
  });
