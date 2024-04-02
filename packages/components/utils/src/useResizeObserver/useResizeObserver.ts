import { useEffect, useState, useRef, RefObject, useCallback } from 'react';

const useResizeObserver = (elementRef: RefObject<HTMLElement | undefined>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const resizeObserver = useRef(
    new window.ResizeObserver(() => {
      if (elementRef.current) {
        setDimensions({
          width: elementRef.current.clientWidth,
          height: elementRef.current.clientHeight,
        });
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
