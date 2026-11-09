import { type RefObject, useEffect, useRef, useState } from 'react';

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
  const observedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    resizeHandler && resizeHandler(dimensions);
  }, [dimensions, resizeHandler]);

  // Runs after every commit: the element may be rendered later than the hook mounts, or swapped.
  useEffect(() => {
    const element = elementRef.current ?? null;
    if (element === observedElement.current) {
      return;
    }
    if (observedElement.current) {
      resizeObserver.unobserve(observedElement.current);
    }
    if (element) {
      resizeObserver.observe(element);
    }
    observedElement.current = element;
  });

  useEffect(
    () => () => {
      resizeObserver.disconnect();
      observedElement.current = null;
    },
    [resizeObserver],
  );

  return dimensions;
};

export default useResizeObserver;
