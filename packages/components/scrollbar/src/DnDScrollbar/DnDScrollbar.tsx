import React, {
  type MouseEvent as ReactMouseEvent,
  type UIEvent,
  type WheelEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { type ScrollbarProps } from '../Scrollbar.types';
import * as S from './DnDScrollbar.styles';

export const DnDScrollbar = ({
  children,
  classes,
  maxHeight,
  absolute,
  loading,
  largeSize,
  onScroll,
  onYReachEnd,
  fetchData,
  hasMore,
  confineScroll,
  ...props
}: ScrollbarProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbHeight, setThumbHeight] = useState(48);
  const [scrollStartPosition, setScrollStartPosition] = useState(0);
  const [initialScrollTop, setInitialScrollTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTrackClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
        const { clientY } = event;
        const target = event.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackTop = rect.top;
        const thumbOffset = -(thumbHeight / 2);
        const clickRatio =
          (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        const scrollAmount = Math.floor(
          clickRatio * contentCurrent.scrollHeight,
        );
        contentCurrent.scrollTo({
          top: scrollAmount,
          behavior: 'smooth',
        });
      }
    },
    [thumbHeight],
  );

  const handleThumbPosition = useCallback(() => {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }
    const { scrollTop: contentTop, scrollHeight: contentHeight } =
      contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;
    let newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);
    const thumb = scrollThumbRef.current;
    thumb.style.top = `${newTop}px`;
  }, [thumbHeight]);

  const handleThumbMousedown = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setScrollStartPosition(event.clientY);
      if (contentRef.current) {
        setInitialScrollTop(contentRef.current.scrollTop);
      }
      setIsDragging(true);
    },
    [],
  );

  const handleThumbMouseup = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging],
  );

  const handleThumbMousemove = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      if (isDragging && contentRef.current !== null) {
        const {
          scrollHeight: contentScrollHeight,
          offsetHeight: contentOffsetHeight,
        } = contentRef.current;
        const deltaY =
          (event.clientY - scrollStartPosition) *
          (contentOffsetHeight / thumbHeight);
        contentRef.current.scrollTop = Math.min(
          initialScrollTop + deltaY,
          contentScrollHeight - contentOffsetHeight,
        );
      }
    },
    [initialScrollTop, isDragging, scrollStartPosition, thumbHeight],
  );

  const handleScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if (contentRef.current !== null) {
        const { scrollHeight, offsetHeight, scrollTop } = contentRef.current;
        const progress =
          Math.round(((scrollTop + offsetHeight) / scrollHeight) * 100) / 100;
        if (progress === 1 && hasMore) {
          onYReachEnd && onYReachEnd();
          fetchData && fetchData();
        }
      }
      onScroll && onScroll(event);
    },
    [fetchData, hasMore, onScroll, onYReachEnd],
  );

  const handleResize = useCallback(
    (trackSize: number) => {
      if (contentRef.current !== null) {
        const {
          clientHeight: clientHeightContent,
          scrollHeight: scrollHeightContent,
        } = contentRef.current;
        if (clientHeightContent === scrollHeightContent) {
          setThumbHeight(0);
        } else {
          setThumbHeight(
            Math.max(
              (clientHeightContent / scrollHeightContent) * trackSize,
              48,
            ),
          );
          handleThumbPosition();
        }
      }
    },
    [handleThumbPosition],
  );

  const handleWheel = (event: WheelEvent) => {
    if (confineScroll) {
      event.stopPropagation();
    }
  };

  useEffect(() => {
    if (
      contentRef.current !== null &&
      scrollTrackRef.current !== null &&
      wrapperRef.current !== null
    ) {
      const ref = wrapperRef.current;
      const content = contentRef.current;
      const { clientHeight: trackSize } = scrollTrackRef.current;

      observer.current = new ResizeObserver(() => {
        handleResize(trackSize);
      });
      observer.current.observe(ref);
      content.addEventListener('scroll', handleThumbPosition);
      return (): void => {
        if (observer.current !== null) {
          observer.current.unobserve(ref);
        }
        content.removeEventListener('scroll', handleThumbPosition);
      };
    }
    return undefined;
  }, [handleResize, handleThumbPosition]);

  useEffect(() => {
    document.addEventListener('mousemove', handleThumbMousemove);
    document.addEventListener('mouseup', handleThumbMouseup);
    document.addEventListener('mouseleave', handleThumbMouseup);
    return (): void => {
      document.removeEventListener('mousemove', handleThumbMousemove);
      document.removeEventListener('mouseup', handleThumbMouseup);
      document.removeEventListener('mouseleave', handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  return (
    <S.ScrollbarContainer data-testid="dnd-scrollbar">
      <S.ScrollbarContent
        ref={contentRef}
        {...props}
        style={{ maxHeight }}
        onScroll={handleScroll}
        onWheel={handleWheel}
      >
        <S.ScrollbarWrapper
          ref={wrapperRef}
          loading={loading}
          absolute={absolute}
          largeSize={largeSize}
        >
          {children}
        </S.ScrollbarWrapper>
      </S.ScrollbarContent>
      <S.ScrollbarTrackWrapper largeSize={largeSize}>
        <S.TrackVertical ref={scrollTrackRef} onClick={handleTrackClick} />
        <S.ThumbVertical
          ref={scrollThumbRef}
          onMouseDown={handleThumbMousedown}
          style={{ height: `${thumbHeight}px` }}
        />
      </S.ScrollbarTrackWrapper>
    </S.ScrollbarContainer>
  );
};
