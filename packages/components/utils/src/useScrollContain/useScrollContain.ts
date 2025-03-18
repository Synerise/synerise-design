import { useEffect, useRef } from 'react';

export const useScrollContain = <ElementType extends HTMLElement>() => {
  const elementRef = useRef<ElementType>(null);
  useEffect(() => {
    const blockWheel = (event: WheelEvent) => {
      event.stopPropagation();
      event.preventDefault();
    };
    let element: ElementType;
    if (elementRef.current) {
      element = elementRef.current;
      element.addEventListener('wheel', blockWheel);
    }
    return () => {
      element && element.removeEventListener('wheel', blockWheel);
    };
  }, []);
  return elementRef;
};
