import { useEffect, useState, useRef, RefObject, useCallback } from 'react';

const useResizeObserver = (
  elementRef: RefObject<HTMLElement | undefined>,
  resizeHandler?: (dimensions: DOMRect) => void
) => {
  const [dimensions, setDimensions] = useState<DOMRect>(new DOMRect());
  const resizeObserver = useRef(
    new ResizeObserver(entries => {
      const runHandler = () => {
        const { contentRect } = entries[0];
        setDimensions(contentRect);
        resizeHandler && resizeHandler(contentRect);
      };
      if ('requestAnimationFrame' in window) {
        window.requestAnimationFrame(runHandler);
      } else {
        setTimeout(runHandler, 0);
      }
    })
  ).current;

  const observe = useCallback(() => {
    elementRef.current && resizeObserver.observe(elementRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizeObserver]);

  const disconnect = useCallback(() => {
    resizeObserver.disconnect();
  }, [resizeObserver]);

  useEffect(() => {
    if (elementRef.current) {
      observe();
    }
    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizeObserver, observe, disconnect]);

  return dimensions;
};

export default useResizeObserver;
