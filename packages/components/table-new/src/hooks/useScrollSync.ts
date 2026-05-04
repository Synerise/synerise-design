import { type MutableRefObject, useEffect } from 'react';

export const useScrollSync = (refs: MutableRefObject<HTMLElement[]>) => {
  useEffect(() => {
    const nodes = refs.current;
    if (!nodes.length) {
      return;
    }
    const scrollHandler = (event: Event) => {
      const source = event.target as HTMLElement;
      const { scrollLeft } = source;
      nodes.forEach((elem) => {
        if (elem !== source && elem.scrollLeft !== scrollLeft) {
          elem.scrollLeft = scrollLeft;
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
