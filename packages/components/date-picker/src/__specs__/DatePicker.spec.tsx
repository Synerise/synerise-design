import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import RawDatePicker from '../RawDatePicker';

const ROWS = 6;
const WEEKDAYS = 7;

describe('ColumnManager', () => {

  it('should render', () => {
    const onApply = jest.fn();
    const element = renderWithProvider(
      <RawDatePicker
        showTime={true}
        texts={{
          selectTime: 'Select time',
          selectDate: 'Select date',
          apply: 'Apply',
          now: 'Now',
        }}
        onApply={onApply}
      />
    );
    expect(element).toBeTruthy();
  });
  it('should validate all days visible after render', async () => {
    const onApply = jest.fn((value)=>{console.log(value)});
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
        onApply={onApply}
        disabledHours={[]}
        disabledMinutes={[]}
        disabledSeconds={[]}
        dateValidator={validator}
      />
    );
    expect(validator).toBeCalledTimes(ROWS * WEEKDAYS);
  });
});
