import * as React from 'react';
import * as S from './DnDScrollbar.styles';
import { ScrollbarProps } from '../Scrollbar.types';

// eslint-disable-next-line import/prefer-default-export
export const DnDScrollbar: React.FC<ScrollbarProps> = ({
  children,
  classes,
  maxHeight,
  absolute,
  loading,
  onScroll,
  onYReachEnd,
  fetchData,
  hasMore,
  ...props
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const scrollTrackRef = React.useRef<HTMLDivElement>(null);
  const scrollThumbRef = React.useRef<HTMLDivElement>(null);
  const observer = React.useRef<ResizeObserver | null>(null);
  const [thumbHeight, setThumbHeight] = React.useState(48);
  const [scrollStartPosition, setScrollStartPosition] = React.useState<number>(0);
  const [initialScrollTop, setInitialScrollTop] = React.useState<number>(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleTrackClick = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
        const { clientY } = e;
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackTop = rect.top;
        const thumbOffset = -(thumbHeight / 2);
        const clickRatio = (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);
        contentCurrent.scrollTo({
          top: scrollAmount,
          behavior: 'smooth',
        });
      }
    },
    [thumbHeight]
  );

  const handleThumbPosition = React.useCallback(() => {
    if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) {
      return;
    }
    const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;
    let newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);
    const thumb = scrollThumbRef.current;
    thumb.style.top = `${newTop}px`;
  }, [thumbHeight]);

  const handleThumbMousedown = React.useCallback(e => {
    e.stopPropagation();
    setScrollStartPosition(e.clientY);
    if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
    setIsDragging(true);
  }, []);

  const handleThumbMouseup = React.useCallback(
    e => {
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleThumbMousemove = React.useCallback(
    e => {
      e.stopPropagation();
      if (isDragging && contentRef.current !== null) {
        const { scrollHeight: contentScrollHeight, offsetHeight: contentOffsetHeight } = contentRef.current;
        const deltaY = (e.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
        contentRef.current.scrollTop = Math.min(initialScrollTop + deltaY, contentScrollHeight - contentOffsetHeight);
      }
    },
    [initialScrollTop, isDragging, scrollStartPosition, thumbHeight]
  );

  const handleScroll = React.useCallback(
    e => {
      if (contentRef.current !== null) {
        const { scrollHeight, offsetHeight, scrollTop } = contentRef.current;
        const progress = Math.round(((scrollTop + offsetHeight) / scrollHeight) * 100) / 100;
        if (progress === 1 && hasMore) {
          onYReachEnd && onYReachEnd();
          fetchData && fetchData();
        }
      }
      onScroll && onScroll(e);
    },
    [fetchData, hasMore, onScroll, onYReachEnd]
  );

  const handleResize = React.useCallback((trackSize: number): void => {
    if (contentRef.current !== null) {
      const { clientHeight: clientHeightContent, scrollHeight: scrollHeightContent } = contentRef.current;
      if (clientHeightContent === scrollHeightContent) {
        setThumbHeight(0);
      } else {
        setThumbHeight(Math.max((clientHeightContent / scrollHeightContent) * trackSize, 48));
        handleThumbPosition();
      }
    }
  }, []);

  React.useEffect(() => {
    if (contentRef.current !== null && scrollTrackRef.current !== null && wrapperRef.current !== null) {
      const ref = wrapperRef.current;
      const content = contentRef.current;
      const { clientHeight: trackSize } = scrollTrackRef.current;
      // eslint-disable-next-line no-undef
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

  React.useEffect(() => {
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
    <S.ScrollbarContainer className="dnd-scrollbar">
      <S.ScrollbarContent ref={contentRef} {...props} style={{ maxHeight }} onScroll={handleScroll}>
        <S.ScrollbarWrapper ref={wrapperRef} loading={loading} absolute={absolute}>
          {children}
        </S.ScrollbarWrapper>
      </S.ScrollbarContent>
      <S.ScrollbarTrackWrapper>
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
