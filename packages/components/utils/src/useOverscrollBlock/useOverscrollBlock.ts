import { useCallback, useEffect, useRef } from 'react';

const useOverscrollBlock = <T extends HTMLElement>() => {
  const ref = useRef<T>();

  const handleMouseEnter = useCallback(() => {
    document.body.style.overscrollBehaviorX = 'contain';
  }, []);

  const handleMouseLeave = useCallback(() => {
    document.body.style.removeProperty('overscroll-behavior-x');
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.body.style.removeProperty('overscroll-behavior-x');
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return ref;
};
export default useOverscrollBlock;
