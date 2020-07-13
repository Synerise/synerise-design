import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import DateRangePicker from '../DateRangePicker';

describe('DateRangePicker', () => {
  it('should render', async () => {
    const { container } = renderWithProvider(
      // @ts-ignore
      <DateRangePicker showTime onApply={() => {}} relativeFuture />
    );
    expect((await container.querySelector('.ds-date-range-picker')) as HTMLElement).toBeTruthy();
  });
});
