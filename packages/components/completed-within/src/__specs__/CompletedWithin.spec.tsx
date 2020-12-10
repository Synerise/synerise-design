import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import CompletedWithin from '../CompletedWithin';
import * as React from 'react';
import userEvent from '@testing-library/user-event';

const TEXT = {
  clear: 'Clear',
  completedLabel: 'Completed within',
  header: 'Completed within',
  periodPlaceholder: 'Interval',
};

describe('Completed within component', () => {
  it('Should render without value', () => {
    // ARRANGE
    const handleSetValue = jest.fn();
    const { container } = renderWithProvider(
      <CompletedWithin text={TEXT} value={{ value: 0, period: undefined }} onSetValue={handleSetValue} />
    );

    // ASSERT
    expect(container.querySelector('.clock-m')).toBeTruthy();
  });

  it('Should render with selected value', () => {
    // ARRANGE
    const handleSetValue = jest.fn();
    const { getByText, container } = renderWithProvider(
      <CompletedWithin text={TEXT} value={{ value: 2, period: 'DAYS' }} onSetValue={handleSetValue} />
    );

    // ASSERT
    expect(getByText('Completed within 2 DAYS')).toBeTruthy();
    expect(container.querySelector('.close-3-s')).toBeTruthy();
  });

  it('Should render call handleSetValue with empty values', () => {
    // ARRANGE
    const handleSetValue = jest.fn();
    const { queryByText, container } = renderWithProvider(
      <CompletedWithin text={TEXT} value={{ value: 2, period: 'DAYS' }} onSetValue={handleSetValue} />
    );
    const clearIcon = container.querySelector('.close-3-s');

    // ASSERT
    expect(queryByText('Completed within 2 DAYS')).toBeTruthy();
    expect(clearIcon).toBeTruthy();

    userEvent.click(clearIcon as HTMLElement);

    // ASSERT
    expect(handleSetValue).toBeCalledWith({ value: undefined, period: undefined });
  });
});
