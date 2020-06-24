import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import { DatePicker } from '../DatePicker';

describe('ColumnManager', () => {
  it('should render', () => {
    const element = renderWithProvider(
      <DatePicker
        showTime={true}
        onApply={(value: Date | undefined): void => console.log(value)}
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
});
