import React from 'react';

import { US_NOTATION , renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import DatePicker from '../DatePicker';
import RawDatePicker from '../RawDatePicker/RawDatePicker';

const ROWS = 6;
const WEEKDAYS = 7;
const NAVBAR_ITEM_SELECTOR = '.ds-date-picker-nav  > div > button';

describe('RawDatePicker', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });
  it('should render', () => {
    const element = renderWithProvider(
      <RawDatePicker
        showTime={true}
        onApply={vi.fn()}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
      />,
    );
    expect(element).toBeTruthy();
  });
  it('should validate all days visible after render', async () => {
    const validator = vi.fn();
    renderWithProvider(
      <RawDatePicker
        showTime={true}
        onApply={vi.fn()}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        disabledDates={validator}
      />,
    );
    // react-day-picker v10 renders twice on mount, so it evaluates the matcher twice per day.
    // The invariant this test is about is that every visible day gets validated.
    const validated = new Set(validator.mock.calls.map(([date]) => String(date)));
    expect(validated.size).toBe(ROWS * WEEKDAYS);
  });
  it('should proceed to MonthPicker when clicked on month', async () => {
    renderWithProvider(
      <RawDatePicker
        showTime={true}
        onApply={vi.fn()}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
    );
    fireEvent.click(await screen.findByText('Oct'));
    expect(await screen.findByText('Jan')).toBeTruthy();
    expect(await screen.findByText('Sep')).toBeTruthy();
    expect(await screen.findByText('Feb')).toBeTruthy();
  });
  it('should proceed to YearPicker when clicked on year', async () => {
    renderWithProvider(
      <RawDatePicker
        showTime={true}
        onApply={vi.fn()}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
    );
    fireEvent.click(await screen.findByText('1996'));
    expect(await screen.findByText('1995')).toBeTruthy();
    expect(await screen.findByText('1997')).toBeTruthy();
    // The grid holds the decade and nothing else — stepping to the neighbouring decade is the
    // navbar's job, so 1989 and 2000 have no cell of their own.
    expect(await screen.findByText('1990')).toBeTruthy();
    expect(await screen.findByText('1999')).toBeTruthy();
    expect(screen.queryByText('1989')).toBeNull();
    expect(screen.queryByText('2000')).toBeNull();
  });
  it('offers one step per side in the grid views, and both in the day view', async () => {
    const { container } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        onApply={vi.fn()}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
    );
    const navbar = (): HTMLElement =>
      container.querySelector('.ds-date-picker-nav') as HTMLElement;

    // The day view steps by a month and by a year, so both arrows stay on each side and the
    // outer one is drawn as a double angle.
    expect(navbar().querySelectorAll('button')).toHaveLength(4);
    expect(
      screen
        .getByTestId('datapicker-long-prev')
        .querySelector('[data-testid="ds-icon-double-angle-left-s"]'),
    ).toBeTruthy();

    // The month grid steps by a year only: one arrow per side, drawn as a single angle, and the
    // unused inner slot is left out rather than held open by a placeholder.
    fireEvent.click(await screen.findByText('Oct'));
    expect(await screen.findByText('Jan')).toBeTruthy();
    expect(navbar().querySelectorAll('button')).toHaveLength(2);
    expect(navbar().querySelectorAll('.arrow-placeholder')).toHaveLength(0);
    expect(
      screen
        .getByTestId('datapicker-long-prev')
        .querySelector('[data-testid="ds-icon-angle-left-s"]'),
    ).toBeTruthy();
    expect(
      screen
        .getByTestId('datapicker-long-next')
        .querySelector('[data-testid="ds-icon-angle-right-s"]'),
    ).toBeTruthy();
  });
  it('should proceed to DecadePicker when clicked on year range', async () => {
    renderWithProvider(
      <RawDatePicker
        showTime={true}
        onApply={vi.fn()}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
    );
    fireEvent.click(await screen.findByText('1996'));
    fireEvent.click(await screen.findByText('1990-1999'));
    expect(await screen.findByText('1900-1909')).toBeTruthy();
    expect(await screen.findByText('1930-1939')).toBeTruthy();
    expect(await screen.findByText('2000-2009')).toBeTruthy();
  });
  it('should proceed to TimePicker after choosing the day', async () => {
    const { container } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        onApply={vi.fn()}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
    );
    const dayOne = container.querySelector('[data-attr="1"]') as HTMLElement;
    dayOne.click();
    expect(await screen.findByTestId('tp-overlay-container')).toBeTruthy();
  });
  it('should show previous year on left arrow click', async () => {
    const { container } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        onApply={vi.fn()}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
    );
    const navigationArrows = container.querySelectorAll(NAVBAR_ITEM_SELECTOR);
    const toPreviousYear = navigationArrows[0];
    fireEvent.click(toPreviousYear as HTMLElement);
    expect(await screen.findByText('1995')).toBeTruthy();
    expect(screen.queryByText('1996')).not.toBeInTheDocument();
  });
  it('should show previous month on left arrow click', async () => {
    const { container } = renderWithProvider(
      <RawDatePicker
        onApply={vi.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
    );
    const navigationArrows = container.querySelectorAll(NAVBAR_ITEM_SELECTOR);
    const toPreviousMonth = navigationArrows[1];
    fireEvent.click(toPreviousMonth as HTMLElement);
    expect(await screen.findByText('Sep')).toBeTruthy();
    expect(screen.queryByText('Oct')).not.toBeInTheDocument();
  });
  it('should show next month on right arrow click', async () => {
    const { container } = renderWithProvider(
      <RawDatePicker
        onApply={vi.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
    );
    const navigationArrows = container.querySelectorAll(NAVBAR_ITEM_SELECTOR);
    const toNextMonth = navigationArrows[2];
    fireEvent.click(toNextMonth as HTMLElement);
    expect(await screen.findByText('Nov')).toBeTruthy();
    expect(screen.queryByText('Oct')).not.toBeInTheDocument();
  });
  it('should show next year on right arrow click', async () => {
    const { container } = renderWithProvider(
      <RawDatePicker
        onApply={vi.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
    );
    const navigationArrows = container.querySelectorAll(NAVBAR_ITEM_SELECTOR);
    const toNextYear = navigationArrows[3];
    fireEvent.click(toNextYear as HTMLElement);
    expect(await screen.findByText('1997')).toBeTruthy();
    expect(screen.queryByText('1996')).not.toBeInTheDocument();
  });
  it('should render prefix and suffix', () => {
    const PREFIX = 'Prefix value';
    const SUFFIX = 'Suffix value';

    renderWithProvider(
      <DatePicker
        onApply={vi.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        prefixel={PREFIX}
        suffixel={SUFFIX}
      />,
    );
    expect(screen.getAllByText(PREFIX)[0]).toBeTruthy();
    expect(screen.getAllByText(SUFFIX)[0]).toBeTruthy();
  });
  it('should render with default formatValueOptions', () => {
    renderWithProvider(
      <DatePicker
        onApply={vi.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
    );

    expect(screen.getByDisplayValue('27 Oct 1996, 03:24')).toBeInTheDocument();
  });
  it('should render with custom formatValueOptions', () => {
    renderWithProvider(
      <DatePicker
        onApply={vi.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        valueFormatOptions={{
          dateOptions: { month: 'numeric' },
        }}
      />,
    );
    expect(screen.getByDisplayValue('27.10.1996, 03:24')).toBeInTheDocument();
  });
  it('should render correct with US notation', () => {
    renderWithProvider(
      <DatePicker
        onApply={vi.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        valueFormatOptions={{
          dateOptions: { month: 'numeric' },
        }}
      />,
      {},
      { notation: US_NOTATION },
    );
    expect(screen.getByDisplayValue('10/27/1996, 3:24 AM')).toBeInTheDocument();
  });
  it('should render month picker using locale', async () => {
    renderWithProvider(
      <RawDatePicker
        onApply={vi.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
      {},
      { locale: 'pl' },
    );
    fireEvent.click(await screen.findByText('paź'));

    expect(screen.getByText('kwi')).toBeInTheDocument();
  });
  it('should render day picker using locale', async () => {
    renderWithProvider(
      <RawDatePicker
        onApply={vi.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
      {},
      { locale: 'pl' },
    );
    expect(await screen.findByText('Śr')).toBeTruthy();
  });

  it('should show prev and next arrows in TimePicker as disabled if following and previous days are disabled', async () => {
    const defaultDay = new Date('1996-10-27T03:24:00');
    const allowedDay = new Date(defaultDay.getTime());
    allowedDay.setHours(0);
    allowedDay.setMinutes(0);
    allowedDay.setSeconds(0);
    allowedDay.setMilliseconds(0);
    const disabledDates = (date?: Date): boolean => {
      if (date) {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime() !== allowedDay.getTime();
      }
      return true;
    };
    const { container } = renderWithProvider(
      <RawDatePicker
        onApply={vi.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={defaultDay}
        disabledDates={disabledDates}
      />,
    );
    const dayOne = container.querySelector('[data-attr="27"]') as HTMLElement;
    dayOne.click();
    await screen.findByTestId('tp-overlay-container');
    const navigationArrows = container.querySelectorAll(NAVBAR_ITEM_SELECTOR);
    const toNextDay = navigationArrows[1];
    const toPrevDay = navigationArrows[0];
    expect(toNextDay).toBeDisabled();
    expect(toPrevDay).toBeDisabled();
  });
  it('Should render quick picks', async () => {
    const QUICK_PICK = {
      label: 'QUICK_PICK_1',
      value: new Date(2010,0,10)
    }
    const onValueChange = vi.fn()
    renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        onValueChange={onValueChange}
        onApply={vi.fn()}
        quickPicks={[QUICK_PICK]}
      />,
    );

    expect(screen.getByText(QUICK_PICK.label)).toBeInTheDocument();

    fireEvent.click(screen.getByText(QUICK_PICK.label));

    await waitFor(() => expect(onValueChange).toHaveBeenCalledWith(QUICK_PICK.value));

  })
});
