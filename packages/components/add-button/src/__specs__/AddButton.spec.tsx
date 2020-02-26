import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';
import AddButton from '../AddButton';

describe('Add Button', () => {
  it('should render', () => {
    // ARRANGE
    const clickFn = jest.fn();
    const { getByTestId, queryByTestId } = renderWithProvider(<AddButton onClick={clickFn} />);

    // ASSERT
    expect(getByTestId('ds-add-button')).toBeTruthy();
    expect(queryByTestId('ds-add-button-label')).toBeFalsy();
  });

  it('should render with label', () => {
    // ARRANGE
    const clickFn = jest.fn();
    const buttonLabel = 'Add postion';
    const { getByTestId } = renderWithProvider(<AddButton onClick={clickFn} label={buttonLabel} />);

    // ASSERT
    expect(getByTestId('ds-add-button')).toBeTruthy();
    expect(getByTestId('ds-add-button-label')).toBeTruthy();
    expect(getByTestId('ds-add-button-label').textContent).toBe(buttonLabel);
  });

  it('should render disabled', () => {
    // ARRANGE
    const clickFn = jest.fn();
    const { getByTestId } = renderWithProvider(<AddButton onClick={clickFn} disabled />);

    // ACT
    fireEvent.click(getByTestId('ds-add-button'));

    // ASSERT
    expect(getByTestId('ds-add-button').getAttribute('disabled')).not.toBeNull();
    expect(clickFn).not.toBeCalled();
  });

  it('should render call onClick callback', () => {
    // ARRANGE
    const clickFn = jest.fn();
    const { getByTestId } = renderWithProvider(<AddButton onClick={clickFn} />);

    // ACT
    fireEvent.click(getByTestId('ds-add-button'));

    // ASSERT
    expect(clickFn).toBeCalled();
  });
});
