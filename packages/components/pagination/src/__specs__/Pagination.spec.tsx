import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Pagination from '../index';

describe('Pagination', () => {
  const onChange = jest.fn();
  it('should set active prop', async function() {
    // ARRANGE
    const { findByText, container } = render(<Pagination onChange={onChange} defaultCurrent={1} total={50} />);

    // ACT
    const fifth = await findByText('5');
    fireEvent.click(fifth);

    // ASSERT
    expect(onChange).toHaveBeenCalled();
    const activeItem = container.querySelector('.ant-pagination-item-active');
    expect(activeItem && activeItem.textContent).toBe('5');
  });
});
