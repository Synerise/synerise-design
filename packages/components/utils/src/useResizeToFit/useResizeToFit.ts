import { useCallback, useEffect, useRef } from 'react';

type useResizeToFitProps = {
  onResize: (width: number) => void;
  autoObserve?: boolean;
};

const useResizeToFit = <T extends HTMLElement = HTMLDivElement>({
  onResize,
  autoObserve,
}: useResizeToFitProps) => {
  const elementRef = useRef<T>(null);

  const resizeObserver = useRef(
    new ResizeObserver(() => {
      elementRef.current && onResize(elementRef.current.clientWidth);
    }),
  ).current;

  const observe = useCallback(() => {
    elementRef.current && resizeObserver.observe(elementRef.current);
  }, [resizeObserver]);

  const disconnect = useCallback(() => {
    resizeObserver.disconnect();
  }, [resizeObserver]);

  useEffect(() => {
    if (elementRef.current) {
      if (autoObserve) {
        observe();
      } else {
        disconnect();
      }
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [resizeObserver, autoObserve, elementRef, observe, disconnect]);

  return {
    elementRef,
    disconnect,
    observe,
  };
};

export default useResizeToFit;
