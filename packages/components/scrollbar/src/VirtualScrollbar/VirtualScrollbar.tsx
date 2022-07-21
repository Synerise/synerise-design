import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useCombinedRefs } from '@synerise/ds-utils';
import './style/index.less';
import * as S from './VirtualScrollbar.styles';
import { ScrollbarProps } from '../Scrollbar.types';

// eslint-disable-next-line import/prefer-default-export
export const VirtualScrollbar = React.forwardRef<HTMLElement, ScrollbarProps>(
  (
    { absolute = false, children, classes, hasMore, loading, maxHeight, style, fetchData, onScroll, onYReachEnd },
    forwardedRef
  ) => {
    const scrollRef = React.useRef<HTMLElement>();
    const combinedScrollRef = useCombinedRefs(forwardedRef, scrollRef);
    const [lastScrollTop, setLastScrollTop] = React.useState(0);

    const handleReachEnd = React.useCallback(() => {
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

    const handleScrollUp = React.useCallback((): void => {
      if (combinedScrollRef?.current?.scrollTop !== 0) {
        setLastScrollTop(0);
      }
    }, [combinedScrollRef]);

    return (
      <PerfectScrollbar
        containerRef={(ref): void => {
          combinedScrollRef.current = ref;
        }} // workaround: https://github.com/goldenyz/react-perfect-scrollbar/issues/94#issuecomment-619131257
        onScroll={onScroll}
        onScrollUp={handleScrollUp}
        options={{ minScrollbarLength: 48 }}
        onYReachEnd={handleReachEnd}
      >
        <S.ScrollbarContent className={classes} style={{ maxHeight }} data-testid="virtual-scrollbar">
          <S.ScrollbarWrapper absolute={absolute} loading={loading} style={style}>
            {children}
          </S.ScrollbarWrapper>
        </S.ScrollbarContent>
      </PerfectScrollbar>
    );
  }
);
