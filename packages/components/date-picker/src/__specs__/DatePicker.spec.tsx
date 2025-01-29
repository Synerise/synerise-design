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
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
      />
    );
    expect(element).toBeTruthy();
  });
  it('should validate all days visible after render', async () => {
    const validator = jest.fn();
    renderWithProvider(
      <RawDatePicker
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
  it('should proceed to MonthPicker when clicked on month', async () => {
    const { getByText } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    await fireEvent.click(await getByText('Oct'));
    expect(await getByText('Jan')).toBeTruthy();
    expect(await getByText('Sep')).toBeTruthy();
    expect(await getByText('Feb')).toBeTruthy();
  });
  it('should proceed to YearPicker when clicked on year', async () => {
    const { getByText } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    await fireEvent.click(await getByText('1996'));
    expect(await getByText('1995')).toBeTruthy();
    expect(await getByText('1997')).toBeTruthy();
    expect(await getByText('2000')).toBeTruthy();
  });
  it('should proceed to DecadePicker when clicked on year range', async () => {
    const { getByText } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    await fireEvent.click(await getByText('1996'));
    await fireEvent.click(await getByText('1990-1999'));
    expect(await getByText('1900-1909')).toBeTruthy();
    expect(await getByText('1930-1939')).toBeTruthy();
    expect(await getByText('2000-2009')).toBeTruthy();
  });
  it('should proceed to TimePicker after choosing the day', async () => {
    const { container, getByTestId } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );
    const dayOne = (await container.querySelector('[data-attr="1"]')) as HTMLElement;
    await dayOne.click();
    expect(await getByTestId('tp-overlay-container')).toBeTruthy();
  });
  it('should show previous year on left arrow click', async () => {
    const { getByText, container } = renderWithProvider(
      <RawDatePicker
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
    await fireEvent.click(toPreviousYear as HTMLElement);
    expect(await getByText('1995')).toBeTruthy();
    expect(screen.queryByText('1996')).not.toBeInTheDocument();
  });
  it('should show previous month on left arrow click', async () => {
    const { getByText, container } = renderWithProvider(
      <RawDatePicker
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
    await fireEvent.click(toPreviousMonth as HTMLElement);
    expect(await getByText('Sep')).toBeTruthy();
    expect(screen.queryByText('Oct')).not.toBeInTheDocument();
  });
  it('should show next month on right arrow click', async () => {
    const { getByText, container } = renderWithProvider(
      <RawDatePicker
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
    await fireEvent.click(toNextMonth as HTMLElement);
    expect(await getByText('Nov')).toBeTruthy();
    expect(screen.queryByText('Oct')).not.toBeInTheDocument();
  });
  it('should show next year on right arrow click', async () => {
    const { getByText, container } = renderWithProvider(
      <RawDatePicker
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
    await fireEvent.click(toNextYear as HTMLElement);
    expect(await getByText('1997')).toBeTruthy();
    expect(screen.queryByText('1996')).not.toBeInTheDocument();
  });
  it('should render prefix and suffix', () => {
    // ARRANGE
    const PREFIX = 'Prefix value';
    const SUFFIX = 'Suffix value';

    const { getAllByText } = renderWithProvider(
      <DatePicker
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
    // ASSERT
    expect(getAllByText(PREFIX)[0]).toBeTruthy();
    expect(getAllByText(SUFFIX)[0]).toBeTruthy();
  });
  it('should render with default formatValueOptions', () => {
    // ARRANGE
    const { getAllByText } = renderWithProvider(
      <DatePicker
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
      />
    );

    // ASSERT
    expect(screen.getByDisplayValue('27 Oct 1996, 03:24')).toBeInTheDocument();
  });
  it('should render with custom formatValueOptions', () => {
    // ARRANGE
    const { getAllByText } = renderWithProvider(
      <DatePicker
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
    // ASSERT
    expect(screen.getByDisplayValue('27.10.1996, 03:24')).toBeInTheDocument();
  });
  it('should render correct with US notation', () => {
    // ARRANGE
    const { getAllByText } = renderWithProvider(
      <DatePicker
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
    // ASSERT
    expect(screen.getByDisplayValue('10/27/1996, 3:24 AM')).toBeInTheDocument();
  });
  it('should render month picker using locale', async () => {
    const { getByText } = renderWithProvider(
      <RawDatePicker
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
    await fireEvent.click(await getByText('paź'));
    
    // ASSERT
    expect(getByText('kwi')).toBeInTheDocument();
  });
  it('should render day picker using locale', async () => {
    const { container, getByText } = renderWithProvider(
      <RawDatePicker
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
    expect(await getByText('Śr')).toBeTruthy();
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
    }
    const { container, getByTestId } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          apply: 'Apply',
          now: 'Now',
        }}
        value={defaultDay}
        disabledDates={disabledDates}
      />
    );
    const dayOne = (await container.querySelector('[data-attr="27"]')) as HTMLElement;
    await dayOne.click();
    await getByTestId('tp-overlay-container');
    const navigationArrows = container.querySelectorAll(NAVBAR_ITEM_SELECTOR);
    const toNextDay = navigationArrows[1];
    const toPrevDay = navigationArrows[0];
    expect(toNextDay).toBeDisabled();
    expect(toPrevDay).toBeDisabled();
  });
});
