import React from 'react';
import { IntlProvider } from 'react-intl';

import { renderHook } from '@testing-library/react';

import { useDefaultTexts } from '../useDefaultTexts';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <IntlProvider locale="en">{children}</IntlProvider>
);

describe('useDefaultTexts', () => {
  it('should return default text values', () => {
    const { result } = renderHook(() => useDefaultTexts(), { wrapper });
    expect(result.current.emptyText).toBe('No data');
    expect(result.current.totalItems).toBe('Records');
    expect(result.current.selected).toBe('selected');
    expect(result.current.selectAll).toBe('Select visible');
    expect(result.current.infiniteScrollLoading).toBe('Loading');
    expect(result.current.infiniteScrollError).toBe('An error occurred');
    expect(result.current.infiniteScrollRetry).toBe('Retry');
  });

  it('should override default texts with custom texts', () => {
    const customTexts = {
      emptyText: 'Nothing here',
      totalItems: 'Items',
    };
    const { result } = renderHook(() => useDefaultTexts(customTexts), {
      wrapper,
    });
    expect(result.current.emptyText).toBe('Nothing here');
    expect(result.current.totalItems).toBe('Items');
    // Non-overridden values should keep defaults
    expect(result.current.selected).toBe('selected');
  });
});
