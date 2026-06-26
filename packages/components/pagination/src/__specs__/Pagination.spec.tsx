import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent } from '@testing-library/react';

import Pagination from '../index';

describe('Pagination', () => {
  it('should mark the clicked page active and fire onChange', () => {
    const onChange = vi.fn();
    const { getByText, container } = renderWithProvider(
      <Pagination onChange={onChange} defaultCurrent={1} total={50} />,
    );

    fireEvent.click(getByText('5'));

    expect(onChange).toHaveBeenCalledWith(5, 10);
    const activeItem = container.querySelector('.ds-pagination-item-active');
    expect(activeItem?.textContent).toBe('5');
  });

  it('should render first/last pages and a jump-next ellipsis for many pages', () => {
    const { container, getByText } = renderWithProvider(
      <Pagination defaultCurrent={1} total={500} pageSize={10} />,
    );

    // 50 pages → first (1) and last (50) pinned, jump-next ellipsis present
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('50')).toBeInTheDocument();
    expect(container.querySelector('.ds-pagination-jump-next')).toBeTruthy();
    expect(container.querySelector('.ds-pagination-jump-prev')).toBeNull();
  });

  it('should disable prev on the first page', () => {
    const { container } = renderWithProvider(
      <Pagination defaultCurrent={1} total={50} />,
    );

    expect(container.querySelector('.ds-pagination-prev')).toHaveStyle(
      'opacity: 0.4',
    );
  });

  it('should render the size changer and quick jumper when enabled', () => {
    const { container } = renderWithProvider(
      <Pagination defaultCurrent={1} total={500} showSizeChanger showQuickJumper />,
    );

    expect(
      container.querySelector('.ds-pagination-options-size-changer'),
    ).toBeTruthy();
    expect(
      container.querySelector('.ds-pagination-options-quick-jumper'),
    ).toBeTruthy();
  });

  it('auto-shows the size changer when total > 50 without an explicit showSizeChanger (antd parity)', () => {
    const { container } = renderWithProvider(
      <Pagination defaultCurrent={1} total={500} />,
    );

    expect(
      container.querySelector('.ds-pagination-options-size-changer'),
    ).toBeTruthy();
  });

  it('does not show the size changer for small totals by default', () => {
    const { container } = renderWithProvider(
      <Pagination defaultCurrent={1} total={30} />,
    );

    expect(
      container.querySelector('.ds-pagination-options-size-changer'),
    ).toBeNull();
  });

  it('honours an explicit showSizeChanger={false} even when total > 50', () => {
    const { container } = renderWithProvider(
      <Pagination defaultCurrent={1} total={500} showSizeChanger={false} />,
    );

    expect(
      container.querySelector('.ds-pagination-options-size-changer'),
    ).toBeNull();
  });

  it('should jump to a page via the quick jumper on Enter', () => {
    const onChange = vi.fn();
    const { container } = renderWithProvider(
      <Pagination defaultCurrent={1} total={500} onChange={onChange} showQuickJumper />,
    );

    const input = container.querySelector(
      '.ds-pagination-options-quick-jumper input',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '7' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith(7, 10);
  });

  it('should hide the pager for a single page when hideOnSinglePage is set', () => {
    const { container } = renderWithProvider(
      <Pagination total={5} pageSize={10} hideOnSinglePage />,
    );

    expect(container.querySelector('.ds-pagination')).toBeNull();
  });
});
