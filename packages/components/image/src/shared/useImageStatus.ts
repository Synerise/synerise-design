import {
  type RefObject,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export type ImageStatus = 'loading' | 'loaded' | 'error';

/**
 * Tracks the load state of a single `<img>`. The single source of truth for
 * "is this image broken?" across thumbnails and the preview.
 *
 * Attach `ref`, `handleLoad`, and `handleError` to the `<img>`. On `src`
 * change the status resets to `loading`, then re-reads the element's cached
 * `complete`/`naturalWidth` so an already-decoded (cached) image resolves
 * without waiting for a load event that may have fired before this hook ran.
 */
export const useImageStatus = (
  src: string,
): {
  ref: RefObject<HTMLImageElement>;
  status: ImageStatus;
  handleLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
  handleError: () => void;
} => {
  const ref = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<ImageStatus>('loading');

  useEffect(() => {
    const node = ref.current;
    if (node?.complete) {
      setStatus(node.naturalWidth > 0 ? 'loaded' : 'error');
    } else {
      setStatus('loading');
    }
  }, [src]);

  const handleLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>): void => {
      setStatus(event.currentTarget.naturalWidth > 0 ? 'loaded' : 'error');
    },
    [],
  );

  const handleError = useCallback((): void => {
    setStatus('error');
  }, []);

  return { ref, status, handleLoad, handleError };
};
