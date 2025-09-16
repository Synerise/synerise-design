import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CompletedWithin from '../CompletedWithin';

const TEXT = {
  clear: 'Clear',
  completedLabel: 'Completed within',
  header: 'Completed within',
  periodPlaceholder: 'Interval',
};

const PLACEHOLDER = 'Placeholder';

describe('Completed within component', () => {
  it('Should render without value', () => {
    const handleSetValue = jest.fn();
    const { container } = renderWithProvider(
      <CompletedWithin
        text={TEXT}
        value={{ value: 0, period: undefined }}
        onSetValue={handleSetValue}
      />,
    );

    expect(container.querySelector('.clock-m')).toBeTruthy();
  });

  it('Should render with placeholder', () => {
    const handleSetValue = jest.fn();
    const { container } = renderWithProvider(
      <CompletedWithin
        text={TEXT}
        value={{ value: 0, period: undefined }}
        onSetValue={handleSetValue}
        placeholder={PLACEHOLDER}
      />,
    );

    expect(container.querySelector('.clock-m')).toBeTruthy();
    expect(screen.getByText(PLACEHOLDER)).toBeTruthy();
  });

  it('Should render with selected value', () => {
    const handleSetValue = jest.fn();
    const { container } = renderWithProvider(
      <CompletedWithin
        text={TEXT}
        value={{ value: 2, period: 'DAYS' }}
        onSetValue={handleSetValue}
      />,
    );

    expect(screen.getByText('Completed within 2 Days')).toBeTruthy();
    expect(container.querySelector('.close-3-s')).toBeTruthy();
  });

  it('Should render readonly with selected value', () => {
    const handleSetValue = jest.fn();
    const { container } = renderWithProvider(
      <CompletedWithin
        readOnly
        text={TEXT}
        value={{ value: 2, period: 'DAYS' }}
        onSetValue={handleSetValue}
      />,
    );

    expect(screen.getByText('Completed within 2 Days')).toBeTruthy();
    expect(container.querySelector('.close-3-s')).toBeFalsy();
  });

  it('Should render call handleSetValue with empty values', () => {
    const handleSetValue = jest.fn();
    const { container } = renderWithProvider(
      <CompletedWithin
        text={TEXT}
        value={{ value: 2, period: 'DAYS' }}
        onSetValue={handleSetValue}
      />,
    );
    const clearIcon = container.querySelector('.close-3-s');

    expect(screen.queryByText('Completed within 2 Days')).toBeTruthy();
    expect(clearIcon).toBeTruthy();

    userEvent.click(clearIcon as HTMLElement);

    expect(handleSetValue).toBeCalledWith({
      value: undefined,
      period: undefined,
    });
  });
});
