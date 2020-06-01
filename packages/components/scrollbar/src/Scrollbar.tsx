import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './style/index.less';
import SpinnerM from '@synerise/ds-icon/dist/icons/SpinnerM';
import Icon from '@synerise/ds-icon';
import * as S from './Scrollbar.styles';

export type ScrollbarProps = {
  children: React.ReactNode | string;
  classes?: string;
  maxHeight?: string | number;
  absolute?: boolean;
  onScroll?: (e: React.UIEvent) => void;
  loading?: boolean;
  hasMore?: boolean;
  fetchData?: () => void;
  style?: React.CSSProperties;
};

const Scrollbar: React.FC<ScrollbarProps> = ({
  loading,
  hasMore,
  fetchData,
  children,
  classes,
  maxHeight,
  absolute = false,
  onScroll,
  style,
}) => {
  const scrollRef = React.useRef();
  const [lastScrollTop, setLastScrollTop] = React.useState(true);

  const handleReachEnd = React.useCallback(() => {
    if (!loading && hasMore && scrollRef.current.scrollTop !== lastScrollTop && fetchData) {
      setLastScrollTop(scrollRef.current.scrollTop);
      fetchData();
    }
  }, [loading, hasMore, lastScrollTop, fetchData]);

  return (
    <S.ScrollbarContainer>
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
      {loading && (
        <S.Loader loading={loading}>
          <Icon component={<SpinnerM />} color="#6a7580" />
        </S.Loader>
      )}
    </S.ScrollbarContainer>
  );
};
export default Scrollbar;
