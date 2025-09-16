import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-core';
import { doubleClickListener } from '../../index';

describe('doubleClickListener', () => {
  const singleClickFn = jest.fn();
  const doubleClickFn = jest.fn();
  const DELAY = 250;
  const TEXT = 'Some text that doesnt matter here';
  const waitFor = (delay: number) => new Promise(r => setTimeout(r, delay));
  it('should handle single click', async () => {
    // ARRANGE
    const { getByText } = await renderWithProvider(
      <div onClick={doubleClickListener<HTMLDivElement>(singleClickFn, doubleClickFn, DELAY)}>{TEXT}</div>
    );
    const wrapper = await getByText(TEXT);
    await fireEvent.click(wrapper);
    await waitFor(DELAY);
    expect(singleClickFn).toBeCalledTimes(1);
    expect(doubleClickFn).toBeCalledTimes(0);
  });
  it('should handle double click', async () => {
    // ARRANGE
    const { getByText } = await renderWithProvider(
      <div onClick={doubleClickListener<HTMLDivElement>(singleClickFn, doubleClickFn, DELAY)}>{TEXT}</div>
    );
    const wrapper =  await getByText(TEXT);
    await fireEvent.click(wrapper);
    await fireEvent.click(wrapper);
    await waitFor(DELAY);
    await expect(doubleClickFn).toBeCalledTimes(1);
  });
  it('should handle passed delay', async () => {
    // ARRANGE
    const { getByText } = await renderWithProvider(
      <div onClick={doubleClickListener<HTMLDivElement>(singleClickFn, doubleClickFn, DELAY)}>{TEXT}</div>
    );
    const wrapper =  await getByText(TEXT);
    await fireEvent.click(wrapper);
    await waitFor(3*DELAY);
    await fireEvent.click(wrapper);
    await expect(singleClickFn).toBeCalledTimes(2);
  });
});
