import { renderHook } from '@testing-library/react';

import { useShiftAndControlKeys } from './useShiftAndControlKeys';

describe('useShiftAndControlKeys', () => {
  it('removes the key listeners it added when unmounted', () => {
    const element = document.createElement('div');
    const add = vi.spyOn(element, 'addEventListener');
    const remove = vi.spyOn(element, 'removeEventListener');

    const { unmount } = renderHook(() =>
      useShiftAndControlKeys({ current: element }),
    );
    unmount();

    expect(add).toHaveBeenCalledTimes(2);
    add.mock.calls.forEach(([type, listener]) => {
      expect(remove).toHaveBeenCalledWith(type, listener);
    });
  });
});
