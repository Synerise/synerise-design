import { DatePicker } from '../../dist';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';

describe('ColumnManager', () => {
  it('should render', () => {
    const element = renderWithProvider(
      <DatePicker
        showTime={true}
        onApply={value => console.log(value)}
        texts={{
          selectTime: 'Select time',
          selectDate: 'Select date',
          apply: 'Apply',
        }}
      />
    );
    expect(element).toBeTruthy();
  });
});
