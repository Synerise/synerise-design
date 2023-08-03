import * as React from 'react';
import { fireEvent, waitFor, within } from '@testing-library/react';
import dayjs from 'dayjs';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

import TimePicker from './index';
import { TEST_CASES_FOR_12_HOUR_CLOCK } from './constants/timePicker.spec.constants';

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

  it('should render opened by default', async () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(<TimePicker defaultOpen />);

    // ASSERT
    const overlayContainer = await waitFor(() => getByTestId(OVERLAY_CONTAINER_TESTID));
    expect(overlayContainer).toBeTruthy();
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

  it('should render with value as placeholder', async () => {
    // scrollTo doesn't exist in the JSDOM, so we mock it by attaching the empty function to all the elements.
    Element.prototype.scrollTo = jest.fn();
    // ARRANGE
    const { getByPlaceholderText } = renderWithProvider(
      <TimePicker
        placeholder="Select time"
        alwaysOpen
        value={dayjs('12-04-2020 10:24:52', 'DD-MM-YYYY HH:mm:ss').toDate()}
      />
    );
    const input = getByPlaceholderText('10:24:52') as HTMLInputElement;

    // ASSERT
    expect(input.value).toBe('10:24:52');
  });

  it('should render with valueFormatOptions', async () => {
    Element.prototype.scrollTo = jest.fn();
    // ARRANGE
    const { getByPlaceholderText } = renderWithProvider(
      <TimePicker
        placeholder="Select time"
        alwaysOpen
        valueFormatOptions={{ minute: undefined, second: undefined }}
        value={dayjs('12-04-2020 10:24:52', 'DD-MM-YYYY HH:mm:ss').toDate()}
      />,
      {},
      { notation: 'US' }
    );
    const input = getByPlaceholderText('10 AM') as HTMLInputElement;

    // ASSERT
    expect(input.value).toBe('10 AM');
  });

  it('should render correct value for 12 hour clock', async () => {
    const getTimerPickerInputValue = (timeString: string, index) => {
      const date = dayjs(`12-04-2020 ${timeString}`, 'DD-MM-YYYY HH:mm:ss').toDate();
      const { getAllByTestId } = renderWithProvider(<TimePicker value={date} />, {}, { notation: 'US' });
      const input = getAllByTestId(INPUT_TESTID)[index] as HTMLInputElement;
      return input.value;
    };

    // ASSERT
    for (const [index, [key, value]] of Object.entries(Object.entries(TEST_CASES_FOR_12_HOUR_CLOCK))) {
      expect(getTimerPickerInputValue(key, index)).toBe(value);
    }
  });

  it.todo('should read hour minute seconds from initial date value');
  it.todo('should emit onChange since the first click');
  it.todo('initial displayed value is in local timezone');
  it.todo('should return date with only changed time after selecting new time');
  it.todo('should display clear button for partially selected time');
  it.todo('should have default value of undefined');
  it('in 12 hour mode meridiem indicator should not change when minutes change', async () => {
    const handleChange = jest.fn();
    const getLastCallParams = () => handleChange.mock.calls[handleChange.mock.calls.length - 1];
    const date = dayjs('12-04-2020 00:00:00', 'DD-MM-YYYY HH:mm:ss').toDate();

    const { findByTestId } = renderWithProvider(
      <TimePicker 
        value={date} 
        raw 
        onChange={handleChange} 
      />, 
      {}, 
      { notation: 'US' }
    );

    const minutesWrapper = await findByTestId('ds-time-picker-unit-minute');
    const minutes = within(minutesWrapper).getByText('22')
    
    minutes.click();
    expect(getLastCallParams()[1]).toBe('12:22:00 AM');
    
  });
});
