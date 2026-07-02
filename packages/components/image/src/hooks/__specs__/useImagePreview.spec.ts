import { act, renderHook } from '@testing-library/react';

import { type ImageSource } from '../../shared/Image.shared.types';
import { useImagePreview } from '../useImagePreview';

const IMAGES: ImageSource[] = [
  { src: 'a.jpg', alt: 'A' },
  { src: 'b.jpg', alt: 'B' },
  { src: 'c.jpg', alt: 'C' },
];

describe('useImagePreview', () => {
  it('starts closed at index 0', () => {
    // ARRANGE
    const { result } = renderHook(() => useImagePreview(IMAGES));

    // ASSERT
    expect(result.current.isOpen).toBe(false);
    expect(result.current.index).toBe(0);
    expect(result.current.previewProps.open).toBe(false);
  });

  it('opens at a given index', () => {
    // ARRANGE
    const { result } = renderHook(() => useImagePreview(IMAGES));

    // ACT
    act(() => result.current.open(2));

    // ASSERT
    expect(result.current.isOpen).toBe(true);
    expect(result.current.index).toBe(2);
    expect(result.current.previewProps.index).toBe(2);
  });

  it('wraps with next and prev', () => {
    // ARRANGE
    const { result } = renderHook(() => useImagePreview(IMAGES));

    // ACT — prev from 0 wraps to the last image
    act(() => result.current.prev());

    // ASSERT
    expect(result.current.index).toBe(2);

    // ACT — next from the last wraps back to the first
    act(() => result.current.next());

    // ASSERT
    expect(result.current.index).toBe(0);
  });

  it('closes', () => {
    // ARRANGE
    const { result } = renderHook(() => useImagePreview(IMAGES));

    // ACT
    act(() => result.current.open());
    act(() => result.current.close());

    // ASSERT
    expect(result.current.isOpen).toBe(false);
  });

  it('respects the initial index option', () => {
    // ARRANGE
    const { result } = renderHook(() =>
      useImagePreview(IMAGES, { initialIndex: 1 }),
    );

    // ASSERT
    expect(result.current.index).toBe(1);
  });
});
