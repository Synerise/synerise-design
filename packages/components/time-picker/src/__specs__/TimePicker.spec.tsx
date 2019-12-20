import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils';
import TimePicker from '../index';

describe('TimePicker', () => {
  const CONTAINER_TESTID = 'tp-container';
  const INPUT_TESTID = 'tp-input';
  const OVERLAY_CONTAINER_TESTID = 'tp-overlay-container';

  it('should render without any props', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <TimePicker />
    );

    // ASSERT
    expect(getByTestId(CONTAINER_TESTID)).toBeTruthy();
  });

  it('should render opened by default', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <TimePicker defaultOpen={true} />
    );

    // ASSERT
    expect(getByTestId(OVERLAY_CONTAINER_TESTID)).toBeTruthy();
  });

  it('should render overlay after clicking on input', () => {
    // ARRANGE
    const { queryByTestId, getByTestId } = renderWithProvider(
      <TimePicker />
    );

    // ACT
    const input = getByTestId(INPUT_TESTID);
    fireEvent.click(input);

    // ASSERT
    expect(queryByTestId(OVERLAY_CONTAINER_TESTID)).toBeTruthy();
  });

  it('should not open overlay if disabled', () => {
    // ARRANGE
    const { queryByTestId, getByTestId } = renderWithProvider(
      <TimePicker disabled />
    );

    // ACT
    const input = getByTestId(INPUT_TESTID);
    fireEvent.click(input);

    // ASSERT
    expect(queryByTestId(OVERLAY_CONTAINER_TESTID)).toBeFalsy();
  });

  it('should overlay close on blur', () => {
    // ARRANGE
    const { queryByTestId, getByTestId } = renderWithProvider(
      <TimePicker disabled />
    );

    // ACT
    const input = getByTestId(INPUT_TESTID);
    fireEvent.blur(input);

    // ASSERT
    expect(queryByTestId(OVERLAY_CONTAINER_TESTID)).toBeFalsy();
  });

  it('should overlay stay open on blur if alwaysOpen is passed', () => {
    // ARRANGE
    const { queryByTestId, getByTestId } = renderWithProvider(
      <TimePicker alwaysOpen />
    );

    // ACT
    const input = getByTestId(INPUT_TESTID);
    fireEvent.click(input);

    // ASSERT
    setTimeout(() => {
      expect(queryByTestId(OVERLAY_CONTAINER_TESTID)).toBeTruthy();
      fireEvent.blur(input);
      expect(queryByTestId(OVERLAY_CONTAINER_TESTID)).toBeTruthy();
    }, 1000)
  });

  it('should onChange fire after overlay closed', async () => {
    // ARRANGE
    const onChange = jest.fn();

    const { getByTestId } = renderWithProvider(
      <TimePicker onChange={onChange} />
    );

    // ACT
    const input = getByTestId(INPUT_TESTID);
    fireEvent.click(input);

    // ASSERT
    setTimeout(() => {
      fireEvent.blur(input);
      expect(onChange).toHaveBeenCalled();
    }, 1000);
  });
});
