import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './style/index.less';
import SpinnerM from '@synerise/ds-icon/dist/icons/SpinnerM';
import Icon from '@synerise/ds-icon';
import * as S from './Scrollbar.styles';
import { ScrollbarProps } from './Scrollbar.types';

const Scrollbar: React.FC<ScrollbarProps> = ({
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
}) => {
  const scrollRef = React.useRef<HTMLElement>();
  const [lastScrollTop, setLastScrollTop] = React.useState(0);

  const handleReachEnd = React.useCallback(
    (container: HTMLElement) => {
      if (scrollRef?.current?.scrollTop === lastScrollTop) {
        return;
      }

      scrollRef.current && setLastScrollTop(scrollRef.current.scrollTop);

      if (typeof onYReachEnd === 'function') {
        onYReachEnd(container);
      }

      if (!loading && hasMore && fetchData) {
        fetchData();
      }
    },
    [loading, hasMore, lastScrollTop, fetchData, onYReachEnd]
  );

  const renderScrollbar = React.useMemo(() => {
    return (
      <PerfectScrollbar
        containerRef={(ref): void => {
          scrollRef.current = ref;
        }} // workaround: https://github.com/goldenyz/react-perfect-scrollbar/issues/94#issuecomment-619131257
        onScroll={onScroll}
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
  }, [scrollRef, onScroll, handleReachEnd, classes, maxHeight, absolute, loading, style, children]);

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
};

export default Scrollbar;
