import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useCombinedRefs } from '@synerise/ds-utils';
import './style/index.less';
import SpinnerM from '@synerise/ds-icon/dist/icons/SpinnerM';
import Icon from '@synerise/ds-icon';
import * as S from './Scrollbar.styles';
import { ScrollbarProps } from './Scrollbar.types';

const Scrollbar = React.forwardRef<HTMLElement, ScrollbarProps>(({
  absolute = false,
  children,
  classes,
  hasMore,
  loading,
  maxHeight,
  style,
  fetchData,
  onScroll,
  onYReachEnd,
}, forwardedRef) => {
  const scrollRef = React.useRef<HTMLElement>();
  const combinedScrollRef = useCombinedRefs(forwardedRef, scrollRef);
  const [lastScrollTop, setLastScrollTop] = React.useState(0);

  const handleReachEnd = React.useCallback(
    (container: HTMLElement) => {
      if (combinedScrollRef?.current?.scrollTop === lastScrollTop) {
        return;
      }

      combinedScrollRef.current && setLastScrollTop(combinedScrollRef.current.scrollTop);

      if (typeof onYReachEnd === 'function') {
        onYReachEnd(container);
      }

      if (!loading && hasMore && fetchData) {
        fetchData();
      }
    },
    [loading, hasMore, lastScrollTop, fetchData, onYReachEnd, combinedScrollRef]
  );

  const handleScrollUp = React.useCallback((): void => {
    if (combinedScrollRef?.current?.scrollTop !== 0) {
      setLastScrollTop(0);
    }
  }, [combinedScrollRef]);

  const renderScrollbar = React.useMemo(() => {
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
        <S.ScrollbarContent className={classes} style={{ maxHeight }}>
          <S.ScrollbarWrapper absolute={absolute} loading={loading} style={style}>
            {children}
          </S.ScrollbarWrapper>
        </S.ScrollbarContent>
      </PerfectScrollbar>
    );
  }, [onScroll, handleReachEnd, handleScrollUp, classes, maxHeight, absolute, loading, style, children, combinedScrollRef]);

  return fetchData ? (
    <S.ScrollbarContainer>
      {renderScrollbar}
      {loading && (
        <S.Loader loading={loading}>
          <Icon component={<SpinnerM />} color="#6a7580" />
        </S.Loader>
      )}
    </S.ScrollbarContainer>
  ) : (
      renderScrollbar
    );
});

export default Scrollbar;
