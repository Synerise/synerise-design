import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import RawDatePicker from '../RawDatePicker';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

const ROWS = 6;
const WEEKDAYS = 7;

describe('RawDatePicker', () => {
  it('should render', () => {
    const element = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          selectTime: 'Select time',
          selectDate: 'Select date',
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
          selectTime: 'Select time',
          selectDate: 'Select date',
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
        dateValidator={validator}
      />
    );
    expect(validator).toBeCalledTimes(ROWS * WEEKDAYS);
  });
  it('should proceed to MonthPicker when clicked on month', async () => {
    const validator = jest.fn(() => true);
    const { getByText } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          selectTime: 'Select time',
          selectDate: 'Select date',
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
        dateValidator={validator}
      />
    );
    await fireEvent.click(await getByText('Oct'));
    expect(await getByText('Jan')).toBeTruthy();
    expect(await getByText('Sep')).toBeTruthy();
    expect(await getByText('Feb')).toBeTruthy();
  });
  it('should proceed to YearPicker when clicked on year', async () => {
    const validator = jest.fn(() => true);
    const { getByText } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          selectTime: 'Select time',
          selectDate: 'Select date',
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
        dateValidator={validator}
      />
    );
    await fireEvent.click(await getByText('1996'));
    expect(await getByText('1995')).toBeTruthy();
    expect(await getByText('1997')).toBeTruthy();
    expect(await getByText('2000')).toBeTruthy();
  });
  it('should proceed to DecadePicker when clicked on year range', async () => {
    const validator = jest.fn(() => true);
    const { getByText } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          selectTime: 'Select time',
          selectDate: 'Select date',
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
        dateValidator={validator}
      />
    );
    await fireEvent.click(await getByText('1996'));
    await fireEvent.click(await getByText('1990-1999'));
    expect(await getByText('1900-1909')).toBeTruthy();
    expect(await getByText('1930-1939')).toBeTruthy();
    expect(await getByText('2000-2009')).toBeTruthy();
  });
  it('should proceed to TimePicker when clicked on select time', async () => {
    const validator = jest.fn(() => true);
    const { getByText, container, getByTestId } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          selectTime: 'Select time',
          selectDate: 'Select date',
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
        dateValidator={validator}
      />
    );
    const dayOne = container.querySelector('[data-attr="1"]') as HTMLElement;
    await fireEvent.click(dayOne);
    await fireEvent.click(await getByText('Select time'));
    expect(await getByTestId('tp-overlay-container')).toBeTruthy();
  });
  it('should show previous year on left arrow click', async () => {
    const validator = jest.fn(() => true);
    const { getByText, container } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          selectTime: 'Select time',
          selectDate: 'Select date',
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
        dateValidator={validator}
      />
    );
    const navigationArrows = container.querySelectorAll('.ds-icon[role="button"]');
    const toPreviousYear = navigationArrows[0];
    await fireEvent.click(toPreviousYear as HTMLElement);
    expect(await getByText('1995')).toBeTruthy();
    expect(screen.queryByText('1996')).not.toBeInTheDocument();
  });
  it('should show previous month on left arrow click', async () => {
    const validator = jest.fn(() => true);
    const { getByText, container } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          selectTime: 'Select time',
          selectDate: 'Select date',
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
        dateValidator={validator}
      />
    );
    const navigationArrows = container.querySelectorAll('.ds-icon[role="button"]');
    const toPreviousMonth = navigationArrows[1];
    await fireEvent.click(toPreviousMonth as HTMLElement);
    expect(await getByText('Sep')).toBeTruthy();
    expect(screen.queryByText('Oct')).not.toBeInTheDocument();
  });
  it('should show next month on right arrow click', async () => {
    const validator = jest.fn(() => true);
    const { getByText, container } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          selectTime: 'Select time',
          selectDate: 'Select date',
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
        dateValidator={validator}
      />
    );
    const navigationArrows = container.querySelectorAll('.ds-icon[role="button"]');
    const toNextMonth = navigationArrows[2];
    await fireEvent.click(toNextMonth as HTMLElement);
    expect(await getByText('Nov')).toBeTruthy();
    expect(screen.queryByText('Oct')).not.toBeInTheDocument();
  });
  it('should show next year on right arrow click', async () => {
    const validator = jest.fn(() => true);
    const { getByText, container } = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          selectTime: 'Select time',
          selectDate: 'Select date',
          apply: 'Apply',
          now: 'Now',
        }}
        value={new Date('1996-10-27T03:24:00')}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
        dateValidator={validator}
      />
    );
    const navigationArrows = container.querySelectorAll('.ds-icon[role="button"]');
    const toNextYear = navigationArrows[3];
    await fireEvent.click(toNextYear as HTMLElement);
    expect(await getByText('1997')).toBeTruthy();
    expect(screen.queryByText('1996')).not.toBeInTheDocument();
  });
});
