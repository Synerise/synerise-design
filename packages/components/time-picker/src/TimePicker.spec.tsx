import dayjs from 'dayjs';
import React from 'react';

import { renderWithProvider, sleep } from '@synerise/ds-utils';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TEST_CASES_FOR_12_HOUR_CLOCK } from './constants/timePicker.spec.constants';
import TimePicker from './index';

const normalizeSpaces = (content: string | null) => {
  return content?.replace(/\u00A0|\u202F/g, ' ');
};

describe('TimePicker', () => {
  const CONTAINER_TESTID = 'tp-container';
  const INPUT_TESTID = 'tp-input';
  const OVERLAY_CONTAINER_TESTID = 'tp-overlay-container';

  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  it('should render without any props', () => {
    renderWithProvider(<TimePicker />);

    expect(screen.getByTestId(CONTAINER_TESTID)).toBeInTheDocument();
  });

  it('should render opened by default', async () => {
    renderWithProvider(<TimePicker defaultOpen />);

    const overlayContainer = await screen.findByTestId(
      OVERLAY_CONTAINER_TESTID,
    );
    expect(overlayContainer).toBeInTheDocument();
  });

  it('should render overlay after clicking on input', async () => {
    renderWithProvider(<TimePicker />);

    const input = screen.getByTestId(INPUT_TESTID);
    userEvent.click(input);

    expect(
      await screen.findByTestId(OVERLAY_CONTAINER_TESTID),
    ).toBeInTheDocument();
  });

  it('should not open overlay if disabled', () => {
    renderWithProvider(<TimePicker disabled />);

    const input = screen.getByTestId(INPUT_TESTID);
    userEvent.click(input);

    expect(
      screen.queryByTestId(OVERLAY_CONTAINER_TESTID),
    ).not.toBeInTheDocument();
  });

  it('should overlay close on blur', () => {
    renderWithProvider(<TimePicker disabled />);

    const input = screen.getByTestId(INPUT_TESTID);
    fireEvent.blur(input);

    expect(
      screen.queryByTestId(OVERLAY_CONTAINER_TESTID),
    ).not.toBeInTheDocument();
  });

  it('should overlay stay open on blur if alwaysOpen is passed', async () => {
    renderWithProvider(<TimePicker alwaysOpen />);

    const input = await screen.findByTestId(INPUT_TESTID);
    userEvent.click(input);

    await waitFor(
      () => {
        expect(
          screen.queryByTestId(OVERLAY_CONTAINER_TESTID),
        ).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
    fireEvent.blur(input);
    await sleep(800);
    await waitFor(
      () => {
        expect(
          screen.queryByTestId(OVERLAY_CONTAINER_TESTID),
        ).toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('should render open on focus and show buttons for hours, minutes and seconds', async () => {
    renderWithProvider(
      <TimePicker placeholder="Select time" />,
      {},
      { notation: 'EU' },
    );
    const input = screen.getByPlaceholderText('Select time');
    let hours: NodeListOf<HTMLButtonElement>;
    let minutes: NodeListOf<HTMLButtonElement>;
    let seconds: NodeListOf<HTMLButtonElement>;

    userEvent.click(input);

    await waitFor(async () => {
      await screen.findByTestId('ds-time-picker-unit-hour').then((result) => {
        hours = result?.querySelectorAll('button');
        expect(hours.length).toBe(24);
      });
      await screen.findByTestId('ds-time-picker-unit-minute').then((result) => {
        minutes = result?.querySelectorAll('button');
        expect(minutes.length).toBe(60);
      });
      await screen.findByTestId('ds-time-picker-unit-second').then((result) => {
        seconds = result?.querySelectorAll('button');
        expect(seconds.length).toBe(60);
      });
    });
  });

  it('should render with value as placeholder', async () => {
    renderWithProvider(
      <TimePicker
        placeholder="Select time"
        alwaysOpen
        value={dayjs('12-04-2020 10:24:52', 'DD-MM-YYYY HH:mm:ss').toDate()}
      />,
    );
    const input = screen.getByPlaceholderText('10:24:52') as HTMLInputElement;

    expect(input.value).toBe('10:24:52');
  });

  it('should render with valueFormatOptions', async () => {
    renderWithProvider(
      <TimePicker
        placeholder="Select time"
        alwaysOpen
        valueFormatOptions={{ minute: undefined, second: undefined }}
        value={dayjs('12-04-2020 10:24:52', 'DD-MM-YYYY HH:mm:ss').toDate()}
      />,
      {},
      { notation: 'US' },
    );
    const input = screen.getByPlaceholderText('10 AM') as HTMLInputElement;

    expect(normalizeSpaces(input.value)).toBe('10 AM');
  });

  it('should render correct value for 12 hour clock', async () => {
    const getTimerPickerInputValue = (timeString: string, index) => {
      const date = dayjs(
        `12-04-2020 ${timeString}`,
        'DD-MM-YYYY HH:mm:ss',
      ).toDate();
      renderWithProvider(<TimePicker value={date} />, {}, { notation: 'US' });
      const input = screen.getAllByTestId(INPUT_TESTID)[
        index
      ] as HTMLInputElement;
      return normalizeSpaces(input.value);
    };

    for (const [index, [key, value]] of Object.entries(
      Object.entries(TEST_CASES_FOR_12_HOUR_CLOCK),
    )) {
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
    const getLastCallParams = () =>
      handleChange.mock.calls[handleChange.mock.calls.length - 1];
    const date = dayjs('12-04-2020 00:00:00', 'DD-MM-YYYY HH:mm:ss').toDate();

    renderWithProvider(
      <TimePicker value={date} raw onChange={handleChange} />,
      {},
      { notation: 'US' },
    );

    const minutesWrapper = await screen.findByTestId(
      'ds-time-picker-unit-minute',
    );
    const minutes = within(minutesWrapper).getByText('22');

    minutes.click();
    expect(normalizeSpaces(getLastCallParams()[1])).toBe('12:22:00 AM');
  });
});
