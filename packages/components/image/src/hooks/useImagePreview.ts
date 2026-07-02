import { useCallback, useMemo, useState } from 'react';

import { type ImagePreviewProps } from '../Preview/ImagePreview.types';
import { type ImageSource } from '../shared/Image.shared.types';

export type UseImagePreviewReturn = {
  /** Whether the preview is currently open. */
  isOpen: boolean;
  /** Index of the currently shown image. */
  index: number;
  /** Open the preview, optionally at a specific index. */
  open: (index?: number) => void;
  /** Close the preview. */
  close: () => void;
  /** Go to the next image (wraps). */
  next: () => void;
  /** Go to the previous image (wraps). */
  prev: () => void;
  /** Jump to a specific index. */
  setIndex: (index: number) => void;
  /** Spread onto `<ImagePreview>` to wire it up. */
  previewProps: Pick<
    ImagePreviewProps,
    'open' | 'images' | 'index' | 'onIndexChange' | 'onClose'
  >;
};

/**
 * Drives an `<ImagePreview>` from any trigger (a list row, a button, a table
 * cell) without a global provider. Owns the open/index state and exposes
 * handlers plus `previewProps` to spread onto the component.
 *
 * @example
 * const preview = useImagePreview(images);
 * <Row onClick={() => preview.open(2)} />
 * <ImagePreview {...preview.previewProps} />
 */
export const useImagePreview = (
  images: ImageSource[],
  options?: { initialIndex?: number },
): UseImagePreviewReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndexState] = useState(options?.initialIndex ?? 0);

  const total = images.length;

  const open = useCallback((nextIndex?: number): void => {
    if (typeof nextIndex === 'number') {
      setIndexState(nextIndex);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const setIndex = useCallback((nextIndex: number): void => {
    setIndexState(nextIndex);
  }, []);

  const next = useCallback((): void => {
    if (total > 1) {
      setIndexState((current) => (current + 1) % total);
    }
  }, [total]);

  const prev = useCallback((): void => {
    if (total > 1) {
      setIndexState((current) => (current - 1 + total) % total);
    }
  }, [total]);

  const previewProps = useMemo(
    () => ({
      open: isOpen,
      images,
      index,
      onIndexChange: setIndexState,
      onClose: close,
    }),
    [isOpen, images, index, close],
  );

  return { isOpen, index, open, close, next, prev, setIndex, previewProps };
};
