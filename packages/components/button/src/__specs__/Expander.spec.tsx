import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Button from '../Button';
import * as React from 'react';
import { fireEvent } from '@testing-library/react';
const SIZES = {
  M:32,
  S:24,
}
describe('Expander', () => {
  const onClick = jest.fn();
  it('should render', ()=> {
    // ARRANGE
    const { container } = renderWithProvider(<Button.Expander></Button.Expander>);
    // ACT
    const expander = container.querySelector('.ds-expander');
    // ASSERT
    expect(expander).toBeTruthy();
  });
  it('should render with small size', ()=> {
    // ARRANGE
    const { container } = renderWithProvider(<Button.Expander size={'S'}></Button.Expander>);
    // ACT
    const expander = container.querySelector('.ds-expander');
    // ASSERT
    expect(expander).toHaveStyle(`width:${SIZES.S}px`);
  });
  it('should render with medium size', ()=> {
    // ARRANGE
    const { container } = renderWithProvider(<Button.Expander size={'M'}></Button.Expander>);
    // ACT
    const expander = container.querySelector('.ds-expander');
    // ASSERT
    expect(expander).toHaveStyle(`width:${SIZES.M}px`);
  });
  it('should render disabled with lower opacity', ()=> {
    // ARRANGE
    const { container } = renderWithProvider(<Button.Expander size={'M'} disabled={true}></Button.Expander>);
    // ACT
    const expander = container.querySelector('svg');
    // ASSERT
    expect(expander).toHaveStyle(`opacity:0.4`);
  });
  it('should handle onClick', ()=> {
    // ARRANGE
    const { container } = renderWithProvider(<Button.Expander onClick={onClick}></Button.Expander>);
    // ACT
    const expander = container.querySelector('.ds-expander') as HTMLElement;
    fireEvent.click(expander);
    // ASSERT
    expect(onClick).toBeCalledTimes(1);
  });
});
