import * as React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import renderWithProvider from '../../testing/renderWithProvider/renderWithProvider';
import { doubleClickListener } from '../../index';

describe('doubleClickListener', () => {
  const singleClickFn = jest.fn();
  const doubleClickFn = jest.fn();
  const DELAY = 250;
  const TEXT = 'Some text that doesnt matter here';
  it('should handle single click', async () => {
    // ARRANGE
    const { getByText } = await renderWithProvider(
      <div onClick={doubleClickListener<HTMLDivElement>(singleClickFn, doubleClickFn, DELAY)}>{TEXT}</div>
    );
    const wrapper = await getByText(TEXT);
    await fireEvent.click(wrapper);
    await waitFor(
      () => {
        expect(singleClickFn).toBeCalledTimes(1);
        expect(doubleClickFn).toBeCalledTimes(0);
      },
      { timeout: DELAY }
    );
  });
  it('should handle double click', async () => {
    // ARRANGE
    const { getByText } = await renderWithProvider(
      <div onClick={doubleClickListener<HTMLDivElement>(singleClickFn, doubleClickFn, DELAY)}>{TEXT}</div>
    );
    const wrapper = await getByText(TEXT);
    await fireEvent.click(wrapper);
    await fireEvent.click(wrapper);
    await waitFor(
      () => {
        expect(doubleClickFn).toBeCalledTimes(1);
      },
      { timeout: DELAY }
    );
  });
  it('should handle passed delay', async () => {
    // ARRANGE
    const { getByText } = await renderWithProvider(
      <div onClick={doubleClickListener<HTMLDivElement>(singleClickFn, doubleClickFn, DELAY)}>{TEXT}</div>
    );
    const wrapper = await getByText(TEXT);
    await fireEvent.click(wrapper);
    await waitFor(
      () => {
        fireEvent.click(wrapper);
        expect(singleClickFn).toBeCalledTimes(2);
      },
      { timeout: DELAY * 3 }
    );
  });
});
