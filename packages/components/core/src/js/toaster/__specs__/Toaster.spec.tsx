import React from 'react';

import { DSProvider } from '../../index';
import { renderHook } from '@testing-library/react';

import { TOASTER_DEFAULTS } from '../constants';
import { useToaster } from '../index';

describe('Toaster', () => {
  it('should return toaster props', async () => {
    const { result } = renderHook(() => useToaster(), {
      wrapper: ({ children }) => (
        <DSProvider toasterProps={TOASTER_DEFAULTS}>{children}</DSProvider>
      ),
    });
    expect(result.current.options).toEqual(TOASTER_DEFAULTS);
  });

});



