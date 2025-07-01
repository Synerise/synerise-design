import { type MutableRefObject, useEffect, useRef, useState } from 'react';

type IntersectionObserverOptions = {
  rootMargin?: string;
  threshold?: number | number[];
};

const useElementInView = <T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverOptions,
  rootElementRef?: MutableRefObject<HTMLDivElement | null | undefined>,
) => {
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        ...options,
        root: rootElementRef?.current || null,
      },
    );

    if (elementRef.current) {
      intersectionObserver.observe(elementRef.current);
    }
    return () => {
      intersectionObserver.disconnect();
    };
  });

  return {
    isIntersecting: isVisible,
    elementRef,
    isVisible,
  };
};

export default useElementInView;
