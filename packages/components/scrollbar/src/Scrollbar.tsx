import * as React from 'react';
import * as S from './Scrollbar.styles';
import { ScrollbarProps } from './Scrollbar.types';

const Scrollbar = React.forwardRef<HTMLElement, ScrollbarProps>(
  (
    { children, classes, maxHeight, absolute, loading, onScroll, onYReachEnd, fetchData, hasMore, ...props },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    forwardedRef
  ) => {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const scrollTrackRef = React.useRef<HTMLDivElement>(null);
    const scrollThumbRef = React.useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const observer = React.useRef<ResizeObserver | null>(null);
    const [thumbHeight, setThumbHeight] = React.useState(48);
    const [scrollStartPosition, setScrollStartPosition] = React.useState<number | null>(null);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { scrollTop: wrapperTop, scrollHeight: wrapperHeight } = wrapperRef.current;
      const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { scrollTop, scrollHeight, clientHeight: trackHeight } = scrollTrackRef.current;
      let newTop = (+contentTop / +contentHeight) * trackHeight;
      newTop = Math.min(newTop, trackHeight - thumbHeight);
      const thumb = scrollThumbRef.current;
      thumb.style.top = `${newTop}px`;
    }, [thumbHeight]);

    const handleThumbMousedown = React.useCallback(e => {
      // e.preventDefault();
      e.stopPropagation();
      setScrollStartPosition(e.clientY);
      if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
      setIsDragging(true);
    }, []);

    const handleThumbMouseup = React.useCallback(
      e => {
        // e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
          setIsDragging(false);
        }
      },
      [isDragging]
    );

    const handleThumbMousemove = React.useCallback(
      e => {
        // e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          const { scrollHeight: contentScrollHeight, offsetHeight: contentOffsetHeight } = contentRef.current;
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          const deltaY = (e.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
          const newScrollTop = Math.min(initialScrollTop + deltaY, contentScrollHeight - contentOffsetHeight);
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          contentRef.current.scrollTop = newScrollTop;
        }
      },
      [isDragging, scrollStartPosition, thumbHeight]
    );

    const handleScroll = React.useCallback(
      e => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const { scrollHeight, offsetHeight, scrollTop } = contentRef.current;
        const progress = Math.round(((scrollTop + offsetHeight) / scrollHeight) * 100) / 100;
        if (progress === 1 && hasMore) {
          onYReachEnd && onYReachEnd();
          fetchData && fetchData();
        }
        onScroll && onScroll(e);
      },
      [fetchData, hasMore, onScroll, onYReachEnd]
    );
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleResize = (ref: HTMLDivElement, trackSize: number) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const { clientHeight: clientHeightContent, scrollHeight: scrollHeightContent } = contentRef.current;
      if (clientHeightContent === scrollHeightContent) {
        setThumbHeight(0);
      } else {
        setThumbHeight(Math.max((clientHeightContent / scrollHeightContent) * trackSize, 48));
        handleThumbPosition();
      }
    };

    // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    React.useEffect(() => {
      if (contentRef.current && scrollTrackRef.current) {
        const ref = wrapperRef.current;
        const content = contentRef.current;
        const { clientHeight: trackSize } = scrollTrackRef.current;
        // eslint-disable-next-line no-undef
        observer.current = new ResizeObserver(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          handleResize(ref, trackSize);
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        observer.current.observe(ref);
        content.addEventListener('scroll', handleThumbPosition);
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => {
          // eslint-disable-next-line no-unused-expressions,no-undef
          observer.current?.unobserve(ref);
          content.removeEventListener('scroll', handleThumbPosition);
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/explicit-function-return-type
      return () => {};
    }, []);

    // Listen for mouse events to handle scrolling by dragging the thumb
    React.useEffect(() => {
      document.addEventListener('mousemove', handleThumbMousemove);
      document.addEventListener('mouseup', handleThumbMouseup);
      document.addEventListener('mouseleave', handleThumbMouseup);
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      return () => {
        document.removeEventListener('mousemove', handleThumbMousemove);
        document.removeEventListener('mouseup', handleThumbMouseup);
        document.removeEventListener('mouseleave', handleThumbMouseup);
      };
    }, [handleThumbMousemove, handleThumbMouseup]);

    return (
      <S.ScrollbarContainer>
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
  }
);

export default Scrollbar;
