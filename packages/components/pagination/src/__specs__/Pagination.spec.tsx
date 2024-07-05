import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithProvider from '@synerise/ds-utils/dist/testing/renderWithProvider/renderWithProvider';
import Pagination from '../index';

describe('Pagination', () => {
  const onChange = jest.fn();
  it('should set active prop', async function() {
    const { getByText, container } = renderWithProvider(<Pagination onChange={onChange} defaultCurrent={1} total={50} />);
    
    const fifth = getByText('5');
    fireEvent.click(fifth);

    expect(onChange).toHaveBeenCalled();
    const activeItem = container.querySelector('.ant-pagination-item-active');
    expect(activeItem && activeItem.textContent).toBe('5');
  });
});
