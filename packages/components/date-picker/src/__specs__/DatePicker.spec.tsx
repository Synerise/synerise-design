import * as React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
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
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
      />,
      {},
      { notation: US_NOTATION }
    );
    // ASSERT
    expect(screen.getByDisplayValue('10/27/1996, 3:24 AM')).toBeInTheDocument();
  });
  it.todo('should render month picker using locale');
  it.todo('should render day picker using locale');
});
