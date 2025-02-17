import React, { useCallback, forwardRef, useRef, useEffect, useState } from 'react';
import PerfectScrollbar from '@ofsajd/react-perfect-scrollbar';
// import { debounce } from 'lodash';
import { useCombinedRefs, useResizeObserver } from '@synerise/ds-utils';
import '../style/index.less';
import * as S from './VirtualScrollbar.styles';
import { VirtualScrollbarProps } from '../Scrollbar.types';

// eslint-disable-next-line import/prefer-default-export
export const VirtualScrollbar = forwardRef<HTMLElement, VirtualScrollbarProps>(
  (
    {
      absolute = false,
      children,
      classes,
      hasMore,
      loading,
      maxHeight,
      largeSize,
      style,
      fetchData,
      onScroll,
      scrollbarOptions,
      onYReachEnd,
      confineScroll,
    },
    forwardedRef
  ) => {
    const scrollRef = useRef<HTMLElement>();
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const combinedScrollRef = useCombinedRefs(forwardedRef, scrollRef);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const { height, width } = useResizeObserver(wrapperRef);

    const triggerScrollbarGeometryUpdate = useCallback(() => {
      const scrollEvent = new window.Event('scroll');
      wrapperRef.current && wrapperRef.current.dispatchEvent(scrollEvent);
      combinedScrollRef.current && combinedScrollRef.current.dispatchEvent(scrollEvent);
    }, [combinedScrollRef]);

    useEffect(() => {
      triggerScrollbarGeometryUpdate();
    }, [height, width, triggerScrollbarGeometryUpdate]);

    const handleReachEnd = useCallback(() => {
      if (combinedScrollRef?.current?.scrollTop === lastScrollTop) {
        return;
      }

      combinedScrollRef.current && setLastScrollTop(combinedScrollRef.current.scrollTop);

      if (typeof onYReachEnd === 'function') {
        onYReachEnd();
      }

      if (!loading && hasMore && fetchData) {
        fetchData();
      }
    }, [loading, hasMore, lastScrollTop, fetchData, onYReachEnd, combinedScrollRef]);

    const handleScrollUp = useCallback(() => {
      if (combinedScrollRef?.current?.scrollTop !== 0) {
        setLastScrollTop(0);
      }
    }, [combinedScrollRef]);

    useEffect(() => {
      const handleWheel =
        confineScroll &&
        ((event: WheelEvent) => {
          event.preventDefault();
        });
      const wrapper = wrapperRef.current;
      wrapper && handleWheel && wrapper.addEventListener('wheel', handleWheel);
      return () => {
        wrapper && handleWheel && wrapper.removeEventListener('wheel', handleWheel);
      };
    }, [confineScroll]);

    useEffect(() => {
      const endHandler = ({ target }: TransitionEvent | AnimationEvent) => {
        if (target instanceof HTMLElement && combinedScrollRef.current && target.contains(combinedScrollRef.current)) {
          triggerScrollbarGeometryUpdate();
        }
      };
      document.body.addEventListener('transitionend', endHandler);
      document.body.addEventListener('animationend', endHandler);
      return () => {
        document.body.removeEventListener('transitionend', endHandler);
        document.body.removeEventListener('animationend', endHandler);
      };
    });

    return (
      <PerfectScrollbar
        containerRef={ref => {
          combinedScrollRef.current = ref;
        }} // workaround: https://github.com/goldenyz/react-perfect-scrollbar/issues/94#issuecomment-619131257
        onScroll={onScroll}
        onScrollUp={handleScrollUp}
        options={{ ...scrollbarOptions, minScrollbarLength: 48 }}
        onYReachEnd={handleReachEnd}
        className={`${largeSize ? 'large-size' : ''}`}
      >
        <S.ScrollbarContent className={`${classes}`} style={{ maxHeight }} data-testid="virtual-scrollbar">
          <S.ScrollbarWrapper
            ref={wrapperRef}
            absolute={absolute}
            loading={loading}
            style={style}
            largeSize={largeSize}
          >
            {children}
          </S.ScrollbarWrapper>
        </S.ScrollbarContent>
      </PerfectScrollbar>
    );
  }
);
