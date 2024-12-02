import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { US_NOTATION } from '@synerise/ds-data-format';

import RawDatePicker from '../RawDatePicker/RawDatePicker';
import DatePicker from '../DatePicker';

const ROWS = 6;
const WEEKDAYS = 7;
const NAVBAR_ITEM_SELECTOR = '.ds-date-picker-nav  > div > button';

describe('RawDatePicker', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });
  it('should render', () => {
    const element = renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
      />
    );
    expect(element).toBeTruthy();
  });
  it('should validate all days visible after render', () => {
    const validator = jest.fn();
    renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        disabledDates={validator}
      />
    );
    expect(validator).toBeCalledTimes(ROWS * WEEKDAYS);
  });
  it('should proceed to MonthPicker when clicked on month', () => {
    renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    fireEvent.click(screen.getByText('Oct'));
    expect(screen.getByText('Jan')).toBeTruthy();
    expect(screen.getByText('Sep')).toBeTruthy();
    expect(screen.getByText('Feb')).toBeTruthy();
  });
  it('should proceed to YearPicker when clicked on year', () => {
    renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    fireEvent.click(screen.getByText('1996'));
    expect(screen.getByText('1995')).toBeTruthy();
    expect(screen.getByText('1997')).toBeTruthy();
    expect(screen.getByText('2000')).toBeTruthy();
  });
  it('should proceed to DecadePicker when clicked on year range', () => {
    renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    fireEvent.click(screen.getByText('1996'));
    fireEvent.click(screen.getByText('1990-1999'));
    expect(screen.getByText('1900-1909')).toBeTruthy();
    expect(screen.getByText('1930-1939')).toBeTruthy();
    expect(screen.getByText('2000-2009')).toBeTruthy();
  });
  it('should proceed to TimePicker after choosing the day', () => {
    const { container, getByTestId } = renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    const dayOne = container.querySelector('[data-attr="1"]') as HTMLElement;
    dayOne.click();
    expect(getByTestId('tp-overlay-container')).toBeTruthy();
  });
  it('should show previous year on left arrow click', () => {
    const { container } = renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    const navigationArrows = container.querySelectorAll(NAVBAR_ITEM_SELECTOR);
    const toPreviousYear = navigationArrows[0];
    fireEvent.click(toPreviousYear as HTMLElement);
    expect(screen.getByText('1995')).toBeTruthy();
    expect(screen.queryByText('1996')).not.toBeInTheDocument();
  });
  it('should show previous month on left arrow click', () => {
    const { container } = renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    const navigationArrows = container.querySelectorAll(NAVBAR_ITEM_SELECTOR);
    const toPreviousMonth = navigationArrows[1];
    fireEvent.click(toPreviousMonth as HTMLElement);
    expect(screen.getByText('Sep')).toBeTruthy();
    expect(screen.queryByText('Oct')).not.toBeInTheDocument();
  });
  it('should show next month on right arrow click', () => {
    const { container } = renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    const navigationArrows = container.querySelectorAll(NAVBAR_ITEM_SELECTOR);
    const toNextMonth = navigationArrows[2];
    fireEvent.click(toNextMonth as HTMLElement);
    expect(screen.getByText('Nov')).toBeTruthy();
    expect(screen.queryByText('Oct')).not.toBeInTheDocument();
  });
  it('should show next year on right arrow click', () => {
    const { container } = renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    const navigationArrows = container.querySelectorAll(NAVBAR_ITEM_SELECTOR);
    const toNextYear = navigationArrows[3];
    fireEvent.click(toNextYear as HTMLElement);
    expect(screen.getByText('1997')).toBeTruthy();
    expect(screen.queryByText('1996')).not.toBeInTheDocument();
  });
  it('should render prefix and suffix', () => {
    const PREFIX = 'Prefix value';
    const SUFFIX = 'Suffix value';

    renderWithProvider(
      <DatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        prefixel={PREFIX}
        suffixel={SUFFIX}
      />
    );
    expect(screen.getAllByText(PREFIX)[0]).toBeTruthy();
    expect(screen.getAllByText(SUFFIX)[0]).toBeTruthy();
  });
  it('should render with default formatValueOptions', () => {
    renderWithProvider(
      <DatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );

    expect(screen.getByDisplayValue('27 Oct 1996, 03:24')).toBeInTheDocument();
  });
  it('should render with custom formatValueOptions', () => {
    renderWithProvider(
      <DatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        valueFormatOptions={{
          dateOptions: { month: 'numeric' },
        }}
      />
    );
    expect(screen.getByDisplayValue('27.10.1996, 03:24')).toBeInTheDocument();
  });
  it('should render correct with US notation', () => {
    renderWithProvider(
      <DatePicker
        onApply={jest.fn()}
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
      { notation: US_NOTATION }
    );
    expect(screen.getByDisplayValue('10/27/1996, 3:24 AM')).toBeInTheDocument();
  });
  it('should render month picker using locale', () => {
    renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
      {},
      { locale: 'pl' }
    );
    fireEvent.click(screen.getByText('paź'));

    expect(screen.getByText('kwi')).toBeInTheDocument();
  });
  it('should render day picker using locale', () => {
    renderWithProvider(
      <RawDatePicker
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />,
      {},
      { locale: 'pl' }
    );
    expect(screen.getByText('Śr')).toBeTruthy();
  });

  it('should show prev and next arrows in TimePicker as disabled if following and previous days are disabled', () => {
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
        onApply={jest.fn()}
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={defaultDay}
        disabledDates={disabledDates}
      />
    );
    const dayOne = (container.querySelector('[data-attr="27"]')) as HTMLElement;
    dayOne.click();
    screen.getByTestId('tp-overlay-container');
    const navigationArrows = container.querySelectorAll(NAVBAR_ITEM_SELECTOR);
    const toNextDay = navigationArrows[1];
    const toPrevDay = navigationArrows[0];
    expect(toNextDay).toBeDisabled();
    expect(toPrevDay).toBeDisabled();
  });
});
