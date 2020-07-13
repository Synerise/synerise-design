import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import RawDatePicker from '../RawDatePicker';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DateRangePicker from '../DateRangePicker';

const ROWS = 6;
const WEEKDAYS = 7;
const NAVBAR_ITEM_SELECTOR = '.ds-date-picker-nav  > div > button';
describe('DateRangePicker', () => {
  it('should render', async () => {
    const { container } = renderWithProvider(
      <DateRangePicker
        showTime
        onApply={() => {}}
        relativeFuture
      />
    );
    expect(await container.querySelector('.ds-date-range-picker') as HTMLElement).toBeTruthy();
  });
});
