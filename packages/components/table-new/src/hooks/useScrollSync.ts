import { type MutableRefObject, useEffect } from 'react';

export const useScrollSync = (refs: MutableRefObject<HTMLElement[]>) => {
  useEffect(() => {
    const nodes = refs.current;
    if (!nodes.length) {
      return;
    }
    const scrollHandler = (event: Event) => {
      nodes.forEach((elem) => {
        if (elem !== event.currentTarget) {
          elem.scrollLeft = (event.currentTarget as HTMLElement)?.scrollLeft;
        }
      });
    };
    nodes.forEach((elem) => elem.addEventListener('scroll', scrollHandler));
    return () => {
      nodes.forEach((elem) =>
        elem.removeEventListener('scroll', scrollHandler),
      );
    };
  });
};
