import { type RefObject, useEffect, useRef } from 'react';

interface UseStickyScrollOptions {
  scrollContainerRef: RefObject<HTMLElement>;
  offsetTop?: number;
  offsetBottom?: number;
}

export const useStickyScroll = ({
  scrollContainerRef,
  offsetTop = 0,
  offsetBottom = 0,
}: UseStickyScrollOptions) => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const topValue = useRef(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) {
      return;
    }

    const containerStyle = getComputedStyle(container);
    const paddingTop = parseFloat(containerStyle.paddingTop);
    const paddingBottom = parseFloat(containerStyle.paddingBottom);

    const stickyOriginTop = sticky.offsetTop - paddingTop;

    sticky.style.position = 'sticky';
    sticky.style.top = `${offsetTop}px`;
    topValue.current = offsetTop;
    lastScrollTop.current = container.scrollTop;

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const delta = scrollTop - lastScrollTop.current;
      if (delta === 0) {
        return;
      }

      const engaged = scrollTop >= stickyOriginTop - offsetTop;
      if (!engaged) {
        topValue.current = offsetTop;
        sticky.style.top = `${topValue.current}px`;
        lastScrollTop.current = scrollTop;
        return;
      }

      const visibleHeight = container.clientHeight - paddingTop - paddingBottom;
      const stickyHeight = sticky.offsetHeight;

      if (stickyHeight <= visibleHeight - offsetTop - offsetBottom) {
        topValue.current = offsetTop;
      } else if (delta > 0) {
        const minTop = visibleHeight - stickyHeight - offsetBottom;
        topValue.current = Math.max(topValue.current - delta, minTop);
      } else {
        topValue.current = Math.min(topValue.current - delta, offsetTop);
      }

      sticky.style.top = `${topValue.current}px`;
      lastScrollTop.current = scrollTop;
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [scrollContainerRef, offsetTop, offsetBottom]);

  return stickyRef;
};
