import * as React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import TimePicker from '../index';
import dayjs from 'dayjs';

describe('TimePicker', () => {
  const CONTAINER_TESTID = 'tp-container';
  const INPUT_TESTID = 'tp-input';
  const OVERLAY_CONTAINER_TESTID = 'tp-overlay-container';

  it('should render without any props', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(<TimePicker />);

    // ASSERT
    expect(getByTestId(CONTAINER_TESTID)).toBeTruthy();
  });

  it('should render opened by default', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(<TimePicker defaultOpen={true} />);

    // ASSERT
    expect(getByTestId(OVERLAY_CONTAINER_TESTID)).toBeTruthy();
  });

  it('should render overlay after clicking on input', () => {
    // ARRANGE
    const { queryByTestId, getByTestId } = renderWithProvider(<TimePicker />);

    // ACT
    const input = getByTestId(INPUT_TESTID);
    fireEvent.click(input);

    // ASSERT
    expect(queryByTestId(OVERLAY_CONTAINER_TESTID)).toBeTruthy();
  });

  it('should not open overlay if disabled', () => {
    // ARRANGE
    const { queryByTestId, getByTestId } = renderWithProvider(<TimePicker disabled />);

    // ACT
    const input = getByTestId(INPUT_TESTID);
    fireEvent.click(input);

    // ASSERT
    expect(queryByTestId(OVERLAY_CONTAINER_TESTID)).toBeFalsy();
  });

  it('should overlay close on blur', () => {
    // ARRANGE
    const { queryByTestId, getByTestId } = renderWithProvider(<TimePicker disabled />);

    // ACT
    const input = getByTestId(INPUT_TESTID);
    fireEvent.blur(input);

    // ASSERT
    expect(queryByTestId(OVERLAY_CONTAINER_TESTID)).toBeFalsy();
  });

  it('should overlay stay open on blur if alwaysOpen is passed', async () => {
    // ARRANGE
    const { queryByTestId, getByTestId } = await renderWithProvider(<TimePicker alwaysOpen />);

    // ACT
    const input = await getByTestId(INPUT_TESTID);
    await fireEvent.click(input);

    await waitFor(
      () => {
        expect(queryByTestId(OVERLAY_CONTAINER_TESTID)).toBeTruthy();
      },
      { timeout: 1000 }
    );
    await fireEvent.blur(input);
    // ASSERT
    await waitFor(
      () => {
        expect(queryByTestId(OVERLAY_CONTAINER_TESTID)).toBeTruthy();
      },
      { timeout: 1000 }
    );
  });


  it('should render open on focus and show buttons for hours, minutes and seconds', async () => {
    // ARRANGE
    const { findByTestId, getByPlaceholderText } = renderWithProvider(<TimePicker placeholder="Select time" />);
    const input = getByPlaceholderText('Select time');
    let hours: NodeListOf<HTMLButtonElement>;
    let minutes: NodeListOf<HTMLButtonElement>;
    let seconds: NodeListOf<HTMLButtonElement>;

    // ACT
    fireEvent.focus(input);

    // ASSERT
    await waitFor(() => {
      findByTestId('ds-time-picker-unit-hour').then(result => {
        hours = result?.querySelectorAll('button');
        expect(hours.length).toBe(24);
      });
      findByTestId('ds-time-picker-unit-minute').then(result => {
        minutes = result?.querySelectorAll('button');
        expect(minutes.length).toBe(60);
      });
      findByTestId('ds-time-picker-unit-second').then(result => {
        seconds = result?.querySelectorAll('button');
        expect(seconds.length).toBe(60);
      });
    });
  });

  it('should render with value', async () => {
    // ARRANGE
    const { getByPlaceholderText } = renderWithProvider(
      <TimePicker
        placeholder="Select time"
        alwaysOpen
        value={dayjs('12-04-2020 10:24:52', 'DD-MM-YYYY HH:mm:ss').toDate()}
      />
    );
    const input = getByPlaceholderText('Select time') as HTMLInputElement;

    // ASSERT
    expect(input.value).toBe('10:24:52');
  });
});
