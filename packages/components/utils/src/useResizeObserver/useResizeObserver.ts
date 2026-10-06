import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const useResizeObserver = (
  elementRef: RefObject<HTMLElement | undefined>,
  resizeHandler?: (dimensions: DOMRect) => void,
) => {
  const [dimensions, setDimensions] = useState<DOMRect>(new DOMRect());
  const resizeObserver = useRef(
    new ResizeObserver((entries) => {
      const runHandler = () => {
        const { contentRect } = entries[0];
        setDimensions(contentRect);
      };
      if ('requestAnimationFrame' in window) {
        window.requestAnimationFrame(runHandler);
      } else {
        setTimeout(runHandler, 0);
      }
    }),
  ).current;

  // biome-ignore lint/correctness/useExhaustiveDependencies: dependencies intentionally omitted
  const observe = useCallback(() => {
    elementRef.current && resizeObserver.observe(elementRef.current);
  }, [resizeObserver]);

  const disconnect = useCallback(() => {
    resizeObserver.disconnect();
  }, [resizeObserver]);

  useEffect(() => {
    resizeHandler && resizeHandler(dimensions);
  }, [dimensions, resizeHandler]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: dependencies intentionally omitted
  useEffect(() => {
    if (elementRef.current) {
      observe();
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [resizeObserver, observe, disconnect]);

  return dimensions;
};

export default useResizeObserver;
