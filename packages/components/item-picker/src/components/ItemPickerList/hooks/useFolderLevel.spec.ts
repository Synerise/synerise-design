import { act, renderHook } from '@testing-library/react';

import { useFolderLevel } from './useFolderLevel';

describe('useFolderLevel', () => {
  const setUp = () => {
    const hook = renderHook(() => useFolderLevel());
    act(() => hook.result.current.setPath([{ id: null, text: 'All' }]));
    return hook;
  };

  it('opens folders and goes back up one level at a time', () => {
    const { result } = setUp();
    act(() => result.current.openFolder({ id: 'a', text: 'A' }));
    act(() => result.current.openFolder({ id: 'b', text: 'B' }));
    expect(result.current.folderId).toBe('b');
    expect(result.current.path.map((step) => step.text)).toEqual([
      'All',
      'A',
      'B',
    ]);

    act(() => result.current.goUp());
    expect(result.current.folderId).toBe('a');

    act(() => result.current.goUp());
    expect(result.current.folderId).toBeNull();
    expect(result.current.path).toEqual([{ id: null, text: 'All' }]);
  });

  it('resets to the root', () => {
    const { result } = setUp();
    act(() => result.current.openFolder({ id: 'a', text: 'A' }));
    act(() => result.current.reset());

    expect(result.current.folderId).toBeNull();
    expect(result.current.path).toEqual([{ id: null, text: 'All' }]);
  });
});
